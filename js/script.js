/* use strict */

let rodada = 1;
let partida = 0;
let jogador = 0;
let player1 = 0;
let player2 = 0;
let jogos = [];
let matrizMaior = [[-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1]];
let matriz = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];

/**
 * faz a chamada da função anonima depois que o evendo
 * 'load' for chamado pelo objeto window, ou seja,
 * assim que a janela terminar de carregar todo o conteúdo,
 * chama a função anonima
 */
window.addEventListener("load", () => {
    //prepara o tabuleiro com a função click do jquery
    getDivsJogo();

    //prepara o botão iniciar com a função click do jquery
    $("#re-iniciar").click(() => {
        //faz o reload da janela
        window.location.reload();
    });
});

/**
 * Função que prepara o tabuleiro.
 * Através da função click do JQuery, adiciona o 
 * eventListen click em todas as divs dentro dos jogos
 * e este evendo dispara a função anonima específica para cada 
 * div clicada
 */
const getDivsJogo = () => {
    let linha = "";
    let aux = "";
    /**
     * O for mais externo vai fazer o switch da linha do tabuleiro maior
     */
    for (let i = 0; i < 3; i++) {
        linha = i % 3 === 0 ? "A" : i % 3 === 1 ? "B" : "C";
        aux = linha;
        /**
         * O segundo for vai fazer a concatenação do número da linha
         * preparando assim a variavel para utilização
         */
        for (let j = 1; j <= 3; j++) {
            linha = aux;
            linha = linha + j;
            /**
             * O terceiro for vai preparar o jogo da velha dentro de cada um
             * dos nove jogos possiveis no tabuleiro
             */
            for (let k = 1; k <= 9; k++) {
                //usa dois operadores ternarios para fazer a correspondencia da letra maiuscula com a minuscula
                let letra = k <= 3 ? "a" : k <= 6 ? "b" : "c";
                //usa um ternário para fazer o switch entre as posições
                let position = k % 3 === 0 ? 3 : k % 3;
                //prepara a variável letra como identificador das divs
                letra = letra + position;
                letra = linha + "-" + letra;

                /**
                 * JQuery click:
                 * vai procurar a div correspondente ao identificador da variável letra e
                 * vai adicionar o evento click que dispara a função anônima
                 */
                $(`#${letra}`).click(() => {
                    /**
                     * Adiciona o jquery delay para aguardar 500 milisegundos e depois
                     * adicionar a classe jogador à div. Essa cl
                     */
                    $(`#${letra}`).delay(500).addClass(`jogador${jogador}`);
                    /**
                     * arrayLetra receberá o resultado da função split
                     * que vai separar a string letra em duas strings utilizando 
                     * o delimitador '-'
                     */
                    const arrayLetra = letra.split('-');
                    //cria uma expressão regular que irá procurar pelas letras maiusculas e minusculas
                    const regNumb = RegExp("[1-3]")
                    const regUpper = RegExp("[A-Z]");
                    const regDown = RegExp("[a-z]");
                    /**
                     * As proximas linhas farão a substituição das letras encontradas pelo regex 
                     * por um caracter vazio. Depois é feita a conversão para inteiro.
                     */
                    let row = arrayLetra[0].replace(regUpper, "");
                    let col = arrayLetra[1].replace(regDown, "");

                    //Variáveis para utilizar na função verificar
                    const L1 = arrayLetra[0].replace(regNumb, "");
                    const n1 = row;
                    const L2 = arrayLetra[1].replace(regNumb, "");
                    const n2 = col;

                    jogador === 0 ? $(`#${letra}`).delay(1000).html("X") : $(`#${letra}`).delay(1000).html("O");
                    //insere na matriz maior na linha e coluna correspondente e na posição do vetor referente à div clicada
                    //se verificar que houve ganhador...
                    verificar(L1, parseInt(n1), L2, parseInt(n2));
                    //alterna entre os jogadores
                    switchPlayer();
                    //depois de processado o click remove o eventListener para click
                    const element = document.getElementById(`${letra}`);
                    element.removeEventListener('click', () => { });
                    $(`#${letra}`).off('click');

                    rodada++;
                })
            }
        }
    }
}

/**
 * Faz a mudança do jogador e 
 * marca qual é o jogador da vez
 */
const switchPlayer = () => {
    jogador = rodada % 2;
    if (jogador === 0) {
        $("#bX").addClass("marcar-vez");
        $("#bO").removeClass("marcar-vez");
    } else {
        $("#bO").addClass("marcar-vez");
        $("#bX").removeClass("marcar-vez");
    }
}

function verificar(L1, n1, L2, n2) {
    let letra = L1 + n1 + '-' + L2 + n2;
    char1 = L1 == "A" ? 0 : L1 == "B" ? 1 : 2;
    char2 = L2 == "a" ? 0 : L2 == "b" ? 1 : 2;
    pos2 = L2 == "a" ? 0 + n2 - 1 : L2 == "b" ? 3 + n2 - 1 : 6 + n2 - 1;
    //pos1 = (L1 == "A" ? 0 : L1 == "B" ? 1 : 2)*3 + (n1-1);
    pos1 = L1 == "A" ? 0 + n1 - 1 : L1 == "B" ? 3 + n1 - 1 : 6 + n1 - 1;
    matrizMaior[pos1][pos2] = jogador;
    //vasculha a coluna
    switch (pos2) {
        case 0:
        case 3:
        case 6:
            if (matrizMaior[pos1][0] === matrizMaior[pos1][3] && matrizMaior[pos1][0] === matrizMaior[pos1][6]) {
                //salva na outra matriz de controle
                matriz[char1][n1 - 1] = jogador;
                //marca o winner da partida
                verifyWinner(letra);
                //verifica na matriz de controle
                verificarSegunda(L1, n1);
                return true;
            }
            break
        case 1:
        case 4:
        case 7:
            if (matrizMaior[pos1][1] === matrizMaior[pos1][4] && matrizMaior[pos1][1] === matrizMaior[pos1][7]) {
                //salva na outra matriz de controle
                matriz[char1][n1 - 1] = jogador;
                //marca o winner da partida
                verifyWinner(letra);
                //verifica na matriz de controle
                verificarSegunda(L1, n1);
                return true;
            }
            break;
        case 2:
        case 5:
        case 8:
            if (matrizMaior[pos1][2] === matrizMaior[pos1][5] && matrizMaior[pos1][2] === matrizMaior[pos1][8]) {
                //salva na outra matriz de controle
                matriz[char1][n1 - 1] = jogador;
                //marca o winner da partida
                verifyWinner(letra);
                //verifica na matriz de controle
                verificarSegunda(L1, n1);
                return true;
            }
            break;
        default:
            break;
    }
    //verificar linha
    switch (pos2) {
        case 0:
        case 1:
        case 2:
            if (matrizMaior[pos1][0] === matrizMaior[pos1][1] && matrizMaior[pos1][0] === matrizMaior[pos1][2]) {
                //salva na outra matriz de controle
                matriz[char1][n1 - 1] = jogador;
                //marca o winner da partida
                verifyWinner(letra);
                //verifica na matriz de controle
                verificarSegunda(L1, n1);
                return true;
            }
            break;
        case 3:
        case 4:
        case 5:
            if (matrizMaior[pos1][3] === matrizMaior[pos1][4] && matrizMaior[pos1][3] === matrizMaior[pos1][5]) {
                //salva na outra matriz de controle
                matriz[char1][n1 - 1] = jogador;
                //marca o winner da partida
                verifyWinner(letra);
                //verifica na matriz de controle
                verificarSegunda(L1, n1);
                return true;
            }
            break;
        case 6:
        case 7:
        case 8:
            if (matrizMaior[pos1][6] === matrizMaior[pos1][7] && matrizMaior[pos1][6] === matrizMaior[pos1][8]) {
                //salva na outra matriz de controle
                matriz[char1][n1 - 1] = jogador;
                //marca o winner da partida
                verifyWinner(letra);
                //verifica na matriz de controle
                verificarSegunda(L1, n1);
                return true;
            }
            break;
    }
    //verifica diagonal
    switch (pos2) {
        case 2:
        case 6:
            if (matrizMaior[pos1][2] === matrizMaior[pos1][4] && matrizMaior[pos1][6] === matrizMaior[pos1][2]) {
                //salva na outra matriz de controle
                matriz[char1][n1 - 1] = jogador;
                //marca o winner da partida
                verifyWinner(letra);
                //verifica na matriz de controle
                verificarSegunda(L1, n1);
                return true;
            }
            break;
        case 0:
        case 8:
            if (matrizMaior[pos1][0] === matrizMaior[pos1][4] && matrizMaior[pos1][0] === matrizMaior[pos1][8]) {
                //salva na outra matriz de controle
                matriz[char1][n1 - 1] = jogador;
                //marca o winner da partida
                verifyWinner(letra);
                //verifica na matriz de controle
                verificarSegunda(L1, n1);
                return true;
            }
            break;
        case 4:
            if (matrizMaior[pos1][4] === matrizMaior[pos1][2] && matrizMaior[pos1][4] === matrizMaior[pos1][6]
                || matrizMaior[pos1][4] === matrizMaior[pos1][0] && matrizMaior[pos1][4] === matrizMaior[pos1][8]) {
                //salva na outra matriz de controle
                matriz[char1][n1 - 1] = jogador;
                //marca o winner da partida
                verifyWinner(letra);
                //verifica na matriz de controle
                verificarSegunda(L1, n1);
                return true;
            }
            break;
    }
}

/**
 * Faz a inclusão do simbolo do vencedor da rodada e uma animação
 */
const verifyWinner = (value) => {
    const id = value.split('-')
    let img = `
        <img id="img-${value}" src="./assets/${jogador === 0 ? "X" : "O"}.png" class="img-fluid rounded mx-auto d-block img-size" alt="winner">
    `;
    $(`.winner-${id[0]}`).html(img).removeClass("d-none");
    $(`.winner-${id[0]}`).addClass(`bg-div-winner`);
    $(`#img-${value}`).addClass("animate");
}

function verificarSegunda(L1, pos2) {
    pos1 = L1 == "A" ? 0 : L1 == "B" ? 1 : 2;
    pos2 = pos2 - 1
    //vasculha a coluna
    switch (pos2) {
        case 0:
            if (matriz[pos1][pos2] == matriz[pos1][pos2 + 1] && matriz[pos1][pos2] == matriz[pos1][pos2 + 2]) {
                //exibe mensagem de vencedor
                setTimeout(function () {
                    alert(jogador === 1 ? "Vitória do jogador " + jogador : "Vitória do jogador " + 2);
                    window.location.reload();
                }, 1200);
                return true;
            }
            break;
        case 1:
            if (matriz[pos1][pos2] == matriz[pos1][pos2 + 1] && matriz[pos1][pos2] == matriz[pos1][pos2 - 1]) {
                //exibe mensagem de vencedor
                setTimeout(function () {
                    alert(jogador === 1 ? "Vitória do jogador " + jogador : "Vitória do jogador " + 2);
                    window.location.reload();
                }, 1200);
                return true;
            }
            break;
        case 2:
            if (matriz[pos1][pos2] == matriz[pos1][pos2 - 1] && matriz[pos1][pos2] == matriz[pos1][pos2 - 2]) {
                //exibe mensagem de vencedor
                setTimeout(function () {
                    alert(jogador === 1 ? "Vitória do jogador " + jogador : "Vitória do jogador " + 2);
                    window.location.reload();
                }, 1200);
                return true;
            }
            break;
    }

    //vasculha a linha
    switch (pos1) {
        case 0:
            if (matriz[pos1][pos2] == matriz[pos1 + 1][pos2] && matriz[pos1][pos2] == matriz[pos1 + 2][pos2]) {
                //exibe mensagem de vencedor
                setTimeout(function () {
                    alert(jogador === 1 ? "Vitória do jogador " + jogador : "Vitória do jogador " + 2);
                    window.location.reload();
                }, 1200);
                return true;
            }
            break;
        case 1:
            if (matriz[pos1][pos2] == matriz[pos1 - 1][pos2] && matriz[pos1][pos2] == matriz[pos1 + 1][pos2]) {
                //exibe mensagem de vencedor
                setTimeout(function () {
                    alert(jogador === 1 ? "Vitória do jogador " + jogador : "Vitória do jogador " + 2);
                    window.location.reload();
                }, 1200);
                return true;
            }
            break;
        case 2:
            if (matriz[pos1][pos2] == matriz[pos1 - 1][pos2] && matriz[pos1][pos2] == matriz[pos1 - 2][pos2]) {
                //exibe mensagem de vencedor
                setTimeout(function () {
                    alert(jogador === 1 ? "Vitória do jogador " + jogador : "Vitória do jogador " + 2);
                    window.location.reload();
                }, 1200);
                return true;
            }
            break;
    }
    //verifica a diagonal
    verificaDiagonal();
}

function verificaDiagonal() {
    //vasculha a diagonal
    if (matriz[0][0] === matriz[1][1] && matriz[0][0] === matriz[2][2] 
        && (matriz[0][0] !== -1 && matriz[1][1] !== -1 && matriz[2][2] !== -1)
        || matriz[1][1] === matriz[0][2] && matriz[1][1] === matriz[2][0]
        && (matriz[1][1] !== -1 && matriz[0][2] !== -1 && matriz[2][0] !== -1)) {
        console.log(0)
        console.log(matriz)
        //exibe mensagem de vencedor
        setTimeout(function () {
            alert(jogador === 1 ? "Vitória do jogador " + jogador : "Vitória do jogador " + 2);
            window.location.reload();
        }, 1200);
        return true;
    }
}
