import ehUmCpf from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
const camposDoFormulário = document.querySelectorAll("[required]"); //Chamei todos os campos do formulário que possuem o campo obrigatorio ou seja o atributo required.
const  formulario = document.querySelector("[data-formulario]"); //Chamei o campo de formulario lá do html.

formulario.addEventListener("submit", (e) => { //Adicionei um escutador de eventos no formulario que será responsavel por quando ele receber um sbmit ou seja um envio de dados para algum lugar ele faça algo.
    e.preventDefault(); //Eu quero que o navegador não realize os comportamentos padrão de quando eu clicar em um botão para enviar os dados ele faça um reloud da tela  que e o padrão de um submit e eu não quero isso.

    const listaRespostas = { //Criei uma const que será responsavel por pegar o alvo e depois pega o elemento que tem como alvo o nome dele e pega o valor digitado no campo e armazena nessa lista. isso para cada elemento do formulario.
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas)); //Aqui eu selecionei o localStorage que e um local aonde se pode armazenar dados do navegador, e adicionei um item a ele, aonde adicionei a chave cadastro que irá armazenar meus itens , e esses itens serão os dados armazenados em listaResposta que serão armazenados em formato json.
    window.location.href = '/pages/abrir-conta-form-2.html'; //Depois adicionei um redirecionamento de pagina para o usuario ir pra a ultima parte do formulário.
})


camposDoFormulário.forEach((campo) => { //E para cada campo obrigatorio eu quero que faça algo.
    campo.addEventListener("blur", () => verificaCampo(campo)); //eu quero que adicione o escutador de eventos em cada campo, e esse escutador será ativado quando o campo perder o foco o "blur" e chama a função verificaCampo.
    campo.addEventListener("invalid", evento => evento.preventDefault()); //Aqui eu adicionei um escutador de eventos passando um parametro invalid , que e responsavel por erros no campos quando aquele campo está invalido, e eu quero remover o erro de pop up padrão do navegador q aparece quando possue um erro no campo, para assim eu por um erro personalizado.
})

const tiposDeErro = [ //Aqui const os tipos de erro que ocorrem nos campos de validação
    'valueMissing',
    'typeMismatch',
    'patternnMismmatch',
    'tooShort',
    'customError'
]

const mensagens = { //Aqui para cada campo eu quero que imprima uma mensagem personalizada se x erro ocorrer.
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo) { //Criei a função verificaCampo responsavel por validar os campos obrigatórios do formulário.
    let mensagem = "";
    campo.setCustomValidity(''); //Caso o campo seja incorreto quero que aplique a mensagem de erro , se o usuario corrigir o erro eu quero que limpe a mensagem.
    
    if (campo.name == "cpf" && campo.value.length >= 11){ //crei uma condição que se o nome daquele campo for cpf e o valor do campo cpf tiver >= 11 faça algo.
        ehUmCpf(campo) //chama a função ehUmCpf.
    }
    
    if (campo.name == "aniversario" && campo.value != "" ){ //Criei uma condição de que se o campo.name for aniversario tal como está no html e o campo.value for vazio eu faço algo.
        ehMaiorDeIdade(campo); //Chamo a função para validar se a data digitada e valida
    }
    
    tiposDeErro.forEach(erro => { //chamei a lista que eu criei com os tipos de erro e coloquei um for each , para cada tipo de erro faça algo passando erro com parametro.
        if (campo.validity[erro]) { //ele vai olhar o campo.validity se aquele erro tiver como true e que aquele erro está acontecendo. se ele estiver acontecendo eu quero pegar a mensagem customizada.
            mensagem = mensagens[campo.name][erro]; //Crio uma variavel mensagem que dentro eu vou chamar o mensagens que e aonde possue as mensagens de erro , e essa mensagem vai ser chamada apenas para o nome daquele campo e sobre aquele erro especifico que ocorreu.
            console.log(mensagem);
        }    
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro'); //Criei uma variavel que irá receber um span que contem a class mensagem-erro esse e um span que já consta no htmml. porém eu fiz com que ele selecionasse só oque ta abaixo do input desejado quando eu fiz o campo.parentNode.
    const validadorDeInput = campo.checkValidity(); //Depois criei outra variavel que irá receber o campo.checkVallidity , que a função dele e checkar se o campo está valido.

    if (!validadorDeInput) { //com base nisso crio uma condição , se o campo não estiver valido ele irá imprimir um texto dentro de mensagem erro que e o span do html com a mensagem de erro respectiva.
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = ""; // se tiver tudo certo não imprimi nada.
    } 
}

