title_cadastro.innerHTML = "CADASTRO";
button_cadastrar.style.display = "flex";
button_editar.style.display = "none";
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

  // ELIMINAÇÃO DE ESPAÇOS
  nomeVar.trimStart().trimEnd();
  emailVar.trimStart().trimEnd();
  senhaVar.trimStart().trimEnd();

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

  if (senhaVar.length < 8) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML = "A senha precisa ter no mínimo 8 dígitos";
    input_senha.style.border = "3px solid #8008FF";
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
        atualizarMembros();
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
  //aguardar();
  fetch(`/avisos/listar/${sessionStorage.EMPRESA_USUARIO}`)
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

            // FORMA SIMPLES
            tabela_membros.innerHTML += `
            <tr>
              <td class="td-custom td-small">${usuario.nomeAdmin}</td>
              <td class="td-custom td-large">${usuario.nomeUsuario}</td>
              <td class="td-custom td-large">${usuario.email}</td>
              <td class="td-custom td-medium">${usuario.cargo}</td>
              <td class="td-custom td-medium">${usuario.cadastroUsuario}</td>
              <td class="td-custom td-icon" id="btnEditar${usuario.idUsuario}" onclick="editarList(${usuario.idUsuario})">
              <img src="../assets/imgs/editar.png" id="edit_logo" title="editar" /></td>              
              <td class="td-custom td-icon" id="btnExcluir${usuario.idUsuario}" onclick="confirmarAction('excluir', ${usuario.idUsuario})">
              <img src="../assets/imgs/remover.png" id="edit_logo" title="remover" /></td>
            </tr>
            `;


            // FORMA COMPLEXA -----------------------
            /*// criando elementos do HTML via JavaScript
            var rowUsuario = document.createElement("tr");
            var dataAdmin = document.createElement("td");
            var dataNome = document.createElement("td");
            var dataEmail = document.createElement("td");
            var dataCargo = document.createElement("td");
            var dataCadastro = document.createElement("td");
            var optEditar = document.createElement("td");
            var optExcluir = document.createElement("td");

            // colocando valores do select no innerHTML
            dataAdmin.innerHTML = usuario.nomeAdmin;
            dataNome.innerHTML = usuario.nomeUsuario;
            dataEmail.innerHTML = usuario.email;
            dataCargo.innerHTML = usuario.cargo;
            dataCadastro.innerHTML = usuario.cadastroUsuario;
            optEditar.innerHTML = `<img src="../assets/imgs/editar.png" id="edit_logo" title="editar" />`;
            optExcluir.innerHTML = `<img src="../assets/imgs/remover.png" id="edit_logo" title="remover" />`;

            // classificando os elementos já criados
            dataAdmin.className = "td-custom td-small";
            dataNome.className = "td-custom td-large";
            dataEmail.className = "td-custom td-large";
            dataCargo.className = "td-custom td-medium";
            dataCadastro.className = "td-custom td-medium";
            optEditar.className = "td-custom td-icon";
            optExcluir.className = "td-custom td-icon";

            // atribuindo função aos botões
            // EDITAR
            optEditar.id = "btnEditar" + usuario.idUsuario;
            optEditar.setAttribute(
              "onclick",
              `editarList(${usuario.idUsuario})`
            );
            // EXCLUIR
            optExcluir.id = "btnExcluir" + usuario.idUsuario;
            optExcluir.setAttribute(
              "onclick",
              `confirmarAction('excluir', ${usuario.idUsuario})`
            );

            idUsuario = usuario.idUsuario;

            // adicionando todos à um elemento pai pré-existente
            tabela_membros.appendChild(rowUsuario);
            rowUsuario.appendChild(dataAdmin);
            rowUsuario.appendChild(dataNome);
            rowUsuario.appendChild(dataEmail);
            rowUsuario.appendChild(dataCargo);
            rowUsuario.appendChild(dataCadastro);
            rowUsuario.appendChild(optEditar);
            rowUsuario.appendChild(optExcluir);*/
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

function removerMembro(idUsuario) {
  if (idUsuario == sessionStorage.ID_USUARIO) {
    alert("Você não pode se excluir");
  } else {
    console.log("Criar função de apagar usuário escolhido - ID" + idUsuario);
    fetch(`/avisos/deletar/${idUsuario}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (resposta) {
        if (resposta.ok) {
          cardErro.style.display = "block";
          mensagem_erro.innerHTML = "Exclusão realizada com sucesso!";
          atualizarMembros();
          fecharConfirm();
          finalizarAguardar();
        } else if (resposta.status == 404) {
          window.alert("Deu 404!");
        } else {
          throw (
            "Houve um erro ao tentar realizar a exclusão! Código da resposta: " +
            resposta.status
          );
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
      });
  }
}

function editarList(idUsuario) {
  if (idUsuario == sessionStorage.ID_USUARIO) {
    alert("Você não pode se editar");
  } else {
    //aguardar();
    fetch(`/avisos/editarList/${idUsuario}`)
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

            for (let i = 0; i < resposta.length; i++) {
              var usuario = resposta[i];

              input_nome.value = usuario.nomeUsuario;
              input_email.value = usuario.email;
              input_senha.value = usuario.senha;
              input_confirmar_senha.value = usuario.senha;
              select_cargo.value = usuario.cargo;
            }

            title_cadastro.innerHTML = "ATUALIZAÇÃO";
            button_cadastrar.style.display = "none";
            button_editar.style.display = "flex";
            button_editar.setAttribute(
              "onclick",
              `confirmarAction('editar', ${usuario.idUser})`
            );

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
}

function editarUpdate(idUser) {
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

  fetch(`/avisos/editarUpdate/${idUser}`, {
    method: "PUT",
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
        mensagem_erro.innerHTML = "Edição realizada com sucesso!";
        atualizarMembros();
        fecharConfirm();
        finalizarAguardar();

        // RESET DO CARD DE CADASTRO
        title_cadastro.innerHTML = "CADASTRO";
        button_cadastrar.style.display = "flex";
        button_editar.style.display = "none";
        // RESET DE INPUTS
        input_nome.value = "";
        input_email.value = "";
        input_senha.value = "";
        input_confirmar_senha.value = "";
        select_cargo.value = "VAZIO";
      } else {
        throw "Houve um erro ao tentar realizar a atualização!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      finalizarAguardar();
    });

  return false;
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
