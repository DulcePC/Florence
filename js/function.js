var MY_USER=null;

function inicio(){
    eml=document.getElementById('mail').value;
    clv=document.getElementById('clave').value;

    firebase.auth().signInWithEmailAndPassword(eml, clv).then(function(usr){
      coindicencia=firebase.database().ref("Usuarios").child("Medico");
      cn2=firebase.database().ref("Usuarios").child("Paciente");
      console.log(usr);
      coindicencia.on("value", function (snap){
        igualdad=snap.val();
        
        for(k in igualdad){
          info=igualdad[k];
          
          console.log(info);
          if(eml==info.Correo){
            window.location=" index.html?p=doctores"
            sessionStorage.setItem('type_user', JSON.stringify("Medico"));
            sessionStorage.setItem('name', JSON.stringify(info.Nombre));
                  sessionStorage.setItem('last', JSON.stringify(info.Apellido));
          }else{
            cn2.on("value", function (snap){
              igualdadd=snap.val();
              
              for(k in igualdadd){
                infoo=igualdadd[k];
                
                console.log(info);
                if(eml==infoo.Correo){
                  sessionStorage.setItem('type_user', JSON.stringify("Paciente"));
                  sessionStorage.setItem('name', JSON.stringify(infoo.Nombre));
                  sessionStorage.setItem('last', JSON.stringify(infoo.Apellido));
                  window.location=" index.html?p=paciente"
                }
      
              }
      
              
      
      
      
            });
            
            
            
          }

        }

        



      });
    sessionStorage.setItem('MY_USER', JSON.stringify(usr));
   
    }).catch(function(error){
       swal('Error', 'No funciona', 'error')
        
    });
   
    //
            
     
    
}

function validar(e) {
  tecla = (document.all) ? e.keyCode : e.which;
  if (tecla==13) inicio();
}



function resetpass(){
  
  
  swal({
  title: "Olvidaste tu contraseña?",
  text: "Ingrese su correo electronico",
  type: "input",
  showCancelButton: true,
  closeOnConfirm: false,
  animation: "slide-from-top",
  inputPlaceholder: "E-mail"
},
function(inputValue){
  if (inputValue === false) return false;
  
  if (inputValue === "") {
    swal.showInputError("Ingrese un correo electronico valido!");
    return false
  }
  firebase.auth().sendPasswordResetEmail(inputValue).then(function(){
    swal("Correcto!","Correo enviado exitoxamente, favor verificar.", "success");
    
  }, function(error){
    swal("Error", error.message, "error");
  });
  
});

  
}

