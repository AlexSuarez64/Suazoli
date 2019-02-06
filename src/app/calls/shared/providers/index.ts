import { CallDetailGuard, CallsGuard } from './calls.guard';
import { CallsService } from './calls.service';

export const providers: any[] = [ CallDetailGuard, CallsGuard, CallsService];

export * from './calls.guard';
export * from './calls.service';
