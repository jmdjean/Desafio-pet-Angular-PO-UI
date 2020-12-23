import { HttpClient } from "@angular/common/http";
import { DonoService } from "./dono.service";
import { TokenService } from "./token.service";

describe('O serviço DonoService', () => {

    let service: DonoService;

    it('deve ser instanciado', () => {
        const tokenService = new TokenService;
        let http: HttpClient;

        const service = new DonoService(http, tokenService);

        expect(service).toBeTruthy();
    });
});