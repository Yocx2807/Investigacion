// Funciones para cargar datos (solo una vez cada función)
function cargarEstudiantes() {
  $.ajax({
    url: "https://paginas-web-cr.com/Api/apis/ListaEstudiantes.php",
    type: "GET",
    dataType: "json",
    success: function (respuesta) {
      let estudiantes = respuesta.data;
      let contenidoTabla = "";
      estudiantes.forEach(function (est) {
        contenidoTabla += `
          <tr>
            <td>${est.nombre}</td>
            <td>${est.correo}</td>
            <td>${est.telefono}</td>
            <td>${est.cedula}</td>
            <td>
              <button class="btn btn-warning btn-sm btnEditarEstudiante" data-id="${est.id}">Editar</button>
              <button class="btn btn-danger btn-sm btnEliminarEstudiante" data-id="${est.id}">Eliminar</button>
            </td>
          </tr>
        `;
      });
      $("#tablaEstudiantes").html(contenidoTabla);
    },
    error: function () {
      alert("Error al cargar los estudiantes.");
    }
  });
}

function cargarProfesores() {
  $.ajax({
    url: "https://paginas-web-cr.com/Api/apis/ListaProfesores.php",
    type: "GET",
    dataType: "json",
    success: function (respuesta) {
      let profesores = respuesta.data;
      let contenido = "";
      profesores.forEach(function (prof) {
        contenido += `
          <tr>
            <td>${prof.nombre}</td>
            <td>${prof.cedula}</td>
            <td>${prof.correo}</td>
            <td>${prof.telefono}</td>
            <td>
              <button class="btn btn-warning btn-sm btnEditarProfesor" data-id="${prof.id}">Editar</button>
              <button class="btn btn-danger btn-sm btnEliminarProfesor" data-id="${prof.id}">Eliminar</button>
            </td>
          </tr>
        `;
      });
      $("#tablaProfesores").html(contenido);
    },
    error: function () {
      alert("Error al cargar los profesores.");
    }
  });
}

function cargarCursos() {
  $.ajax({
    url: "https://paginas-web-cr.com/Api/apis/ListaCursos.php",
    type: "GET",
    dataType: "json",
    success: function (respuesta) {
      let cursos = respuesta.data;
      let contenido = "";
      cursos.forEach(function (curso) {
        contenido += `
          <tr>
            <td>${curso.nombre}</td>
            <td>${curso.descripcion}</td>
            <td>
              <button class="btn btn-warning btn-sm btnEditarCurso" data-id="${curso.id}">Editar</button>
              <button class="btn btn-danger btn-sm btnEliminarCurso" data-id="${curso.id}">Eliminar</button>
            </td>
          </tr>
        `;
      });
      $("#tablaCursos").html(contenido);
    },
    error: function () {
      alert("Error al cargar los cursos.");
    }
  });
}

function cargarGrupos() {
  $.ajax({
    url: "https://paginas-web-cr.com/Api/apis/ListaGrupos.php",
    type: "GET",
    dataType: "json",
    success: function (respuesta) {
      let grupos = respuesta.data;
      let contenido = "";
      grupos.forEach(function (grupo) {
        contenido += `
          <tr>
            <td>${grupo.nombre}</td>
            <td>${grupo.curso_id}</td>
            <td>
              <button class="btn btn-warning btn-sm btnEditarGrupo" data-id="${grupo.id}">Editar</button>
              <button class="btn btn-danger btn-sm btnEliminarGrupo" data-id="${grupo.id}">Eliminar</button>
            </td>
          </tr>
        `;
      });
      $("#tablaGrupos").html(contenido);
    },
    error: function () {
      alert("Error al cargar los grupos.");
    }
  });
}

// Validar correo simple
function validarCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

// Document ready
$(document).ready(function () {

  // Eventos para mostrar modales y cargar datos
  $(document).on("click", "#menuEstudiante", function () {
    $("#modalEstudiante").modal("show");
    cargarEstudiantes();
  });

  $(document).on("click", "#menuProfesor", function () {
    $("#modalProfesor").modal("show");
    cargarProfesores();
  });

  $(document).on("click", "#menuCurso", function () {
    $("#modalCurso").modal("show");
    cargarCursos();
  });

  $(document).on("click", "#menuGrupo", function () {
    $("#modalGrupo").modal("show");
    cargarGrupos();
  });

  // Mostrar formularios para crear
  $("#btnCrearEstudiante").click(function () {
    $("#formCrearEstudiante").toggleClass("d-none");
  });

  $("#btnCrearProfesor").click(function () {
    $("#formCrearProfesor").toggleClass("d-none");
  });

  $("#btnCrearCurso").click(function () {
    $("#formCrearCurso").toggleClass("d-none");
  });

  $("#btnCrearGrupo").click(function () {
    $("#formCrearGrupo").toggleClass("d-none");
  });

  // Guardar estudiante
  $("#btnGuardarEstudiante").click(function (event) {
    event.preventDefault();

    let datos = {
      nombre: $("#nombreEstudiante").val().trim(),
      correo: $("#correoEstudiante").val().trim(),
      telefono: $("#telefonoEstudiante").val().trim(),
      cedula: $("#cedulaEstudiante").val().trim()
    };

    if (!datos.nombre || !datos.correo || !datos.telefono || !datos.cedula) {
      alert("Por favor complete todos los campos.");
      return;
    }

    if (!validarCorreo(datos.correo)) {
      alert("Ingrese un correo válido.");
      return;
    }

    $.ajax({
      url: "https://paginas-web-cr.com/Api/apis/InsertarEstudiantes.php",
      type: "POST",
      data: JSON.stringify(datos),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (respuesta) {
        if (respuesta.code === 200) {
          alert("Estudiante creado exitosamente.");
          $("#formCrearEstudiante").addClass("d-none");
          $("#formCrearEstudiante input").val("");
          cargarEstudiantes();
        } else {
          alert("Error al crear estudiante: " + respuesta.message);
        }
      },
      error: function () {
        alert("Error al crear el estudiante.");
      }
    });
  });

  // Guardar profesor, curso y grupo con lógica similar (te ayudo si quieres)

});


  
  
  