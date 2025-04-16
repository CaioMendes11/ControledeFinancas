
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];
let rendas = JSON.parse(localStorage.getItem("rendas")) || [];

function salvarGastos() {
  localStorage.setItem("gastos", JSON.stringify(gastos));
}

function adicionarRenda() {
      const descricao = document.getElementById("descricaoRenda").value;
      const valor = parseFloat(document.getElementById("valorRenda").value);
      const data = document.getElementById("dataRenda").value;

      if (!descricao || !valor || !data) {
        alert("Preencha todos os campos!");
        return;
      }

      rendas.push({ descricao, valor, data });
      localStorage.setItem("rendas", JSON.stringify(rendas));

      alert("Renda adicionada com sucesso!");
      document.getElementById("descricaoRenda").value = "";
      document.getElementById("valorRenda").value = "";
      document.getElementById("dataRenda").value = "";
    }

function adicionarGasto() {
  const descricao = document.getElementById("descricao")?.value;
  const valor = parseFloat(document.getElementById("valor")?.value);
  const data = document.getElementById("data")?.value;
  const categoria = document.getElementById("categoria")?.value;

  if (!descricao || !valor || !data) {
    alert("Preencha todos os campos!");
    return;
  }

  gastos.push({ descricao, valor, data, categoria });
  salvarGastos();
  alert("Gasto adicionado com sucesso!");
  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("data").value = "";
}

if (document.getElementById("tabelaGastos")) {
  const tbody = document.querySelector("#tabelaGastos tbody");
  tbody.innerHTML = "";
  gastos.forEach(g => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${g.descricao}</td>
      <td>R$ ${g.valor.toFixed(2)}</td>
      <td>${g.data}</td>
      <td>${g.categoria}</td>
    `;
    tbody.appendChild(tr);
  });
}
    const categorias = {};
    gastos.forEach(gasto => {
      if (categorias[gasto.categoria]) {
        categorias[gasto.categoria] += gasto.valor;
      } else {
        categorias[gasto.categoria] = gasto.valor;
      }
    });

    const coresCategorias = [
      '#3aafa9', '#2b7a78', '#fe6f61', '#f6c90e',
      '#9c88ff', '#e17055', '#00b894', '#fd79a8'
    ];

    const ctxCategorias = document.getElementById('graficoCategorias').getContext('2d');
    new Chart(ctxCategorias, {
      type: 'pie',
      data: {
        labels: Object.keys(categorias),
        datasets: [{
          label: 'Gastos por Categoria',
          data: Object.values(categorias),
          backgroundColor: coresCategorias,
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { size: 14 }
            }
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return 'R$ ' + tooltipItem.raw.toFixed(2);
              }
            }
          }
        }
      }
    });
    const totalGastos = gastos.reduce((acc, g) => acc + g.valor, 0);
    const totalRendas = rendas.reduce((acc, r) => acc + r.valor, 0);

    const ctxComparativo = document.getElementById('graficoComparativo').getContext('2d');
    new Chart(ctxComparativo, {
      type: 'bar',
      data: {
        labels: ['Renda Total', 'Gastos Totais'],
        datasets: [{
          label: 'Valores (R$)',
          data: [totalRendas, totalGastos],
          backgroundColor: ['#2ecc71', '#e74c3c'],
          borderRadius: 10,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: `Comparativo Financeiro`,
            font: { size: 16 }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return 'R$ ' + value;
              }
            }
          }
        }
      }
    });
