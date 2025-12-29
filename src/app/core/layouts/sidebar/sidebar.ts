import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SIDEBAR_MENU } from '../models/menu.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidebar',
  imports: [PanelMenuModule, ButtonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  menuItems = SIDEBAR_MENU;

  sidebarCollapsed = false;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

}
