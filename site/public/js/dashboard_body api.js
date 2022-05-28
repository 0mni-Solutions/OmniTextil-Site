let proximaAtualizacao;

(window.onload = obterDadosGrafico(sessionStorage.ID_SETOR)),
  obterdados(sessionStorage.ID_SETOR);

// O gráfico é construído com três funções:
// 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
// 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela
// 3. atualizarGrafico -> Atualiza o gráfico, trazendo novamente dados do Banco

// Esta função *obterDadosGrafico* busca os últimos dados inseridos em tabela de medidas.
// para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
// A função *obterDadosGrafico* também invoca a função *plotarGrafico*

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function obterDadosGrafico(idSetor) {
  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }

  fetch(`/medidas/ultimas/${idSetor}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          resposta.reverse();

          plotarGrafico(resposta, idSetor);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
  obterdados();
}

function obterDadosSemanais(idAquario) {
  fetch(`/medidas/semanais/${idAquario}`, { cache: "no-store" })
    .then(function (response) {
      console.log("estou aqui");
      if (response.ok) {
        response.json().then(function (respostaSemanal) {
          console.log(`Dados recebidos: ${JSON.stringify(respostaSemanal)}`);
          respostaSemanal.reverse();

          plotarGrafico(resposta, respostaSemanal, idAquario);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function obterdados(idAquario) {
  fetch(`/medidas/tempo-real/${idAquario}`)
    .then((resposta) => {
      if (resposta.ok) {
        resposta.json().then((resposta) => {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

          alertar(resposta[0].temperatura, resposta[0].umidade);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(
        `Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`
      );
    });
  alertar();
}
// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e,
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
var configUMI = {};
var umiChart;
var configTEMP = {};
var tempChart;
function plotarGrafico(resposta, idAquario) {
  console.log("iniciando plotagem do gráfico...");

  var dados = {
    labels: [],
    datasets: [
      {
        label: "Umidade",
        fill: true,
        borderColor: "#8008FF",
        backgroundColor: "#8008FF20",
        tension: 0.3,
        pointRadius: 5,
        fill: true,
        data: [],
      },
    ],
  };

  var dadosTemp = {
    labels: [],
    datasets: [
      {
        label: "Temperatura",
        fill: true,
        backgroundColor: "#D7B1FF20",
        borderColor: "#D7B1FF",
        tension: 0.3,
        pointRadius: 5,
        fill: true,
        data: [],
      },
    ],
  };

  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    dados.labels.push(registro.momento_grafico);
    dadosTemp.labels.push(registro.momento_grafico);
    dados.datasets[0].data.push(registro.umidade);
    dadosTemp.datasets[0].data.push(registro.temperatura);
  }
  console.log(JSON.stringify(dados));

  let delayed;
  // UMI
  const settingsUMI = {
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
          delay = context.dataIndex * 55 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    // PARTE SUPERIOR
    plugins: {
      // TÍTULO NO GRÁFICO
      title: {
        display: true,
        padding: 0,
        text: "TEMPO REAL",
        color: "#5E2D92",
        font: {
          size: 30,
          family: "Quicksand_Bold",
        },
      },
      // SUBTÍTULO NO GRÁFICO
      subtitle: {
        display: true,
        padding: 20,
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
          boxHeight: 3,
          boxWidth: 22,
          color: "#5E2D92",
          font: {
            size: 20,
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
        grid: {
          color: '#ac79e2',
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
          minRotation: 60,
          color: "#1e0935",
          font: {
            size: 13,
            family: "Quicksand_Bold",
          },
        },
      },
      // MÉTRICAS (Y-AXIS)
      y: {
        grid: {
          color: '#ac79e2',
        },
        // TITLE DO EIXO Y
        title: {
          display: true,
          text: "Porcentagem",
          color: "#1e0935",
          font: {
            size: 20,
            family: "Quicksand_Bold",
            style: "italic",
          },
        },
        // ESTILO DAS DIMENSÕES
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
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
  configUMI = {
    type: "line",
    data: dados,
    options: settingsUMI,
  };

  umiChart = new Chart(document.getElementById("UMI_ChartLINE"), configUMI);

  // TEMP
  const settingsTEMP = {
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
          delay = context.dataIndex * 55 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    // PARTE SUPERIOR
    plugins: {
      // TÍTULO NO GRÁFICO
      title: {
        display: true,
        padding: 0,
        text: "TEMPO REAL",
        color: "#bf6bff",
        font: {
          size: 30,
          family: "Quicksand_Bold",
        },
      },
      // SUBTÍTULO NO GRÁFICO
      subtitle: {
        display: true,
        padding: 20,
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
          boxHeight: 3,
          boxWidth: 22,
          color: "#bf6bff",
          font: {
            size: 20,
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
        grid: {
          color: '#41334f',
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
          minRotation: 60,
          color: "#D7B1FF",
          font: {
            size: 13,
            family: "Quicksand_Bold",
          },
        },
      },
      // MÉTRICAS (Y-AXIS)
      y: {
        grid: {
          color: '#41334f',
        },
        // TITLE DO EIXO Y
        title: {
          display: true,
          text: "Graus Celsius",
          color: "#D7B1FF",
          font: {
            size: 20,
            family: "Quicksand_Bold",
            style: "italic",
          },
        },
        // ESTILO DAS DIMENSÕES
        min: 0,
        max: 40,
        ticks: {
          stepSize: 5,
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
  configTEMP = {
    type: "line",
    data: dadosTemp,
    options: settingsTEMP,
  };
  tempChart = new Chart(document.getElementById("TEMP_ChartLINE"), configTEMP);

  setTimeout(() => atualizarGrafico(idAquario, dados, dadosTemp), 2000);
}

// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas,

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico(idAquario, dados, dadosTemp) {
  fetch(`/medidas/tempo-real/${idAquario}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (novoRegistro) {
          console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
          console.log(`Dados atuais do gráfico: ${dados}`);

          // tirando e colocando valores no gráfico
          dados.labels.shift();
          dadosTemp.labels.shift(); // apagar o primeiro
          dados.labels.push(novoRegistro[0].momento_grafico);
          dadosTemp.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

          dados.datasets[0].data.shift(); // apagar o primeiro de umidade
          dados.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

          dadosTemp.datasets[0].data.shift(); // apagar o primeiro de temperatura
          dadosTemp.datasets[0].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

          umiChart.update();
          tempChart.update();

          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(
            () => atualizarGrafico(idAquario, dados, dadosTemp),
            2000
          );
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(
          () => atualizarGrafico(idAquario, dados, dadosTemp),
          2000
        );
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
  obterdados();
}

// cards

function alertar(temperatura, umidade) {
  const limitesUmi = {
    maxPerigo: 60,
    max: 55,
    ideal: 50,
    min: 45,
    minPerigo: 40,
  };
  const limitesTemp = {
    maxPerigo: 40,
    max: 30,
    ideal: 20,
    min: 10,
    minPerigo: 5,
  };
  if (temperatura != null) {
    kpi_temp.innerHTML = temperatura + "°C";
  }
  if (umidade != null) {
    kpi_umi.innerHTML = umidade + "%";
  }

  if (umidade >= limitesUmi.maxPerigo) {
    p_umi.innerHTML = "ALERTA MÁXIMO: UMIDADE MUITO ALTA";
    p_umi.style.backgroundColor = "#ff0053";
    img_umi.style.filter = "hue-rotate(1deg)";
    alert_umi.style.filter = "drop-shadow(0px 0px 15px ##ff0053)";
  } else if (umidade >= limitesUmi.max) {
    p_umi.innerHTML = "PERIGO: UMIDADE ALTA";
    p_umi.style.backgroundColor = "#ff7800";
    img_umi.style.filter = "hue-rotate(271deg)";
    alert_umi.style.filter = "drop-shadow(0px 0px 6px #ff7800)";
  } else if (umidade < limitesUmi.max && umidade > limitesUmi.min) {
    p_umi.innerHTML = "UMIDADE IDEAL";
    p_umi.style.backgroundColor = "#31bd29";
    img_umi.style.filter = "hue-rotate(153deg)";
    alert_umi.style.filter = "drop-shadow(0px 0px 3px #31bd29)";
  } else if (umidade >= limitesUmi.minPerigo) {
    p_umi.innerHTML = "PERIGO: UMIDADE BAIXA";
    p_umi.style.backgroundColor = "#ff7800";
    img_umi.style.filter = "hue-rotate(271deg)";
    alert_umi.style.filter = "drop-shadow(0px 0px 6px #ff7800)";
  } else if (umidade < limitesUmi.minPerigo) {
    p_umi.innerHTML = "ALERTA MÁXIMO: UMIDADE MUITO BAIXA";
    p_umi.style.backgroundColor = "#ff0053";
    img_umi.style.filter = "hue-rotate(1deg)";
    alert_umi.style.filter = "drop-shadow(0px 0px 15px ##ff0053)";
  }

  if (temperatura >= limitesTemp.maxPerigo) {
    p_temp.innerHTML = "ALERTA MÁXIMO: TEMPERATURA MUITO ALTA";
    p_temp.style.backgroundColor = "#ff0053";
    img_temp.style.filter = "hue-rotate(1deg)";
    alert_temp.style.filter = "drop-shadow(0px 0px 15px ##ff0053)";
  } else if (temperatura >= limitesTemp.max) {
    p_temp.innerHTML = "PERIGO: TEMPERATURA ALTA";
    p_temp.style.backgroundColor = "#ff7800";
    img_temp.style.filter = "hue-rotate(271deg)";
    alert_temp.style.filter = "drop-shadow(0px 0px 15px #ff7800)";
  } else if (temperatura < limitesTemp.max && temperatura > limitesTemp.min) {
    p_temp.innerHTML = "TEMPERATURA IDEAL";
    p_temp.style.backgroundColor = "#31bd29";
    img_temp.style.filter = "hue-rotate(153deg)";
    alert_temp.style.filter = "drop-shadow(0px 0px 3px #31bd29)";
  } else if (temperatura >= limitesTemp.minPerigo) {
    p_temp.innerHTML = "PERIGO: TEMPERATURA BAIXA";
    p_temp.style.backgroundColor = "#ff7800";
    img_temp.style.filter = "hue-rotate(271deg)";
    alert_temp.style.filter = "drop-shadow(0px 0px 6px #ff7800)";
  } else if (temperatura < limitesTemp.minPerigo) {
    p_temp.innerHTML = "ALERTA MÁXIMO: TEMPERATURA MUITO BAIXA";
    p_temp.style.backgroundColor = "#ff0053";
    img_temp.style.filter = "hue-rotate(1deg)";
    alert_temp.style.filter = "drop-shadow(0px 0px 15px ##ff0053)";
  }
}
