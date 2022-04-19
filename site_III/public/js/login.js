function entrar() {
  aguardar();

  var emailVar = input_email.value;
  var senhaVar = input_senha.value;

  // TODO: VERIFICAR AS VALIDAÇÕES QUE ELES ESTÃO APRENDENDO EM ALGORITMOS
  if (emailVar == "" || senhaVar == "") {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML = "Campo não preenchido!";
    input_email.style.border = "3px solid #8008FF";
    input_senha.style.border = "3px solid #8008FF";
    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  if (emailVar.indexOf("@") == -1 || emailVar.indexOf(".com") == -1) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML = "E-mail inválido!";
    input_email.style.border = "3px solid #8008FF";
    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!");
      
      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));

          sessionStorage.ID_USUARIO = json.idUsuario;
          sessionStorage.NOME_USUARIO = json.nome;
          sessionStorage.EMAIL_USUARIO = json.email;
          sessionStorage.CARGO_USUARIO = json.cargo;
          // sessionStorage.EMPRESA_USUARIO = json.fkEmpresa;
          sessionStorage.setItem(`fkEmpresa`, `${json.fkEmpresa}`);

          setTimeout(function () {
            window.location = "../unidades.html";
          }, 1000); // apenas para exibir o loading
        });
      } else {
        console.log("Houve um erro ao tentar realizar o login!");

        // resposta.text().then(texto => {
        //     console.error(texto);
        //     finalizarAguardar(texto);
        // });
        cardErro.style.display = "block";
        mensagem_erro.innerHTML = "E-mail e/ou senha errados!";
        finalizarAguardar();
        return false;
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });

  return false;
}

function sumirMensagem() {
  cardErro.style.display = "none";
  input_email.style.border = "0px";
  input_senha.style.border = "0px";
}
