# Jogo da Velha Turbinado
![Windows Store shield](https://img.shields.io/static/v1?label=HTML&message=v5&color=orange)
![Windows Store shield](https://img.shields.io/static/v1?label=CSS&message=v3&color=blue)
![Windows Store shield](https://img.shields.io/static/v1?label=Javascript&message=ES6&color=yellow)
![Windows Store shield](https://img.shields.io/static/v1?label=Bootstrap&message=v4.5.3&color=purple)
![Windows Store shield](https://img.shields.io/static/v1?label=JQuery&message=v3.6.0&color=blue)

Trabalho em grupo desenvolvido como requisito para obtenção de nota parcial para a disciplina de Tópicos 1. Este trabalho tem como requisito que seja desenvolvido com HTML, CSS e Javascript puros ou utilizando o framework Bootstrap 4.
É necessário que sejam utilizadas as funções JQuery **click** e **delay**.

## Utilização das Funções do JQuery

A função **click** foi utilizada para disparar o comportamento esperado em cada div após o evento do DOM "click". Ela é uma forma mais direta de implementação do código abaixo em javascript vanila.

```javascript
const foo = document.getElementById("foo");
foo.addEventListener("click", () => {
   //comportamento esperado
});
```

A função **delay** foi utilizada para adicionar uma melhor usabilidade no jogo. Através dela pode-se adicionar um contador e disparar uma ação somente quando esse timer terminar. Ela é uma forma mais direta de implementação do código abaixo em javascript vanila.

```javascript
setTimeout(() => { 
   //comportamento esperado após o timer 
}, 1500);
```
Nesse exemplo, o código dentro da função anônima só será executado quendo o tempo de 1,5 segundos (1500 milissegundos) tiver passado.

## Contribuidores

| *Avatar* *Name* *Dev Function* |
|-------------|
| [<img src="https://avatars.githubusercontent.com/u/56452064" width="55" height="55" >](https://github.com/AmandaGValerio) &nbsp; [Amanda Valério](https://github.com/AmandaGValerio) &nbsp; *Funcionalidades JS* |
| [<img src="https://avatars.githubusercontent.com/u/58443789?s=400&v=4" width="55" height="55" >](https://github.com/laura-ratis) &nbsp; [Laura Ratis](https://github.com/laura-ratis) &nbsp; *Design e Layout* |
| [<img src="https://avatars.githubusercontent.com/u/42541492?s=460&u=80c91073f18286672ff8bd9ba8afb01ce5011ec4&v=4" width="55" height="55" >](https://github.com/ERAjeje) &nbsp; [Edson Ajeje](https://github.com/ERAjeje) &nbsp; *Funcionalidades JS* |

## License
[MIT](https://choosealicense.com/licenses/mit/)
