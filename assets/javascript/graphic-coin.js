// document.addEventListener('DOMContentLoaded', (event) => {
//   const ctx = document.getElementById('myChart').getContext('2d');

//   // Dados de exemplo para 12 meses
//   const monthlyData = [
//     { month: 'January', value: 10 },
//     { month: 'February', value: 20 },
//     { month: 'March', value: 30 },
//     { month: 'April', value: 40 },
//     { month: 'May', value: 50 },
//     { month: 'June', value: 60 },
//     { month: 'July', value: 70 },
//     { month: 'August', value: 80 },
//     { month: 'September', value: 90 },
//     { month: 'October', value: 100 },
//     { month: 'November', value: 110 },
//     { month: 'December', value: 120 },
//   ];

//   // Inicializa os dados do gráfico
//   const data = {
//     labels: monthlyData.map((d) => d.month),
//     datasets: [
//       {
//         label: 'ETH',
//         data: monthlyData.map((d, index) => (index % 5 === 0 ? d.value : null)),
//         fill: true,
//         backgroundColor: 'rgba(0, 255, 0, 0.2)',
//         borderColor: 'rgba(0, 255, 0, 1)',
//         tension: 0.1,
//       },
//     ],
//   };

//   // Configuração do gráfico
//   const config = {
//     type: 'line',
//     data: data,
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   };

//   // Cria o gráfico
//   const myChart = new Chart(ctx, config);

//   // Atualiza o gráfico e a porcentagem
//   document
//     .getElementById('monthSelect')
//     .addEventListener('change', function () {
//       const selectedMonthIndex = parseInt(this.value);
//       updateChart(selectedMonthIndex);
//     });

//   function updateChart(monthIndex) {
//     const previousMonthIndex = monthIndex === 0 ? 11 : monthIndex - 1;
//     const currentValue = monthlyData[monthIndex].value;
//     const previousValue = monthlyData[previousMonthIndex].value;
//     const percentageChange =
//       ((currentValue - previousValue) / previousValue) * 100;
//     const percentageElement = document.getElementById('percentage');
//     const percentage = percentageChange.toFixed(2);

//     percentageElement.textContent = `${percentage > 0 ? '+' : ''}${percentage}%`;

//     // Atualiza o gráfico para refletir os dados do mês selecionado
//     myChart.data.datasets[0].data = monthlyData.map((d, index) =>
//       index % 5 === 0 ? d.value : null
//     );
//     myChart.data.datasets[0].data[monthIndex] = currentValue; // Adiciona o valor do mês selecionado
//     myChart.update();
//   }
// });

const ctx = document.getElementById('tradingChart').getContext('2d');
const percentageDisplay = document.getElementById('percentageDisplay');
const monthRangeSelect = document.getElementById('monthRange');

const dataSets = {
  5: [10, 20, 15, 25, 30], // Exemplo de dados para os últimos 5 meses
  10: [8, 12, 18, 22, 30, 25, 20, 15, 20, 30], // Exemplo de dados para os últimos 10 meses
  15: [5, 10, 12, 15, 18, 20, 22, 25, 30, 28, 26, 24, 22, 20, 18], // Exemplo de dados para os últimos 15 meses
};

// Função para gerar os últimos N meses
function getLastNMonths(n) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date();
  const result = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
    result.push(months[d.getMonth()]);
  }
  return result;
}

// Função para atualizar o gráfico
function updateChart(months) {
  const labels = getLastNMonths(months);
  const data = dataSets[months];
  tradingChart.data.labels = labels;
  tradingChart.data.datasets[0].data = data;
  tradingChart.update();

  const percentage = (
    ((data[data.length - 1] - data[0]) / data[0]) *
    100
  ).toFixed(2);
  percentageDisplay.innerText = `${percentage}%`;
}

// Configuração inicial do gráfico
const config = {
  type: 'line',
  data: {
    labels: getLastNMonths(5),
    datasets: [
      {
        label: 'ETH',
        data: dataSets[5],
        fill: true,
        backgroundColor: 'rgba(52, 199, 89, 0.5)',
        borderColor: 'rgba(52, 199, 89, 1)',
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  },
};

const tradingChart = new Chart(ctx, config);

// Event listener para o select
monthRangeSelect.addEventListener('change', (e) => {
  const months = e.target.value;
  updateChart(months);
});

// Atualiza o gráfico com a configuração inicial
updateChart(5);
