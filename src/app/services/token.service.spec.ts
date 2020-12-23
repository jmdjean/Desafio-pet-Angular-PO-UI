
import { TokenService } from "./token.service";

describe('O serviço TokenService', () => {
    let token;
    let service;

    it('deve ser instanciado', () => {
        expect(service).toBeTruthy();
    });

    it('de guardar um token', () => {
        service.setToken(token);

        expect(service.hasToken()).toBeTruthy();
        expect(service.getToken()).toBe("testetoken");
    });

    it('deve remover um token', () => {
        service.setToken(token);
        service.removeToken();

        expect(service.hasToken()).toBeFalsy();
        expect(service.getToken()).toBeFalsy();
    });

    afterEach(() => {
        localStorage.clear();
    });

    beforeEach(() => {
        token = 'testetoken';
        service = new TokenService();
    });
});