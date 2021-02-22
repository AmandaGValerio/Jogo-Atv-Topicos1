/* use strict */

let rodada = 1;
let partida = 0;
let jogador = 0;
let player1 = 0;
let player2 = 0;
let jogos = [];

window.addEventListener("load", () => {
    getDivsJogo();
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
}

const processMove = () => {
    verifyWinner();
    switchPlayer();
    rodada++;
}

const verifyWinner = () => {
    if (rodada % 4 > 0) {
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
    }
}