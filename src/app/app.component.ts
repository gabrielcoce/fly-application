import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'fligthsystem';
  componentSpinner: boolean = false;
  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.animation();
  }
  private animation() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.componentSpinner = true;
    }, 1000);
  }
}
