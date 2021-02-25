/* use strict */

let rodada = 1;
let partida = 0;
let jogador = 0;
let player1 = 0;
let player2 = 0;
let jogos = [];
let matriz = [];
let matrizMaior = [];

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
    for(let i=0; i<3; i++){
        linha = i%3 === 0 ? "A" : i%3 === 1 ? "B" : "C";
        aux = linha;
        matrizMaior.push([])
        /**
         * O segundo for vai fazer a concatenação do número da linha
         * preparando assim a variavel para utilização
         */
        for (let j = 1; j <= 3; j++) {
            linha = aux;
            linha = linha + j;
            matrizMaior[i].push([])
            /**
             * O terceiro for vai preparar o jogo da velha dentro de cada um
             * dos nove jogos possiveis no tabuleiro
             */
            for (let k = 1; k <= 9; k++) {
                //inicializa todas as posições do vetor com -1
               matriz.push(-1);
                //usa dois operadores ternarios para fazer a correspondencia da letra maiuscula com a minuscula
                let letra = k <= 3 ? "a" : k <= 6 ? "b" : "c";
                //usa um ternário para fazer o switch entre as posições
                let position = k%3 === 0 ? 3 : k%3;
                //prepara a variável letra como identificador das divs
                letra = letra + position;
                letra = linha + "-"+letra;

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
                     * Usa um ternário para verificar o valor da variável jogador
                     * caso seja 0 vai adicionar a função delay para aguardar 1 segundo e
                     * depois inserir X dentro da div. Caso seja 1 fara o mesmo, mas vai
                     * inserir O
                     */
                    jogador === 0 ? $(`#${letra}`).delay(1000).html("X") : $(`#${letra}`).delay(1000).html("O");

                    /**
                     * arrayLetra receberá o resultado da função split
                     * que vai separar a string letra em duas strings utilizando 
                     * o delimitador '-'
                     */
                    const arrayLetra = letra.split('-');
                    //cria uma expressão regular que irá procurar por números
                    const regNumb = RegExp("[1-3]");
                    /**
                     * As proximas linhas farão a substituição das letras encontradas pelo regex 
                     * por um caracter vazio. Depois é feita a conversão para inteiro.
                     */
                    let row = arrayLetra[0].replace(regNumb, "") === "A"
                                ? 0 : arrayLetra[0].replace(regNumb, "") === "B"
                                ? 1 : 2;
                    let col = arrayLetra[1].replace(regNumb, "") === 'a' 
                                ? 0 : arrayLetra[1].replace(regNumb, "") === 'b' 
                                ? 1 : 2;
                    //insere na matriz maior na linha e coluna correspondente e na posição do vetor referente à div clicada
                    matrizMaior[row][col][k] = jogador;
                    switchPlayer();
                    //verificar(row, col, k); //testando a vitória
                    rodada++;
                })
            }
            matrizMaior[i][j-1].push(matriz);
        }
    }
}

/**
 * Faz a mudança do jogador e 
 * marca qual é o jogador da vez
 */
const switchPlayer = () => {
    jogador = rodada%2;
    if(jogador === 0){
        $("#bX").addClass("marcar-vez");
        $("#bO").removeClass("marcar-vez");
    }else{
        $("#bO").addClass("marcar-vez");
        $("#bX").removeClass("marcar-vez");
    }
}

function verificar(pos1, pos2, k) {

    var mod1 = pos1 % 3;
    var mod2 = pos2 % 3;

    //vasculha na linha
    switch (mod1) {
        case 0:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizJogadas[pos1 + 1][pos2] == matrizJogadas[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizJogadas[pos1 + 2][pos2] == matrizJogadas[pos1][pos2]) {
                    //salva o valor na matriz Maior
                    matrizMaior[pos1 / 3][pos2 / 3] = matrizJogadas[pos1][pos2];
                    //verifica se existe vencedor
                    verificarMaior(Math.floor(pos1/3), Math.floor(pos2/3));
                    return;
                }
            }
            break;
        case 1:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizJogadas[pos1 + mod1][pos2] == matrizJogadas[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizJogadas[pos1 - mod1][pos2] == matrizJogadas[pos1][pos2]) {
                    //salva o valor na matriz Maior
                    matrizMaior[pos1 / 3][pos2 / 3] = matrizJogadas[pos1][pos2];
                    //verifica se existe vencedor
                    verificarMaior(Math.floor(pos1/3), Math.floor(pos2/3));
                    return;
                }
            }
            break;
        case 2:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizJogadas[pos1 - 1][pos2] == matrizJogadas[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizJogadas[pos1 - mod1][pos2] == matrizJogadas[pos1][pos2]) {
                    //salva o valor na matriz Maior
                    matrizMaior[pos1 / 3][pos2 / 3] = matrizJogadas[pos1][pos2];
                    //verifica se existe vencedor
                    verificarMaior(Math.floor(pos1/3), Math.floor(pos2/3));
                    return;
                }
            }
            break;
            
    }

    //vasculha na coluna
    switch (mod2) {
        case 0:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizJogadas[pos1][pos2 + 1] == matrizJogadas[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizJogadas[pos1][pos2 + 2] == matrizJogadas[pos1][pos2]) {
                    //salva o valor na matriz Maior
                    matrizMaior[pos1 / 3][pos2 / 3] = matrizJogadas[pos1][pos2];
                    //verifica se existe vencedor
                    verificarMaior(Math.floor(pos1/3), Math.floor(pos2/3));
                    return;
                }
            }
            break;
        case 1:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizJogadas[pos1][pos2 + mod2] == matrizJogadas[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizJogadas[pos1][pos2 - mod2] == matrizJogadas[pos1][pos2]) {
                    //salva o valor na matriz Maior
                    matrizMaior[pos1 / 3][pos2 / 3] = matrizJogadas[pos1][pos2];
                    //verifica se existe vencedor
                    verificarMaior(Math.floor(pos1/3), Math.floor(pos2/3));
                    return;
                }
            }
            break;
        case 2:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizJogadas[pos1][pos2 - 1] == matrizJogadas[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizJogadas[pos1][pos2 - mod2] == matrizJogadas[pos1][pos2]) {
                    //salva o valor na matriz Maior
                    matrizMaior[pos1 / 3][pos2 / 3] = matrizJogadas[pos1][pos2];
                    //verifica se existe vencedor
                    verificarMaior(Math.floor(pos1/3), Math.floor(pos2/3));
                    return;
                }
            }
            break;
    }    
    //vasculha a diagonal, se a posição do centro já estiver preenchida
    centro1 = Math.floor(pos1/3)*3 + 1;
    centro2 = Math.floor(pos2/3)*3 + 1;
    if(matrizJogadas[centro1][centro2] == matrizJogadas[pos1][pos2]){
        if(matrizJogadas[centro1][centro2] == matrizJogadas[centro1--][centro2--] && matrizJogadas[centro1][centro2] == 
            matrizJogadas[centro1++][centro2++]){
            //salva o valor na matriz Maior
            matrizMaior[pos1 / 3][pos2 / 3] = matrizJogadas[pos1][pos2];
            //verifica se existe vencedor
            verificarMaior(Math.floor(pos1/3), Math.floor(pos2/3));
            return;
        }
        else if(matrizJogadas[centro1][centro2] == matrizJogadas[centro1--][centro2++] && matrizJogadas[centro1][centro2] == 
            matrizJogadas[centro1++][centro2--]){
            //salva o valor na matriz Maior
            matrizMaior[pos1 / 3][pos2 / 3] = matrizJogadas[pos1][pos2];
            //verifica se existe vencedor
            verificarMaior(Math.floor(pos1/3), Math.floor(pos2/3));
            return;
        }
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

function verificarMaior(pos1, pos2){
    var mod1 = pos1 % 3;
    var mod2 = pos2 % 3;

    //vasculha na linha
    switch (mod1) {
        case 0:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizMaior[pos1 + 1][pos2] == matrizMaior[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizMaior[pos1 + 2][pos2] == matrizMaior[pos1][pos2]) {
                    //exibe uma mensagem de vitória e encerra o jogo
                }
            }
            break;
        case 1:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizMaior[pos1 + mod1][pos2] == matrizMaior[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizMaior[pos1 - mod1][pos2] == matrizMaior[pos1][pos2]) {
                    //exibe uma mensagem de vitória e encerra o jogo
                }
            }
            break;
        case 2:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizMaior[pos1 - 1][pos2] == matrizMaior[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizMaior[pos1 - mod1][pos2] == matrizMaior[pos1][pos2]) {
                    //exibe uma mensagem de vitória e encerra o jogo
                }
            }
            break;
    }
    //vasculha na coluna
    switch (mod2) {
        case 0:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizMaior[pos1][pos2 + 1] == matrizMaior[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizMaior[pos1][pos2 + 2] == matrizMaior[pos1][pos2]) {
                    //exibe uma mensagem de vitória e encerra o jogo
                }
            }
            break;
        case 1:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizMaior[pos1][pos2 + mod2] == matrizMaior[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizMaior[pos1][pos2 - mod2] == matrizMaior[pos1][pos2]) {
                    //exibe uma mensagem de vitória e encerra o jogo
                }
            }
            break;
        case 2:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizMaior[pos1][pos2 - 1] == matrizMaior[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizMaior[pos1][pos2 - mod2] == matrizMaior[pos1][pos2]) {
                    //exibe uma mensagem de vitória e encerra o jogo
                }
            }
            break;
    }    
    //vasculha a diagonal, se a posição do centro já estiver preenchida
    centro1 = Math.floor(pos1/3)*3 + 1;
    centro2 = Math.floor(pos2/3)*3 + 1;
    if(matrizMaior[centro1][centro2] == matrizMaior[pos1][pos2]){
        if(matrizMaior[centro1][centro2] == matrizMaior[centro1--][centro2--] && matrizMaior[centro1][centro2] == 
            matrizMaior[centro1++][centro2++]){
            //exibe uma mensagem de vitória e encerra o jogo
        }
        else if(matrizMaior[centro1][centro2] == matrizMaior[centro1--][centro2++] && matrizMaior[centro1][centro2] == 
            matrizMaior[centro1++][centro2--]){
            //exibe uma mensagem de vitória e encerra o jogo
        }
    }
}
