import { Component } from '@angular/core';
import { SetupSyncService } from './services/setupSync.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pets-jean';

  constructor(
    private setupSyncService: SetupSyncService
  ) {
    //this.initSync();
  }

  async initSync(): Promise<any> {
    let prepareSync: boolean;
    prepareSync = await this.setupSyncService.prepareSync();
    if (prepareSync) {
      prepareSync = await this.setupSyncService.startSync();
    }
  }

}
