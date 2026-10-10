//#region imports
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { TaonDatatableComponent } from '@taon-dev/ui/src';
import { TaonAnalyticsVisitorApiService } from '../taon-analytics-visitor.api.service';
//#endregion

@Component({
  selector: 'app-taon-analytics-visitor-backoffice',
  templateUrl: './taon-analytics-visitor-backoffice.component.html',
  styleUrls: ['./taon-analytics-visitor-backoffice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterOutlet, TaonDatatableComponent],
  providers: [TaonAnalyticsVisitorApiService],
})
export class TaonAnalyticsVisitorBackofficeComponent {
  readonly api = inject(TaonAnalyticsVisitorApiService);

  readonly allowedColumns = [
    'id', 'visitorId', 'userId', 'firstSeenAt', 'lastSeenAt',
    'language', 'deviceType', 'browser', 'os',
  ];

  readonly columns: MtxGridColumn[] = [
    { header: 'ID', field: 'id', sortable: true },
    { header: 'Visitor ID', field: 'visitorId', sortable: true },
    { header: 'User ID', field: 'userId', sortable: true },
    { header: 'First seen', field: 'firstSeenAt', sortable: true, type: 'date' },
    { header: 'Last seen', field: 'lastSeenAt', sortable: true, type: 'date' },
    { header: 'Language', field: 'language', sortable: true },
    { header: 'Device', field: 'deviceType', sortable: true },
    { header: 'Browser', field: 'browser', sortable: true },
    { header: 'OS', field: 'os', sortable: true },
  ];
}