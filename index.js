let valorJurosTotal = 0;

let calculaPrazoMes = function (anos) {
  return anos * 12;
};

let calculaJurosMes = function (jurosAnos) {
  return (1 + jurosAnos) ** (1 / 12) - 1;
};

let calculaPrestacoes = function (total, juros, prazo) {
  let amortizacao = total / prazo;
  let prestacoes = [];
  valorJurosTotal = 0;

  for (let i = 0; i < prazo; i++) {
    let jurosMes = (total - i * amortizacao) * juros;
    valorJurosTotal += jurosMes;

    prestacoes.push({
      amortizacao: Math.round(amortizacao* 100)/100,
      juros: Math.round(jurosMes* 100)/100,
      total: Math.round((amortizacao + jurosMes)* 100)/100,
    });
  }
  return prestacoes;
};

let renderPrestacoes = function (prestacoes) {
  let old_tbody = document.getElementById("tablePrestacoesBody");
  let new_tbody = document.createElement("tbody");
  new_tbody.id = "tablePrestacoesBody";

  for (let p = 0; p < 5; p++) {
    tableTr = document.createElement("tr");

    tableTrTh = document.createElement("th");
    tableTrTh.scope = "row";
    tableTrTh.textContent = p + 1;
    tableTr.appendChild(tableTrTh);

    tableTrTd = document.createElement("td");
    tableTrTd.textContent = prestacoes[p].amortizacao;
    tableTr.appendChild(tableTrTd);

    tableTrTd = document.createElement("td");
    tableTrTd.textContent = prestacoes[p].juros;
    tableTr.appendChild(tableTrTd);

    tableTrTd = document.createElement("td");
    tableTrTd.textContent = prestacoes[p].total;
    tableTr.appendChild(tableTrTd);

    new_tbody.appendChild(tableTr);
  }

  old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
};

let renderResultado = function (evt) {
  inputValor = parseFloat(document.getElementById("inputValor").value);
  inputPrazo = parseFloat(document.getElementById("inputPrazo").value);
  inputJuros = parseFloat(document.getElementById("inputJuros").value);

  prazoMes = calculaPrazoMes(inputPrazo);
  jurosMes = calculaJurosMes(inputJuros);
  prestacoes = calculaPrestacoes(inputValor, jurosMes, prazoMes);

  document.getElementById("inputRPrazo").value = prazoMes;
  document.getElementById("inputRJuros").value = jurosMes.toFixed(15);
  document.getElementById("inputRJurosAc").value = Math.round(valorJurosTotal* 100)/100;
  renderPrestacoes(prestacoes);
};

document.getElementById("simular").addEventListener("click", renderResultado);
