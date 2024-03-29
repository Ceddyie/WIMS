import {Component, DestroyRef, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductSelectionComponent} from "./components/product-selection/product-selection.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {DateTime, Duration} from "luxon";
import {timer} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, ProductSelectionComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Warehouse Management';

  time = '';

  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.setupTimeRefresh();
  }

  private setupTimeRefresh() {
    this.setCurrentTime();
    const aMinute = Duration.fromDurationLike({ minutes: 1 });
    const nextMinute = DateTime.now().plus(aMinute).startOf('minute');
    const toNextMinute = nextMinute.diffNow();
    timer(toNextMinute.milliseconds, aMinute.milliseconds)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.setCurrentTime();
        });
  }

  private setCurrentTime() {
    this.time = DateTime.now().toFormat('EEEE, dd MMMM yyyy HH:mm');
  }
}
