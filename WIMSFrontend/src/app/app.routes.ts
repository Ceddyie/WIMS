import { Routes } from '@angular/router';
import {ProductSelectionComponent} from "./components/product-selection/product-selection.component";
import {TestComponent} from "./components/test/test.component";

export const routes: Routes = [
  { path: 'selectProduct', component: ProductSelectionComponent },
  { path: 'test', component: TestComponent }
];
