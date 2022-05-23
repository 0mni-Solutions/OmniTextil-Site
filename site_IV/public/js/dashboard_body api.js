let proximaAtualizacao;

window.onload = obterDadosGrafico(1);

b_usuario.innerHTML = sessionStorage.NOME_USUARIO;

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
  idAquario = 1;
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
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e,
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resposta, idAquario) {
  console.log("iniciando plotagem do gráfico...");

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
    dados.datasets[0].data.push(registro.umidade);
    dadosTemp.datasets[0].data.push(registro.temperatura);
  }

  console.log(JSON.stringify(dados));
  // umidade
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

  var ctx = TEMP_ChartLINE.getContext("2d");
  window.grafico_linha = Chart.Line(ctx, {
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

  setTimeout(() => atualizarGrafico(idAquario, dados), 2000);
}

// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas,

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico(idAquario, dados) {
  fetch(`/medidas/tempo-real/${idAquario}`, { cache: "no-store" })
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

          dados.datasets[1].data.shift(); // apagar o primeiro de temperatura
          dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

          window.grafico_linha.update();

          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          proximaAtualizacao = setTimeout(
            () => atualizarGrafico(idAquario, dados),
            2000
          );
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(
          () => atualizarGrafico(idAquario, dados),
          2000
        );
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

// cards

function obterdados(idAquario) {
  fetch(`/medidas/tempo-real/${idAquario}`)
    .then((resposta) => {
      if (resposta.ok) {
        resposta.json().then((resposta) => {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

          var dados = {
            temperatura: resposta[0].temperatura,
          };

          alertar(resposta[0].temperatura, idAquario);
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
}

function alertar(temperatura, idAquario) {
  var limites = {
    muito_quente: 23,
    quente: 22,
    ideal: 20,
    frio: 10,
    muito_frio: 5,
  };

  var classe_temperatura = "cor-alerta";

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
  } else if (
    temperatura <= limites.frio &&
    temperatura > limites.muito_frio
  ) {
    classe_temperatura = "cor-alerta alerta-frio";
    console.log("caiu no 4");
  } else if (temperatura < limites.min_temperatura) {
    classe_temperatura = "cor-alerta perigo-frio";
    console.log("caiu no 5");
  }

  var card;

  if (idAquario == 1) {
    kpi_temp.innerHTML = temperatura + "°C";
    card = card_1;
  } 

  // alterando
  card.className = classe_temperatura;
}
