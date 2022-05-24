let proximaAtualizacao;

(window.onload = obterDadosGrafico(1)), obterDadosSemanais(1), obterdados(1);

verificar_autenticacao();

// O gráfico é construído com três funções:
// 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
// 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela
// 3. atualizarGrafico -> Atualiza o gráfico, trazendo novamente dados do Banco

// Esta função *obterDadosGrafico* busca os últimos dados inseridos em tabela de medidas.
// para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
// A função *obterDadosGrafico* também invoca a função *plotarGrafico*

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function obterDadosGrafico(idAquario) {
  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }

  fetch(`/medidas/ultimas/${idAquario}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          resposta.reverse();

          plotarGrafico(resposta, idAquario);
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

          plotarGrafico(resposta,respostaSemanal,idAquario);
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

function plotarGrafico(resposta,respostaSemanal, idAquario) {
  console.log("iniciando plotagem do gráfico...");

  var DadosSemanais = {
    labels: [],
    datasets: [
      {
        yAxisID: "y-umidade",
        label: "Umidade Semanal",
        fill: true,
        borderColor: "#8008FF",
        backgroundColor: "#8008FF",
        fill: true,
        data: [],
      },
    ],
  };
  var DadosSemanaisTemp = {
    labels: [],
    datasets: [
      {
        yAxisID: "y-temperatura",
        label: "Temperatura Semanal",
        fill: true,
        borderColor: "#8008FF",
        backgroundColor: "#8008FF",
        fill: true,
        data: [],
      },
    ],
  };

  var dados = {
    labels: [],
    datasets: [
      {
        yAxisID: "y-umidade",
        label: "Umidade",
        fill: true,
        borderColor: "#8008FF",
        backgroundColor: "#8008FF",
        fill: true,
        data: [],
      },
    ],
  };

  var dadosTemp = {
    labels: [],
    datasets: [
      {
        yAxisID: "y-temperatura",
        label: "Temperatura",
        fill: true,
        borderColor: "#8008FF",
        backgroundColor: "#8008FF",
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
  for (i = 0; i < respostaSemanal.length; i++) {
    var registro = respostaSemanal[i];
    DadosSemanais.labels.push(registro.momento_grafico);
    DadosSemanaisTemp.datasets[0].data.push(registro.umidade);
    DadosSemanaisTemp.datasets[0].data.push(registro.temperatura);
  }

  console.log(JSON.stringify(dados));
  // umidade

  // umi bar
  var ctx = UMI_ChartBAR.getContext("2d");
  console.log(ctx);
  window.grafico_linha = Chart.Line(ctx, {
    data: DadosSemanais,
    options: {
      responsive: true,
      animation: { duration: 500 },
      hoverMode: "index",
      stacked: false,
      title: {
        display: false,
        text: "Dados capturados",
      },
      scales: {
        yAxes: [
          {
            type: "bar",
            display: true,
            position: "left",
            id: "y-umidade",
            ticks: {
              beginAtZero: true,
              max: 100,
              min: 0,
            },

            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
      },
    },
  });

  // umi line
  var ctx = UMI_ChartLINE.getContext("2d");
  console.log(ctx);
  window.grafico_linha = Chart.Line(ctx, {
    data: dados,
    options: {
      responsive: true,
      animation: { duration: 500 },
      hoverMode: "index",
      stacked: false,
      title: {
        display: false,
        text: "Dados capturados",
      },
      scales: {
        yAxes: [
          {
            type: "linear",
            display: true,
            position: "left",
            id: "y-umidade",
            ticks: {
              beginAtZero: true,
              max: 100,
              min: 0,
            },

            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
      },
    },
  });
  // temp
  // umi bar
  var ctx = TEMP_ChartBAR.getContext("2d");
  window.grafico_linhaTemp = Chart.Line(ctx, {
    data: DadosSemanaisTemp,
    options: {
      responsive: true,
      animation: { duration: 500 },
      hoverMode: "index",
      stacked: false,
      title: {
        display: false,
        text: "Dados capturados",
      },
      scales: {
        yAxes: [
          {
            type: "bar",
            display: true,
            position: "left",
            id: "y-temperatura",
            ticks: {
              beginAtZero: true,
              max: 60,
              min: 0,
            },
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
      },
    },
  });
  // umi line
  var ctx = TEMP_ChartLINE.getContext("2d");
  window.grafico_linhaTemp = Chart.Line(ctx, {
    data: dadosTemp,
    options: {
      responsive: true,
      animation: { duration: 500 },
      hoverMode: "index",
      stacked: false,
      title: {
        display: false,
        text: "Dados capturados",
      },
      scales: {
        yAxes: [
          {
            type: "linear",
            display: true,
            position: "left",
            id: "y-temperatura",
            ticks: {
              beginAtZero: true,
              max: 60,
              min: 0,
            },
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
      },
    },
  });

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

          window.grafico_linha.update();
          window.grafico_linhaTemp.update();

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
  var limites = {
    muito_quente: 23,
    quente: 22,
    ideal: 20,
    frio: 10,
    muito_frio: 5,
  };
  var limitesUmi = {
    max: 23,
    meioMax: 22,
    ideal: 20,
    meioMin: 10,
    mix: 5,
  };

  if (temperatura >= limites.muito_quente) {
    classe_temperatura = "cor-alerta perigo-quente";
    console.log("caiu no 1");
  } else if (
    temperatura < limites.muito_quente &&
    temperatura >= limites.quente
  ) {
    classe_temperatura = "cor-alerta alerta-quente";
    console.log("caiu no 2");
  } else if (temperatura < limites.quente && temperatura > limites.frio) {
    classe_temperatura = "cor-alerta ideal";
    console.log("caiu no 3");
  } else if (temperatura <= limites.frio && temperatura > limites.muito_frio) {
    classe_temperatura = "cor-alerta alerta-frio";
    console.log("caiu no 4");
  } else if (temperatura < limites.min_temperatura) {
    classe_temperatura = "cor-alerta perigo-frio";
    console.log("caiu no 5");
  }

  if (umidade >= limitesUmi.max) {
    classe_umidade = "cor-alerta perigo-quente";
    console.log("caiu no 1");
  } else if (umidade < limitesUmi.max && umidade >= limitesUmi.meioMax) {
    classe_umidade = "cor-alerta alerta-quente";
    console.log("caiu no 2");
  } else if (umidade < limitesUmi.meioMax && umidade > limitesUmi.meioMin) {
    classe_umidade = "cor-alerta ideal";
    console.log("caiu no 3");
  } else if (umidade <= limitesUmi.frio && umidade > limitesUmi.muito_frio) {
    classe_umidade = "cor-alerta alerta-frio";
    console.log("caiu no 4");
  } else if (umidade < limitesUmi.min_umidade) {
    classe_umidade = "cor-alerta perigo-frio";
    console.log("caiu no 5");
  }

  if (temperatura != null) {
    kpi_temp.innerHTML = temperatura + "°C";
  }
  if (umidade != null) {
    kpi_umi.innerHTML = umidade + "%";
  }
}
