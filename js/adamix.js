
//Funcion para tomar los parametros que esta por get, via JS.
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

//index.html?nombre=amadis

/*
document.getElementById('lafoto').addEventListener('change',
    handleFileSelect, false);

    //https://www.html5rocks.com/es/tutorials/file/dndfiles/
    function handleFileSelect(evt) {
          files = evt.target.files;
          f = files[0];
          console.log(f);
          var reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = (function(theFile) {
              return function(e) {
                // Render thumbnail.
                $("#of_foto").attr('src',e.target.result);
                imagen_oferta = e.target.result;
              };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);

        }

}])
*/
