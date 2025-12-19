import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SIDEBAR_MENU } from '../models/menu.model';

@Component({
  selector: 'app-sidebar',
  imports: [PanelMenuModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  menu = SIDEBAR_MENU;

}
