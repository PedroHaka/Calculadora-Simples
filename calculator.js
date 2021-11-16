'use strict';

const display = document.getElementById('display');//tela
//id *= 'string' --> seleciona todos os ids que contenham a string 'string'
const numeros = document.querySelectorAll('[id*=tecla]');//numeros
const operadores = document.querySelectorAll('[id*=operador]');//numeros

//variavel boolean para distinguir os numeros das operações
let novoNumero = true;
//variavel para armazenar o primeiro numero
let numeroAnterior;
//variavel que guarda o valor do operador
let operador;

//função que verifica se existe operação pendente
const operacaoPendente = () => operador != undefined;
//função que realiza as operações
const calcular = () => {
    if(operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
        /* a função eval(string, string,string) equivale a usar o conjunto de 
        condicionais abaixo, deixando o código mais limpo, mas para efeitos
        didáticos manterei como comentário o conjunto de condicionais, visto 
        que o objetivo deste código é consolidar o conhecimento de HTML, CSS, 
        e principalmente de funcionalidades e aspectos de JavaScript.
        
        eval() = if (operador == '+') {
                    atualizarDisplay(numeroAnterior + numeroAtual);
                } else if (operador == '-') {
                    atualizarDisplay(numeroAnterior - numeroAtual);
                } else if (operador == '*') {
                    atualizarDisplay(numeroAnterior * numeroAtual);
                } else if (operador == '/') {
                    atualizarDisplay(numeroAnterior / numeroAtual);
                } 
        */
    }
}

//função que atualiza o display de acordo com os botões clicados
const atualizarDisplay = (texto) => {
    if (novoNumero){
        display.textContent = texto.toLocaleString('BR');//retorna com decimal BR ','
        novoNumero = false;
    }else{
        display.textContent += texto;
    }
}

//função que é disparada ao clique de um número
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
//adicionar evento de clique em todos os numeros
numeros.forEach (numero => numero.addEventListener('click',inserirNumero));

//função disparada ao clique de um operador
const selecionarOperador = (event) => {
    if(!novoNumero){
        calcular();
        novoNumero = true;
        operador = event.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    }else{
        operador = undefined;
    }
}
//adicionar evento de clique em todos os operadores
operadores.forEach (operador => operador.addEventListener('click',selecionarOperador));

//função disparada ao clique do botão de Igual '='
const ativarIgual = (evento) => {
    calcular();
    operador = undefined;
}
//evento de clique no botão de Igual '='
document.getElementById('equals').addEventListener('click', ativarIgual);

//função disparada ao clique do botão limpar tela 'CE'
const limparDisplay = (evento) => display.textContent = '';
//evento de clique no botão limpar tela 'CE'
document.getElementById('clearscreen').addEventListener('click', limparDisplay);

//função disparada ao clique do botão limpar cálculo 'C'
const limparCalculo = (evento) => {
    limparDisplay();
    operador = undefined;
}
//evento de clique no botão limpar cálculo 'C'
document.getElementById('clearcalculus').addEventListener('click', limparCalculo);

//função disparada ao clique do botão backspace '<<'
const limpaUltimoAlgarismo = (evento) => display.textContent = display.textContent.slice(0, -1);
//evento de clique no botão backspace '<<'
document.getElementById('backspace').addEventListener('click', limpaUltimoAlgarismo);

//função disparada ao clique do botão 'Trocar Sinal':'+/-'
const trocaSinal = (evento) => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
}
//evento de clique no botão 'Trocar Sinal':'+/-'
document.getElementById('signal').addEventListener('click', trocaSinal)


//funções auxiliares da função 'Decimal'
const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;
//função disparada ao clique do botão 'Decimal':','
const insereDecimal = (evento) => {
    if(!existeDecimal()) {
        if(existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
}
//evento de clique no botão 'Decimal':','
document.getElementById('decimal').addEventListener('click', insereDecimal)

//função que dispara ao clique do botão porcentagem '%'
//evento de clique no botão procentagem '%'

//objeto que mapea o teclado e dispara os eventos de clique correspondentes
const mapaTeclado = {
    '0': 'tecla_0',
    '1': 'tecla_1',
    '2': 'tecla_2',
    '3': 'tecla_3',
    '4': 'tecla_4',
    '5': 'tecla_5',
    '6': 'tecla_6',
    '7': 'tecla_7',
    '8': 'tecla_8',
    '9': 'tecla_9',
    '/': 'operador_divisao',
    '*': 'operador_multiplicacao',
    '-': 'operador_subtracao',
    '+': 'operador_adicao',
    '=': 'equals',
    'Enter': 'equals',
    'Backspace': 'backspace',
    'c': 'clearscreen',
    'Escape': 'clearcalculus',
    'Shift': 'signal',
    ',': 'decimal',
    '.': 'decimal'
}

//Função que mapea o teclado
const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if(teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}

//evento de pressionar tecla
document.addEventListener('keydown', mapearTeclado);


