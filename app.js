let cartaSorteada = 0;
let jogadorAtivo = 1;

const Jogadores = {
    PRIMEIROJOGADOR: 'Jogador 1',
    SEGUNDOJOGADOR: 'Jogador 2'
}

let jogador1 = {
    pontos: 0,
}

let jogador2 = {
    pontos: 0,
}

let jogador1D = document.getElementById('jogador1');
let jogador2D = document.getElementById('jogador2');

let pontuacao1D = document.getElementById('pontuacao1');
let pontuacao2D = document.getElementById('pontuacao2');

let cartaSelecionadaD = document.getElementById('cartaSelecionada');


function trocarDeJogador() {
    jogadorAtivo = (jogadorAtivo === 1) ? 2 : 1;
    
    if(jogadorAtivo === 1) {
        jogador2D.classList.remove('ativo');
        jogador1D.classList.add('ativo');
    } else {
        jogador1D.classList.remove('ativo');
        jogador2D.classList.add('ativo');
    }
    
}

function selecionarCarta() {
    cartaSorteada = Math.floor(Math.random() * 13) + 1;
    mostrarCarta();

    adicionarPontos(cartaSorteada);
}

function mostrarCarta() {
    // Verifica se cartaSorteada está definida e é um número válido
    if (typeof cartaSorteada === 'number' && cartaSorteada >= 0) {
        let caminhoCartaSrc = `img/carts/${cartaSorteada}.png`;
       
        // Verifica se cartaSelecionadaD é uma referência válida ao elemento HTML
        if (cartaSelecionadaD) {
            cartaSelecionadaD.setAttribute('src', caminhoCartaSrc);
            cartaSelecionadaD.style.display = 'block';
        } else {
            console.error("Elemento HTML 'cartaSelecionadaD' não encontrado.");
        }
    } else {
        console.error("O valor de 'cartaSorteada' não é um número válido.");
    }
}

function adicionarPontos(carta) {
    if(jogadorAtivo === 1) {
        jogador1.pontos += carta;
        pontuacao1D.innerText = jogador1.pontos;
        validarCampeao(jogador1.pontos, Jogadores.PRIMEIROJOGADOR);

    } else {
        jogador2.pontos += carta;
        pontuacao2D.innerText = jogador2.pontos;
        validarCampeao(jogador2.pontos, Jogadores.SEGUNDOJOGADOR);
    }
}

function validarCampeao(pontuacao, jogador) {
    if(pontuacao === 21) {
        zerarPontuacao();
        swal('Vencedor!', `${jogador} venceu!`, 'success');
    }

    if (pontuacao > 21) {
        zerarPontuacao();
        swal ( "Estorou" ,  `${jogador} perdeu!`,  "error" )
    }
}

async function finalizarJogo() {

    if(jogador1.pontos === 0 || jogador2.pontos === 0 || jogador1.pontos > 21 || jogador2.pontos > 21) {
        zerarPontuacao();
        await swal ( "Desistiram" ,  `Nenhum Jogador Venceu!`,  "error" );
        return;
    }

    if(jogador1.pontos > jogador2.pontos) {
       swal('Vencedor!', `${Jogadores.PRIMEIROJOGADOR} venceu!`, 'success');
        return;
    } else {
        zerarPontuacao();
        await swal('Vencedor!', `${Jogadores.SEGUNDOJOGADOR} venceu!`, 'success');
        return;
    }
}

async function recomecar() {
    await zerarPontuacao();
    return;
}

function zerarPontuacao() {
    
    pontuacao1D.innerText = 0;
    pontuacao2D.innerText = 0;
    jogador1.pontos = 0;
    jogador2.pontos = 0;
}