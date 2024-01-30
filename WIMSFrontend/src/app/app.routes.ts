import { Routes } from '@angular/router';
import {ProductSelectionComponent} from "./components/product-selection/product-selection.component";
import {TestComponent} from "./components/test/test.component";
import {HomeComponent} from "./components/home/home.component";
import {StorageAssignmentComponent} from "./components/storage-assignment/storage-assignment.component";

export const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: "/home" },
  { path: 'home', component: HomeComponent },
  { path: 'selectProduct', component: ProductSelectionComponent },
  { path: 'assignStorage', component: StorageAssignmentComponent }
];
