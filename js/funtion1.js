var empleadotype='';


      $("#paciente").change(function(){
        empleadotype=document.getElementById('paciente').value;
        console.log(empleadotype);
        
        
        $("#exeq").addClass("cot");
        //$("#grupdesc").addClass("cot");
    
    });
    
    $("#medico").change(function(){
        empleadotype=document.getElementById('medico').value;
        console.log(empleadotype);
        $("#exeq").removeClass("cot");
        access=firebase.database().ref('acceso');
        swal({
            title: 'Ingrese la clave de administrador',
            html: '<p><input id="clave" type="password">',
            showCancelButton: false,
            closeOnConfirm: true
          }).then( function () { 
            clave=$('#clave').val();
            console.log(clave);
          access.on("value", function(snap){
          clave=parseInt(clave);
          contra=snap.val();
          console.log(contra);
          if(clave===contra.Contraseña){
            swal(
                  'Correcto',
                  'Contraseña correcta',
                  'success'
                )
            
          }else{
            swal(
                  'Error',
                  'Contraseña incorrecta',
                  'error'
                ).then(function(){
                  window.location.reload();
                });
          }
      }); 
           
            

      
      });       
        //$("#grupdesc").removeClass("cot");
    
    });


function guardar(){

    


    name=document.getElementById('name').value;
    eml=document.getElementById('email').value;
    clv=document.getElementById('password').value;
    exe=document.getElementById('exeq').value;
    var usr=eml.replace(/[.]/gi,'-');
    ref=firebase.database().ref("Usuarios").child(empleadotype).child(usr);

    

    firebase.auth().createUserWithEmailAndPassword(eml,clv).then(function(){
        if(empleadotype=="Medico"){
            ref.set({
                Nombre:name,
                Correo:eml,
                Exequatur:exe
               });
        }else{
            ref.set({
                Nombre:name,
                Correo:eml
               });
        }
       

        swal({
  title: "Correcto!",
  text: "Usuario creado correctamente!",
  type: "success",
  
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Continuar",
  closeOnConfirm: false
},
function(){
    window.location='index.html?p=login';
});
        
    }).catch(function(error){
        //Handle Errors here.
        var errorCode=error.code;
        var errorMessage=error.message;
        swal("Error", error.message, "error");
        
       

        
    });
    
    
}