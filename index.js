$(function(){
    $('#div-recuperar').dialog({
		autoOpen:false,//ESTABLECEMOS PARA QUE NO SE ABRA SOLO CUANDO SE CARGUE LA PAGINA
		modal:true,//BLOQUEAMOS OTRA ACCION MIENTRAS EL FORM ESTE ABIERTO
		title:'Olvidaste tu contraseña? ' ,//TITULO EN EL FORM
		width:'300',//TAMAÑO DEL FORM
		height:'auto',
		show:{
			effect:"clip",
			duration:100
			},
		hide:{
			effect:"clip",
			duration:100
			}
	});
    //$("#usuario").focus();
       $("#olvidar").click(function (){
          $("#div-recuperar").dialog('open');
          $('#enviar').click(function(){
               texto=$("#correo").val();
          envio(texto,"error-correo",function (resp){
      if(resp==0)
        {
        $.ajax({
                type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'correo',correo:texto,leer:'xs'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO	
                beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
                },success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA
                           if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                alert("El correo llegara en unos minutos");
                                $("#div-recuperar").dialog('close');
                                location.reload();
                }
				else{
                }	          
            },
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
                         
		});
        }
          });
                                                    
          });
          $("#cancelar").click(function (){
              $("#div-recuperar").dialog('close');
          });
        });
      $('#correo').focusin(function (){
           document.getElementById("error-correo").style.display='none';    
      });
      $('#usuario').focusin(function (){
           document.getElementById("error").style.display='none';    
      });
       function envio(texto,campo, my_callback){
            var resp = 5;
              $.ajax({
                type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{tabla:'usuario',columnas:'*',Op:'wsaw',
                            condicion:"usur_nombre='"+texto+"'",leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO	
                beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
                },success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA

                if(response.mensaje=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                             resp=1; 
                             document.getElementById(campo).style.display='block';    
                             document.getElementById(campo).innerText="El Usuario no esta registrado en el sistema";
                }
				else{
                document.getElementById(campo).style.display='none';    
                    resp= 0;             
                }	
            my_callback(resp);              
            },
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
                         
		});
               return resp;
            }
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