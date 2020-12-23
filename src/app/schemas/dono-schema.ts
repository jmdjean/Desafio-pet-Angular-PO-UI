import { PoSyncSchema } from "@po-ui/ng-sync";
import { environment } from "src/environments/environment";

export const donoSchema: PoSyncSchema = {
    getUrlApi: `${environment.api}/dono`,
    diffUrlApi: `${environment.api}/dono/diff`,
    deletedField: 'deleted',
    fields: [ 
      'id', 
      'name', 
      'email', 
      'phone' 
    ],
    idField: 'id',
    name: 'dono',
    pageSize: 1
  };