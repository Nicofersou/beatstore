let conexion;
var beats = [];
var beatNames = [];
var currentBeatIndex = 0;

window.onload = function () {

  //creacion de la conexion
  conexion = new XMLHttpRequest();
  conexion.open("GET", "php/loadBeatsData.php", true);
  conexion.send();
  conexion.onreadystatechange = function () {
    if (this.readyState == 4) {
      //si se ha realizado con exito el intercambio de datos llamamos a la funcion que se encarga de crear mediante DOM
      //la pagina principal
      showBeats(JSON.parse(this.response));
    }
  };
};

function showBeats(data) {
  let audio = document.getElementById("main-audio");
  var container = document.getElementById("beats");
  for (let i = 0; i < data.length; i++) {
    //contenedor de cada beat
    let divPadre = document.createElement("div");
    divPadre.className = "beat";
    //contenedor de la caratula
    let divimg = document.createElement("div");
    divimg.className = "imgBeat";
    let img = document.createElement("img");
    img.src = data[i]["imagepath"];
    img.alt = "Caratula Beat";
    img.setAttribute("width", "100%");
    img.setAttribute("height", "100%");
    divimg.appendChild(img);
    divPadre.appendChild(divimg);
    //contenedor del titulo
    let divtxtbeat = document.createElement("div");
    divtxtbeat.className = "txtBeat";
    let h1titulo = document.createElement("h1");
    h1titulo.innerHTML = data[i]["name"];
    divtxtbeat.appendChild(h1titulo);
    //contenedor audio
    let divaudioplayer = document.createElement("div");
    divaudioplayer.className = "audio-player";
    let btPlay = document.createElement("button");
    btPlay.className = "playCard";
    btPlay.style.marginBottom = "1em";
    btPlay.innerHTML = "Reproducir";

    divaudioplayer.appendChild(btPlay);

    let form = document.createElement("form");
    form.name = "f" + data[i]["id"];
    form.action = "./php/getbeatdetails.php";
    form.method = "POST";
    let inputid = document.createElement("input");
    inputid.type = "hidden";
    inputid.setAttribute("name", "id");
    inputid.setAttribute("value", data[i]["id"]);

    let btComprar = document.createElement("button");
    btComprar.action = "submit";
    btComprar.className = "see_more";
    btComprar.style.marginBottom = "1em";
    btComprar.innerHTML = "Comprar";

    form.appendChild(inputid);
    form.appendChild(btComprar);
    divtxtbeat.appendChild(divaudioplayer);
    divtxtbeat.appendChild(form);
    divPadre.appendChild(divtxtbeat);
    container.appendChild(divPadre);
    window.beats.push(data[i]["audiopath"] + data[i]["name"] + ".mp3");
    window.beatNames.push(data[i]["name"]);

    //Listener para cambiar el audio src y hacer visible el reproductor
    btPlay.addEventListener('click', function () {

      let xhr = new XMLHttpRequest();
      xhr.open('GET', data[i]["audiopath"] + data[i]["name"] + ".mp3");
      xhr.responseType = 'arraybuffer';

      xhr.onload = (e) => {
        let blob = new Blob([xhr.response]);
        let url = URL.createObjectURL(blob);
        audio.src = url
        audio.play();
      }

      xhr.send();

      const beatName = document.querySelector('.player-beat-name > h3');
      beatName.innerHTML = data[i]["name"];
      const timeline = document.querySelector('.slider');
      timeline.value = 1;
      let footer = document.querySelector('.footer-wrapper');
      footer.classList.add('slide');
      footer.style.visibility = 'visible';
      let playBtn = document.querySelector('.play-button');
      playBtn.innerHTML = `
      <svg
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:cc="http://creativecommons.org/ns#"
          xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
          xmlns:svg="http://www.w3.org/2000/svg"
          xmlns="http://www.w3.org/2000/svg"
          id="pause-icon"
          version="1.1"
          height="50"
          width="50"
          viewBox="0 0 1200 1200"
                  fill="#FFFFFF">
          <path
            id="path15778"
            d="M 600,0 C 268.62914,0 0,268.62914 0,600 c 0,331.37086 268.62914,600 600,600 331.37086,0 600,-268.62914 600,-600 C 1200,268.62914 931.37086,0 600,0 z m -269.16515,289.38 181.71397,0 0,621.24 -181.71397,0 0,-621.24 z m 356.61633,0 181.71399,0 0,621.24 -181.71399,0 0,-621.24 z" />
          </svg>
      `;
    });

  }

}
