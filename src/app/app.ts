import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { Loading } from "./shared/components/loading/loading";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule,Loading],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('secure-sign-web');
}
