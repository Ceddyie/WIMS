import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductSelectionComponent} from "./components/product-selection/product-selection.component";
import {NavbarComponent} from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, ProductSelectionComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WIMSFrontend';
}
