var lista_usuarios = [];
var usuario;
var identidad;
var lista_inscripcion = [];
var usuarios_aprobados = [];



function usuarioDefecto() {

    /* const usuarios = [
         { 'id': '1', 'nombre': 'Raul', 'apellido': 'Gomez', 'correo': 'raul@gmail.com', 'contra': '123' },
         { 'id': '2', 'nombre': 'Juan', 'apellido': 'Macias', 'correo': 'juan@gmail.com', 'contra': '123' },
         { 'id': '3', 'nombre': 'Mario', 'apellido': 'Manuel', 'correo': 'mario@gmail.com', 'contra': '123' },
         { 'id': '4', 'nombre': 'Julia', 'apellido': 'Loor', 'correo': 'julia@gmail.com', 'contra': '123' },
         { 'id': '5', 'nombre': 'Brisa', 'apellido': 'Mero', 'correo': 'brisa@gmail.com', 'contra': '123' },

     ]*/
    var admin = [
        { 'id': '1', 'nombre': 'Admin', 'correo': 'admin@admin.com', 'contra': 'admin' }
    ]
    localStorage.setItem('admin', JSON.stringify(admin));


}

function datosAdmin() {
    var admin = localStorage.getItem('admin');
    var datos_admin = JSON.parse(admin);
    return datos_admin;

}


//este metodo es para crear un objeto con la lista de usuarios
function CrearLista(lnombre, lapellido, lcorreo, lcontra) {

    var f = new Date();
    const fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();

    var nuevoUsuario = {
        nombre: lnombre,
        apellido: lapellido,
        correo: lcorreo,
        contra: lcontra,
        fecha: fecha
    }
    lista_usuarios.push(nuevoUsuario);
}



//metodo para obtener el valor de los input y guardarlos en la lista de usuarios
function Registrar() {

    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var correo = document.getElementById("correo").value;
    var contra = document.getElementById("contra").value;

    if (nombre.length == 0 || apellido.length == 0 || correo.length == 0 || contra.length == 0) {
        alert('Debe llenar todos los datos');
    } else {

        CrearLista(nombre, apellido, correo, contra);
        // ser guarda en el local Storage para persistir los datos del usuario
        localStorage.setItem('usuarios', JSON.stringify(lista_usuarios));
        alert('El usuario ' + nombre + ' ' + apellido + ' se creado correctamente');

        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("contra").value = "";
    }
}

//metodo para loguear
function Loguear() {

    var usuarios = ObtenerListaLS();
    var admin = datosAdmin();


    var correo = document.getElementById("correo").value;
    var contra = document.getElementById("contra").value;
    var encontrado = false;


    if (!usuarios || !admin) {
        alert('Datos incorrectos');

    } else {
        for (adm of admin) {
            if (correo == adm.correo && contra == adm.contra) {
                window.location = "deportesAdmin.html";
                encontrado = true;
                identidadAdmin = admin;
                localStorage.setItem('identidadAdmin', JSON.stringify(identidadAdmin));
                break;
            }


        }
        if (correo != adm.correo && contra != adm.contra) {

            for (usuario of usuarios) {
                if (usuario.correo == correo && usuario.contra == contra) {
                    window.location = "deportes.html";
                    encontrado = true;
                    identidad = usuario;
                    localStorage.setItem('identidad', JSON.stringify(identidad));
                    break;
                }

            }


        }

        if (!encontrado) {
            alert('usuario no encontrado');
        }
    }
}


//obtener usuarios
function obtenerUsuarios() {
    var list = ObtenerListaLS(),
        tbody = document.querySelector('#mostrar-usuarios tbody');

    tbody.innerHTML = '';
    for (let i = 0; i < list.length; i++) {
        var row = tbody.insertRow(i),
            nombreCell = row.insertCell(0),
            apellidoCell = row.insertCell(1),
            correoCell = row.insertCell(2),
            fechaIncriCell = row.insertCell(3);

        nombreCell.innerHTML = list[i].nombre;
        apellidoCell.innerHTML = list[i].apellido;
        correoCell.innerHTML = list[i].correo;
        fechaIncriCell.innerHTML = list[i].fecha;


        tbody.appendChild(row);
    }
}


//obtener usuarios
function obtenerSolicitudes() {
    var list = ObtenerInscripcionesLS(),
        tbody = document.querySelector('#mostrar-solicitudes tbody');

    tbody.innerHTML = '';
    for (let i = 0; i < list.length; i++) {
        var row = tbody.insertRow(i),

            nombreCell = row.insertCell(0),
            apellidoCell = row.insertCell(1),
            correoCell = row.insertCell(2),
            deporteCell = row.insertCell(3),
            fechaIncriCell = row.insertCell(4),
            aceptarCell = row.insertCell(5),
            rechazarCell = row.insertCell(6);



        nombreCell.innerHTML = list[i].nombreUsuario;
        apellidoCell.innerHTML = list[i].apellidoUsuario;
        correoCell.innerHTML = list[i].correoUsuario;
        deporteCell.innerHTML = list[i].nombreDeporte;
        fechaIncriCell.innerHTML = list[i].fechaInscripcion;
        aceptarCell.innerHTML = "<button type='button' class='btn-aceptar' onclick='aprobar()'>Permitir</button><br>";
        rechazarCell.innerHTML = "<button type='button' class='btn-rechazar'onclick='rechazar()'>Rechazar</button><br>";

        tbody.appendChild(row);
    }
}


function ObtenerListaLS() {
    var listaLS = localStorage.getItem('usuarios');
    if (listaLS == null) {
        lista_usuarios = [];
    } else {
        lista_usuarios = JSON.parse(listaLS);
        // console.log(lista_usuarios);
    }
    return lista_usuarios;

}

function ObtenerInscripcionesLS() {
    var listaLS = localStorage.getItem('inscripcion');
    if (listaLS == null) {
        lista_inscripcion = [];
    } else {
        lista_inscripcion = JSON.parse(listaLS);
        // console.log(lista_usuarios);
    }
    return lista_inscripcion;

}

function CrearListaInscripcion(lnombreDeporte, lnombreUsuario, lapellidoUsuario, lcorreo, lfechaIncripcion) {

    var nuevaInscripcion = {
        nombreDeporte: lnombreDeporte,
        nombreUsuario: lnombreUsuario,
        apellidoUsuario: lapellidoUsuario,
        correoUsuario: lcorreo,
        fechaInscripcion: lfechaIncripcion

    }
    lista_inscripcion.push(nuevaInscripcion);

}

function obtenerIdentidad() {

    datos_usuario = localStorage.getItem('identidad');
    identidad = JSON.parse(datos_usuario);

    return identidad;


}

function obtenerIdentidadAdmin() {

    datos_admin = localStorage.getItem('identidadAdmin');
    var identidadAdmin = JSON.parse(datos_admin);

    return identidadAdmin;


}


function cambiarEstado(id) {
    var btn = document.getElementById(id);
    btn.style.backgroundColor = 'gray';
    btn.innerText = 'Aprobacion pendiente';
    btn.disabled = true;
}




function cerrarSesion() {
    localStorage.removeItem('identidad');
    localStorage.removeItem('identidadAdmin');

    window.location = "index.html";
}



function aprobar() {
    alert("El usuario a sido aprobado");
}

function rechazar() {
    alert("El usuario a sido rechazado");
}


function ocultarMenu() {

    var identidad = obtenerIdentidad();
    var identidadAdmin = obtenerIdentidadAdmin();

    if (identidad) {

        // var transaccion = document.getElementById("transaccion");
        var solicitudes = document.getElementById("solicitudes");
        var lista = document.getElementById("lista");
        var depor = document.getElementById("deporAdmin");



        //transaccion.style.display = "none";
        solicitudes.style.display = "none";
        lista.style.display = "none";
        depor.style.display = "none";


    }
    if (identidadAdmin) {
        var depor = document.getElementById("depor");

        depor.style.display = "none";



    }





}

function verSolicitudes() {

    window.location = "solicitudes.html"

}




//DEPORTES


function inscribirBailoTerapia() {

    identidad = obtenerIdentidad();
    var f = new Date();
    const fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();

    CrearListaInscripcion("Bailo Terapia", identidad.nombre, identidad.apellido, identidad.correo, fecha);
    localStorage.setItem('inscripcion', JSON.stringify(lista_inscripcion));
    cambiarEstado("btn-bailoterapia");

    console.log(lista_inscripcion);


}

function inscribirFutbol() {

    identidad = obtenerIdentidad();
    var f = new Date();
    const fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();

    CrearListaInscripcion("Futbol", identidad.nombre, identidad.apellido, identidad.correo, fecha);
    localStorage.setItem('inscripcion', JSON.stringify(lista_inscripcion));
    cambiarEstado("btn-futbol");

    console.log(lista_inscripcion);


}

function inscribirBasketball() {

    identidad = obtenerIdentidad();
    var f = new Date();
    const fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();

    CrearListaInscripcion("Basketball", identidad.nombre, identidad.apellido, identidad.correo, fecha);
    localStorage.setItem('inscripcion', JSON.stringify(lista_inscripcion));
    console.log(lista_inscripcion);

    cambiarEstado("btn-basketball");


}

function inscribirNatacion() {

    identidad = obtenerIdentidad();
    var f = new Date();
    const fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();

    CrearListaInscripcion("Natacion", identidad.nombre, identidad.apellido, identidad.correo, fecha);
    localStorage.setItem('inscripcion', JSON.stringify(lista_inscripcion));

    cambiarEstado("btn-natacion");

    console.log(lista_inscripcion);


}

function inscribirPesas() {

    identidad = obtenerIdentidad();
    var f = new Date();
    const fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();

    CrearListaInscripcion("Pesas", identidad.nombre, identidad.apellido, identidad.correo, fecha);
    localStorage.setItem('inscripcion', JSON.stringify(lista_inscripcion));
    cambiarEstado("btn-pesas");

    console.log(lista_inscripcion);


}

function inscribirAtletismo() {

    identidad = obtenerIdentidad();
    var f = new Date();
    const fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();

    CrearListaInscripcion("Atletismo", identidad.nombre, identidad.apellido, identidad.correo, fecha);
    localStorage.setItem('inscripcion', JSON.stringify(lista_inscripcion));
    cambiarEstado("btn-atletismo");

    console.log(lista_inscripcion);


}

function inscribirDanza() {

    identidad = obtenerIdentidad();
    var f = new Date();
    const fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();

    CrearListaInscripcion("Danza", identidad.nombre, identidad.apellido, identidad.correo, fecha);
    localStorage.setItem('inscripcion', JSON.stringify(lista_inscripcion));
    cambiarEstado("btn-danza");

    console.log(lista_inscripcion);


}

function inscribirYoga() {

    identidad = obtenerIdentidad();
    var f = new Date();
    const fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();

    CrearListaInscripcion("Yoga", identidad.nombre, identidad.apellido, identidad.correo, fecha);
    localStorage.setItem('inscripcion', JSON.stringify(lista_inscripcion));
    cambiarEstado("btn-yoga");

    console.log(lista_inscripcion);


}

function inscribirZumba() {

    identidad = obtenerIdentidad();
    var f = new Date();
    const fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();

    CrearListaInscripcion("Zumba", identidad.nombre, identidad.apellido, identidad.correo, fecha);
    localStorage.setItem('inscripcion', JSON.stringify(lista_inscripcion));
    cambiarEstado("btn-zumba");

    console.log(lista_inscripcion);


}