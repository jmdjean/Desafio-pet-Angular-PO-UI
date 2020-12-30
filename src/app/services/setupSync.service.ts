import { Injectable } from '@angular/core';
import { PoNetworkType, PoSyncConfig, PoSyncService } from '@po-ui/ng-sync';
import { BehaviorSubject, Observable } from 'rxjs';
import { donoSchema } from '../schemas/dono-schema';
import { petSchema } from '../schemas/pet-schema';

@Injectable({
  providedIn: 'root'
})
export class SetupSyncService {

  private hasUpdate = new BehaviorSubject<boolean>(false);

  private config: PoSyncConfig = {
    type: [
      PoNetworkType.ethernet,
      PoNetworkType.wifi,
      PoNetworkType._2g,
      PoNetworkType._3g,
      PoNetworkType._4g,
    ],
    period: 60,
  };

  private schemas = [donoSchema, petSchema];

  constructor(private poSync: PoSyncService) { }

  public getSync(): Observable<boolean> {
    return this.hasUpdate.asObservable();
  }

  public async synchronize(): Promise<void> {
    await this.poSync.sync();
  }

  async prepareSync(): Promise<boolean> {
    return await this.poSync
      .prepare(this.schemas, this.config)
      .then(() => {
        this.poSync.onSync().subscribe(() => this.completeSync());
        return true;
      })
      .catch(() => false);
  }

  async startSync(): Promise<boolean> {
    return await this.poSync
      .sync()
      .then(() => true)
      .catch(() => false);
  }

  completeSync(): void {
    var date = new Date();
    console.log(`Sincronizou - ${date.toLocaleDateString()} - ${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`);

    this.hasUpdate.next(true);
  }

  /*   this.poSync.prepare(schemas, config).then(() => {
      this.poSync.onSync().subscribe(() => {
        var date = new Date();
        console.log(`Sincronizou - ${date.toLocaleDateString()} - ${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`);
        this.hasUpdate.next(true);
      });
      this.poSync.getResponses().subscribe((poSyncResponse) => {
        console.log('response do po sync:', poSyncResponse);
      });
    }); */

  /* this.synchronize();
} */
}