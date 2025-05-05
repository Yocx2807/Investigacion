$(document).on("click", "#menuEstudiante", function () {
    $("#modalEstudiante").modal("show");
    cargarEstudiantes(); // Función que definiremos abajo
  });

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

  $(document).ready(function () {
    // Mostrar formulario
    $("#btnCrearEstudiante").click(function () {
      $("#formCrearEstudiante").toggleClass("d-none");
    });
  
    // Guardar estudiante
    $("#btnGuardarEstudiante").click(function () {
      let datos = {
        nombre: $("#nombre").val(),
        correo: $("#correo").val(),
        telefono: $("#telefono").val(),
        cedula: $("#cedula").val()
      };
  
      $.ajax({
        url: "https://paginas-web-cr.com/ApiPHP/apis/InsertarEstudiantes.php",
        type: "POST",
        data: JSON.stringify(datos),
        contentType: "application/json",
        success: function (respuesta) {
          alert("Estudiante creado exitosamente.");
          $("#formCrearEstudiante").addClass("d-none");
          $("#formCrearEstudiante input").val("");
          cargarEstudiantes(); // Esta función debe existir y recargar la tabla
        },
        error: function () {
          alert("Error al crear el estudiante.");
        }
      });
    });
  });


  
  


  $(document).on("click", "#menuProfesor", function () {
    $("#modalProfesor").modal("show");
    cargarProfesores();
  });
  
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


  $(document).on("click", "#menuGrupo", function () {
    $("#modalGrupo").modal("show");
    cargarGrupos();
  });
  
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
              <td>${grupo.descripcion}</td>
              <td>${grupo.anio}</td>
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


  $(document).on("click", "#menuCurso", function () {
    $("#modalCurso").modal("show");
    cargarCursos();
  });
  
  function cargarCursos() {
    $.ajax({
      url: "https://paginas-web-cr.com/ApiPHP/apis/ListaCursos.php",
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
              <td>${curso.anio}</td>
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
  
  
  
  