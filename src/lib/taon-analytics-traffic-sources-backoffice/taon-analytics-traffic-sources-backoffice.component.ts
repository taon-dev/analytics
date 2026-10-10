//#region imports
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//#endregion

@Component({
  selector: 'app-taon-analytics-traffic-sources-backoffice',
  templateUrl: './taon-analytics-traffic-sources-backoffice.component.html',
  styleUrls: ['./taon-analytics-traffic-sources-backoffice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterOutlet],
})
export class TaonAnalyticsTrafficSourcesBackofficeComponent {}