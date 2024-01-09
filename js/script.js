
let INDEX_PREGUNTA = 0;
let puntaje = 0;

cargarPregunta(0);


//primero cargamos las preguntas con la function cargarPregunta
function cargarPregunta(index) {
  objetoPregunta = baseDePreguntas[index];
  
  
  


  opciones = [...objetoPregunta.answers];
  opciones.push(objetoPregunta.correct);

  //para que las opciones aparescan de manera aleatoria, si no puede que siempre la primera opcion sea la correcta
  for (let i = 0; i < 5; i++) {
    opciones.sort(() => Math.random() - 0.5);
  }

  document.getElementById("pregunta").innerHTML = objetoPregunta.question;
  if (objetoPregunta.imagen) {
    
    //esto seria para cargar la imagen de las preguntas
    document.getElementById("imagen").src = objetoPregunta.imagen;
    document.getElementById("imagen").style.display = "";
  } else {
    document.getElementById("imagen").style.display = "none";
  }

  // 
  if (objetoPregunta.ayuda) {
    document.getElementById("ayuda").style.display = "";
  } else {
    document.getElementById("ayuda").style.display = "none";
  }

  //con esto estoy poniendo las respuestas(opciones) en los div
  document.getElementById("opcion-1").innerHTML = opciones[0];
  document.getElementById("opcion-2").innerHTML = opciones[1];
  document.getElementById("opcion-3").innerHTML = opciones[2];
  document.getElementById("opcion-4").innerHTML = opciones[3];
  document.getElementById("opcion-5").innerHTML = opciones[4];
}


// esto es para verificar si la respuesta es correcta
async function seleccionarOpción(index) {
  let validezRespuesta = opciones[index] == objetoPregunta.answers;
  if (validezRespuesta) {
    await Swal.fire({
      title: "Respuesta correcta",
      text: "La respuesta ha sido correcta",
      icon: "success",
    });

    // con esto me va sumando las puntuaciones de cada pregunta
    puntaje++;
  } else {
    await Swal.fire({
      title: "Respuesta Incorrecta",
      html: `La respuesta correcta es ${objetoPregunta.answers}`,
      icon: "error",
    });
  }
  
  // con esto voy a la siguiente pregunta si esta correcta
  INDEX_PREGUNTA++;
  if (INDEX_PREGUNTA >= baseDePreguntas.length) {
    await Swal.fire({
      title: "Juego términado",
      text: `Tu puntaje fue de: ${puntaje}/${baseDePreguntas.length}`,
    });
    INDEX_PREGUNTA = 0;
    puntaje = 0;
  }
  cargarPregunta(INDEX_PREGUNTA);
}





// con esta funcion me sale el cuadro de ayuda- es de sweetalert
function ayuda() {
  Swal.fire({
    title: "Ayuda",
    text: objetoPregunta.ayuda,
    imageUrl: objetoPregunta.ayudaImg,
    imageHeight: 300,
  });
}  
