//En este fichero se gestionan las funciones relacionadas con los usuarios
//declaracion de las expresiones regulares relacionadas con el registro de usuarios para validar los campos del usuario y de la contraseña
const nameExpresion = new RegExp("^[A-Za-z0-9]{5,14}$");
const passExpresion = new RegExp("^[A-Za-z0-9]{5,20}$");
var namevalidated = false;
var passvalidated = false;
var user_name = "";
var user_pass = "";
window.onload = function () {
  //Tenemo un comprobación para saber en que fichero nos encontramos, en este caso comprobamos si estamos en la página de registro
  if (document.getElementById("register")) {
    let btnRegister = document.getElementById("register");

    let name = document.getElementById("name");
    let pass = document.getElementById("pass");
    //Validamos el nombre una vez se pierda el foco de su campo y en funcion del resultado mostramos el error o confirmamos que es valido
    name.addEventListener("blur", function () {
      if (!nameExpresion.test(this.value)) {
        this.style.borderColor = "red";
        document.getElementById("error").innerHTML =
          "El usuario debe tener entre 5 y 14 letras y/o numeros";
        document.getElementById("error").style.color = "white";
        namevalidated = false;
      } else {
        this.style.borderColor = "black";
        document.getElementById("error").innerHTML = "";
        namevalidated = true;
        user_name = this.value;
      }
    });
//Validamos la contraseña una vez se pierda el foco de su campo y en funcion del resultado mostramos el error o confirmamos que es valida
    pass.addEventListener("blur", function () {
      if (!passExpresion.test(this.value)) {
        this.style.borderColor = "red";
        document.getElementById("error").innerHTML =
          "La contraseña debe tener entre 5 y 20 letras y/o numeros";
        document.getElementById("error").style.color = "white";
        passvalidated = false;
      } else {
        this.style.borderColor = "black";
        document.getElementById("error").innerHTML = "";
        passvalidated = true;
        user_pass = this.value;
      }
    });
//En cuanto el usuario le da a registrarse comprobamos que los campos son validamos e inciamos una llamada al servidor mediante ajax
//para realizar la insercción de los datos. Si no existe ningún problema redireccionamos a la página de login
    btnRegister.addEventListener("click", function () {
      if (passvalidated && namevalidated) {
        var params = new FormData();
        params.append("register_username", user_name);
        params.append("register_password", user_pass);
       

        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            if (this.response) {
              document.location.href = "/login.html";
            } else {
              document.getElementById("error").innerHTML =
                "Ha habido un error al crear el usuario, por favor vuelve a introducir los datos";
              document.getElementById("error").style.color = "white";
            }
          }
        };
        xhttp.open("POST", "php/register-management.php", false);
        xhttp.send(params);
      } else {
        document.getElementById("error").innerHTML =
          "Por favor, introduce los datos correctamente antes de registrarte";
        document.getElementById("error").style.color = "white";
      }
    });

    //Comprobamos que estamos en la pantalla para iniciar sesión y cogemos los valores de los campos cuando pierden el foco
  } else if (document.getElementById("login")) {
    let btnLogin = document.getElementById("login");

    let name = document.getElementById("username");
    let pass = document.getElementById("pass");

    name.addEventListener("blur", function () {
      user_name = this.value;
    });

    pass.addEventListener("blur", function () {
      user_pass = this.value;
    });

    btnLogin.addEventListener("click", function () {
      if (user_name != "" && user_pass != "") {
        var params = new FormData();
        params.append("username", user_name);
        params.append("password", user_pass);

        let xhttp = new XMLHttpRequest();
//Hacemos la llamada al servido con ajax y en función de la respuesta redireccionamos a la página principal o mostramos un error al logearse
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            if (this.response) {
              document.location.href = "/index.php";
            } else {
              document.getElementById("error").innerHTML =
                "Usuario o contraseña no válidos";
              document.getElementById("error").style.color = "white";
            }
          }
        };
        xhttp.open("POST", "php/login-management.php", false);
        xhttp.send(params);
      } else {
        document.getElementById("error").innerHTML =
          "Por favor, introduce los datos correctamente antes de registrarte";
        document.getElementById("error").style.color = "white";
      }
    });
    //Por ultimo en este fichero, tenemos la pantalla del perfil del usuario
  } else if (document.getElementById("name")) {
    var username = "";
    namevalidated = false;
    let xhttp = new XMLHttpRequest();
    //Lo primero que hacemos es hacer una consula al servidor para saber el valor de la variable de sesion que guarda el nombre de usuario
    //que está acutalmente en nuestra web
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        username = this.response;
        document.getElementById("name").innerHTML = username;
      }
    };
    xhttp.open("GET", "php/users-data.php", false);
    xhttp.send();
  }
  //Aquí está la gestión para el cambio de nombre
  var btnnewUser = document.getElementById("new_register");
  let newUser = document.getElementById("new_name");
  //Validamos el nuevo nombre de usuario para comprobar que es valido cuando el usuario sale del campo de entrada de texto
  newUser.addEventListener("blur", function () {
    if (!nameExpresion.test(this.value)) {
      this.style.borderColor = "red";
      document.getElementById("error").innerHTML =
        "El usuario debe tener entre 5 y 14 letras y/o numeros";
      document.getElementById("error").style.color = "white";
      namevalidated = false;
    } else {
      this.style.borderColor = "black";
      document.getElementById("error").innerHTML = "";
      namevalidated = true;
      user_name = this.value;
    }
  });
//Un vez validado el nombre realizamos una llamada al servidor para cambiarlo
  btnnewUser.addEventListener("click", function () {
    if (namevalidated) {
      xhttp = new XMLHttpRequest();
      var params = new FormData();
      params.append("newUser", user_name);
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          if (this.response) {
            document.getElementById("name").innerHTML = user_name;
          }
        }
      };
      xhttp.open("POST", "php/users-data.php", false);
      xhttp.send(params);
    }
  });
//A continución empieza la gestion de cambio de contraseña, para eso pedimos al usuario que primero ingrese la actual y a continuacion la nueva
  var btnnewPass = document.getElementById("new_register_pass");
  let oldpass = document.getElementById("old_pass");
  let newpass = document.getElementById("new_pass");
  passvalidated = false;
//Validamos que la nueva cumple con todos los requisitos 

  newpass.addEventListener("blur", function () {
    if (!passExpresion.test(this.value)) {
      this.style.borderColor = "red";
      document.getElementById("error").innerHTML =
        "La contraseña debe tener entre 5 y 20 letras y/o numeros";
      document.getElementById("error2").style.color = "white";
      passvalidated = false;
    } else {
      this.style.borderColor = "black";
      document.getElementById("error2").innerHTML = "";
      passvalidated = true;
      user_pass = this.value;
    }
  });
//Y procedemos a enviar los datos al servidor para comprobar que la contraseña actual es valida e inmediatamente cambiar la contraseña
  btnnewPass.addEventListener("click", function () {
    if (passvalidated && oldpass.value != "") {
      xhttp = new XMLHttpRequest();
      var params = new FormData();
      params.append("newPass", user_pass);
      params.append("oldPass", oldpass.value);
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          if (this.response) {
            console.log(this.response);
          }
        }
      };
      xhttp.open("POST", "php/users-data.php", false);
      xhttp.send(params);
    }
  });
  //Por ultimos tenemos la funcion de eliminar la cuenta por completo, y lo realizamos con una ventana modal que se abre al hacer click
  //en el boton de eliminar
  let abrirModal = document.getElementById("delete");
  abrirModal.addEventListener("click", function () {
    document.getElementById("miModal").style.opacity = "1";
    document.getElementById("miModal").style.pointerEvents = "auto";
  });
//En esta ventana pedimos la contraseña actual para que el usuario verifique que de verdad quiere eliminar la cuenta
  let confirmPass = document.getElementById("confirm_pass");
  let passconfirmed = "";
  confirmPass.addEventListener("blur", function () {
    passconfirmed = this.value;
  });
  let btndelete = document.getElementById("delete2");
  btndelete.addEventListener("click", function () {
    if (passconfirmed != "") {
      //Si la contraseña es valida reutilizamos la llamada al servidor del login para validarla en la base de datos
      var params = new FormData();
      params.append("username", username);
      params.append("password", passconfirmed);
      let xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          if (this.response) {
            //Y si la contraseña se corresponde con el usuario se realiza otra llamada al servidor para eliminar el usuario de la base de datos
            xhtt = new XMLHttpRequest();
            var params = new FormData();
            params.append("userToDelete", username);
            xhtt.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                if (this.response) {
                  //Si se elimina correctamente se redirecciona al usuario a la página principal
                  document.location.href = "/index.php";
                }
              }
            };
            xhtt.open("POST", "php/users-data.php", false);
            xhtt.send(params);
          } else {
            document.getElementById("errorDelete").innerHTML =
              "contraseña inválida";
            document.getElementById("errorDelete").style.color = "white";
          }
        }
      };
      xhttp.open("POST", "php/login-management.php", false);
      xhttp.send(params);
    }
  });
};
