$(document).ready(function () {
    $('select').formSelect();
});

var empleadotype = '';

function cargarArea() {
    var array = ["Medica", "Clinica", "Cirujano", "MedicoQuirúrgica", "Laboratorio"];
    array.sort();
    addOptions("type_skill", array);
}


//Función para agregar opciones a un <select>.
function addOptions(domElement, array) {
    var selector = document.getElementById('type_skill');

    for (especialidad in array) {
        var opcion = document.createElement("option");
        opcion.text = array[especialidad];
        // Añadimos un value a los option para hacer mas facil escoger los pueblos
        opcion.value = array[especialidad].toLowerCase()
        selector.appendChild(opcion);
    }
}



function cargarEspecialidad() {

    // Objeto de provincias con pueblos
    var listaEspecialidades = {
        medica: ["Pediatra", "Geriatra", "Neumologo", "Cirujano-Vascular", "Oftalmologo", "Otorrinolaringologo",
            "Radilogío",
            "Microbiologo", "Farmacologo", "Cirujano", "Ortopeda", "Traumatologo", "Infectologo", "Alergologo",
            "Psiquiatra"
        ],

        clinica: ["Alergologo", "Anestesiologo", "Cardiologo", "Gastroenterologo", "Geriatra", "Hematologo",
            "Infectologo", "Neufrologo", "Neumologo", "Neurologo", "Nutriologo", "Oftalmologo", "Oncologo",
            "Reumaologo", "Toxicologo", "Urologo"
        ],

        cirujano: ["Cardiovascular", "General/aparato digestivo", "Oral/Maxilofacial", "Ortopeda/Traumatologo",
            "Pediatra", "Plastico, Estetico y reparador", "Toracico", "Neurologo", "Proctologo"
        ],

        medicoquirúrgica: ["Angiologo", "Dermatologia", "Ginecologo/Obstetra", "Oftalmologo", "Urologo", "Traumatologo"],
        laboratorio: ["Analisis clinico", "Anatomia patologa", "Bioquimica-clinica", "Genetica-Medica", "Inmunologo",
            "Medico nuclear",
            "Microbiologo y parasitologo", "Neurofisiologo", "Radiodiagnostico"
        ]
    }

    var area = document.getElementById('type_skill')
    var especialidad = document.getElementById('especialidad')
    var areaSeleccionada = area.value

    // Se limpian los pueblos
    especialidad.innerHTML = '<option selected disabled value="">Seleccione una Especialidad...</option>'

    if (areaSeleccionada !== '') {
        // Se seleccionan los pueblos y se ordenan
        areaSeleccionada = listaEspecialidades[areaSeleccionada]
        areaSeleccionada.sort()

        // Insertamos los pueblos
        areaSeleccionada.forEach(function (espec) {
            let opcion = document.createElement('option')
            opcion.value = espec
            opcion.text = espec
            especialidad.appendChild(opcion)
        });
    }

}

// Iniciar la carga de provincias solo para comprobar que funciona
cargarArea();


$("#paciente").change(function () {
    empleadotype = document.getElementById('paciente').value;
    console.log(empleadotype);


    $("#exeqq").addClass("cot");
    $("#type_skill").addClass("hide");
    $("#especialidad").addClass("hide");
    //$("#grupdesc").addClass("cot");

});

$("#medico").change(function () {
    empleadotype = document.getElementById('medico').value;
    console.log(empleadotype);

    access = firebase.database().ref('acceso');
    swal({
        title: 'Ingrese la clave de administrador',
        html: '<p><input id="clave" type="password">',
        showCancelButton: false,
        closeOnConfirm: true
    }).then(function () {
        clave = $('#clave').val();

        access.on("value", function (snap) {
            clave = parseInt(clave);
            contra = snap.val();

            if (clave === contra.Contraseña) {
                swal(
                    'Correcto',
                    'Contraseña correcta',
                    'success'
                )
                $("#exeqq").removeClass("cot");
                $("#type_skill").removeClass("hide");
                $("#especialidad").removeClass("hide");
                cargarArea();
            } else {
                swal(
                    'Error',
                    'Contraseña incorrecta',
                    'error'
                ).then(function () {
                    window.location.reload();
                });
            }
        });




    });
    //$("#grupdesc").removeClass("cot");

});




function guardar() {




    name = document.getElementById('name').value;
    last = document.getElementById('last').value;
    eml = document.getElementById('email').value;
    clv = document.getElementById('password').value;
    exe = document.getElementById('exeq').value;
    ar = document.getElementById('type_skill').value;
    skill = document.getElementById('especialidad').value;
    var usr = eml.replace(/[.]/gi, '-');



    if ($("#medico").is(':checked') == false && $("#paciente").is(':checked') == false) {
        swal("Error", "Seleccione un tipo de usuario", "error");
    } else {
        ref = firebase.database().ref("Usuarios").child(empleadotype).child(usr);
        if (name == "" || last == "" || exe == "" || ar == "" || skill == "") {
            swal("Error", "Faltan campos por llenar", "error");
        } else {

            firebase.auth().createUserWithEmailAndPassword(eml, clv).then(function () {
                if (empleadotype == "Medico") {
                    if (ar == "cirujano") {
                        medi = firebase.database().ref("Medicos").child(ar + "- " + skill).child(name + last);

                        medi.set({
                            Nombre: name,
                            Apellido: last,

                        });
                    } else {
                        medi = firebase.database().ref("Medicos").child(skill).child(name + last);

                        medi.set({
                            Nombre: name,
                            Apellido: last,

                        });
                    }
                    ref.set({
                        Nombre: name,
                        Apellido: last,
                        Correo: eml,
                        Exequatur: exe
                    });
                } else {
                    ref.set({
                        Nombre: name,
                        Apellido: last,
                        Correo: eml
                    });
                }


                swal({
                    title: "Correcto!",
                    text: "Usuario creado correctamente!",
                    type: "success",

                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Continuar",

                }).then(function () {
                    window.location = 'index.html?p=login';
                });

            }).catch(function (error) {
                //Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                swal("Error", error.message, "error");




            });
        }
    }
}