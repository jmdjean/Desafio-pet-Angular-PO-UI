import { Component } from '@angular/core';
import { SyncService } from './services/sync.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pets-jean';

  constructor(
    private syncService: SyncService
  ) {
    syncService.prepare();
  }

}
