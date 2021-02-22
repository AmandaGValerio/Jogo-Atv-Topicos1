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
                letra = letra + position;
                letra = linha + "-"+letra;
                $(`#${letra}`).click(() => {
                    $(`#${letra}`).delay(500).addClass(`jogador${jogador}`);
                    jogador === 0 ? $(`#${letra}`).delay(1000).html("X") : $(`#${letra}`).delay(1000).html("O");
                    verifyWinner(letra);
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

const verifyWinner = (value) => {
    const id = value.split('-')
    let img = `
        <img id="img-${value}" src="./assets/${jogador === 0 ? "X" : "O"}.png" class="img-fluid rounded mx-auto d-block img-size" alt="winner">
    `;
    $(`.winner-${id[0]}`).html(img).removeClass("d-none");
    $(`.winner-${id[0]}`).addClass(`bg-div-winner`);
    $(`#img-${value}`).addClass("animate");
}