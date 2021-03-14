import { Subscription } from 'rxjs';
import { AlertService } from './../../services/alert.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 5000;

  public text?: string;
  public type = 'success';

  alertSub?: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text;
      this.type = alert.type;

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.delay);
    })
  }

  ngOnDestroy() {
    this.alertSub?.unsubscribe();
  }

}
