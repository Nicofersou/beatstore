//En este archivo cargamos los datos de las instrumentales mediante una consulta al servidor
//que nos devuelve un array de datos en formato json

let conexion;

window.onload = function () {

  conexion = new XMLHttpRequest();
  conexion.open("GET", "php/loadCustomerBeats.php", true);
  conexion.send();
  conexion.onreadystatechange = function () {
    if (this.readyState == 4) {
      try {
        showBeats(JSON.parse(this.response));
      } catch {
        showBeats('');
      }
    }
  };
};
//Esta funcion crea dinamicamente los elementos del html con los valores deseados y los datos obtenidos de la consulta
function showBeats(data) {

  const table = document.querySelector('tbody');

  if (data.length > 0) {

    for (let i = 0; i < data.length; i++) {
      const row = document.createElement("tr");

      const imageRow = document.createElement("td");
      const image = document.createElement("img");
      image.src = data[i]["imagepath"];
      image.className = 'table-img';
      imageRow.appendChild(image);

      const name = document.createElement("td");
      name.innerHTML = data[i]["name"];

      const scale = document.createElement("td");
      scale.innerHTML = data[i]["scale"];

      const bpm = document.createElement("td");
      bpm.innerHTML = data[i]["bpm"];

      const licencia = document.createElement("td");
      licencia.innerHTML = data[i]["licencia"][0].toUpperCase() + data[i]["licencia"].substring(1);

      let fileExtension;
      switch (data[i]["licencia"].toLowerCase()) {
        case 'normal':
          fileExtension = '.mp3';
          break;

        case 'premium':
          fileExtension = '.wav';
          break;

        case 'exclusive':
          fileExtension = '.zip';
          break;
      }

      const downloadRow = document.createElement("td");
      const downloadLink = document.createElement("a");
      downloadLink.innerHTML = 'Download';
      downloadLink.className = 'cart-download';

      let xhr = new XMLHttpRequest();
      xhr.open('GET', `${data[i]['audiopath']}${data[i]['name']}${fileExtension}`);
      xhr.responseType = 'arraybuffer';

      xhr.onload = (e) => {
        let blob = new Blob([xhr.response]);
        let url = URL.createObjectURL(blob);
        downloadLink.href = url;
      }

      xhr.send();

      downloadLink.download = `${data[i]['name']}${fileExtension}`;
      downloadLink.style.visibility = 'hidden';
      const body = document.querySelector('body');
      body.appendChild(downloadLink);

      row.appendChild(imageRow);
      row.appendChild(name);
      row.appendChild(scale);
      row.appendChild(bpm);
      row.appendChild(licencia);


      const lds = document.createElement('div');
      lds.className = 'lds-facebook';
      lds.appendChild(document.createElement('div'));
      lds.appendChild(document.createElement('div'));
      lds.appendChild(document.createElement('div'));
      downloadRow.appendChild(lds);

      
      row.appendChild(downloadRow);

      table.appendChild(row);

      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === "attributes") {
            try {
              body.removeChild(downloadLink);
            } catch {
            }
            downloadRow.appendChild(downloadLink);
            try {
              downloadRow.removeChild(lds);
            } catch {
            }
            downloadLink.style.visibility = 'visible';
          }
        });
      });
      
      observer.observe(downloadLink, {
        attributes: true
      });

    }

  } else {

    const table = document.querySelector('#myTable');
    table.remove();

    const h2 = document.createElement('h2');
    h2.className = 'no-beats';
    h2.innerHTML = 'No se han encontrado beats';

    const tableWrapper = document.querySelector('.table-wrapper');
    tableWrapper.appendChild(h2);

  }

}
