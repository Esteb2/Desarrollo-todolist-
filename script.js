// Solicitando los id de los elementos
const tareaInput = document.getElementById("tarea");
const botonAgregar = document.getElementById("agregar");
const listaTareas = document.getElementById("listaDeTareas");

//Funcion para agregar la tarea a la lita y anadimos botones borrar y completar
function agregarTarea() {
  const tareaContenido = tareaInput.value;
  if (tareaContenido !== "") {
    const elementoNuevo = document.createElement("li");
    elementoNuevo.textContent = tareaContenido;

    // Crear botón de borrar
    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Borrar";
    botonBorrar.onclick = function () {
      if (elementoNuevo.style.textDecoration === "line-through") {
        listaTareas.removeChild(elementoNuevo);
        almacenarTareas(); // Almacenar tareas después de borrar
      } else {
        alert("La tarea debe estar completada antes de poder borrarla");
      }
    };

    // Crear botón de completar
    const botonCompletar = document.createElement("button");
    botonCompletar.textContent = "Completar";
    botonCompletar.onclick = function () {
      elementoNuevo.style.textDecoration = "line-through";
      almacenarTareas(); // Llamando a la funcion para guardar los datos en localStorage
    };

    // Agregar botoes al elemento de la lista
    elementoNuevo.appendChild(botonBorrar);
    elementoNuevo.appendChild(botonCompletar);

    listaTareas.appendChild(elementoNuevo);
    tareaInput.value = "";
    almacenarTareas(); // Almacenar tareas después de agregar
  } else {
    alert("El campo no puede estar vacío");
  }
}

// Llamar la función al hacer click en el botón agregar
botonAgregar.addEventListener("click", agregarTarea);

// Función para almacenar los datos en locall storage
function almacenarTareas() {
  const tareas = [];
  const elementosLista = listaTareas.getElementsByTagName("li");
  for (let i = 0; i < elementosLista.length; i++) {
    const tarea = elementosLista[i];
    tareas.push({
      contenido: tarea.textContent.replace("BorrarCompletar", "").trim(),
      completada: tarea.style.textDecoration === "line-through",
    });
  }
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Cargar tateas desde local storage al iniciar
document.addEventListener("DOMContentLoaded", () => {
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  for (let i = 0; i < tareas.length; i++) {
    const tarea = tareas[i];
    const elementoNuevo = document.createElement("li");
    elementoNuevo.textContent = tarea.contenido;
    if (tarea.completada) {
      elementoNuevo.style.textDecoration = "line-through";
    }

    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Borrar";
    botonBorrar.onclick = function () {
      if (elementoNuevo.style.textDecoration === "line-through") {
        listaTareas.removeChild(elementoNuevo);
        almacenarTareas(); // Almacenar tareas después de borrar
      } else {
        alert("La tarea debe estar completada antes de poder borrarla");
      }
    };

    const botonCompletar = document.createElement("button");
    botonCompletar.textContent = "Completar";
    botonCompletar.onclick = function () {
      elementoNuevo.style.textDecoration = "line-through";
      almacenarTareas(); // Almacenar tareas después de completar
    };

    elementoNuevo.appendChild(botonBorrar);
    elementoNuevo.appendChild(botonCompletar);
    listaTareas.appendChild(elementoNuevo);
  }
});
