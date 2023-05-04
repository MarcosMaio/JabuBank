export default function ehUmCpf(campo) { //A função ehUmCPF foi configurada para ser exportada como padrão, ou seja, quando chamarmos o arquivo valida-cpf esta função será retornada.
    const cpf = campo.value.replace(/\.|-/g, ""); //Crie uma const que vai receber o valor do campo + o metodo replace,o primeiro indica o conteúdo que queremos substituir (no caso, os caracteres especiais . e -), enquanto o segundo indica o conteúdo que será utilizado para substituí-lo (no caso, um campo vazio).
    if (validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) { //Chamei as funções responsaveis por fazer validações de cpf.
        campo.setCustomValidity('Esse cpf não é válido'); // customError só é ativado no momento em que o setCustomValidity não for false. Esta lógica precisava ser implementada manualmente, e para isso adicionamos o campo.setCustomValidity com um valor qualquer diretamente na função.//O customError só é ativado no momento em que o setCustomValidity não for false. Esta lógica precisava ser implementada manualmente, e para isso adicionamos o campo.setCustomValidity com um valor qualquer diretamente na função.
    }
}

function validaNumerosRepetidos(cpf) { //Criei uma função que irá validar se o cpf digitado e um cpf contendo numero repetidos , que e um cpf invalido no caso.
    const numerosRepetidos = [ //passo pra ela um array contendo numeros repetidos de 0 a 9.
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
    ] 
    
    return numerosRepetidos.includes(cpf) //Dessa forma conseguimos verificar se o número que inserimos no campo de CPF está nessa lista de números repetidos. Para isso criaremos um return com o método numerosRepetidos.includes(cpf).
}

//calculo de validação de primeiro digito de cpf.

function validaPrimeiroDigito(cpf) {
    let soma = 0;
    let multiplicador = 10;

        for(let tamanho = 0; tamanho < 9; tamanho++) {
            soma += cpf [tamanho] * multiplicador;
            multiplicador--;
        }

        soma = (soma * 10) % 11;

        if (soma == 10 || soma == 11) {
            soma = 0;
        }

        return soma != cpf [9];
    }

    
function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;

        for(let tamanho = 0; tamanho < 10; tamanho++) {
            soma += cpf [tamanho] * multiplicador;
            multiplicador--;
        }

        soma = (soma * 10) % 11;

        if (soma == 10 || soma == 11) {
            soma = 0;
        }

        return soma != cpf [10];
    }