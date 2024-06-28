const ctx = document.getElementById('tradingChart').getContext('2d');
const percentageDisplay = document.getElementById('percentageDisplay');
const monthRangeSelect = document.getElementById('monthRange');

const dataSets = {
  5: [10, 20, 15, 35, 30], // Exemplo de dados para os últimos 5 meses
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

const config = {
  type: 'line',
  data: {
    labels: getLastNMonths(5),
    datasets: [
      {
        label: 'ETH',
        data: dataSets[5],
        fill: true,
        backgroundColor: '#04C88F33',
        borderColor: '#04C88F',
        tension: 0.5,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
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

monthRangeSelect.addEventListener('change', (e) => {
  const months = e.target.value;
  updateChart(months);
});

updateChart(5);
