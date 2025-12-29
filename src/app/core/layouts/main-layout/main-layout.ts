import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { Sidebar } from "../sidebar/sidebar";
import { Toolbar } from "../toolbar/toolbar";

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, MenubarModule, ButtonModule, Sidebar, Toolbar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {



}
