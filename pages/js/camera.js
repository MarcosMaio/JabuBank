const botaoIniciarCamera = document.querySelector("[data-video-botao]"); //Selecionei o botão de iniciar camera.
const campoCamera = document.querySelector("[data-camera]"); //Depois selecionei aquele elemento de bloco aonde tem a camera e o botão de tirar foto.
const video = document.querySelector("[data-video]"); //Também selecionei o video para ele ser manipuulado.

const botaoTirarFoto = document.querySelector("[data-tirar-foto]"); //Selecionei o botão  de tirar foto 
const canvas = document.querySelector("[data-video-canvas]"); //Canvas aonde vai ficar nossa fotografia tirada.
const mensagem = document.querySelector("[data-mensagem]"); //Selecionei a mensagem que irá aparecer quando o usuario tirar a foto.

let imagemURL = ""; //variavel responsavel por ser chamada mais pra frente

const botaoEnviarFoto = document.querySelector("[data-enviar]"); //Botão responsavel por enviar os dados da foto que o usuario tirou para serem armazenadas juntamente com dos dados preenchidos anteriormente.

botaoIniciarCamera.addEventListener("click", async function () { //Coloquei um escutador de eventos que irá fazer algo quando o botão for clicado, esse algo e chamar uma função assincrona que eu criei ali dentro que fará algo.
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false}) //Criei uma const responsavel por pedir pro navegador iniciar a camera o usuario aceitando eu quero pegar os dispositivos de media desse usuario e deixar o viddeo abilitado e o audio desligado, para capturar apenas a foto do usuario que e a intenção.

    botaoIniciarCamera.style.display = "none"; //coloquei um display none no botão da camera por eu quero que quando inicializar a camera ele desaparecesse
    campoCamera.style.display = "block"; //Depois coloquei o display block na camera em si para ela aparecer na tela com o rosto do usuario.

    video.srcObject = iniciarVideo; // adicionaremos um video.srcObject que receberá o iniciarVideo, configurando a tag de vídeo presente no HTML para receber como origem o navigator responsável por solicitar o acesso à câmera.
})

botaoTirarFoto.addEventListener("click", function() { //Colocamos um escutador de eventos para quando clicar no botão tirar foto ele faça algo , então esse algo e uma função.
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height); //Essa função irá criar um canvas no contexto 2d, ele desenhou uma imagem no momento e que o video estava quando o botão foi clicado, depois ele pega o posicionamento que e zero e zero , depois ele pega a altura e largura padrão já definida pelo canvas.

    imagemURL = canvas.toDataURL("image/jpeg"); //Aqui eu chamo a variavel criada imagemURL nela eu quero armazenar a imagem que foi tirada do usuario , faço isso atraves do canvas.toDataURL que irá armazenar essa imagem em um formato jpeg que poderá ser salva no sistema ou baixada.

    campoCamera.style.display = "none"; //Aqui eu retiro a camera , pois como eu já tirei a camera eu só preiso ver a foto e não a camera de video continua.
    mensagem.style.display = "block"; //Aqui eu habilito a foto do usuario para aparecer na tela juntamente com a mensagem informando que a foto foi tirada com sucesso.
})


botaoEnviarFoto.addEventListener("click", () => { //Chamei o botao responsavel por enviar a imagem do usuario para algum lugar e ad
    const receberDadosExistentes = localStorage.getItem("cadastro"); //Crei uma const que fará o retorno da chave cadastro que contem os dados de criação de conta do usuario.
    const converteRetorno = JSON.parse(receberDadosExistentes); //Crei outra variavel que irá converter aqueles dados do json para poder ser visualizado como um objeto

    converteRetorno.imagem = imagemURL; //Dentro dessa chave que contem os dados eu criei uma nova categoria imagem lá dentro que receberá a URL da imagem que foi tirada.

    localStorage.setItem('cadastro', JSON.stringify(converteRetorno)); //Agora pegamos novamente aquela chave cadastro e adicionamos novammente aquelas informações só que agora com a chave atualizada colocando a imagem etransformamos aquele valor em json.

    window.location.href = "/pages/abrir-conta-form-3.html"; //E redirecionei para a pagina que irá informar o usuario que ocorreu tudo certo.
})
