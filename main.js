function obtenerParametros() {
    var parametros = {};
    var query = window.location.search.substring(1);
    var pares = query.split("&");
    for (var i = 0; i < pares.length; i++) {
      var par = pares[i].split("=");
      parametros[par[0]] = decodeURIComponent(par[1]); // Decodificar el valor del parámetro
    }
    return parametros;
  }

// Función para generar la receta médica
function generarReceta() {
  var parametros = obtenerParametros();
  var recetaScript = document.getElementById("receta-script");
  var receta = document.createElement("div");
  receta.className = "receta";

  // Verificar que se hayan recibido todos los parámetros necesarios
  if ('medicamentos' in parametros && 'dosis' in parametros && 'horario' in parametros) {
    var medicamentos = parametros['medicamentos'].split(",");
    var dosis = parametros['dosis'].split(",");
    var horario = parametros['horario'].split(",");
    
    for (var i = 0; i < medicamentos.length; i++) {
      var item = document.createElement("div");
      item.className = "item";
      var medicamentoElement = document.createElement("div");
      medicamentoElement.className = "medicamento";
      medicamentoElement.textContent = medicamentos[i];
      var dosisElement = document.createElement("div");
      dosisElement.className = "dosis";
      dosisElement.textContent = dosis[i];
      var horarioElement = document.createElement("div");
      horarioElement.className = "horario";
      horarioElement.textContent = horario[i];
      
      item.appendChild(medicamentoElement);
      item.appendChild(dosisElement);
      item.appendChild(horarioElement);
      
      receta.appendChild(item);
    }
    
    
  } else {
    var mensajeError = document.createElement("p");
    mensajeError.textContent = "Error: No se han proporcionado todos los parámetros necesarios.";
    receta.appendChild(mensajeError);
  }
  
  recetaScript.appendChild(receta);
  // Imprimir la página automáticamente
  window.print();
}

// Llamar a la función cuando la página haya cargado
window.onload = generarReceta;