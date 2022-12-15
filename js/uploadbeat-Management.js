//work in progress
//En este archivo se gestionará la subida de musica por parte de algunos usuarios verificafdos

window.onload = function () {
  let btnupload = document.getElementById("upload");
  let title = document.getElementById("title");
  let scale = document.getElementById("scale");
  let price = document.getElementById("price");
  let photo = document.getElementById("photo");
  let mp3 = document.getElementById("mp3");
  let wav = document.getElementById("wav");
  let zip = document.getElementById("zip");
  let errors = new Array();

  btnupload.addEventListener("click", function () {
    errors = new Array(); 
    if (!title.value) {
      errors.push("Introduce un título");
    }
    if (!scale.value) {
      errors.push("Introduce una escala");
    }
    if (!price.value) {
      errors.push("Introduce un precio");
    }
    if (!photo.value) {
      errors.push("Selecciona una foto");
    }
    if (!mp3.value) {
      errors.push("Selecciona una pista de audio");
    }
    if (!wav.value) {
      errors.push("selecciona un archivo .wav");
    }
    if (!zip.value) {
      errors.push("selecciona un archivo .zip");
    }

    if (errors.length > 0) {
      console.log(errors);
    } else {
        console.log(zip.value);
     /* xhttp = new XMLHttpRequest();
      var params = new FormData();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          if (this.response) {
            console.log(this.response);
          }
        }
      };
      xhttp.open("POST", "php/users-data.php", false);
      xhttp.send(params);*/
    }
  });
};
