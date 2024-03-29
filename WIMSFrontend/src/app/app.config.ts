import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {ProductPipe} from "./utils/product.pipe";
import {SortableHeaderDirective} from "./utils/sortable-header.directive";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
      importProvidersFrom(BrowserAnimationsModule),
      importProvidersFrom(MatSnackBarModule),
      importProvidersFrom(MatDialogModule),
      importProvidersFrom(MatButtonModule),
      importProvidersFrom(CommonModule),
      importProvidersFrom(ProductPipe),
      importProvidersFrom(SortableHeaderDirective)
  ],
};
