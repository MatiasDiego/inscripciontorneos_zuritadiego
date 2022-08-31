//DEFINICIÓN DE LA CLASE TORNEO CON SU CONSTRUCTOR
class Torneo {
  constructor(capitan, nombreEquipo, torneo, integrantesEquipo) {
    this.capitan = capitan;
    this.nombreEquipo = nombreEquipo;
    this.torneo = torneo;
    this.integrantesEquipo = integrantesEquipo;
  }
}

//DECLARACIÓN DE VARIABLES
let darkMode;

//DECLARACIÓN DE VARIABLE DE TIPO ARRAY DONDE SE ALMACENARÁN LOS TORNEOS   CREADOS
let torneos = [];

//DECLARACIÓN DE VARIABLES QUE CAPTURAN LOS ELEMENTOS DEL DOM QUE TIENEN EL ID QUE SE INDICA
const formulario = document.getElementById("idForm");
const torneoSelec = document.getElementById("torneoSelec");
const btnEnviarInsc = document.getElementById("btnEnviarInsc");
const divTorneos = document.getElementById("divTorneos");
const divTitle = document.getElementById("divTitle");
const botonTorneos = document.getElementById("botonTorneos");
const botonLightMode = document.getElementById("botonLightMode");
const botonDarkMode = document.getElementById("botonDarkMode");
const divBotonLightMode = document.getElementById("divLightMode");
const barraNavegacion = document.getElementById("barraNav");
const cuerpoDelDocumento = document.body;

//FUNCIÓN PARA SABER SI EXISTE O NO LA KEY THEME EN EL STORAGE
function storageTheme() {
  //VERDADERO SI EXISTE = CONSULTAR
  if (localStorage.getItem("theme")) {
    darkMode = localStorage.getItem("theme");
    //FALSO SI NO EXISTE = CREAR
  } else {
    localStorage.setItem("theme", "light");
  }

  //SI EXISTE Y EL VALOR DE LA KEY ES DARK
  if (darkMode == "dark") {
    //AGREGA LA CLASE DARKMODE AL BODY
    document.body.classList.add("darkMode");
    //AGREGA LA CLASE DARKMODE A LA BARRA DE NAVEGACIÓN
    barraNav.classList.add("darkMode");
    //AGREGA LA CLASE OCULTO AL BOTON DE DARKMODE
    botonDarkMode.classList.add("oculto");
    //REMUEVE LA CLASE OCULTO AL BOTON DE LIGHTMODE
    botonLightMode.classList.remove("oculto");
  }
}

//FUNCIÓN PARA SABER SI EXISTE O NO LA KEY LIBROS EN EL STORAGE E IR GUARDANDO LOS LIBROS CARGADOS POR EL USUARIO
function storageTorneos() {
  //VERDADERO SI EXISTE = CONSULTAR
  if (localStorage.getItem("torneos")) {
    torneos = JSON.parse(localStorage.getItem("torneos"));
    //FALSO SI NO EXISTE = CREAR
  } else {
    localStorage.setItem("torneos", JSON.stringify(torneos));
  }
}

//MODO DARK - LIGHT
botonDarkMode.addEventListener("click", () => {
  document.body.classList.add("darkMode");
  barraNav.classList.add("darkMode");
  botonDarkMode.classList.add("oculto");
  botonLightMode.classList.remove("oculto");
  localStorage.setItem("theme", "dark");
});

botonLightMode.addEventListener("click", () => {
  document.body.classList.remove("darkMode");
  barraNav.classList.remove("darkMode");
  botonDarkMode.classList.remove("oculto");
  botonLightMode.classList.add("oculto");
  localStorage.setItem("theme", "light");
});

/*
  EVENTO SUBMIT QUE PERMITE CREAR LOS TORNEOS Y UNA VEZ HECHO CLIC EN EL BOTON GUARDAR, 
  SE ALMACENAN EN EL ARRAY TORNEOS
*/
formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  //SE CAPTURA EL VALOR DE LO INGRESADO EN LOS CAMPOS DE TIPO TEXTO
  let capitan = document.getElementById("capitan").value;
  let nombreEquipo = document.getElementById("equipo").value;
  let torneoSelec = document.getElementById("torneoSelec").value;
  let integrantesEquipo = document.getElementById("integrantes").value;

  //INSTANCIACIÓN DE NUEVOS TORNEOS
  const torneo = new Torneo(
    capitan,
    nombreEquipo,
    torneoSelec,
    integrantesEquipo
  );
  //SE GUARDA EL NUEVO TORNEO AL FINAL DEL ARRAY
  torneos.push(torneo);
  //SE MUESTRA POR CONSOLA EL ARRAY PARA CHECKEAR QUE SE ESTÉ LLENANDO CORRECTAMENTE
  console.log(torneos);

  localStorage.setItem("torneos", JSON.stringify(torneos));
  //MÉTODO PARA LIMPIAR LOS CAMPOS DEL FORMULARIO UNA VEZ QUE SE LE DIÓ CLIC AL BOTÓN DE GUARDAR
  formulario.reset();
});

cuerpoDelDocumento.onload = async function getData() {
  const response = await fetch("../json/torneos.json");
  const data = await response.json();
  const fragment = document.createDocumentFragment();

  data.torneos.forEach((element) => {
    const newOption = document.createElement("option");
    newOption.innerHTML = element;
    fragment.appendChild(newOption);
  });

  torneoSelec.appendChild(fragment);
};

/*
  EVENTO DE ESCUCHA A LA ESPERA DE UN CLICK EN EL BOTÓN DE MOSTRAR LIBROS PARA PINTAR LOS LIBROS QUE SE FUERON
  ALMACENANDO EN EL ARRAY LIBROS
*/
botonTorneos.addEventListener("click", () => {
  /*
    CONSULTAMOS LA KEY TORNEOS EN EL STORAGE PARA TRAERNOS LOS VALORES DE LA MISMA
    Y LA GUARDAMOS EN UNA VARIABLE DE TIPO ARRAY PARA DESPUES RECORRERLO CON UN
    FOREACH Y PINTAMOS EN UNA CARD EN EL HTML
  */
  let arrayStorage = JSON.parse(localStorage.getItem("torneos"));

  if (arrayStorage.length === 0) {
    //LÍNEA QUE NOS AYUDA A QUE NO SE PINTEN CARTAS CON VALORES REPETIDOS
    divTorneos.innerHTML = "";

    divTitle.innerHTML = `
      <h2>Mi Lista de Torneos</h2>
    `
    //LÍNEA QUE PINTA UN MENSAJE POR DEFECTO EN CASO DE NO HABERNOS INSCRIPTO A NINGÚN TORNEO
    divTorneos.innerHTML += `
    <div class="card">
      <img src="./img/torneo_img.jpg" class="card-img-top" alt="Torneo Futbol">
      <div class="card-body colorBlack">
        <h5 class="card-title">Aún no te has inscripto a ningún torneo</h5>
      </div>
    </div>
    `
  } else {
    //LÍNEA QUE NOS AYUDA A QUE NO SE PINTEN CARTAS CON VALORES REPETIDOS
    divTorneos.innerHTML = "";

    divTitle.innerHTML = `
      <h2>Mi Lista de Torneos</h2>
    `

    arrayStorage.forEach((torneo, indice) => {
      divTorneos.innerHTML += `
        <div class="card" id="torneo_${indice}" style="">
          <img src="./img/torneo_img.jpg" class="card-img-top" alt="Torneo Futbol">
          <div class="card-body colorBlack">
            <h5 class="card-title">Torneo: ${torneo.torneo}</h5>
            <p class="card-text"><B>Equipo:</b> ${torneo.nombreEquipo}</p>
            <p class="card-text"><b>Capitán:</b> ${torneo.capitan}</p>
            <p class="card-text"><b>Integrantes:</b> ${torneo.integrantesEquipo}</p>
            <button class="btn btn-danger mt-3 ms-5">
              Eliminar
            </button>
          </div>
        </div>
      `;
    });

    arrayStorage.forEach((torneo, indice) => {
      let btnEliminar = document.getElementById(`torneo_${indice}`)
        .lastElementChild.lastElementChild;
  
      btnEliminar.addEventListener("click", () => {
        document.getElementById(`torneo_${indice}`).remove();
        torneos.splice(indice, 1);
        localStorage.setItem("torneos", JSON.stringify(torneos));
      });
    });
  }

});

//UTILIZACIÓN DE LA LIBRERÍA SWEETALERT2
btnEnviarInsc.addEventListener("click", () => {
  Swal.fire(
    '¡La inscripción se ha realizado correctamente!',
    'Para ver sus torneos has click en MIS TORNEOS',
    'success'
  )
});

//LLAMADA A FUNCIONES
storageTheme();
storageTorneos();
