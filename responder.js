// funcion con eventos asociados a html dinámico
$(function(){
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
function events(){  

var xd=contador;
  $("#siguiente").click(function(){
      
            cantidad(id_encuesta,function (res){
                if(xd==0){
                var dato="E"+res+"-"+id_encuesta;
                var values="'"+dato+"','"+id_encuesta+"'";
                $.ajax({
                        type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'insertar',tabla:'cantidad_encuestas'
                            ,values:values},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                	},
			error: function(){//SI OCURRE UN ERROR 
				//alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		}); 
                }
                if(xd!=0){
                    res--;                    
                }
                dato="E"+(res)+"-"+id_encuesta;
                var id=preguntas;
                var valores="'"+dato+"','"+id_encuesta+"','"+id[contador]+"','"+$('#respuesta').val()+"'";
                 var pre=id[contador];
                 
                if(arraypre[1]=="Abierta" || arraypre[1]=="Numerica"){ 
                valores="'"+dato+"','"+id_encuesta+"','"+pre+"','"+$('#respuesta').val()+"'";
                $.ajax({
                        type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'insertar',tabla:'datos'
                            ,values:valores},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                	},
			error: function(){//SI OCURRE UN ERROR 
				//alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});  
                }
                if(arraypre[1]=="Unica"){ 
                    var pre=id[contador];
                      if(!$("input[name=tiporadios]").is(':checked')){
                  valores="'"+dato+"','"+id_encuesta+"','"+pre+"','   '";
                                 }
                      
                    else{
                  valores="'"+dato+"','"+id_encuesta+"','"+pre+"','"+$("input[name=tiporadios]:checked").val()+"'";

                    }
                $.ajax({
                        type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'insertar',tabla:'datos'
                            ,values:valores},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                	},
			error: function(){//SI OCURRE UN ERROR 
				//alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});  
                }
                if(arraypre[1]=="Multiple"){
                             var checkboxValues = "";             
 $('input[name="t[]"]').each(function () {  
       if($(this).is(':checked')){
          checkboxValues = $(this).val();
      valores="'"+dato+"','"+id_encuesta+"','"+pre+"','"+checkboxValues+"'";
        $.ajax({
                        type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'insertar',tabla:'datos'
                            ,values:valores},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                	},
			error: function(){//SI OCURRE UN ERROR 
				//alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
       }
       else{
      valores="'"+dato+"','"+id_encuesta+"','"+pre+"','   '";
        $.ajax({
                        type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'insertar',tabla:'datos'
                            ,values:valores},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                   
                	},
			error: function(){//SI OCURRE UN ERROR 
				//alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
       }
    });
                }
                if(arraypre[1]=="Grilla"){
             
                     grilla(id[contador],function (valor){
                          if(valor=="Unica"){
       
	                 var j=0;
                         while(j<num_regis){
                            if(!$("input[name=td"+(j+1)+"]").is(':checked')){
                  valores="'"+dato+"','"+id_encuesta+"','"+pre+"','   '";
                                 }
                    else{
                  valores="'"+dato+"','"+id_encuesta+"','"+pre+"','"+$("input[name=td"+(j+1)+"]:checked").val()+"'";
                    }
                                 $.ajax({
                        type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'insertar',tabla:'datos'
                            ,values:valores},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                	},
			error: function(){//SI OCURRE UN ERROR 
				//alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});   j++;
                             }
                }
                     if(valor=="Multiple"){
                                  var checkboxValues = "";
 $('input[name="td[]"]').each(function () {  
       if($(this).is(':checked')){
          checkboxValues = $(this).val();
      valores="'"+dato+"','"+id_encuesta+"','"+pre+"','"+checkboxValues+"'";
        $.ajax({
                        type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'insertar',tabla:'datos'
                            ,values:valores},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                   
                	},
			error: function(){//SI OCURRE UN ERROR 
				//alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
       }
       else{
      valores="'"+dato+"','"+id_encuesta+"','"+pre+"','   '";
        $.ajax({
                        type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'insertar',tabla:'datos'
                            ,values:valores},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                   
                	},
			error: function(){//SI OCURRE UN ERROR 
				//alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
       }
    });
    }
            });
                    }
                contador++;
                id=preguntas;
         envio2(id[contador],function (res){
           arraypre=res;
            if(res[1]=="Abierta"){
                if(res[2]!="null"){
                    var s= res[2].split('.');
                      if(s[1]=="mp4"||s[1]=="avi"||s[1]=="wmv"){
    $("#contenedor").html("<label> "+res[0]+" </label><br>\n\
    <video src="+res[2]+" class='img-responsive' width='300' controls></video><br><br><input type='text' id='respuesta' style='width:700px;' \n\
    placeholder='Digita la respuesta>'<br><br>\n\
    <button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
    events(); 
    }
    else{
        $("#contenedor").html("<label> "+res[0]+" </label><br>\n\
<img src="+res[2]+" width='300' class='img-responsive' ><br><input type='text' id='respuesta' style='width:700px;' \n\
               placeholder='Digita la respuesta>'<br><br>\n\
              <button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
    events();
    }
                }
    else{
      $("#contenedor").html("<br><label> "+res[0]+" </label><br>"+
              "<input type='text' id='respuesta' style='width:450px;' placeholder='Digita la respuesta'><br><br>"+
            "<button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
              events();
    }}
   else if(res[1]=="Numerica"){
    if(res[2]!="null"){
           var s= res[2].split('.');
           if(s[1]=="mp4"||s[1]=="avi"||s[1]=="wmv"){
             $("#contenedor").html("<br><label> "+res[0]+" </label><br>\n\
             <video src="+res[2]+" class='img-responsive' width='300' controls></video><br><br><input type='number' id='respuesta' style='width:700px;' \n\
             placeholder='Digita la respuesta'><br><br>\n\
             <button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
            events();
           }
           else{
           $("#contenedor").html("<br><label> "+res[0]+" </label><br>\n\
           <img src="+res[2]+" width='300' class='img-responsive' ><br><input type='number' id='respuesta' style='width:700px;' \n\
           placeholder='Digita la respuesta'><br><br>\n\
           <button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
           events();
           }
           }
    else{
      $("#contenedor").html("<br><label> "+res[0]+" </label><br>"+
              "<input type='number' id='respuesta' style='width:450px;' placeholder='Digita la respuesta'><br><br>"+
            "<button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
              events();
    }}
 else if(res[1]=="Unica"){
                if(res[2]!="null"){
                 $("#contenedor").html("<br><label> "+res[0]+" </label><br>");events();
                  var s= res[2].split('.');
                      if(s[1]=="mp4"||s[1]=="avi"||s[1]=="wmv"){
                      $("#contenedor").append("<video src="+res[2]+" class='img-responsive' width='300' controls></video><br>");events();
                      }
                      else{
                 $("#contenedor").append("<img src="+res[2]+" width='300' class='img-responsive' ><br>");events();
                      }
                 $("#contenedor").append("<form name='radio' id='radios' action='' method='POST'>");events();
                 opciones(id[contador],function (resp){
                     for (var i =0;i<resp.length;i++){
   $("#contenedor").append("<input type='radio' name='tiporadios' id='tiporadios' value='"+(i+1)+"'> "+resp[i]+"<br>");
              events();   }
                  $("#contenedor").append("</form><br><br><button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
              events();
                 });
                
    events(); }
    else{ 
      $("#contenedor").html("<br><label> "+res[0]+" </label><br>");events();
              $("#contenedor").append("<form name='radio' id='radios' action='' method='POST'>");events();
                 opciones(id[contador],function (resp){
                     for (var i =0;i<resp.length;i++){
   $("#contenedor").append("<input type='radio' name='tiporadios' id='tiporadios' value='"+(i+1)+"'> "+resp[i]+"<br>");
            events();     }
                  $("#contenedor").append("</form><br><br><button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
              events();     
                 });
                 events();
                }
        }
            else    if(res[1]=="Multiple"){
                if(res[2]!="null"){
                
                 $("#contenedor").html("<br><label> "+res[0]+" </label><br>");events();
                  var s= res[2].split('.');
                      if(s[1]=="mp4"||s[1]=="avi"||s[1]=="wmv"){
                      $("#contenedor").append("<video src="+res[2]+" class='img-responsive' width='300' controls></video><br>");events();
                      }
                      else{
                 $("#contenedor").append("<img src="+res[2]+" width='300' class='img-responsive' ><br>");events();
                      }
                 opciones(id[contador],function (resp){
                     for (var i =0;i<resp.length;i++){
    $("#contenedor").append("<input id='t[]'  name='t[]' type='checkbox' value='"+(i+1)+"'>"+resp[i]+"<br>");
            events();  }
                  $("#contenedor").append("<br><br><button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
              events();
                 });
                
    events(); }
    else{ 
      $("#contenedor").html("<br><label> "+res[0]+" </label><br>");events();
          opciones(id[contador],function (resp){
                     for (var i =0;i<resp.length;i++){
   $("#contenedor").append("<input id='t[]'  name='t[]' type='checkbox' value='"+(i+1)+"'>"+resp[i]+"<br>");
            events();     }
                  $("#contenedor").append("<br><br><button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
              events();     
                 });
                 events();
                }
        }
       else if(res[1]=="Grilla"){
             if(res[2]!="null"){
                 var acumulador="Holas";
                grilla(id[contador],function (valor){
                    var columns;
                 columnas_grilla(id[contador],function (resp){
                     
                     for(var j=0;j<resp.length;j++){
                         if(j==0){
                             $("#contenedor").html("");
                             var s= res[2].split('.');
                      if(s[1]=="mp4"||s[1]=="avi"||s[1]=="wmv"){
                           acumulador="<br><br><label> "+res[0]+" </label><br>"+
                                     "<video src="+res[2]+" class='img-responsive' width='300' controls></video><br>";  
                      }else{
                            acumulador="<br><br><label> "+res[0]+" </label><br>"+
                                     "<img src="+res[2]+" width='300' class='img-responsive' >"; 
                      }        
                acumulador+="<br>"+
                  "<section>"+
            "<table class='table table-bordered table-condensed table-hover'>"+
            	"<thead><tr class='bordes_n'><th>   </th>"; 
                         }
                     acumulador+=("<th>"+resp[j]+"</th>");
                         }
                             acumulador+=("</tr></thead><tbody>");
                             if(valor=="Multiple"){
                         filas_grilla(id[contador],function(col){
                             
                             
                             for(var j=0;j<col.length;j++){
                                  acumulador+=("<tr>");
                                 
                         for (var i =0;i<resp.length+1;i++){
                             if(i==0){
                                 acumulador+=("<td>"+col[j]+"</td>");
                             }else{
                acumulador+=("<td><input id='td[]'  name='td[]' type='checkbox' value='"+(i)+"'></td>");
                  }
   }acumulador+=("</tr>");
      
                  }acumulador+=("</tbody></table></section>"); 
                  $("#contenedor").append(acumulador);
            $("#contenedor").append("<br><br><button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
             events();
              });}
          if(valor=="Unica"){
                            filas_grilla(id[contador],function(col){
                                    num_regis=col.length;

                                for(var j=0;j<col.length;j++){
                                     acumulador+=("<tr>");

                            for (var i =0;i<resp.length+1;i++){
                                if(i==0){
                                    acumulador+=("<td>"+col[j]+"</td>");
                                }else{
                              acumulador+=("<td><input id='td"+(j+1)+"'  name='td"+(j+1)+"' type='radio' value='"+i+"'></td>");
                     }


               }acumulador+=("</tr>");// alert(acumulador);

                     }acumulador+=("</tbody></table></section>"); 
                     $("#contenedor").append(acumulador);
               $("#contenedor").append("<br><br><button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
                events();
                 });}
              });});  
              
             }
    else{ var acumulador="Holas";
                // $("#contenedor").html(acumulador);
                grilla(id[contador],function (valor){
                    var columns;
                 columnas_grilla(id[contador],function (resp){
                     
                     for(var j=0;j<resp.length;j++){
                         if(j==0){
                             $("#contenedor").html("");
                             acumulador="<br><label> "+res[0]+" </label><br>"+
                                    // "<img src="+res[2]+" width='200' ><br>"+ 
                "<br>"+
                  "<section>"+
            "<table class='table table-bordered table-condensed table-hover'>"+
            	"<thead><tr class='bordes_n'><th>   </th>"; 
                         }
                     acumulador+=("<th>"+resp[j]+"</th>");
                         //events();
                     }
                
                             acumulador+=("</tr></thead><tbody>");
                             //
                             if(valor=="Multiple"){
                         filas_grilla(id[contador],function(col){
                              for(var j=0;j<col.length;j++){
                                  acumulador+=("<tr>");
                                 
                         for (var i =0;i<resp.length+1;i++){
                             if(i==0){
                                 acumulador+=("<td>"+col[j]+"</td>");
                             }else{
                acumulador+=("<td><input id='td[]'  name='td[]' type='checkbox' value='"+(i)+"'></td>");
                  }
            }acumulador+=("</tr>");
                  }acumulador+=("</tbody></table></section>"); 
                  $("#contenedor").append(acumulador);
            $("#contenedor").append("<br><br><button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
             events();
              });}
              if(valor=="Unica"){
                            filas_grilla(id[contador],function(col){
                                    num_regis=col.length;

                                for(var j=0;j<col.length;j++){
                                     acumulador+=("<tr>");

                            for (var i =0;i<resp.length+1;i++){
                                if(i==0){
                                    acumulador+=("<td>"+col[j]+"</td>");
                                }else{
                              acumulador+=("<td><input id='td"+(j+1)+"'  name='td"+(j+1)+"' type='radio' value='"+i+"'></td>");
                     }
         }acumulador+=("</tr>");// alert(acumulador);
                     }acumulador+=("</tbody></table></section>"); 
                     $("#contenedor").append(acumulador);
               $("#contenedor").append("<br><br><button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
                events();
                 });}
              });});
                } 
        }
        else{
             $("#encuestas").val("");
                 document.getElementById('terminar').style.display='none';
                 document.getElementById('p-corre').style.display='block';
                 contador=0;
                 xd=0;
                 document.getElementById('elegir').style.display='none';
            $("#contenedor").html('');
                 document.getElementById('listaencuestas').style.display='block';
                  
        }
         });
    
            });
        });
}
  function cambiarimagen(id) {
    	var propiedad = document.getElementById(id);
			$('img').attr({'border':'0px'});
			propiedad.border="4px";
			$("input[id=ClickImageU_Var]").prop('value', id);
			$("input[type=checkbox]").prop('checked', false);
  	}

	function validarNinguno(checkbox) {
		if(checkbox.checked){
			$('img').attr({'border': '0px'});
			$("input[id=ClickImageU_Var]").prop('value', checkbox.value);
		}
	}
// ejecutas la funcion en el ready del document
$(document).ready(function(){
  events();
});
   var arraypre;var num_regis=0;
$("#elegir").click(function(){
    var id=preguntas;
       id_encuesta=$("#encuestas").val();
        envio2(id[contador],function (res){
          arraypre=res;
          document.getElementById('listaencuestas').style.display='none';
       
            if(res[1]=="Abierta"){
                if(res[2]!="null"){
                    var s= res[2].split('.');
                      if(s[1]=="mp4"||s[1]=="avi"||s[1]=="wmv"){
    $("#contenedor").html("<label> "+res[0]+" </label><br>\n\
    <video src="+res[2]+" class='img-responsive' width='300' controls></video><br><br><input type='text' id='respuesta' style='width:700px;' \n\
    placeholder='Digita la respuesta>'<br><br>\n\
    <button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
    events(); 
    }
    else{
        $("#contenedor").html("<label> "+res[0]+" </label><br>\n\
<img src="+res[2]+" width='300' class='img-responsive' ><br><input type='text' id='respuesta' style='width:700px;' \n\
               placeholder='Digita la respuesta>'<br><br>\n\
              <button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
    events();
    }
                }
    else{
      $("#contenedor").html("<br><label> "+res[0]+" </label><br>"+
              "<input type='text' id='respuesta' style='width:450px;' placeholder='Digita la respuesta'><br><br>"+
            "<button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
              events();
    }}
    else if(res[1]=="Numerica"){
    if(res[2]!="null"){
           var s= res[2].split('.');
           if(s[1]=="mp4"||s[1]=="avi"||s[1]=="wmv"){
             $("#contenedor").html("<br><label> "+res[0]+" </label><br>\n\
             <video src="+res[2]+" class='img-responsive' width='300' controls></video><br><br><input type='number' id='respuesta' style='width:700px;' \n\
             placeholder='Digita la respuesta'><br><br>\n\
             <button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
            events();
           }
           else{
           $("#contenedor").html("<br><label> "+res[0]+" </label><br>\n\
           <img src="+res[2]+" width='300' class='img-responsive' ><br><input type='number' id='respuesta' style='width:700px;' \n\
           placeholder='Digita la respuesta'><br><br>\n\
           <button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
           events();
           }
           }
    else{
      $("#contenedor").html("<br><label> "+res[0]+" </label><br>"+
              "<input type='number' id='respuesta' style='width:450px;' placeholder='Digita la respuesta'><br><br>"+
            "<button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
              events();
    }}
 else if(res[1]=="Unica"){
                if(res[2]!="null"){
                
                 $("#contenedor").html("<br><label> "+res[0]+" </label><br>");events();
                  var s= res[2].split('.');
                      if(s[1]=="mp4"||s[1]=="avi"||s[1]=="wmv"){
                      $("#contenedor").append("<video src="+res[2]+" class='img-responsive' width='300' controls></video><br>");events();
                      }
                      else{
                 $("#contenedor").append("<img src="+res[2]+" width='300' class='img-responsive' ><br>");events();
                      }
                 $("#contenedor").append("<form name='radio' id='radios' action='' method='POST'>");events();
                 opciones(id[contador],function (resp){
                     for (var i =0;i<resp.length;i++){
   $("#contenedor").append("<input type='radio' name='tiporadios' id='tiporadios' value='"+(i+1)+"'> "+resp[i]+"<br>");
              events();   }
                  $("#contenedor").append("</form><br><br><button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
              events();
                 });
                
    events(); }
    else{ 
      $("#contenedor").html("<br><label> "+res[0]+" </label><br>");events();
              $("#contenedor").append("<form name='radio' id='radios' action='' method='POST'>");events();
                 opciones(id[contador],function (resp){
                     for (var i =0;i<resp.length;i++){
   $("#contenedor").append("<input type='radio' name='tiporadios' id='tiporadios' value='"+(i+1)+"'> "+resp[i]+"<br>");
            events();     }
                  $("#contenedor").append("</form><br><br><button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
              events();     
                 });
                 events();
                 
                }
        }
                if(res[1]=="Multiple"){
                if(res[2]!="null"){
                
                 $("#contenedor").html("<br><label> "+res[0]+" </label><br>");events();
                  var s= res[2].split('.');
                      if(s[1]=="mp4"||s[1]=="avi"||s[1]=="wmv"){
                      $("#contenedor").append("<video src="+res[2]+" class='img-responsive' width='300' controls></video><br>");events();
                      }
                      else{
                 $("#contenedor").append("<img src="+res[2]+" width='300' class='img-responsive' ><br>");events();
                      }
                 opciones(id[contador],function (resp){
                     for (var i =0;i<resp.length;i++){
    $("#contenedor").append("<input id='t[]'  name='t[]' type='checkbox' value='"+(i+1)+"'>"+resp[i]+"<br>");
            events();  }
                  $("#contenedor").append("<br><br><button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
              events();
                 });
                
    events(); }
    else{ 
      $("#contenedor").html("<br><label> "+res[0]+" </label><br>");events();
          opciones(id[contador],function (resp){
                     for (var i =0;i<resp.length;i++){
   $("#contenedor").append("<input id='t[]'  name='t[]' type='checkbox' value='"+(i+1)+"'>"+resp[i]+"<br>");
            events();     }
                  $("#contenedor").append("<br><br><button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
              events();     
                 });
                 events();
                 
                }
        }
        
      else if(res[1]=="Grilla"){
             if(res[2]!="null"){
                 var acumulador="Holas";

                // $("#contenedor").html(acumulador);
                grilla(id[contador],function (valor){
                    var columns;
                 columnas_grilla(id[contador],function (resp){
                     
                     for(var j=0;j<resp.length;j++){
                         if(j==0){
                             $("#contenedor").html("");
                             var s= res[2].split('.');
                      if(s[1]=="mp4"||s[1]=="avi"||s[1]=="wmv"){
                           acumulador="<br><br><label> "+res[0]+" </label><br>"+
                                     "<video src="+res[2]+" class='img-responsive' width='300' controls></video><br>";  
                      }else{
                            acumulador="<br><br><label> "+res[0]+" </label><br>"+
                                     "<img src="+res[2]+" width='300' class='img-responsive' >"; 
                      }
                           
                                     
                acumulador+="<br>"+
                  "<section>"+
            "<table class='table table-bordered table-condensed table-hover'>"+
            	"<thead><tr class='bordes_n'><th>   </th>"; 
                         }
                     acumulador+=("<th>"+resp[j]+"</th>");
                         //events();
                     }
                
                             acumulador+=("</tr></thead><tbody>");
                             //
                             if(valor=="Multiple"){
                         filas_grilla(id[contador],function(col){
                             
                             
                             for(var j=0;j<col.length;j++){
                                  acumulador+=("<tr>");
                                 
                         for (var i =0;i<resp.length+1;i++){
                             if(i==0){
                                 acumulador+=("<td>"+col[j]+"</td>");
                             }else{
                acumulador+=("<td><input id='td[]'  name='td[]' type='checkbox' value='"+(i)+"'></td>");
                  }

            
            }acumulador+=("</tr>");
      
                  }acumulador+=("</tbody></table></section>"); 
                  $("#contenedor").append(acumulador);
            $("#contenedor").append("<br><br><button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
             events();
              });}
          if(valor=="Unica"){
                            filas_grilla(id[contador],function(col){
                                    num_regis=col.length;

                                for(var j=0;j<col.length;j++){
                                     acumulador+=("<tr>");

                            for (var i =0;i<resp.length+1;i++){
                                if(i==0){
                                    acumulador+=("<td>"+col[j]+"</td>");
                                }else{
                              acumulador+=("<td><input id='td"+(j+1)+"'  name='td"+(j+1)+"' type='radio' value='"+i+"'></td>");
                     }


               }acumulador+=("</tr>");// alert(acumulador);

                     }acumulador+=("</tbody></table></section>"); 
                     $("#contenedor").append(acumulador);
               $("#contenedor").append("<br><br><button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
                events();
                 });}
              });});  
              
             }
    else{ var acumulador="Holas";

                // $("#contenedor").html(acumulador);
                grilla(id[contador],function (valor){
                    var columns;
                 columnas_grilla(id[contador],function (resp){
                     
                     for(var j=0;j<resp.length;j++){
                         if(j==0){
                             $("#contenedor").html("");
                             acumulador="<br><br><label> "+res[0]+" </label><br>"+
                                    // "<img src="+res[2]+" width='200' ><br>"+ 
                "<br>"+
                  "<section>"+
            "<table class='table table-bordered table-condensed table-hover'>"+
            	"<thead><tr class='bordes_n'><th>   </th>"; 
                         }
                     acumulador+=("<th>"+resp[j]+"</th>");
                         //events();
                     }
                
                             acumulador+=("</tr></thead><tbody>");
                             //
                             if(valor=="Multiple"){
                         filas_grilla(id[contador],function(col){
                             
                             
                             for(var j=0;j<col.length;j++){
                                  acumulador+=("<tr>");
                                 
                         for (var i =0;i<resp.length+1;i++){
                             if(i==0){
                                 acumulador+=("<td>"+col[j]+"</td>");
                             }else{
                acumulador+=("<td><input id='td[]'  name='td[]' type='checkbox' value='"+(i)+"'></td>");
                  }

            
            }acumulador+=("</tr>");
                  }acumulador+=("</tbody></table></section>"); 
                  $("#contenedor").append(acumulador);
            $("#contenedor").append("<br><br><button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
             events();
              });}
          if(valor=="Unica"){
                            filas_grilla(id[contador],function(col){
                                    num_regis=col.length;

                                for(var j=0;j<col.length;j++){
                                     acumulador+=("<tr>");

                            for (var i =0;i<resp.length+1;i++){
                                if(i==0){
                                    acumulador+=("<td>"+col[j]+"</td>");
                                }else{
                              acumulador+=("<td><input id='td"+(j+1)+"'  name='td"+(j+1)+"' type='radio' value='"+i+"'></td>");
                     }


               }acumulador+=("</tr>");// alert(acumulador);

                     }acumulador+=("</tbody></table></section>"); 
                     $("#contenedor").append(acumulador);
               $("#contenedor").append("<br><br><button id='siguiente' class='btn btn-primary' >Siguiente</button><br>");
                events();
                 });}
              
              });});
                } 
        }
        }
    );
    document.getElementById('terminar').style.display='initial';
}); 
// creamos el html dinámico y volvemos a disparar la función de los eventos

var preguntas;
$("#encuestas").change(function(){
        var encuesta=$("#encuestas").val();
        document.getElementById('p-corre').style.display='none';
        if(encuesta!=""){
           
        envio(encuesta,function (res){
                document.getElementById('elegir').style.display='initial';    
                preguntas=res;
                });
            }
            else{
            document.getElementById('elegir').style.display='none';
            }
    });
    var contador=0;
    var id_encuesta;
    function envio(texto,my_callback){
             var res="";
          $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'ss',tabla:'guia_pregunta',columnas:'*',
                            condicion:" nombre_encuesta='"+texto+"' order by id_guia_pregunta",
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
             $("#terminar").click(function(){
                 $("#div-terminar").dialog('open');
        $("#termi").click(function(){
                 $("#encuestas").val("");
                 document.getElementById('terminar').style.display='none';
                 contador=0;
                 xd=0;
                 document.getElementById('elegir').style.display='none';
            $("#div-terminar").dialog('close');    
            $("#contenedor").html('');
            document.getElementById('p-corre').style.display='block';
                 document.getElementById('listaencuestas').style.display='block';
             });
             $("#no-termi").click(function(){
                $("#div-terminar").dialog('close');
             });
         });
         
         function envio2(texto,my_callback){
             var res="";
          $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'ss',tabla:'pregunta',columnas:'*',
                            condicion:' numero_pregunta="'+texto+'"',
                            leer:'read'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
			 var x=response.contenido;
                        	
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
        function cantidad(texto,my_callback){
             var res="";
          $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'ss',tabla:'cantidad_encuestas',columnas:'*',
                            condicion:' nombre_encuesta="'+texto+'"',
                            leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
			 var x=response.contenido;
                        	
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

function opciones(texto,my_callback){
var resp="";
$.ajax({
type:'POST',//TIPO DE PETICION PUEDE SER GET
dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
data:{Op:'ss',tabla:'opcion',columnas:'*',
condicion:" numero_pregunta='"+texto+"' ORDER BY contador_opcion",
leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
var x=response.contenido;        
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
return resp;
}
            function grilla(texto,my_callback){
             var resp="";
            $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'ss',tabla:'grilla',columnas:'*',
                            condicion:' numero_grilla="'+texto+'"',
                            leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
			 var x=response.contenido;
                        	
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
               return resp;
            }
            
             
function filas_grilla(texto,my_callback){
 var resp="";
$.ajax({
type:'POST',//TIPO DE PETICION PUEDE SER GET
dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
data:{Op:'ss',tabla:'filas_grilla',columnas:'*',
condicion:" numero_grilla='"+texto+"' order by contador_opcion",
leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
var x=response.contenido;       
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
return resp;
}
function columnas_grilla(texto,my_callback){
 var resp="";
$.ajax({
type:'POST',//TIPO DE PETICION PUEDE SER GET
dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
data:{Op:'ss',tabla:'columnas_grilla',columnas:'*',
condicion:" numero_grilla='"+texto+"' order by contador_opcion",
leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
var x=response.contenido;        
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
return resp;
}
});