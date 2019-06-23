import { NgModule } from '@angular/core';
// import { AccordionModule } from 'primeng/accordion';
// import { AutoCompleteModule } from 'primeng/autocomplete';
// import { BlockUIModule } from 'primeng/blockui';
// import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
// import { CalendarModule } from 'primeng/primeng';
// import { CaptchaModule } from 'primeng/captcha';
import { CardModule } from 'primeng/card';
// import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
// import { CheckboxModule } from 'primeng/checkbox';
// import { ChipsModule } from 'primeng/chips';
// import { CodeHighlighterModule } from 'primeng/codehighlighter';
// import { ColorPickerModule } from 'primeng/colorpicker';
// import { ConfirmationService } from 'primeng/api';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { ContextMenuModule } from 'primeng/contextmenu';
// import { DataScrollerModule } from 'primeng/datascroller';
// import { DataTableModule } from 'primeng/primeng';
// import { DataViewModule } from 'primeng/dataview';
// import { DeferModule } from 'primeng/defer';
// import { DialogModule } from 'primeng/dialog';
// import { DragDropModule } from 'primeng/dragdrop';
// import { DropdownModule } from 'primeng/dropdown';
// import { EditorModule } from 'primeng/editor';
// import { FieldsetModule } from 'primeng/fieldset';
// import { FileUploadModule } from 'primeng/fileupload';
// import { GalleriaModule } from 'primeng/galleria';
// import { GMapModule } from 'primeng/gmap';
// import { GrowlModule } from 'primeng/growl';
// import { InplaceModule } from 'primeng/inplace';
// import { InputMaskModule } from 'primeng/inputmask';
// import { InputSwitchModule } from 'primeng/inputswitch';
// import { InputTextareaModule } from 'primeng/inputtextarea';
// import { InputTextModule } from 'primeng/inputtext';
// import { KeyFilterModule } from 'primeng/keyfilter';
// import { LightboxModule } from 'primeng/lightbox';
// import { ListboxModule } from 'primeng/listbox';
// import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
// import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
// import { MessageModule } from 'primeng/message';
// import { MessagesModule } from 'primeng/messages';
// import { MultiSelectModule } from 'primeng/multiselect';
// import { OrderListModule } from 'primeng/orderlist';
// import { OrganizationChartModule } from 'primeng/organizationchart';
// import { OverlayPanelModule } from 'primeng/overlaypanel';
// import { PaginatorModule } from 'primeng/paginator';
// import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
// import { PasswordModule } from 'primeng/password';
// import { PickListModule } from 'primeng/picklist';
// import { ProgressBarModule } from 'primeng/progressbar';
// import { ProgressSpinnerModule } from 'primeng/progressspinner';
// import { RadioButtonModule } from 'primeng/radiobutton';
// import { RatingModule } from 'primeng/rating';
// import { SelectButtonModule } from 'primeng/selectbutton';
// import { ScheduleModule } from 'primeng/schedule';
// import { ScrollPanelModule } from 'primeng/scrollpanel';
// import { SidebarModule } from 'primeng/sidebar';
// import { SpinnerModule } from 'primeng/spinner';
// import { SplitButtonModule } from 'primeng/splitbutton';
// import { SlideMenuModule } from 'primeng/slidemenu';
// import { SliderModule } from 'primeng/slider';
// import { StepsModule } from 'primeng/steps';
// import { TableModule } from 'primeng/table';
// import { TabMenuModule } from 'primeng/tabmenu';
// import { TabViewModule } from 'primeng/tabview';
// import { TerminalModule } from 'primeng/terminal';
// import { TieredMenuModule } from 'primeng/tieredmenu';
// import { ToggleButtonModule } from 'primeng/togglebutton';
// import { ToolbarModule } from 'primeng/toolbar';
// import { ToastModule } from 'primeng/toast';
// import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
// import { TreeModule } from 'primeng/tree';
// import { TreeTableModule } from 'primeng/treetable';
// import { TreeNode } from 'primeng/api';
// import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  imports: [
    ButtonModule,
    CardModule,
    ChartModule,
    MenubarModule,
    MenuModule,
    PanelModule
  ],
  exports: [
    ButtonModule,
    CardModule,
    ChartModule,
    MenubarModule,
    MenuModule,
    PanelModule
  ],
})
export class PrimeNGModule { }
