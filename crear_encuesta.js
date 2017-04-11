$(function(){
    $('#encuesta').bind("cut copy paste",function(e) {
      e.preventDefault();
    });
    $('#id-pregunta').bind("cut copy paste",function(e) {
      e.preventDefault();
    });
    $('#div-terminar').dialog({
		autoOpen:false,//ESTABLECEMOS PARA QUE NO SE ABRA SOLO CUANDO SE CARGUE LA PAGINA
		modal:true,//BLOQUEAMOS OTRA ACCION MIENTRAS EL FORM ESTE ABIERTO
		title:'Terminar Encuesta ' ,//TITULO EN EL FORM
		width:'auto',//TAMAÑO DEL FORM
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
    var encuesta="";
$("#crear_encuesta").click(function (){
    encuesta=document.getElementById("encuesta").value;
     if(encuesta==null || encuesta.length==0){
          document.getElementById('error-e').style.display='block';    
          document.getElementById('encuesta').style.border="1px solid red";
      }
else {
            var texto=$("#encuesta").val();
           envio(texto,"error-e",function (resp){
      if(resp==1)
        {
        document.getElementById("tipo-pregunta").style.display='initial';    
        var opcion="insertar";
        var values="'"+$("#encuesta").val()+"'"+",'En diseño'";
            $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:opcion,tabla:'encuesta',values:values,columnas:'*',
                            condicion:" ",leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
		 document.getElementById("tipo-pregunta").style.display='initial';    
                 document.getElementById("verifi-encuesta").style.display='none';   
                 document.getElementById("nom-encu").innerText="Estudio '"+$("#encuesta").val()+"'";   
                 document.getElementById("nom-encu").style.display='initial';    
                 document.getElementById("e-corre").style.display='initial';    
                            }
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}
                	},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
        }
}); }
});

function envio(texto,campo, my_callback){
             var resp = 5;
              $.ajax({
                type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{tabla:'encuesta',columnas:'*',Op:'wsaw',
                            condicion:"nombre_encuesta='"+texto+"'",leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO	
                beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
                },success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA

                if(response.mensaje=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                        document.getElementById(campo).style.display='none';  
                         document.getElementById("tipo-pregunta").style.display='initial';    

                resp=    1;        
                }
        	else{
                document.getElementById(campo).style.display='block';    
                document.getElementById(campo).innerText="El nombre de encuesta ya existe ingrese uno nuevo";
               
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
 $("#encuesta").focusin(function (){
             document.getElementById("error-e").style.display='none';
           document.getElementById('encuesta').style.border='1px solid gray';       
 });
 $("#nom-pregunta").focusin(function (){
  document.getElementById('error-pre').style.display='none';    
          document.getElementById('nom-pregunta').style.border='1px solid gray';
document.getElementById("e-corre").style.display='none'; 
document.getElementById("p-corre").style.display='none'; 
 });
 $("#tipodepregunta").focusin(function (){
 document.getElementById('error-tip').style.display='none';    
       document.getElementById('tipodepregunta').style.border='1px solid gray';
       document.getElementById("e-corre").style.display='none';
 document.getElementById("p-corre").style.display='none'; 
 });
 $("#opciones").focusin(function (){
 document.getElementById('error-opc').style.display='none';    
       document.getElementById('opciones').style.border='1px solid gray';
   });
 $("#opcionesg").focusin(function (){
 document.getElementById('error-opcg').style.display='none';    
       document.getElementById('opcionesg').style.border='1px solid gray';
 });
 $("#preguntasg").focusin(function (){
 document.getElementById('error-preg').style.display='none';    
       document.getElementById('preguntasg').style.border='1px solid gray';
 });
 $("#id-pregunta").focusin(function (){
 document.getElementById('error-id-pre').style.display='none';    
 document.getElementById('id-pregunta').style.border='1px solid gray';
 document.getElementById("e-corre").style.display='none';
  document.getElementById("p-corre").style.display='none';
});
var guia=0;
$("#agregar-pregunta").click(function (){
     /*document.getElementById('error-pre').style.display='none';    
     document.getElementById('nom-pregunta').style.display='initial';
     document.getElementById('error-tip').style.display='none';    
     document.getElementById('tipodepregunta').style.display='initial';
     document.getElementById('error-id-pre').style.display='none';    
     document.getElementById('id-pregunta').style.display='initial';
      */var vector=[];
        vector[0]="0";
        vector[1]="0";
        vector[2]="0";
        vector[3]="0";
        vector[4]="0";
        vector[5]="0";
        document.getElementById("mensaj").style.display='none';  
	nombre=$("#id-pregunta").val();
        pregunta=$("#nom-pregunta").val();
        tipo=$("#tipodepregunta").val();
        if(pregunta==null || pregunta.length==0){
        document.getElementById('error-pre').style.display='block';    
        document.getElementById('nom-pregunta').style.border="1px solid red";
        vector[0]="1";      
        }
        if(tipo==null || tipo.length==0){
        document.getElementById('error-tip').style.display='block';    
        document.getElementById('tipodepregunta').style.border="1px solid red";
        vector[1]="1";      
        }
        if(nombre==null || nombre.length==0){
        document.getElementById('error-id-pre').style.display='block';    
        document.getElementById('id-pregunta').style.border="1px solid red";
        vector[2]="1";      
        }
        if($("#tipodepregunta").val()=="Multiple"||$("#tipodepregunta").val()=="Unica"){
        opciones=$("#opciones").val();
        if(opciones==null || opciones.length==0){
        document.getElementById('error-opc').style.display='block';    
        document.getElementById('opciones').style.border="1px solid red";
        vector[3]="1";      
      }
  }
     if($("#tipodepregunta").val()=="Grilla"){      
          opcionesg=$("#opcionesg").val();
          if(opcionesg==null || opcionesg.length==0){
          document.getElementById('error-opcg').style.display='block';    
          document.getElementById('opcionesg').style.border="1px solid red";
          vector[3]="1";      
          }
          preguntas=$("#preguntasg").val();
          if(preguntas==null || preguntas.length==0){
          document.getElementById('error-preg').style.display='block';    
          document.getElementById('preguntasg').style.border="1px solid red";
      vector[4]="1";
      
      }
        if(!$("input[name=tipogrilla]:checked").val()) {
	  vector[5]="1";
	  document.getElementById('error-rad-grilla').style.display='block';   
        }
        else{  
	  	}  
  }
      if((vector[0]=="1")||(vector[1]=="1")||(vector[2]=="1")||(vector[3]=="1")||(vector[4]=="1")||(vector[5]=="1")){
          
      }
      else{
              
          var opcion="insertar";
         var  id_pregunta=$("#id-pregunta").val()+"-"+encuesta;

              var ruta=null;
              
              var archivos= document.getElementById('file').files;
     // var navegador= window.URL || window.webkitURL;
     var num= archivos.length;
            
            if (num<=0){}
            else{
       var formData= new FormData($("#formulario")[0]);
       var archivos= document.getElementById('file').files;

           for(var x=0;x<archivos.length;x++){
           var name= archivos[x].name;
          ruta ="imagenes/"+encuesta+"/"+id_pregunta+"/";
               }
       $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"subir.php?ruta="+ruta,//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:formData,
                        contentType: false,
                        processData: false,//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                        },
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});                
            ruta ="imagenes/"+encuesta+"/"+id_pregunta+"/"+name;
          }
            envio2(id_pregunta,'error-id-pre',function (resp){
             guia++;
                if(resp==1){
            if(tipo=="Abierta"||tipo=="Numerica"){ 
                        var values="'"+id_pregunta+"','"+pregunta+"','"+tipo+"','"+ruta+"','"+encuesta+"',null";
                       
         $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:opcion,tabla:'pregunta',values:values,columnas:'*',
                            condicion:" ",leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                        }
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}
                	},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
            } 
            if(tipo=="Unica"||tipo=="Multiple"){   
                        var values="'"+id_pregunta+"','"+pregunta+"','"+tipo+"','"+ruta+"','"+encuesta+"',null";
         $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:opcion,tabla:'pregunta',values:values,columnas:'*',
                            condicion:" ",leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                        }
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}
                	},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
               var lines = $("#opciones").val().split('\n');
               var x=0;
for(var i = 0;i < lines.length;i++){
    if(lines[i]!=""){
        x++;
var valores =x+",'Op"+(x+1)+"-"+id_pregunta+"','"+lines[i]+"','"+id_pregunta+"','"+encuesta+"'";
                        $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:opcion,tabla:'opcion',values:valores,columnas:'*',
                            condicion:" ",leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                        }
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}
                	},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
                });
            }
            }
                     document.getElementById("pregunta-varias").style.display='none';
                    $("#opciones").val("");
                    } 
                    if(tipo=="Grilla"){ 
                 var texto="'"+id_pregunta+"','"+$("input[name=tipogrilla]:checked").val()+"','"+encuesta+"'";
               
                $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:opcion,tabla:'grilla',values:texto,columnas:'*',
                            condicion:" ",leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                        }
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}
                	},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
                        var values="'"+id_pregunta+"','"+pregunta+"','"+tipo+"','"+ruta+"','"+encuesta+"','"+id_pregunta+"'";
         $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:opcion,tabla:'pregunta',values:values,columnas:'*',
                            condicion:" ",leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                        }
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}
                	},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
            var lines = $("#opcionesg").val().split('\n');
            var x=0;
for(var i = 0;i < lines.length;i++){
    if(lines[i]!=""){
        x++;
var valores =x+",'C"+(x)+"-"+id_pregunta+"','"+lines[i]+"','"+id_pregunta+"'";
                        
                        $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:opcion,tabla:'columnas_grilla',values:valores,columnas:'*',
                            condicion:" ",leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                        }
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}
                	},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
                });}
            }
            var lines = $("#preguntasg").val().split('\n');
            var x=0;
            for(var i = 0;i < lines.length;i++){
                if(lines[i]!=""){
        x++;
            var valores =x+",'F"+(x)+"-"+id_pregunta+"','"+lines[i]+"','"+id_pregunta+"'";
                        
                        $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:opcion,tabla:'filas_grilla',values:valores,columnas:'*',
                            condicion:" ",leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                        }
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}
                	},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
                });}
            }
            document.getElementById("pregunta-grilla").style.display='none';
            $("input[name=tipogrilla]:checked").removeAttr("checked");
            $("#preguntasg").val("");
            $("#opcionesg").val("");
            
                    }
                    var valueguia =""+guia+",'"+id_pregunta+"','"+encuesta+"'"; 
          $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:opcion,tabla:'guia_pregunta',values:valueguia,columnas:'*',
                            condicion:" ",leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                        }
				else{
					alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
				}
                	},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
                    var control = $("#file");
                    control.replaceWith( control = control.clone( true ) );
                        $("#vista-previa").html("");
                        $("#tipodepregunta").val("");
                        $("#nom-pregunta").val("");
                        $("#id-pregunta").val("");
                       document.getElementById("p-corre").style.display='block'; 
                }
            });
               document.getElementById("terminar").style.display='initial';
               }
        });
         $("#terminar").click(function(){
             $("input[name=estado]:checked").removeAttr("checked");
                 $("#div-terminar").dialog('open');
        $("#termi").click(function(){
            if(!$("input[name=estado]:checked").val()) {
	  document.getElementById('error-estado').style.display='block';   
        }else{
            if($("input[name=estado]:checked").val()=="Para Campo"){
                var condic="nombre_encuesta='"+encuesta+"'";
                var opcion="actualizar";
                var values="estado_encuesta='Para Campo'";
                $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{ Op:opcion,tabla:'encuesta',condici:condic,values:values,
                            leer:'xs'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
			},
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA
                        $("#encuesta").val("");
                 document.getElementById('terminar').style.display='none';
                 guia=0;
                 encuesta="";
           document.getElementById('verifi-encuesta').style.display='initial';
             document.getElementById('p-corre').style.display='none';
               document.getElementById('e-corre').style.display='none';
             document.getElementById('tipo-pregunta').style.display='none';
                       $("#vista-previa").html("");
                        $("#tipodepregunta").val("");
                        $("#nom-pregunta").val("");
                        $("#id-pregunta").val("");
                        $("#vista-previa2").html("");
                        document.getElementById("pregunta-grilla").style.display='none';
            $("input[name=tipogrilla]:checked").removeAttr("checked");
            document.getElementById("pregunta-varias").style.display='none';
                    $("#opciones").val("");
            $("#preguntasg").val("");
            $("#opcionesg").val("");
            $("#div-terminar").dialog('close'); 
            var control = $("#file");
                    control.replaceWith( control = control.clone( true ) );
                        $("#vista-previa").html("");
                        $("#tipodepregunta").val("");
                        $("#nom-pregunta").val("");
                        $("#id-pregunta").val("");

                        },
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
            }
            else{
                $("#encuesta").val("");
                 document.getElementById('terminar').style.display='none';
                 guia=0;
                 encuesta="";
           document.getElementById('verifi-encuesta').style.display='initial';
             document.getElementById('p-corre').style.display='none';
               document.getElementById('e-corre').style.display='none';
             document.getElementById('tipo-pregunta').style.display='none';
                       $("#vista-previa").html("");
                        $("#tipodepregunta").val("");
                        $("#nom-pregunta").val("");
                        $("#id-pregunta").val("");
                        $("#vista-previa2").html("");
                        document.getElementById("pregunta-grilla").style.display='none';
            $("input[name=tipogrilla]:checked").removeAttr("checked");
            document.getElementById("pregunta-varias").style.display='none';
                    $("#opciones").val("");
            $("#preguntasg").val("");
            $("#opcionesg").val("");
            $("#div-terminar").dialog('close'); 
            var control = $("#file");
                    control.replaceWith( control = control.clone( true ) );
                        $("#vista-previa").html("");
                        $("#tipodepregunta").val("");
                        $("#nom-pregunta").val("");
                        $("#id-pregunta").val("");

            }     
        }
    });
             $("#no-termi").click(function(){
                $("#div-terminar").dialog('close');
             });
         });
        $("input[name=tipogrilla]").click(function () {    
         document.getElementById('error-rad-grilla').style.display='none';  
    });
    $("input[name=estado]").click(function () {    
         document.getElementById('error-estado').style.display='none';  
    });
        function envio2(texto,campo, my_callback){
             var resp = 5;
              $.ajax({
                type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{tabla:'pregunta',columnas:'*',Op:'wsaw',
                            condicion:"numero_pregunta='"+texto+"'",leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO	
                beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
                },success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA
                if(response.mensaje=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
                        document.getElementById(campo).style.display='none';  
                         document.getElementById("id-pregunta").style.display='initial';    
                resp=1;        
                }
        	else{
                document.getElementById(campo).style.display='block';    
                document.getElementById(campo).innerText="Este nombre de pregunta ya existe en esta encuesta";
                    resp=0;             
                }	
            my_callback(resp);              
            },
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
               return resp;
            }
    $("#tipodepregunta").change(function(){
        if($("#tipodepregunta").val()!=""){
  document.getElementById('agregar-pregunta').style.display='initial';   
  document.getElementById("pregunta-varias").style.display='none';
  document.getElementById("pregunta-grilla").style.display='none';
    if($("#tipodepregunta").val()=="Multiple"||$("#tipodepregunta").val()=="Unica"){
         document.getElementById("pregunta-varias").style.display='initial';
    }
    else if($("#tipodepregunta").val()=="Grilla"){
         document.getElementById("pregunta-grilla").style.display='initial';
    }
     else if($("#tipodepregunta").val()=="Imagen"){
         document.getElementById("pregunta-imagen").style.display='initial';
    }}
else{
  document.getElementById("pregunta-varias").style.display='none';
  document.getElementById("pregunta-grilla").style.display='none';
  document.getElementById("pregunta-imagen").style.display='none';
     document.getElementById('agregar-pregunta').style.display='none';   
}
    });
  $("#file").change(function (){
       $("#vista-previa").html('');
        document.getElementById('error-arch').style.display='none';   
       
      var archivos= document.getElementById('file').files;
      var navegador= window.URL || window.webkitURL;
       for(var x=0;x<archivos.length;x++){
           var size= archivos[x].size;
           var type = archivos[x].type;
           var name= archivos[x].name;
       if(size>(40*1024*1024)){
         document.getElementById('error-arch').style.display='initial';   
         document.getElementById('error-arch').innerText="El archivo "+name+" supera el tamaño maximo(40mb)";   
       }
       else if(type!='image/jpeg'&&type!='image/jpg'
               && type!='image/png'&& type!='image/gif'
               && type!='video/mp4'&& type!='video/avi'
               && type!='video/wmv'){
           document.getElementById('error-arch').style.display='initial';   
         document.getElementById('error-arch').innerText="El archivo "+name+" no tiene el formato admitido";   
      
       }
       else{
            var objeto_url= navegador.createObjectURL(archivos[x]);
          
           if(type=='video/mp4'|| type=='video/avi'
              || type=='video/wmv'){
           $("#vista-previa").append("<video src="+objeto_url+" height='175' controls></video>&nbsp;&nbsp;");
            
               }
               else{
            $("#vista-previa").append("<img src="+objeto_url+" width='175' height='175'>&nbsp;&nbsp;");      
               }
   }
       }
       $("#vista-previa").append("<br><span> Recuerde verificar las imagenes o el video</span>");
   });

  $("#id-pregunta").keypress(function (){
           solotexto(); 
        });
         $("#encuesta").keypress(function (){
           solotexto(); 
        }); 
        function solotexto(){
            if ((event.keyCode < 48) || (event.keyCode >57 )&&
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
