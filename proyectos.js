$(function(){
      $('#div-eliminar').dialog({
		autoOpen:false,//ESTABLECEMOS PARA QUE NO SE ABRA SOLO CUANDO SE CARGUE LA PAGINA
		modal:true,//BLOQUEAMOS OTRA ACCION MIENTRAS EL FORM ESTE ABIERTO
		title:'Eliminar proyectos' ,//TITULO EN EL FORM
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
        $('#div-terminar').dialog({
		autoOpen:false,//ESTABLECEMOS PARA QUE NO SE ABRA SOLO CUANDO SE CARGUE LA PAGINA
		modal:true,//BLOQUEAMOS OTRA ACCION MIENTRAS EL FORM ESTE ABIERTO
		title:'Terminar Proyectos ' ,//TITULO EN EL FORM
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
        
$("#encuestas").change(function(){
        var encuesta=$("#encuestas").val();
            document.getElementById('error-check').style.display='none';
        if(encuesta!=""){
            document.getElementById('boton').style.display='initial';
                    document.getElementById('ver_todo').style.display='initial';
    
        envio(encuesta,function (res){
                    if(res.length==0){
                     }
                var condicion="not usuario='";
                for(var j=0;j<res.length;j++){
                    if(j<res.length-1){
                    condicion=condicion+res[j]+"' and not usuario='"
                }
                else{
                    condicion=condicion+res[j]+"'";
        }
                }
                $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'sd',tabla:'disponible',columnas:'*',
                            condicion:condicion,
                            leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                                document.getElementById('columna').style.display='block';
                                $("#listausuarios").html(response.contenido);//cargo los registros que devuelve ajax
                            }
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo ");
				}
                	},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde XD');//MENSAJE EN CASO DE ERROR
			}
                        
		});
                });
            
    }
            else{
 document.getElementById('ver_todo').style.display='none';
            document.getElementById('boton').style.display='none';
        
        $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'sd',tabla:'disponible',columnas:'*',condicion:'',
                            leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                                
                                $("#listausuarios").html(response.contenido);//cargo los registros que devuelve ajax
                            }
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}
                	},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde XDS');//MENSAJE EN CASO DE ERROR
			}
		});
                
            }
    });
    
    function envio(texto,my_callback){
             var res="";
          $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'ss',tabla:'encuesta_usuario',columnas:'*',
                            condicion:' nombre_encuesta="'+texto+'"',
                            leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
			 var x=response.contenido;
                          var s= x[0].split(',');
                          for(var i=0;i<x.length;i++){
                   }		
                            }
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}
                                my_callback(x);
                	},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde XD2');//MENSAJE EN CASO DE ERROR
			}
		});
               return res;
            }
            
        $("#boton").click(function (){
             var checkboxValues = "";
             var contador=0;
$('input[name="t[]"]:checked').each(function() {
	checkboxValues += $(this).val() + ",";
        contador=contador+1;
});
if(contador==0){
    document.getElementById('error-check').style.display='initial';
}
else{
    document.getElementById('error-check').style.display='none';
    $('input[name="t[]"]:checked').each(function() {
	checkboxValues = $(this).val();
      var condicion="'"+$("#encuestas").val()+"','"+checkboxValues+"'";
        $.ajax({
      		type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'insertar',tabla:'encuesta_usuario'
                            ,values:condicion},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                   
                	},
			error: function(){//SI OCURRE UN ERROR 
				//alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		}); });
       //alert("Encuestas asignadas");
            var encuesta=$("#encuestas").val();
            envio(encuesta,function (res){
                    if(res.length==0){
                    }
                var condicion="not usuario='";
                for(var j=0;j<res.length;j++){
                    if(j<res.length-1){
                    condicion=condicion+res[j]+"' and not usuario='"
                }
                else{
                    condicion=condicion+res[j]+"'";
                }
          }
                     document.getElementById('error-check').style.display='none';
            document.getElementById('ver_todo').style.display='none';
            document.getElementById('boton').style.display='none';
        $("#encuestas").val("");
        $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'sd',tabla:'disponible',columnas:'*',condicion:'',
                            leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                                $("#listausuarios").html(response.contenido);//cargo los registros que devuelve ajax
                            }
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}
                	},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde XDS');//MENSAJE EN CASO DE ERROR
			}
		});
                });
        }
        
        });
    $("#listaencuestas").on("click","#editar",function(){
	 pos=$(this).parent().parent();
                 variable=$(pos).children("td:eq("+0+")").text();
             document.getElementById("escrito-u").innerText="Desea terminar el proyecto '"+variable+"'";
                 document.getElementById("complemento-u").innerText="(Recuerde que si termina el proyecto los encuestadores "+
            "no podran acceder a estos formularios )";
        $("#div-terminar").dialog('open');
        $("#termi").click(function(){    
              var condicion="nombre_encuesta='"+variable+"'";
           var values ="estado_encuesta='Terminado'";
           var bloque=[];
           bloque[0]="UPDATE encuesta set estado_encuesta='Terminado' where nombre_encuesta='"+variable+"'";
           bloque[1]="DELETE FROM encuesta_usuario where nombre_encuesta='"+variable+"'";       
        $.ajax({
      		type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'bloque',bloque:bloque
                            ,leer:"leer",tabla:'total1',columnas:'*',condicion:''},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                	 $("#listaencuestas").html(response.contenido);//cargo los registros que devuelve ajax
                    $('#div-terminar').dialog('close');  
                        },
			error: function(){//SI OCURRE UN ERROR 
				//alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
               	
        });
    $("#no-termi").click(function(){
        $('#div-terminar').dialog('close');//CERRAMOS EL FORM
    });
    });
    $("#listaencuestas").on("click","#eliminar",function(){
		pos=$(this).parent().parent();
                variable=$(pos).children("td:eq("+0+")").text();
                document.getElementById("escrito").innerText="Desea eliminar el proyecto '"+variable+"'";
                 document.getElementById("complemento").innerText="(Recuerde que si elimina el proyecto los analistas "+
            "no podran descargar los archivos de este proyecto y estos se perderian )";
		$("#div-eliminar").dialog('open');
                $("#enlace-descarga").attr('href',"reporte_excel.php?encuesta="+variable);
                
    $("#eli").click(function(){  
               condicion="nombre_encuesta='"+variable+"'";
  $.ajax({
      		type:'POST',//TIPO DE PETICION PUEDE SER GET
		dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
		url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
		data:{Op:'eliminar2',
                          condicix:condicion,tablax:'encuesta',tabla:'total1',columnas:'*',condicion:'',
                            leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
		success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                        //MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                                $("#listaencuestas").html(response.contenido);//cargo los registros que devuelve ajax
                    $('#div-eliminar').dialog('close');        
                    
		        },
		error: function(){//SI OCURRE UN ERROR 
			}
		});
               
                });
    $("#no-eli").click(function(){
        $('#div-eliminar').dialog('close');//CERRAMOS EL FORM
    });
        });
        $("#ver_todo").click(function(){
            document.getElementById('error-check').style.display='none';
            document.getElementById('ver_todo').style.display='none';
            document.getElementById('boton').style.display='none';
        $("#encuestas").val("");
        $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'sd',tabla:'disponible',columnas:'*',condicion:'',
                            leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                                $("#listausuarios").html(response.contenido);//cargo los registros que devuelve ajax
                            }
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}
                	},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde XDS');//MENSAJE EN CASO DE ERROR
			}
		});
    });
         });