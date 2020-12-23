import { Injectable } from '@angular/core';
import { PoNetworkType, PoSyncConfig, PoSyncService } from '@po-ui/ng-sync';
import { BehaviorSubject, Observable } from 'rxjs';
import { donoSchema } from '../schemas/dono-schema';
import { petSchema } from '../schemas/pet-schema';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  private hasUpdate = new BehaviorSubject<boolean>(false);

  constructor(private poSync: PoSyncService) {}

  public getSync(): Observable<boolean> {
    return this.hasUpdate.asObservable();
  }

  public async synchronize(): Promise<void> {
    await this.poSync.sync();
  }

  public prepare(): void {
    const config: PoSyncConfig = {
      type: [
        PoNetworkType.ethernet,
        PoNetworkType.wifi,
        PoNetworkType._2g,
        PoNetworkType._3g,
        PoNetworkType._4g,
      ],
      period: 5,
    };
    const schemas = [donoSchema, petSchema];

    this.poSync.prepare(schemas, config).then(() => {
      this.poSync.onSync().subscribe(() => {
        console.log(`Sincronizou - ${new Date()}`);
        this.hasUpdate.next(true);
      });
      this.poSync.getResponses().subscribe((poSyncResponse) => {
        console.log('Fila...');
        console.log(poSyncResponse);
      });
    });

    this.synchronize();
  }
}