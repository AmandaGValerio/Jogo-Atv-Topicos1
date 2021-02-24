/* use strict */

let rodada = 1;
let partida = 0;
let jogador = 0;
let player1 = 0;
let player2 = 0;
let jogos = [];
let matriz = [];

window.addEventListener("load", () => {
    getDivsJogo();
    $("#re-iniciar").click(() => {
        window.location.reload();
    });
});

const getDivsJogo = () => {
    let linha = "";
    let aux = "";
    for(let i=0; i<3; i++){
        linha = i%3 === 0 ? "A" : i%3 === 1 ? "B" : "C";
        aux = linha;
        for (let j = 1; j <= 3; j++) {
            linha = aux;
            linha = linha + j;
            for (let k = 1; k <= 9; k++) {
                let letra = k <= 3 ? "a" : k <= 6 ? "b" : "c";
                let position = k%3 === 0 ? 3 : k%3;
                parametro1 = k; //tentativa de pegar a linha
                letra = letra + position;
                letra = linha + "-"+letra;
                $(`#${letra}`).click(() => {
                    $(`#${letra}`).delay(500).addClass(`jogador${jogador}`);
                    jogador === 0 ? $(`#${letra}`).delay(1000).html("X") : $(`#${letra}`).delay(1000).html("O");
                    verifyWinner(letra); //marca o icone
                    verificar(parametro1, position); //testando a vitória
                    switchPlayer();
                    rodada++;
                })
            }
        }
    }
}

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

function verificar(pos1, pos2) {

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
