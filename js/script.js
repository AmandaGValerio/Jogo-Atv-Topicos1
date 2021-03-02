/* use strict */

let rodada = 1;
let partida = 0;
let jogador = 0;
let player1 = 0;
let player2 = 0;
let jogos = [];
let matrizMaior = [];
let matriz2 = [][3];

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
        matrizMaior.push([])
        /**
         * O segundo for vai fazer a concatenação do número da linha
         * preparando assim a variavel para utilização
         */
        for (let j = 1; j <= 3; j++) {
            linha = aux;
            linha = linha + j;
            matrizMaior[i].push([])
            let matriz = []
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
                    jogador === 0 ? $(`#${letra}`).delay(1000).html("X") : $(`#${letra}`).delay(1000).html("O");
                    //insere na matriz maior na linha e coluna correspondente e na posição do vetor referente à div clicada
                    matrizMaior[row][col][0][k-1] = jogador;
                    //se verificar que houve ganhador...
                    var bo = verificar(row, col, k-1);
                    if (bo){
                        verifyWinner(letra);
                    }
                    switchPlayer();
                    //depois de processado o click remove o eventListener para click
                    //document.getElementById(`#${letra}`).removeEventListener('click');
                    $(`#${letra}`).off('click');
                    
                    rodada++;
                })
            }
            matrizMaior[i][j - 1].push(matriz);
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

function verificar(pos1, pos2, k) {

    //vasculha na linha
    const position = ""+k
    console.log(typeof(position))
    switch(position){
        case "0":
        case "3":
        case "6": 
            console.log(matrizMaior[pos1][pos2][0][k])
            if(matrizMaior[pos1][pos2][0][k+1] === matrizMaior[pos1][pos2][0][k] 
                && matrizMaior[pos1][pos2][0][k+2] === matrizMaior[pos1][pos2][0][k]){
                    const j = matrizMaior[pos1][pos2][0][k] === 'x'
                        ? 0
                        : 1;
                    matrizMaior[pos1][pos2].push(j);
                    console.log(matrizMaior[pos1][pos2]);
                    return true;
            }
        break;
        case "1":
        case "4":
        case "7":
            console.log(matrizMaior[pos1][pos2][0][k])
            if(matrizMaior[pos1][pos2][0][k+1] === matrizMaior[pos1][pos2][0][k] 
                && matrizMaior[pos1][pos2][0][k-1] === matrizMaior[pos1][pos2][0][k]){
                    const j = matrizMaior[pos1][pos2][0][k] === 'x'
                        ? 0
                        : 1;
                    matrizMaior[pos1][pos2].push(j);
                    console.log(matrizMaior[pos1][pos2]);
                    return true;
            }
        break;
        case "2":
        case "5":
        case "8":
            console.log(matrizMaior[pos1][pos2][0][k])
            if(matrizMaior[pos1][pos2][0][k-1] === matrizMaior[pos1][pos2][0][k] 
                && matrizMaior[pos1][pos2][0][k-2] === matrizMaior[pos1][pos2][0][k]){
                    const j = matrizMaior[pos1][pos2][0][k] === 'x'
                        ? 0
                        : 1;
                    matrizMaior[pos1][pos2].push(j);
                    console.log(matrizMaior[pos1][pos2]);
                    return true;
            }
        break;
        default:
            console.log(position + "padrao");
            break;

    }

    //vasculha a coluna
    console.log("posição2 " + pos2 + " k: " + k + " pos1: " + pos1);
    switch(pos2){
        case 0: 
            if(matrizMaior[pos1][pos2+1][0][k] === matrizMaior[pos1][pos2][0][k] 
                && matrizMaior[pos1][pos2+2][0][k] === matrizMaior[pos1][pos2][0][k]){
                    const j = matrizMaior[pos1][pos2][0][k] === 'x'
                        ? 0
                        : 1;
                    matrizMaior[pos1][pos2].push(j);
                    return;
            }
        break;
        case 1:
            if(matrizMaior[pos1][pos2+1][0][k] === matrizMaior[pos1][pos2][0][k] 
                && matrizMaior[pos1][pos2-1][0][k] === matrizMaior[pos1][pos2][0][k]){
                    const j = matrizMaior[pos1][pos2][0][k] === 'x'
                        ? 0
                        : 1;
                    matrizMaior[pos1][pos2].push(j);
                    return;
            }
        break;
        case 2:
            if(matrizMaior[pos1][pos2-1][0][k] === matrizMaior[pos1][pos2][0][k] 
                && matrizMaior[pos1][pos2-2][0][k] === matrizMaior[pos1][pos2][0][k]){
                    const j = matrizMaior[pos1][pos2][0][k] === 'x'
                        ? 0
                        : 1;
                    matrizMaior[pos1][pos2].push(j);
                    return;
            }
        break;
    }
    /*
    switch (pos1) {
        case 0:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizMaior[pos1 + 1][pos2][0][k] == matrizMaior[pos1][pos2][0][k]) {
                //se sim, completou a sequencia
                if (matrizMaior[pos1 + 2][pos2][0][k] == matrizMaior[pos1][pos2][0][k]) {
                    //salva o valor na matriz Maior
                    matrizMaior[pos1][pos2].push(matrizMaior[pos1][pos2][0][k]);
                    console.log(matrizMaior[row][col]);
                }
            }
            break;
        case 1:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizMaior[pos1 + 1][pos2][k] == matrizMaior[pos1][pos2][k]) {
                //se sim, completou a sequencia
                if (matrizMaior[pos1 - 1][pos2][k] == matrizMaior[pos1][pos2][k]) {
                    //salva o valor na matriz Maior
                    matriz2[k % 3][Math.floor(k / 3)] = matrizMaior[pos1][pos2][k];
                    //confirma vencedor
                    return true;
                }
            }
            break;
        case 2:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizMaior[pos1 - 1][pos2][k] == matrizMaior[pos1][pos2][k]) {
                //se sim, completou a sequencia
                if (matrizMaior[pos1 - 2][pos2][k] == matrizMaior[pos1][pos2][k]) {
                    //salva o valor na matriz Maior
                    matriz2[k % 3][Math.floor(k / 3)] = matrizMaior[pos1][pos2][k];
                    //confirma vencedor
                    return true;
                }
            }
            break;

    }

    //vasculha na coluna
    switch (pos2) {
        case 0:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizMaior[pos1][pos2 + 1][k] == matrizMaior[pos1][pos2][k]) {
                //se sim, completou a sequencia
                if (matrizMaior[pos1][pos2 + 2][k] == matrizMaior[pos1][pos2][k]) {
                    //salva o valor na matriz Maior
                }
            }
            break;
        case 1:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizMaior[pos1][pos2 + 1][k] == matrizMaior[pos1][pos2][k]) {
                //se sim, completou a sequencia
                if (matrizMaior[pos1][pos2 - 1][k] == matrizMaior[pos1][pos2][k]) {
                    
                }
            }
            break;
        case 2:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizMaior[pos1][pos2 - 1][k] == matrizMaior[pos1][pos2][k]) {
                //se sim, completou a sequencia
                if (matrizMaior[pos1][pos2 - 2][k] == matrizMaior[pos1][pos2][k]) {
                   
                }
            }
            break;
    }*/
    //vasculha a diagonal, se a posição do centro já estiver preenchida
    /*
    centro1 = Math.floor(pos1 / 3) * 3 + 1;
    centro2 = Math.floor(pos2 / 3) * 3 + 1;
    if (matrizMaior[centro1][centro2][k] == matrizMaior[pos1][pos2][k]) {
        if (matrizMaior[centro1][centro2][k] == matrizMaior[centro1--][centro2--][k] && matrizMaior[centro1][centro2][k] ==
            matrizMaior[centro1++][centro2++][k]) {
            //salva o valor na matriz Maior
            matriz2[k % 3][Math.floor(k / 3)] = matrizMaior[pos1][pos2][k];
            //confirma vencedor
            return true;
        }
        else if (matrizMaior[centro1][centro2][k] == matrizMaior[centro1--][centro2++][k] && matrizMaior[centro1][centro2][k]
            == matrizMaior[centro1++][centro2--][k]) {
            //salva o valor na matriz Maior
            matriz2[k % 3][Math.floor(k / 3)] = matrizMaior[pos1][pos2][k];
            //confirma vencedor
            return true;
        }
    }*/
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

function verificarSegunda(pos1, pos2) {
    var mod1 = pos1 % 3;
    var mod2 = pos2 % 3;

    //vasculha na linha
    switch (pos1) {
        case 0:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matriz2[pos1 + 1][pos2] == matriz2[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matriz2[pos1 + 2][pos2] == matriz2[pos1][pos2]) {
                    //exibe uma mensagem de vitória e encerra o jogo
                    alert(ganhou);
                }
            }
            break;
        case 1:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matriz2[pos1 + mod1][pos2] == matriz2[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matriz2[pos1 - mod1][pos2] == matriz2[pos1][pos2]) {
                    //exibe uma mensagem de vitória e encerra o jogo
                    alert(ganhou);
                }
            }
            break;
        case 2:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matriz2[pos1 - 1][pos2] == matriz2[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matriz2[pos1 - mod1][pos2] == matriz2[pos1][pos2]) {
                    //exibe uma mensagem de vitória e encerra o jogo
                    alert(ganhou);
                }
            }
            break;
    }
    //vasculha na coluna
    switch (pos2) {
        case 0:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matriz2[pos1][pos2 + 1] == matriz2[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matriz2[pos1][pos2 + 2] == matriz2[pos1][pos2]) {
                    //exibe uma mensagem de vitória e encerra o jogo
                    alert(ganhou);
                }
            }
            break;
        case 1:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matriz2[pos1][pos2 + mod2] == matriz2[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matriz2[pos1][pos2 - mod2] == matriz2[pos1][pos2]) {
                    //exibe uma mensagem de vitória e encerra o jogo
                    alert(ganhou);
                }
            }
            break;
        case 2:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matriz2[pos1][pos2 - 1] == matriz2[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matriz2[pos1][pos2 - mod2] == matriz2[pos1][pos2]) {
                    //exibe uma mensagem de vitória e encerra o jogo
                    alert(ganhou);
                }
            }
            break;
    }
    //vasculha a diagonal, se a posição do centro já estiver preenchida
    centro1 = Math.floor(pos1 / 3) * 3 + 1;
    centro2 = Math.floor(pos2 / 3) * 3 + 1;
    if (matriz2[centro1][centro2] == matriz2[pos1][pos2]) {
        if (matriz2[centro1][centro2] == matriz2[centro1--][centro2--] && matriz2[centro1][centro2] ==
            matriz2[centro1++][centro2++]) {
            //exibe uma mensagem de vitória e encerra o jogo
            alert(ganhou);
        }
        else if (matriz2[centro1][centro2] == matriz2[centro1--][centro2++] && matriz2[centro1][centro2] ==
            matriz2[centro1++][centro2--]) {
            //exibe uma mensagem de vitória e encerra o jogo
            alert(ganhou);
        }
    }
}
