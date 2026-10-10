//#region imports
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//#endregion

@Component({
  selector: 'app-taon-analytics-page-view-backoffice',
  templateUrl: './taon-analytics-page-view-backoffice.component.html',
  styleUrls: ['./taon-analytics-page-view-backoffice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterOutlet],
})
export class TaonAnalyticsPageViewBackofficeComponent {}