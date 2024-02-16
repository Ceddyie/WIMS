import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SettingsComponent} from "../settings/settings.component";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private matDialog: MatDialog) {
  }

  settingsDialog() {
    this.openMatDialog();
  }

  private openMatDialog() {
    const dialogRef = this.matDialog.open(SettingsComponent);
  }

  protected readonly statusbar = statusbar;
}
