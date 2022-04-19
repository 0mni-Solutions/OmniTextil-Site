function cadastrar() {
  aguardar();

  // PARAMETRIZANDO VARIÁVEIS
  var nomeVar = input_nome.value;
  var emailVar = input_email.value;
  var senhaVar = input_senha.value;
  var confirmacaoSenhaVar = input_confirmar_senha.value;
  var cargoVar = select_cargo.value;
  var empresaVar = sessionStorage.EMPRESA_USUARIO;
  var adminVar = sessionStorage.ID_USUARIO;

  // CONFIRMAÇÕES DE PREENCHIMENTOS
  // CAMPO VAZIO
  if (
    nomeVar == "" ||
    emailVar == "" ||
    senhaVar == "" ||
    confirmacaoSenhaVar == "" ||
    cargoVar == "VAZIO"
  ) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML = "Campo não preenchido!";
    // ressaltando bordas
    input_nome.style.border = "3px solid #8008FF";
    input_email.style.border = "3px solid #8008FF";
    input_senha.style.border = "3px solid #8008FF";
    input_confirmar_senha.style.border = "3px solid #8008FF";
    select_cargo.style.border = "3px solid #8008FF";
    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  // E-MAIL INVÁLIDO
  if (emailVar.indexOf("@") == -1 || emailVar.indexOf(".com") == -1) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML = "E-mail inválido!";
    input_email.style.border = "3px solid #8008FF";
    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  // SENHA DIFERENTE
  if (senhaVar != confirmacaoSenhaVar) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML = "As senhas necessitam ser iguais";
    input_senha.style.border = "3px solid #8008FF";
    input_confirmar_senha.style.border = "3px solid #8008FF";
    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  // DATA DE CADASTRO VIA JAVASCRIPT
  /*var data = new Date();
  var ano = data.getFullYear();
  var mes = String(data.getMonth() + 1).padStart(2, "0"); // somar +1 por conta do JS contar meses de 0-11
  var dia = String(data.getDate()).padStart(2, "0"); // "pad start" para adicionar um 0 no início de dias com 1 dígito
  var segundo = String(data.getSeconds()).padStart(2, "0");
  var minuto = String(data.getMinutes()).padStart(2, "0");
  var hora = String(data.getHours()).padStart(2, "0");
  var dtCadastroVar = `${dia}/${mes}/${ano}<br />${hora}:${minuto}:${segundo}`;*/

  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
      emailServer: emailVar,
      senhaServer: senhaVar,
      cargoServer: cargoVar,
      empresaServer: empresaVar,
      adminServer: adminVar,
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML = "Cadastro realizado com sucesso!";
        atualizarMembros()
        finalizarAguardar();
        // window.location = "login.html";
        // limparFormulario();
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      finalizarAguardar();
    });

  return false;
}

function atualizarMembros() {
  var empresaVar = sessionStorage.EMPRESA_USUARIO;
  //aguardar();
  fetch(`/avisos/listar/${sessionStorage.getItem('fkEmpresa')}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          var tabela_membros = document.getElementById("card_membros");
          var mensagem = document.createElement("span");
          mensagem.innerHTML = "Nenhum resultado encontrado.";
          mensagem.id = "membros_erro";
          tabela_membros.appendChild(mensagem);
          throw "Nenhum resultado encontrado!!";
        }

        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          var tabela_membros = document.getElementById("table_membros");
          tabela_membros.innerHTML = "";
          for (let i = 0; i < resposta.length; i++) {
            var usuario = resposta[i];

            // criando elementos do HTML via JavaScript
            var rowUsuario = document.createElement("tr");
            var dataAdmin = document.createElement("td");
            var dataNome = document.createElement("td");
            var dataEmail = document.createElement("td");
            var dataCargo = document.createElement("td");
            var dataCadastro = document.createElement("td");

            // colocando valores do select no innerHTML
            dataAdmin.innerHTML = usuario.nomeAdmin;
            dataNome.innerHTML = usuario.nome;
            dataEmail.innerHTML = usuario.email;
            dataCargo.innerHTML = usuario.cargo;
            dataCadastro.innerHTML = usuario.dtCadastro;

            // classificando os elementos já criados
            dataAdmin.className = "td-custom td-small";
            dataNome.className = "td-custom td-large";
            dataEmail.className = "td-custom td-large";
            dataCargo.className = "td-custom td-medium";
            dataCadastro.className = "td-custom td-medium";

            // adicionando todos à um elemento pai pré-existente
            rowUsuario.appendChild(dataAdmin);
            rowUsuario.appendChild(dataNome);
            rowUsuario.appendChild(dataEmail);
            rowUsuario.appendChild(dataCargo);
            rowUsuario.appendChild(dataCadastro);
            tabela_membros.appendChild(rowUsuario);
          }

          finalizarAguardar();
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
      finalizarAguardar();
    });
}

function sumirMensagem() {
  cardErro.style.display = "none";
  mensagem_erro.innerHTML = "Campo não preenchido!";

  // normalizando bordas
  input_nome.style.border = "0px";
  input_email.style.border = "0px";
  input_senha.style.border = "0px";
  input_confirmar_senha.style.border = "0px";
  select_cargo.style.border = "0px";
}

