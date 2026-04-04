import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';

// Globally register Vietnamese locale data to prevent NG0701 errors from DatePipe/CurrencyPipe
registerLocaleData(localeVi, 'vi');

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
