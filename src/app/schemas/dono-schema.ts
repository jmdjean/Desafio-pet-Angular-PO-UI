import { PoSyncSchema } from "@po-ui/ng-sync";
import { environment } from "src/environments/environment";

export const donoSchema: PoSyncSchema = {
    getUrlApi: `${environment.api}/owner`,
    diffUrlApi: `${environment.api}/owner/diff`,
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