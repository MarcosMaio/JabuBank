export default function ehMaiorDeIdade(campo) { //
    const dataNascimento = new Date(campo.value);
    if (!validaIdade(dataNascimento)) {
        campo.setCustomValidity('O usuário não é maior de idade'); //O customError só é ativado no momento em que o setCustomValidity não for false. Esta lógica precisava ser implementada manualmente, e para isso adicionamos o campo.setCustomValidity com um valor qualquer diretamente na função.
    }
}

function validaIdade(data) { //Criei uma função que irá validar se o usuario e maior de 18 ou não.
    const dataAtual = new Date(); //Criei uma const com um new Date vazio isso irá pegar a data do momento atual que gente tá.
    const dataMais18 = new Date(data.getUTCFullYear() +18, data.getUTCMonth(), data.getUTCDate())
//A const dataMais18 vai pegar o dia o mês e o ano que o usuario digitou no campo e fará uma verificação com o ano somando mais 18 
//Ex: se eu ponho que nasci em 2002 entao a função irá adicionar 18 anos a mais em 2002 e vai comparar com a data atual , se a dataAtual for maior ou igual a dataMais18 então eu tenho 18 anos, 2002 + 18 = 2020 , ano atual 2023 ou seja sou maior de idade. 
    return dataAtual >= dataMais18;
}