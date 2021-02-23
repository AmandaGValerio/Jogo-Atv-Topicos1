/* use strict */

let rodada = 1;
let partida = 0;
let jogador = 0;
let player1 = 0;
let player2 = 0;
let jogos = [];

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
                letra = letra + position;
                letra = linha + "-"+letra;
                console.log(letra)
                $(`#${letra}`).click(() => {
                    $(`#${letra}`).addClass(`jogador${jogador}`);
                    jogador === 0 ? $(`#${letra}`).html("X") : $(`#${letra}`).html("O");
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

const processMove = () => {
    verifyWinner();
    switchPlayer();
    rodada++;
}

function verificar() {
    //pega a posição onde acabou 
    var pos1, pos2;
    var mod1 = pos1 % 3;
    var mod2 = pos2 % 3;

    //vasculha na linha
    switch (mod1) {
        case 0:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizJogadas[pos1 + mod1][pos2] == matrizJogadas[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizJogadas[pos1 + mod1 + 1][pos2] == matrizJogadas[pos1][pos2]) {
                    //marca o icone em tamanho grande
                    
                    //salva o valor na matriz binária
                    matrizMaior[pos1 / 3][pos2 / 3] = matrizJogadas[pos1][pos2];
                    return;
                }
            }
            break;
        case 1:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizJogadas[pos1 + mod1][pos2] == matrizJogadas[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizJogadas[pos1 - mod1][pos2] == matrizJogadas[pos1][pos2]) {
                    //marca o icone em tamanho grande

                    //salva o valor na matriz binária
                    matrizMaior[pos1 / 3][pos2 / 3] = matrizJogadas[pos1][pos2];
                    return;
                }
            }
            break;
        case 2:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizJogadas[pos1 - mod1][pos2] == matrizJogadas[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizJogadas[pos1 - mod1 - 1][pos2] == matrizJogadas[pos1][pos2]) {
                    //marca o icone em tamanho grande
                    
                    //salva o valor na matriz binária
                    matrizMaior[pos1 / 3][pos2 / 3] = matrizJogadas[pos1][pos2];
                    return;
                }
            }
            break;
            
    }

    //vasculha na coluna
    switch (mod2) {
        case 0:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizJogadas[pos1][pos2 + mod2] == matrizJogadas[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizJogadas[pos1][pos2 + mod2 + 1] == matrizJogadas[pos1][pos2]) {
                    //marca o icone em tamanho grande

                    //salva o valor na matriz binária
                    matrizMaior[pos1 / 3][pos2 / 3] = matrizJogadas[pos1][pos2];
                    return;
                }
            }
            break;
        case 1:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizJogadas[pos1][pos2 + mod2] == matrizJogadas[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizJogadas[pos1][pos2 - mod2] == matrizJogadas[pos1][pos2]) {
                    //marca o icone em tamanho grande

                    //salva o valor na matriz binária
                    matrizMaior[pos1 / 3][pos2 / 3] = matrizJogadas[pos1][pos2];
                    return;
                }
            }
            break;
        case 2:
            //se o valor for igual na do lado, verifica a próxima lateral
            if (matrizJogadas[pos1][pos2 - mod2] == matrizJogadas[pos1][pos2]) {
                //se sim, completou a sequencia
                if (matrizJogadas[pos1][pos2 - mod2 - 1] == matrizJogadas[pos1][pos2]) {
                    //marca o icone em tamanho grande

                    //salva o valor na matriz binária
                    matrizMaior[pos1/3][pos2/3] = matrizJogadas[pos1][pos2];
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
                //marca o icone em tamanho grande
                    
                    //salva o valor na matriz binária
                    matrizMaior[pos1/3][pos2/3] = matrizJogadas[pos1][pos2];
                    return;
        }
        else if(matrizJogadas[centro1][centro2] == matrizJogadas[centro1--][centro2++] && matrizJogadas[centro1][centro2] == 
            matrizJogadas[centro1++][centro2--]){
                //marca o icone em tamanho grande
                
                //salva o valor na matriz binária
                matrizMaior[pos1/3][pos2/3] = matrizJogadas[pos1][pos2];
                return;
        }
    }


        /*     if (rodada % 4 > 0) {
                if (matrizJogadas[0][0] === matrizJogadas[1][1] === matrizJogadas[2][2]
                    || matrizJogadas[0][0] === matrizJogadas[0][1] === matrizJogadas[0][2]
                    || matrizJogadas[0][0] === matrizJogadas[1][0] === matrizJogadas[2][0]) {
                    if(matrizJogadas[0][0] === 1)
                        player1++;
                    else
                        player2++;
                    partida++;
                }
                if (matrizJogadas[0][1] === matrizJogadas[1][1] === matrizJogadas[2][1]
                    || matrizJogadas[1][0] === matrizJogadas[1][1] === matrizJogadas[1][2]) {
                        if(matrizJogadas[1][1] === 1)
                        player1++;
                    else
                        player2++;
                    partida++;
                }
                if (matrizJogadas[0][2] === matrizJogadas[1][2] === matrizJogadas[2][2]
                    || matrizJogadas[2][0] === matrizJogadas[2][1] === matrizJogadas[2][2]) {
                        if(matrizJogadas[2][2] === 1)
                        player1++;
                    else
                        player2++;
                    partida++;
                }
            }
            if(partida > 2){
                return
            } */ 
}

