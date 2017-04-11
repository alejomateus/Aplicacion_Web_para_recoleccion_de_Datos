$(function(){
   $('#div-frm').dialog({
		autoOpen:false,//ESTABLECEMOS PARA QUE NO SE ABRA SOLO CUANDO SE CARGUE LA PAGINA
		modal:true,//BLOQUEAMOS OTRA ACCION MIENTRAS EL FORM ESTE ABIERTO
		title:'Ingreso de Usuario',//TITULO EN EL FORM
		width:300,//TAMAÑO DEL FORM
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
        $('#div-eliminar').dialog({
		autoOpen:false,//ESTABLECEMOS PARA QUE NO SE ABRA SOLO CUANDO SE CARGUE LA PAGINA
		modal:true,//BLOQUEAMOS OTRA ACCION MIENTRAS EL FORM ESTE ABIERTO
		title:'Eliminacion de Usuarios' ,//TITULO EN EL FORM
		width:350,//TAMAÑO DEL FORM
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
        $('#div-actualizar').dialog({
		autoOpen:false,//ESTABLECEMOS PARA QUE NO SE ABRA SOLO CUANDO SE CARGUE LA PAGINA
		modal:true,//BLOQUEAMOS OTRA ACCION MIENTRAS EL FORM ESTE ABIERTO
		title:'Actualizando Usuarios' ,//TITULO EN EL FORM
		width:300,//TAMAÑO DEL FORM
		height:'auto',
		background:'#000',
		show:{
			effect:"clip",
			duration:100
			},
		hide:{
			effect:"clip",
			duration:100
			}
	});
        $("#buscar").focusin(function (){
             document.getElementById("u-error-b").style.display='none';
        });
        $("#t-buscar").focusin(function (){
             document.getElementById("u-error-b").style.display='none';
        });
        $("#busqueda").click(function(){      
       	var condicion=" ";
      var nombre=$("#buscar").val();
     var tipo=$("#t-buscar").val();
       if((nombre=="")&&(tipo=="")){
        document.getElementById("u-error-b").style.display='block';
            }
             else{   
                    document.getElementById('ver_todo-p').style.display='inline';  
      
            if(nombre===""){
        condicion=condicion+"usur_tipo='"+tipo+"'";
                }
                else if(tipo===""){
                     condicion=condicion+" usur_nombre like '%"+nombre+"%'";
                }
                else if (nombre!=="" && tipo!==""){
        condicion=condicion+" usur_tipo='"+tipo+"' and usur_nombre like '%"+nombre+"%'";            
                }
               
		$.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'ss',tabla:'usuario',columnas:'*',
                            condicion:condicion,leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
				$('#loader').show();//MOSTRAMOS EL DIV LOADER EL CUAL CONTIENE LA IMAGEN DE CARGA
			},
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
					$("#listausuarios").html(response.contenido);//cargo los registros que devuelve ajax
					$('#div-frm').dialog('close');//CERRAMOS EL FORM										
				}
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}			
				
			},
			error: function(){//SI OCURRE UN ERROR 
			}
		});}
		return false;//RETORNAMOS FALSE PARA QUE NO HAGA UN RELOAD EN LA PAGINA
            });
	//CUANDO PRESIONAMOS EL BOTON AGREGAR MOSTRAMOS EL FORMULARIO
	$('#agregar').on('click',function(){
		$('#div-frm').dialog('open');//ABRIMOS EL FORMULARIO COMO TIPO DIALOG
		$('#frm_user input[type=text]').val('');//BORRAMOS TODOS LOS CAMPOS TIPO TEXT EN EL FORM
		$('#tipo').val('');//REMOVEMOS EL ATTRIBUTO SELECTED DEL SELECT
                $('#clave').val(''); 
                  document.getElementById('tipo').style.border="0px solid red";
          document.getElementById('usuario').style.border="0px solid red";
          document.getElementById('nombre').style.border="0px solid red";
          document.getElementById('clave').style.border="0px solid red";
          document.getElementById('u-error-a').style.display='none';
          document.getElementById('c-error-a').style.display='none';
          document.getElementById('n-error-a').style.display='none';
          document.getElementById('t-error-a').style.display='none';

	});
	//validamos la accion a tomar cuando demos submit en el formulario frm_user
	$('#frm_user').on('submit',function(){
        var vector=[];
        vector[0]="0";
        vector[1]="0";
        vector[2]="0";
        vector[3]="0";
	usuario=document.getElementById("usuario").value;
        clave=document.getElementById("clave").value;
        nombre=document.getElementById("nombre").value;
        tipo=document.getElementById("tipo").value;
       if(usuario==null || usuario.length==0){
          
          document.getElementById('u-error-a').innerText="Este campo no puede estar vacio";
          document.getElementById('u-error-a').style.display='block';    
          document.getElementById('usuario').style.border="1px solid red";
      vector[0]="1";}
   var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
  if (!regex.test($('#usuario').val().trim())) {
    document.getElementById('u-error-a').innerText="El usuario debe ser un correo electronico valido";
          document.getElementById('u-error-a').style.display='block';    
          document.getElementById('usuario').style.border="1px solid red";
      vector[0]="1";
            } 
        if (clave==null || clave.length==0){
           document.getElementById('c-error-a').style.display='block';    
          document.getElementById('clave').style.border="1px solid red";
        vector[1]="1";
            }
       if (nombre==null || nombre.length==0){
           document.getElementById('n-error-a').style.display='block';    
          document.getElementById('nombre').style.border="1px solid red";
      vector[2]="1"; }
    
       if (tipo==null || tipo.length==0){
           document.getElementById('t-error-a').style.display='block';    
          document.getElementById('tipo').style.border="1px solid red";
       vector[3]="1";
            } if((vector[0]=="1")||(vector[1]=="1")||(vector[2]=="1")||(vector[3]=="1")){
            }
      else {
            var texto=$("#usuario").val();
           envio(texto,"u-error-a",function (resp){
      if(resp==1)
        {
                var opcion="insertar";
                var values="'"+$("#usuario").val()+"','"+hex_sha1($("#clave").val())+"'"
                        +",'"+$("#nombre").val()+"'"+",'"+$("#tipo").val()+"','"+hex_sha1($("#clave").val())+"'";
            $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:opcion,tabla:'usuario',values:values,columnas:'*',
                            condicion:"not usur_tipo='xssxsz'",leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
					$("#listausuarios").html(response.contenido);//cargo los registros que devuelve ajax
					$('#div-frm').dialog('close');//CERRAMOS EL FORM										
			    }
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}
                	},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
                 document.getElementById('ver_todo-p').style.display='none';    
$("#buscar").val("");
    $("#t-buscar").val("");
        }
        });}
	return false;//RETORNAMOS FALSE PARA QUE NO HAGA UN RELOAD EN LA PAGINA
	});
	//capturamos los eventos click que se den en la seccion tbody de la tabla en cualquier a
	$("#listausuarios").on("click","#editar",function(){
		//asignamos a variable por el objeto JQuery que seria toda la fila
            var pos=$(this).parent().parent();
		//recorremos todos los elementos del form de tipo input text y select y los llenamos con los
		//datos de la tabla.
		$("#frm_update input[type=text],#frm_update select").each(function(index) {
			//asignamos a cada campo el valor correspondiente.
            $(this).val($(pos).children("td:eq("+(index)+")").text());
        });
		$("#div-actualizar").dialog('open');
        var x=($(pos).children("td:eq("+(0)+")").text());
            $("#continua").click(function(){  
                   var vector=[];
                    var texto=$("#usuario-u").val()+"' and  not usur_nombre='"+x;
        vector[0]="0";
        vector[1]="0";
        vector[2]="0";
	usuario=document.getElementById("usuario-u").value;
        nombre=document.getElementById("nombre-u").value;
        tipo=document.getElementById("tipo-u").value;
       if(usuario==null || usuario.length==0){
          document.getElementById('u-error-u').innerText="Este campo no puede estar vacio";
          document.getElementById('u-error-u').style.display='block';    
          document.getElementById('usuario-u').style.border="1px solid red";
        vector[0]="1";}
     var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
  if (!regex.test($('#usuario-u').val().trim())) {
    document.getElementById('u-error-u').innerText="El usuario debe ser un correo electronico valido";
          document.getElementById('u-error-u').style.display='block';    
          document.getElementById('usuario-u').style.border="1px solid red";
      vector[0]="1";
            } 
       if (nombre==null || nombre.length==0){
           document.getElementById('n-error-u').style.display='block';    
          document.getElementById('nombre-u').style.border="1px solid red";
        vector[1]="1"; }
       if (tipo==null || tipo.length==0){
           document.getElementById('t-error-u').style.display='block';    
          document.getElementById('tipo-u').style.border="1px solid red";
        vector[2]="1";
            }
        //    alert((vector[0])+"||"+(vector[1])+"||"+(vector[2]));
       if((vector[0]=="1")||(vector[1]=="1")||(vector[2]=="1")){
            }
      else {
          envio(texto,"u-error-u",function (resp){
 if(resp==1)
    {
              var usuario="usur_nombre='"+$(pos).children("td:eq("+0+")").text()+"'";
                var opcion="actualizar";
                var values="usur_nombre= '"+$("#usuario-u").val()+"',"+
                            " usur_nombre_persona= '"+$("#nombre-u").val()+"',"+
                            " usur_tipo='"+$("#tipo-u").val()+"'";
                $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{ Op:opcion,tabla:'usuario',columnas:'*',condici:usuario,values:values,
                            condicion:"not usur_tipo='xssxsz'",leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
			},
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
					$("#listausuarios").html(response.contenido);//cargo los registros que devuelve ajax
					$('#div-actualizar').dialog('close');//CERRAMOS EL FORM										
				}
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}			
			},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
                 document.getElementById('ver_todo-p').style.display='none';    
$("#buscar").val("");
    $("#t-buscar").val("");
        }
        });}
		return false;
	});
	});
       $("#listausuarios ").on("click","#ver_todo",function (){
        cargar();
             document.getElementById('ver_todo-p').style.display='none';    
       });
	$("#listausuarios ").on("click","#eliminar",function(){
		//asignamos a variable por el objeto JQuery que seria toda la fila
		var pos=$(this).parent().parent();
                var variable=$(pos).children("td:eq("+1+")").text();
            //var children = document.getElementById('id_tr').getElementsByTagName('td')[2].innerHTML;
                document.getElementById("escrito").innerText='Desea eliminar el usuario '+variable;
		$("#div-eliminar").dialog('open');
$("#eli").click(function(){  
          document.getElementById('ver_todo-p').style.display='none';    
$("#buscar").val("");
    $("#t-buscar").val("");
    var usuario="usur_nombre='"+$(pos).children("td:eq("+0+")").text()+"'";
                var opcion="eliminar";
		$.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:opcion,tabla:'usuario',columnas:'*',condici:usuario,
                            condicion:"not usur_tipo='xssxsz'",leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
			},
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
					$("#listausuarios").html(response.contenido);//cargo los registros que devuelve ajax
					$('#div-eliminar').dialog('close');//CERRAMOS EL FORM										
				}
			else{
				alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
                            }			
			},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
		return false;
	});
    $("#no-eli").click(function(){
        $('#div-eliminar').dialog('close');//CERRAMOS EL FORM
    });
        });
 $("#ver_todo-p").click(function (){
        cargar(); 
        $("#buscar").val("");
    $("#t-buscar").val("");
     document.getElementById('ver_todo-p').style.display='none';    
 });
 $("#cancelar").click(function (){      
         $('#div-frm').dialog('close');
     }); 
     /*
  $("#usuario").focusout(function (){
      valor=document.getElementById("usuario").value;
      if(valor==null || valor.length==0){
          document.getElementById('u-error-a').innerText="Este campo no puede estar vacio";
          document.getElementById('u-error-a').style.display='block';    
          document.getElementById('usuario').style.border="1px solid red";
      }
      else{
          document.getElementById('u-error-a').style.display='none';    
 var texto=$("#usuario").val();
       envio(texto);
      }
        });      */  
        /*$("#usuario").keypress(function (){
          
           solotexto(); 
           
           
        });*/
       $("#usuario").focusin(function (){
         document.getElementById('u-error-a').style.display='none';    
         document.getElementById('usuario').style.border='0px solid';
       });
       $("#clave").focusin(function (){
         document.getElementById('c-error-a').style.display='none';     
         document.getElementById('clave').style.border='0px solid';   
       });
       $("#nombre").focusin(function (){
         document.getElementById('n-error-a').style.display='none';    
         document.getElementById('nombre').style.border='0px solid';    
       });
       $("#tipo").focusin(function (){
         document.getElementById('t-error-a').style.display='none';    
         document.getElementById('tipo').style.border='0px solid';    
       });
        $("#usuario-u").focusin(function (){
         document.getElementById('u-error-u').style.display='none';    
         document.getElementById('usuario-u').style.border='0px solid';
       });
       $("#nombre-u").focusin(function (){
         document.getElementById('n-error-u').style.display='none';    
         document.getElementById('nombre-u').style.border='0px solid';    
       });
       $("#tipo-u").focusin(function (){
         document.getElementById('t-error-u').style.display='none';    
         document.getElementById('tipo-u').style.border='0px solid';    
       });
        
     $("#cancelar-u").click(function (){      
         $('#div-actualizar').dialog('close');        }); 
       function cargar(){
                        $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'ss',tabla:'usuario',columnas:'*',
                            condicion:"not usur_tipo='xssxsz'",leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
			},
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
					$("#listausuarios").html(response.contenido);//cargo los registros que devuelve ajax
				}
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}
			},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde xd ');//MENSAJE EN CASO DE ERROR
			}
		});
		return false;//RETORNAMOS FALSE PARA QUE NO HAGA UN RELOAD EN LA PAGINA
       }
     
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
                        document.getElementById(campo).style.display='none';    
                resp=    1;        
                }
				else{document.getElementById(campo).style.display='block';    
                             document.getElementById(campo).innerText="El correo electronico ya existe ingrese uno nuevo";
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
            if ( 
                    (event.keyCode < 48) || (event.keyCode >57 )&&
                    (event.keyCode < 65) || (event.keyCode > 90) 
                    && (event.keyCode < 97) || (event.keyCode > 122)
                 && (key.charCode != 45)  //retroceso
                 && (key.charCode != 189) //
                 && (key.charCode != 241) //
                 && (key.charCode != 209) //Ñ
                 && (key.charCode != 32)  //espacio
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