// Variáveis globais
let diasUteis = 27; // Valor padrão
let diasDescanso = 4; // Valor padrão

// Função para carregar os dados salvos no localStorage
function carregarDados() {
    document.getElementById('vendas').value = localStorage.getItem('vendas') || '';
    document.getElementById('porcentagem').value = localStorage.getItem('porcentagem') || '';
    document.getElementById('salario').value = localStorage.getItem('salario') || '';
    document.getElementById('quebraCx').value = localStorage.getItem('quebraCx') || '';
    document.getElementById('dsr').value = localStorage.getItem('dsr') || '';
    document.getElementById('inss').value = localStorage.getItem('inss') || '';
    document.getElementById('valeTransporte').value = localStorage.getItem('valeTransporte') || '';
    diasUteis = parseInt(localStorage.getItem('diasUteis')) || 27;
    diasDescanso = parseInt(localStorage.getItem('diasDescanso')) || 4;
    calcularTotal(); // Calcula o total ao carregar os dados
}

// Função para salvar os dados no localStorage
function salvarDados() {
    localStorage.setItem('vendas', document.getElementById('vendas').value);
    localStorage.setItem('porcentagem', document.getElementById('porcentagem').value);
    localStorage.setItem('salario', document.getElementById('salario').value);
    localStorage.setItem('quebraCx', document.getElementById('quebraCx').value);
    localStorage.setItem('dsr', document.getElementById('dsr').value);
    localStorage.setItem('inss', document.getElementById('inss').value);
    localStorage.setItem('valeTransporte', document.getElementById('valeTransporte').value);
    localStorage.setItem('diasUteis', diasUteis);
    localStorage.setItem('diasDescanso', diasDescanso);
}

// Função para calcular o INSS
function calcularINSS(salario, comissao, dsr, quebraCx) {
    let salarioTotal = salario + comissao + dsr + quebraCx; // Inclui quebra de caixa no cálculo do INSS
    let inss = 0;

    if (salarioTotal <= 1320.00) {
        inss = salarioTotal * 0.075;
    } else if (salarioTotal <= 2571.29) {
        inss = (1320.00 * 0.075) + ((salarioTotal - 1320.00) * 0.09);
    } else if (salarioTotal <= 3856.94) {
        inss = (1320.00 * 0.075) + (1251.29 * 0.09) + ((salarioTotal - 2571.29) * 0.12);
    } else if (salarioTotal <= 7507.49) {
        inss = (1320.00 * 0.075) + (1251.29 * 0.09) + (1285.64 * 0.12) + ((salarioTotal - 3856.94) * 0.14);
    } else {
        inss = (1320.00 * 0.075) + (1251.29 * 0.09) + (1285.64 * 0.12) + (3650.55 * 0.14);
    }

    return inss.toFixed(2);
}

// Função para calcular o DSR
function calcularDSR(comissao) {
    return (comissao / (diasUteis - diasDescanso)) * 4; // Cálculo do DSR considerando os dias de descanso
}

// Função para editar os dias úteis
function editarDiasUteis() {
    let novoDiasUteis = prompt("Insira o número de dias úteis:", diasUteis);
    if (novoDiasUteis !== null && !isNaN(novoDiasUteis) && novoDiasUteis > 0) {
        diasUteis = parseInt(novoDiasUteis);
        calcularTotal(); // Recalcula o total com os novos dias úteis
    }
}

// Função para editar os dias de descanso
function editarDiasDescanso() {
    let novosDiasDescanso = prompt("Insira o número de dias de descanso:", diasDescanso);
    if (novosDiasDescanso !== null && !isNaN(novosDiasDescanso) && novosDiasDescanso >= 0) {
        diasDescanso = parseInt(novosDiasDescanso);
        calcularTotal(); // Recalcula o total com os novos dias de descanso
    }
}

// Função para calcular o total
function calcularTotal() {
    let vendas = parseFloat(document.getElementById('vendas').value) || 0;
    let porcentagem = parseFloat(document.getElementById('porcentagem').value) || 0;
    let salario = parseFloat(document.getElementById('salario').value) || 0;
    let quebraCx = parseFloat(document.getElementById('quebraCx').value) || 0;
    let valeTransporte = parseFloat(document.getElementById('valeTransporte').value) || 0;

    let comissao = vendas * (porcentagem / 100);
    let dsr = calcularDSR(comissao);
    let inss = calcularINSS(salario, comissao, dsr, quebraCx); // Passa quebra de caixa para o cálculo do INSS

    let total = comissao + salario + quebraCx + dsr - parseFloat(inss) - valeTransporte; // Subtrai o vale transporte do total

    document.getElementById('comissao').value = comissao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('dsr').value = dsr.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('inss').value = inss.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('total').textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    salvarDados(); // Salva os dados toda vez que o cálculo é realizado
}

// Chama a função para carregar os dados ao iniciar a página
window.onload = carregarDados;
