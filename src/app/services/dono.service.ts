import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Dono } from '../models/dono';
import { TokenService } from './token.service';
import { PoResponseApi, PoSyncService } from '@po-ui/ng-sync';
import { donoSchema } from '../schemas/dono-schema';
import { v4 as uuidv4 } from 'uuid';

interface Response {
  items: Dono[];
  hasNext: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DonoService extends BaseService {

  private readonly schema = donoSchema.name;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private poSyncService: PoSyncService) {
    super();
  }

  async get(id: number): Promise<Dono> {
    console.log('GET DonoService');
    console.log(id);

    let dono = (await this.poSyncService
      .getModel(this.schema)
      .findById(id)
      .exec()) as Dono;

    if (!dono) {
      dono = (await this.poSyncService
        .getModel(this.schema)
        .findOne({ internalId: id })
        .exec()) as Dono;
    }

    return dono;
  }

  async buscarDonos(): Promise<PoResponseApi> {
    return (await this.poSyncService
      .getModel(this.schema)
      .find()
      .exec()) as PoResponseApi;
  }

  async criarDono(data: Dono): Promise<void> {
    console.log('Enviando..');
    const internalId = uuidv4();
    Object.assign(data, { internalId });
    console.log(data);
    let response = await this.poSyncService.getModel(this.schema).save(data);
    console.log('Recebendo...');
    console.log(response);
  }

  async atualizarDono(data: Dono): Promise<void> {
    console.log('Fazendo update de..');
    console.log(data);
    let response = await this.poSyncService.getModel(this.schema).save(data);
    console.log('Recebendo...');
    console.log(response);
  }

  async deletarDono(data: Dono): Promise<void> {
    await this.poSyncService.getModel(this.schema).remove(data);
  }
}
