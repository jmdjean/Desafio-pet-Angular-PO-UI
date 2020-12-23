import { isLowerCase } from "./lower-case.validator";

describe('A função isLowerCase', () =>{
    it('deve confirmar quando recebe um texto em caixa baixa', () => {
        const valor = "teste";
        const resultado = isLowerCase(valor);
        expect(resultado).toBeTruthy();
    });

    it('deve validar quando o valor não for caixa baixa', () =>{
        expect(isLowerCase('Teste')).toBeFalsy();
    });
});