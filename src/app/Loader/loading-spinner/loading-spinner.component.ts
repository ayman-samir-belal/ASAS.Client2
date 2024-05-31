import { Component } from '@angular/core';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  isLoading = false;
  constructor(private spinnerService: SpinnerService) {

  }

  ngOnInit(): void {
    this.spinnerService.isLoaoding.subscribe(res => {
      this.isLoading = res;
    });
  }
}
