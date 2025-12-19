import { Component, inject } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-toolbar',
  imports: [ToolbarModule, ButtonModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {
  private auth = inject(AuthService);

  logout() {
    this.auth.logout();
    location.href = '/auth/login';
  }

}
