//#region imports
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//#endregion

@Component({
  selector: 'app-taon-analytics-events-backoffice',
  templateUrl: './taon-analytics-events-backoffice.component.html',
  styleUrls: ['./taon-analytics-events-backoffice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterOutlet],
})
export class TaonAnalyticsEventsBackofficeComponent {}