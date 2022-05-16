let proximaAtualizacao;

window.onload = obterDadosGrafico(1);

function obterDadosGrafico(idSetor, idSetor) {
  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }
  fetch(`/medidas/ultimas/${idSetor}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          resposta.reverse();
          UMI_line_graph(resposta, idSetor);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

console.log("iniciando plotagem do gráfico...");
// GRÁFICOS UMIDADE
// GRÁFICO DE LINHA
function UMI_line_graph(resposta, idSetor) {
  console.log("iniciando plotagem do gráfico...");

  gradient = ctx.createLinearGradient(0, 0, 0, 450);
  gradient.addColorStop(0, "rgba(157, 66, 255, 1)");
  gradient.addColorStop(1, "rgba(157, 66, 255, 0.0)");

  const dataLINE = {
    labels: [],
    datasets: [
      // {
      //   // LIMITE MÁXIMO
      //   data: [
      //     60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60,
      //     60, 60, 60, 60, 60, 60, 60,
      //   ],
      //   label: "PERIGO",
      //   backgroundColor: "rgb(230, 0, 0)",
      //   borderColor: "rgb(230, 0, 0)",
      //   pointRadius: 0,
      //   pointHitRadius: 0,
      // },
      {
      // MEDIDAS DO SENSOR
        data: [],
        label: "UMIDADE",
        fill: true,
        backgroundColor: gradient,
        tension: 0.5,
        pointRadius: 5,
        borderColor: "#8008FF",
        pointBackgroundColor: "#8008FF",
      },
    ],
  };
  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    dados.labels.push(registro.momento_grafico);
    dados.datasets[0].data.push(registro.umidade);
  }
  console.log(JSON.stringify(dados));
  var ctx = canvas_umidade.getContext("2d");

  const settingsLINE = {
    maintainAspectRatio: false,
    responsive: true,

    // // ANIMAÇÃO (RETIRAR)
    // animation: {
    //     onComplete: () => {
    //         delayed = true;
    //     },
    //     delay: (context) => {
    //         let delay = 0;
    //         if (context.type === "data" && context.mode === "default" && !delayed) {
    //             delay = context.dataIndex * 20 + context.datasetIndex * 100;
    //         }
    //         return delay;
    //     },
    // },
    // PARTE SUPERIOR
    plugins: {
      // SUBTÍTULO NO GRÁFICO
      subtitle: {
        display: true,
        padding: 10,
        text: "| HOJE |",
        color: "#5E2D92",
        font: {
          size: 15,
          family: "Quicksand_Bold",
        },
      },
      // LEGENDA DOS DATASETS
      legend: {
        display: true,
        labels: {
          boxHeight: 1,
          boxWidth: 22,
          color: "#5E2D92",
          font: {
            size: 15,
            family: "Quicksand_Bold",
          },
        },
      },
      // TOOLTIP
      tooltip: {
        enabled: true,
        displayColors: false,
        backgroundColor: "rgba(67, 27, 109, 0.9)",
        caretSize: 12,
        caretPadding: 15,
        padding: 20,
        cornerRadius: 20,
        titleAlign: "center",
        titleColor: "#e2c6ff",
        titleFont: {
          size: 15,
          family: "Quicksand_Book",
          style: "italic",
        },
        titleMarginBottom: 10,
        bodyAlign: "center",
        bodyColor: "white",
        bodyFont: {
          size: 15,
          family: "Quicksand_Bold",
        },
      },
    },
    // LEGENDAS
    scales: {
      // DIMENSÕES (X-AXIS)
      x: {
        // LINHAS VERTICAIS
        grid: {
          color: "#CEA0FF",
        },
        // TITLE DO EIXO X
        title: {
          display: true,
          text: "Horário",
          color: "#1e0935",
          font: {
            size: 20,
            family: "Quicksand_Bold",
            style: "italic",
          },
        },
        // ESTILO DAS DIMENSÕES
        ticks: {
          maxRotation: 90,
          minRotation: 40,
          color: "#1e0935",
          font: {
            size: 15,
            family: "Quicksand_Bold",
          },
        },
      },
      // MÉTRICAS (Y-AXIS)
      y: {
        // LINHAS HORIZONTAIS
        grid: {
          color: "#CEA0FF",
        },
        // TITLE DO EIXO Y
        title: {
          display: true,
          text: "Umidade",
          color: "#1e0935",
          font: {
            size: 20,
            family: "Quicksand_Bold",
            style: "italic",
          },
        },
        // ESTILO DAS DIMENSÕES
        ticks: {
          color: "#1e0935",
          font: {
            size: 15,
            family: "Quicksand_Bold",
            style: "italic",
          },
          callback: function (value) {
            return +value + "%";
          },
        },
      },
    },
  };

  configLINE = {
    type: "line",
    data: dataLINE,
    options: settingsLINE,
  };

  function sendData() {
    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:3000/api/sendData", false);
    http.send(null);
  }

  setInterval(() => {
    sendData();
  }, 2000);

  //Atualiza os dados de 5 em 5 segundos (Obs: n sei pq 5 segundo pois so esta descrito 4000 talvez tenha 1 sedundo e atrazo)
  setTimeout(() => atualizarGrafico(idSetor, dados), 2000);
}
// GRÁFICO DE BARRA
UMI_bar_graph();
function UMI_bar_graph() {
  // GRÁFICO DE BARRA
  const dia = [
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado",
  ];

  var dataBars = [40, 46, 35, 48, 54, 62, 49];

  const dataBAR = {
    labels: dia,
    datasets: [
      {
        // MEDIDAS DO SENSOR
        data: dataBars,
        label: "MÉDIA",
        backgroundColor: "#8008FF",
        borderColor: "#8008FF",
        barThickness: 30,
        borderRadius: 100,
      },
    ],
  };

  let delayed;
  const settingsBAR = {
    maintainAspectRatio: false,
    responsive: true,

    // ANIMAÇÃO (RETIRAR)
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 200 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    // PARTE SUPERIOR
    plugins: {
      // TÍTULO NO GRÁFICO
      title: {
        display: true,
        padding: 10,
        text: "| SEMANAL |",
        color: "#5E2D92",
        font: {
          size: 15,
          family: "Quicksand_Bold",
        },
      },
      // LEGENDA DOS DATASETS
      legend: {
        display: true,
        labels: {
          boxHeight: 4,
          boxWidth: 25,
          color: "#5E2D92",
          font: {
            size: 15,
            family: "Quicksand_Bold",
          },
        },
      },
      // TOOLTIP
      tooltip: {
        enabled: true,
        displayColors: false,
        backgroundColor: "rgba(67, 27, 109, 0.9)",
        caretSize: 12,
        caretPadding: 15,
        padding: 20,
        cornerRadius: 20,
        titleAlign: "center",
        titleColor: "#e2c6ff",
        titleFont: {
          size: 15,
          family: "Quicksand_Book",
          style: "italic",
        },
        titleMarginBottom: 10,
        bodyAlign: "center",
        bodyColor: "white",
        bodyFont: {
          size: 15,
          family: "Quicksand_Bold",
        },
      },
    },
    // LEGENDAS
    scales: {
      // DIMENSÕES (X-AXIS)
      x: {
        // LINHAS VERTICAIS
        grid: {
          color: "#CEA0FF",
        },
        // ESTILO DAS DIMENSÕES
        ticks: {
          color: "#1e0935",
          font: {
            size: 13,
            family: "Quicksand_Bold",
          },
        },
      },
      // MÉTRICAS (Y-AXIS)
      y: {
        // LINHAS HORIZONTAIS
        grid: {
          color: "#CEA0FF",
        },
        // TITLE DO EIXO Y
        title: {
          display: true,
          text: "Umidade",
          color: "#1e0935",
          font: {
            size: 15,
            family: "Quicksand_Bold",
            style: "italic",
          },
        },
        // ESTILO DAS DIMENSÕES
        ticks: {
          padding: 10,
          color: "#1e0935",
          font: {
            size: 13,
            family: "Quicksand_Bold",
            style: "italic",
          },
          callback: function (value) {
            return +value + "%";
          },
        },
      },
    },
  };

  const configBAR = {
    type: "bar",
    data: dataBAR,
    options: settingsBAR,
  };

  var ChartBAR = new Chart(document.getElementById("UMI_ChartBAR"), configBAR);
}
// GRÁFICO DE PIZZA
UMI_doughnut_graph();
function UMI_doughnut_graph() {
  // GRÁFICO DE BARRA
  const capacidade = ["Operando", "Livre"];

  var dataUse = [60, 40];

  const dataDOUG = {
    labels: capacidade,
    datasets: [
      {
        data: dataUse,
        backgroundColor: ["rgba(128, 8, 255, 1)", "rgba(128, 8, 255, 0.4)"],
        circumference: 180,
        rotation: 270,
        cutout: "35%",
        borderWidth: 1,
        borderColor: "#e2c6ff",
        // borderColor: '#8008FF',
      },
    ],
  };

  const settingsDOUG = {
    maintainAspectRatio: false,
    responsive: true,

    plugins: {
      // tooltip: {
      //     enabled: true,
      // },
      tooltip: {
        enabled: true,
        // displayColors: false,
        backgroundColor: "rgba(67, 27, 109, 0.9)",
        caretSize: 12,
        caretPadding: 15,
        padding: 20,
        cornerRadius: 20,
        bodyAlign: "center",
        bodyColor: "white",
        bodyFont: {
          size: 15,
          family: "Quicksand_Bold",
        },
      },
      // TÍTULO NO GRÁFICO
      title: {
        display: true,
        padding: 10,
        text: "| CAPACIDADE |",
        color: "#5E2D92",
        font: {
          size: 15,
          family: "Quicksand_Bold",
        },
      },
      // LEGENDA DOS DATASETS
      legend: {
        display: true,
        labels: {
          boxHeight: 4,
          boxWidth: 25,
          color: "#5E2D92",
          font: {
            size: 15,
            family: "Quicksand_Bold",
          },
        },
      },
    },
  };

  const configDOUG = {
    type: "doughnut",
    data: dataDOUG,
    options: settingsDOUG,
  };

  var ChartDOUG = new Chart(
    document.getElementById("UMI_ChartDOUG"),
    configDOUG
  );
}

//------------------------------------------------------------------------------//

// GRÁFICOS TEMPERATURA

// GRÁFICO DE LINHA
TEMP_line_graph();
function TEMP_line_graph() {
  var ctx = document.getElementById("TEMP_ChartLINE").getContext("2d");

  gradient = ctx.createLinearGradient(0, 0, 0, 450);
  gradient.addColorStop(0, "rgba(215, 177, 255, 1)");
  gradient.addColorStop(1, "rgba(215, 177, 255, 0.0)");

  const dataLINE = {
    labels: [],
    datasets: [
      {
        // LIMITE MÁXIMO
        data: [
          30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
          30, 30, 30, 30, 30, 30, 30,
        ],
        label: "PERIGO",
        backgroundColor: "rgb(230, 0, 0)",
        borderColor: "rgb(230, 0, 0)",
        pointRadius: 0,
        pointHitRadius: 0,
      },
      {
        // MEDIDAS DO SENSOR
        data: [],
        label: "DHT11",
        fill: true,
        tension: 0.5,
        pointRadius: 5,
        backgroundColor: gradient,
        borderColor: "#D7B1FF",
        pointBackgroundColor: "#D7B1FF",
      },
    ],
  };

  let delayed;
  const settingsLINE = {
    maintainAspectRatio: false,
    responsive: true,

    // ANIMAÇÃO (RETIRAR)
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 20 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    // PARTE SUPERIOR
    plugins: {
      // SUBTÍTULO NO GRÁFICO
      subtitle: {
        display: true,
        padding: 10,
        text: "| HOJE |",
        color: "#bf6bff",
        font: {
          size: 15,
          family: "Quicksand_Bold",
        },
      },
      // LEGENDA DOS DATASETS
      legend: {
        display: true,
        labels: {
          boxHeight: 1,
          boxWidth: 22,
          color: "#bf6bff",
          font: {
            size: 15,
            family: "Quicksand_Bold",
          },
        },
      },
      // TOOLTIP
      tooltip: {
        enabled: true,
        displayColors: false,
        backgroundColor: "rgba(226, 198, 255, 0.9)",
        caretSize: 12,
        caretPadding: 15,
        padding: 20,
        cornerRadius: 20,
        titleAlign: "center",
        titleColor: "#8008FF",
        titleFont: {
          size: 15,
          family: "Quicksand_Book",
          style: "italic",
        },
        titleMarginBottom: 10,
        bodyAlign: "center",
        bodyColor: "#5E2D92",
        bodyFont: {
          size: 15,
          family: "Quicksand_Bold",
        },
      },
    },
    // LEGENDAS
    scales: {
      // DIMENSÕES (X-AXIS)
      x: {
        // LINHAS VERTICAIS
        grid: {
          color: "#3b2553",
        },
        // TITLE DO EIXO X
        title: {
          display: true,
          text: "Horário",
          color: "#D7B1FF",
          font: {
            size: 20,
            family: "Quicksand_Bold",
            style: "italic",
          },
        },
        // ESTILO DAS DIMENSÕES
        ticks: {
          maxRotation: 90,
          minRotation: 40,
          color: "#D7B1FF",
          font: {
            size: 15,
            family: "Quicksand_Bold",
          },
        },
      },
      // MÉTRICAS (Y-AXIS)
      y: {
        // LINHAS HORIZONTAIS
        grid: {
          color: "#3b2553",
        },
        // TITLE DO EIXO Y
        title: {
          display: true,
          text: "Temperatura",
          color: "#D7B1FF",
          font: {
            size: 20,
            family: "Quicksand_Bold",
            style: "italic",
          },
        },
        // ESTILO DAS DIMENSÕES
        ticks: {
          color: "#D7B1FF",
          font: {
            size: 15,
            family: "Quicksand_Bold",
            style: "italic",
          },
          callback: function (value) {
            return +value + "ºC";
          },
        },
      },
    },
  };

  const configLINE = {
    type: "line",
    data: dataLINE,
    options: settingsLINE,
  };

  var ChartLINE = new Chart(
    document.getElementById("TEMP_ChartLINE"),
    configLINE
  );
}
// GRÁFICO DE BARRA
TEMP_bar_graph();
function TEMP_bar_graph() {
  // GRÁFICO DE BARRA
  const dia = [
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado",
  ];

  var dataBars = [16, 19, 13, 22, 28, 17, 30];

  const dataBAR = {
    labels: dia,
    datasets: [
      {
        // MEDIDAS DO SENSOR
        data: dataBars,
        label: "MÉDIA",
        backgroundColor: "#bf6bff",
        borderColor: "#bf6bff",
        barThickness: 30,
        borderRadius: 100,
      },
    ],
  };

  let delayed;
  const settingsBAR = {
    maintainAspectRatio: false,
    responsive: true,

    // ANIMAÇÃO (RETIRAR)
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 200 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    // PARTE SUPERIOR
    plugins: {
      // TÍTULO NO GRÁFICO
      title: {
        display: true,
        padding: 10,
        text: "| SEMANAL |",
        color: "#bf6bff",
        font: {
          size: 15,
          family: "Quicksand_Bold",
        },
      },
      // LEGENDA DOS DATASETS
      legend: {
        display: true,
        labels: {
          boxHeight: 4,
          boxWidth: 25,
          color: "#bf6bff",
          font: {
            size: 15,
            family: "Quicksand_Bold",
          },
        },
      },
      // TOOLTIP
      tooltip: {
        enabled: true,
        displayColors: false,
        backgroundColor: "rgba(226, 198, 255, 0.9)",
        caretSize: 12,
        caretPadding: 15,
        padding: 20,
        cornerRadius: 20,
        titleAlign: "center",
        titleColor: "#8008FF",
        titleFont: {
          size: 15,
          family: "Quicksand_Book",
          style: "italic",
        },
        titleMarginBottom: 10,
        bodyAlign: "center",
        bodyColor: "#5E2D92",
        bodyFont: {
          size: 15,
          family: "Quicksand_Bold",
        },
      },
    },
    // LEGENDAS
    scales: {
      // DIMENSÕES (X-AXIS)
      x: {
        // LINHAS VERTICAIS
        grid: {
          color: "#3b2553",
        },
        // ESTILO DAS DIMENSÕES
        ticks: {
          color: "#D7B1FF",
          font: {
            size: 13,
            family: "Quicksand_Bold",
          },
        },
      },
      // MÉTRICAS (Y-AXIS)
      y: {
        // LINHAS HORIZONTAIS
        grid: {
          color: "#3b2553",
        },
        // TITLE DO EIXO Y
        title: {
          display: true,
          text: "Temperatura",
          color: "#D7B1FF",
          font: {
            size: 15,
            family: "Quicksand_Bold",
            style: "italic",
          },
        },
        // ESTILO DAS DIMENSÕES
        ticks: {
          padding: 10,
          color: "#D7B1FF",
          font: {
            size: 13,
            family: "Quicksand_Bold",
            style: "italic",
          },
          callback: function (value) {
            return +value + "ºC";
          },
        },
      },
    },
  };

  const configBAR = {
    type: "bar",
    data: dataBAR,
    options: settingsBAR,
  };

  var ChartBAR = new Chart(document.getElementById("TEMP_ChartBAR"), configBAR);
}
// GRÁFICO DE PIZZA
TEMP_doughnut_graph();
function TEMP_doughnut_graph() {
  // GRÁFICO DE BARRA
  const capacidade = ["Operando", "Livre"];

  var dataUse = [35, 65];

  const dataDOUG = {
    labels: capacidade,
    datasets: [
      {
        data: dataUse,
        backgroundColor: ["rgba(215, 177, 255, 1)", "rgba(215, 177, 255, 0.1)"],
        circumference: 180,
        rotation: 270,
        cutout: "35%",
        borderWidth: 1,
        borderColor: "#5E2D92",
      },
    ],
  };

  const settingsDOUG = {
    maintainAspectRatio: false,
    responsive: true,

    plugins: {
      // tooltip: {
      //     enabled: true,
      // },
      tooltip: {
        enabled: true,
        // displayColors: false,
        backgroundColor: "rgba(215, 177, 255, 0.9)",
        caretSize: 12,
        caretPadding: 15,
        padding: 20,
        cornerRadius: 20,
        bodyAlign: "center",
        bodyColor: "#5E2D92",
        bodyFont: {
          size: 15,
          family: "Quicksand_Bold",
        },
      },
      // TÍTULO NO GRÁFICO
      title: {
        display: true,
        padding: 10,
        text: "| CAPACIDADE |",
        color: "#bf6bff",
        font: {
          size: 15,
          family: "Quicksand_Bold",
        },
      },
      // LEGENDA DOS DATASETS
      legend: {
        display: true,
        labels: {
          boxHeight: 4,
          boxWidth: 25,
          color: "#bf6bff",
          font: {
            size: 15,
            family: "Quicksand_Bold",
          },
        },
      },
    },
  };
}
const configDOUG = {
  type: "doughnut",
  data: dataDOUG,
  options: settingsDOUG,
};

var ChartDOUG = new Chart(
  document.getElementById("TEMP_ChartDOUG"),
  configDOUG
);
// 
function atualizarGrafico(idSetor, dados) {
  fetch(`/medidas/tempo-real/${idSetor}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (novoRegistro) {
          console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
          console.log(`Dados atuais do gráfico: ${dados}`);

          // tirando e colocando valores no gráfico
          dados.labels.shift(); // apagar o primeiro
          dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento
          dados.datasets[0].data.shift(); // apagar o primeiro de umidade
          dados.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade
          dados.datasets[1].data.shift(); // apagar o primeiro de umidade
          dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de umidade

          window.grafico_linha.update();

          proximaAtualizacao = setTimeout(
            () => atualizarGrafico(idSetor, dados),
            2000
          );
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
        proximaAtualizacao = setTimeout(
          () => atualizarGrafico(idSetor, dados),
          2000
        );
      }
    })
    .catch(function (error) {
      console.error(
        `Erro na obtenção dos dados p/ gráfico: ${error.message}`
      );
    });
}