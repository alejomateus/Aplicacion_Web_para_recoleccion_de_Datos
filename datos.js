$(function(){
	$("#continua").click(function(){
	var vector=[];
        vector[0]="0";
        vector[1]="0";
        vector[2]="0";
        vector[3]="0";
        nombre=document.getElementById("usuario-u").value;
        clave=document.getElementById("clave-u").value;
        nueva=document.getElementById("n-clave-u").value;
        confirmar=document.getElementById("co-clave-u").value;
       if (nombre==null || nombre.length==0){
           document.getElementById('u-error-u').style.display='block';    
          document.getElementById('usuario-u').style.border="1px solid red";
        vector[0]="1"; }
       if (clave==null || clave.length==0){
           document.getElementById('c-error-u').style.display='block';    
          document.getElementById('clave-u').style.border="1px solid red";
        vector[1]="1"; }
    if (nueva==null || nueva.length==0){
           document.getElementById('n-error-u').style.display='block';    
          document.getElementById('n-clave-u').style.border="1px solid red";
        vector[2]="1"; }
    if (confirmar==null || confirmar.length==0){
           document.getElementById('co-error-u').style.display='block';    
          document.getElementById('co-clave-u').style.border="1px solid red";
        vector[3]="1"; }
        if (confirmar!=nueva){
           document.getElementById('co-error-u').style.display='block'; 
           document.getElementById('co-error-u').innerText='Las contraseñas no coinciden';
          document.getElementById('co-clave-u').style.border="1px solid red";
        vector[3]="1"; }
    if((vector[0]=="1")||(vector[1]=="1")||(vector[2]=="1")||(vector[3]=="1")){
            }
      else {
          texto="usur_nombre='"+$("#user").text()+"' and (usur_clave='"+hex_sha1(clave)+"' or usur_clave_recup='"+hex_sha1(clave)+"')";
 envio(texto,"c-error-u",function (resp){
 if(resp==1)
    {
       var usuario="usur_nombre='"+$("#user").text()+"'";
                var opcion="actualizar";
                var values=" usur_nombre_persona= '"+$("#usuario-u").val()+"',"+
                            " usur_clave='"+hex_sha1(nueva)+"', usur_clave_recup='"+hex_sha1(nueva)+"'";
                    $("#usuario-u").val("");
        $("#clave-u").val("");
        $("#n-clave-u").val("");
        $("#co-clave-u").val("");
                $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{ Op:opcion,tabla:'usuario',columnas:'*',condici:usuario,values:values,
                            condicion:"usur_nombre='"+$("#user").text()+"'",leer:'read'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
			},
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
					document.getElementById('e-corre').style.display='block';//CERRAMOS EL FORM										
			document.getElementById('nombre').innerText=response.contenido;	
                        document.getElementById('nom').innerText="Hola "+response.contenido;
                        $('#usuario-u').val(response.contenido);
                            }
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}			
			},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
        });        
    }});
           }
		return false;
	});
         function envio(texto,campo, my_callback){
            var resp = 5;
              $.ajax({
                type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{tabla:'usuario',columnas:'*',Op:'wsaw',
                            condicion:texto,leer:'read'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO	
                beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
                },success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA

                if(response.mensaje=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                         
                        document.getElementById(campo).style.display='block';    
                             document.getElementById(campo).innerText="Contraseña Incorrecta";
                             document.getElementById('clave-u').style.border="1px solid red";
                   resp= 0;
                }
				else{
                                    document.getElementById(campo).style.display='none';
                                    document.getElementById('e-corre').style.display='block';
                     resp=    1;             
                }	
            my_callback(resp);              
            },
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
               return resp;
            }       
       $("#usuario-u").focusin(function (){
         document.getElementById('u-error-u').style.display='none';    
         document.getElementById('e-corre').style.display='none';
         document.getElementById('usuario-u').style.border="1px solid #808080";
       });
       $("#clave-u").focusin(function (){
         document.getElementById('c-error-u').style.display='none';     
         document.getElementById('e-corre').style.display='none';
         document.getElementById('clave-u').style.border="1px solid #808080";
       });
       $("#n-clave-u").focusin(function (){
         document.getElementById('n-error-u').style.display='none';    
         document.getElementById('n-clave-u').style.border="1px solid #808080";
       });
       $("#co-clave-u").focusin(function (){
         document.getElementById('co-error-u').style.display='none';    
         document.getElementById('co-clave-u').style.border="1px solid #808080";
       });
 
        function solotexto(){
            if ((event.keyCode < 65) || (event.keyCode > 90) && (event.keyCode < 97) || (event.keyCode > 122)&& (key.charCode != 45) //retroceso
                 && (key.charCode != 241) 
                 && (key.charCode != 209) //Ñ
                 && (key.charCode != 32) //espacio
                 && (key.charCode != 225) //á
                 && (key.charCode != 233) //é
                 && (key.charCode != 237) //í
                 && (key.charCode != 243) //ó
                 && (key.charCode != 250) //ú
                 && (key.charCode != 193) //Á
                 && (key.charCode != 201) //É
                 && (key.charCode != 205) //Í
                 && (key.charCode != 211) //Ó
                 && (key.charCode != 218) )
                 event.returnValue = false;
        }
});