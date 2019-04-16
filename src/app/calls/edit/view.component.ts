import {
  Component, OnInit, OnDestroy, Input, Output, OnChanges,
  EventEmitter, SimpleChanges, ChangeDetectionStrategy
} from '@angular/core';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store';
import * as fromR from '../store/reducers/calls.reducer';
import { takeWhile } from 'rxjs/operators';
import { Call } from '../shared/models/call';
import { CallValidator } from '../shared/misc/call-validator';

import * as m from 'moment';
const moment = m;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'l',
  },
  display: {
    dateInput: 'l',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LLL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'cm-view',
  templateUrl: 'view.component.html',
  styleUrls: ['view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ViewComponent implements OnInit, OnChanges, OnDestroy {
  public title = '';
  public work: Call = {
    'id': '',
    '_id': '',
    'name': '',
    'description': '',
    'priority': '',
    'startDate': '',
    'completionDate': '',
    'createdOn': '',
    'updatedOn': ''
  };

  validationMessages: {
    name: { required: string; minlength: string; maxlength: string };
    description: { required: string; minlength: string; maxlength: string };
    priority: { required: string };
    startDate: { required: string };
  };

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};

  exists = false;
  errorMessage: string;
  componentActive: boolean;
  callForm: FormGroup;
  pageTitle = 'Call Edit';

  @Input() call: Call;

  @Output() create = new EventEmitter<Call>();
  @Output() update = new EventEmitter<Call>();
  @Output() delete = new EventEmitter<Call>();

  private callValidator: CallValidator;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromR.CallsState>
  ) {

    // Defines all of the validation messages for the form.
    this.validationMessages = {
      name: {
        required: 'Name is required.',
        minlength: 'Name must be at least 3 characters.',
        maxlength: 'Name cannot exceed 50 characters.'
      },
      description: {
        required: 'Description is required.',
        minlength: 'Description must be at least 3 characters.',
        maxlength: 'Description cannot exceed 250 characters.'
      },
      priority: {
        required: 'Priority is required.'
      },
      startDate: {
        required: 'Start date is required.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.callValidator = new CallValidator(this.validationMessages);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.callForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
        ],
        description: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(250)
          ]
        ],
        priority: [
          '',
          [
            Validators.required,
          ]
        ],
        startDate: [null, [Validators.required]],
        completionDate: [null, []]
      },
      { updateOn: 'blur' }
    );

    // Watch for value changes
    this.callForm.valueChanges
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(value =>
        (this.displayMessage = this.callValidator.processMessages(this.callForm)
        )
      );

    // patch form with value from the store
    this.callForm.reset();
    this.callForm.patchValue({
      name: '',
      description: '',
      priority: '',
      startDate: '',
      completionDate: ''
    });
    const xcall: any = changes.call.currentValue as Call;
    this.displayCall(xcall);
  }

  displayCall(call: Call | null): void {
    this.call = call;
    if (this.call) {
      this.callForm.reset();

      if (this.call._id === '') {
        this.pageTitle = 'Create Call';
        this.exists = false;
      } else {
        this.pageTitle = `Edit Call: ${this.call.name}`;
        this.exists = true;
      }

      const xxx = m(this.call.startDate).format('LLL');
      // Update the data on the form
      this.callForm.patchValue({
        name: this.call.name,
        description: this.call.description,
        priority: this.call.priority,
        startDate: new Date(this.call.startDate),
        completionDate: this.call.completionDate ? new Date(this.call.completionDate) : null
      });
    }
  }

  ngOnInit(): void {
    if (this.call._id === '') {
      this.exists = false;
    } else {
      this.exists = true;
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.callValidator.processMessages(this.callForm);
  }

  createCall(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.work = value;
      this.work._id = void 0;
      this.work.startDate = m(this.work.startDate).format('MM/DD/YYYY');
      if (this.work.completionDate) {
        this.work.completionDate = m(this.work.completionDate).format('MM/DD/YYYY');
      }
      // this.create.emit(value);
      this.create.emit(this.work);
      this.callForm.reset();
    }
  }

  updateCall(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.work = value;
      this.work.startDate = m(this.work.startDate).format('MM/DD/YYYY');
      if (this.work.completionDate) {
        this.work.completionDate = m(this.work.completionDate).format('MM/DD/YYYY');
      }
      // this.update.emit({ ...this.call, ...value });
      this.update.emit({ ...this.call, ...this.work });
      this.callForm.reset();
    }
  }

  deleteCall(form: FormGroup) {
    if (this.call && this.call._id) {
      if (confirm(`Really delete the call: ${this.call.name}?`)) {
        const { value } = form;
        this.delete.emit({ ...this.call, ...value });
        this.callForm.reset();
      }
    }
  }

  onBack() {
    this.store.dispatch(new fromApp.Go({ path: ['/calls'] }));
  }
}
