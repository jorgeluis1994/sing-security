import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    BlockUIModule
  ],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading {

  loading = false;
  message: string | null = null; // ✅ ESTA ES LA LÍNEA QUE FALTABA

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe(value => {
      this.loading = value;
    });

    this.loadingService.message$.subscribe(msg => {
      this.message = msg;
    });
  }
}
