$(function() {
  $('#id-pregunta').bind("cut copy paste",function(e) {
      e.preventDefault();
    });
$('#div-eliminar').dialog({
autoOpen:false,//ESTABLECEMOS PARA QUE NO SE ABRA SOLO CUANDO SE CARGUE LA PAGINA
modal:true,//BLOQUEAMOS OTRA ACCION MIENTRAS EL FORM ESTE ABIERTO
title:'Eliminar pregunta' ,//TITULO EN EL FORM
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
$('#div-estado').dialog({
autoOpen:false,//ESTABLECEMOS PARA QUE NO SE ABRA SOLO CUANDO SE CARGUE LA PAGINA
modal:true,//BLOQUEAMOS OTRA ACCION MIENTRAS EL FORM ESTE ABIERTO
title:'Cambiar estado' ,//TITULO EN EL FORM
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
var encuesta;
$("#cambiar-estado").click(function(){
    $("#div-estado").dialog('open'); 
    texto=encuesta;
        estado(texto,function (res){
         
    if(res=="Para Campo"){
$("input[value=Campo]").prop('checked', true);            
    }
    if(res=="En diseño"){
$("input[value=Diseño]").prop('checked', true);            
    }
    $("#cambiar").click(function(){
            if(!$("input[name=estado]:checked").val()) {
	  document.getElementById('error-estado').style.display='block';   
        }else{
            var condic="nombre_encuesta='"+encuesta+"'";
                var opcion="actualizar";var values;
            if($("input[name=estado]:checked").val()=="Diseño"){
               values="estado_encuesta='En Diseño'";}
           
            if($("input[name=estado]:checked").val()=="Campo"){
               values="estado_encuesta='Para Campo'";
           }
                $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{ Op:opcion,tabla:'encuesta',condici:condic,values:values,
                            leer:'xs'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
			},
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA
                        $("#div-estado").dialog('close');
                        },
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
            }
            }); 
            
        $("#no-cambiar").click(function(){
            $("#div-estado").dialog('close');
        }); 
               });    
        
    });
$("#agregar").click(function (){
document.getElementById("tipo-pregunta").style.display='initial';    
document.getElementById('tablapreguntas').style.display='none';
document.getElementById("tipodepregunta").style.display='initial';
document.getElementById("editar-pregunta").style.display='none';
document.getElementById("radiovarios").style.display='none';
document.getElementById("pregunta-varias").style.display='none';
document.getElementById("pregunta-grilla").style.display='none';
$("#opciones").val("");
$("input[name=tipogrilla]:checked").removeAttr("checked");
$("#preguntasg").val("");
$("#opcionesg").val("");
var control = $("#file");
control.replaceWith( control = control.clone( true ) );
$("#vista-previa").html("");
$("#tipodepregunta").val("");
$("#nom-pregunta").val("");
$("#id-pregunta").val("");
document.getElementById('nom-pregunta').style.border='1px solid gray';
document.getElementById('error-pre').style.display='none';                   
document.getElementById('error-tip').style.display='none';    
document.getElementById('tipodepregunta').style.border='1px solid gray';  
document.getElementById('error-opc').style.display='none';    
document.getElementById('opciones').style.border='1px solid gray';
document.getElementById('error-opcg').style.display='none';    
document.getElementById('opcionesg').style.border='1px solid gray';
document.getElementById('error-preg').style.display='none';    
document.getElementById('preguntasg').style.border='1px solid gray';
document.getElementById('error-id-pre').style.display='none';    
document.getElementById('id-pregunta').style.border='1px solid gray';
document.getElementById('error-tip').style.display='none';   
document.getElementById('modif-arch').style.display='none'; 
document.getElementById('file').style.display='initial';  
document.getElementById('error-rad-grilla').style.display='none';  
//    document.getElementById("p-corre").style.display='block'; 
//     document.getElementById("agregar-pregunta").style.display='initial';    
});
$("#cargar-lista").click(function (){
limpiar();
document.getElementById("p-corre").style.display='none'; 
document.getElementById("tipo-pregunta").style.display='none'; 
document.getElementById('error-arch').style.display="none";
$.ajax({
type:'POST',//TIPO DE PETICION PUEDE SER GET
dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
data:{Op:'sd',tabla:'guia_pregunta',columnas:'*',
condicion:" nombre_encuesta='"+encuesta+"' ORDER BY id_guia_pregunta",
leer:'read'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
document.getElementById('tablapreguntas').style.display='initial';
$("#listapreguntas").html(response.contenido);//cargo los registros que devuelve ajax
document.getElementById('titulo').innerText="Lista de Preguntas del estudio '"+encuesta+"'";
}
else{
alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo ");
}
},
error: function(){//SI OCURRE UN ERROR 
//alert('El servicio no esta disponible intentelo mas tarde XD');//MENSAJE EN CASO DE ERROR
}
});
renumber_table('#tablapreguntas tbody');
return false;
});
$("#nom-pregunta").focusin(function (){
document.getElementById('error-pre').style.display='none';    
document.getElementById('nom-pregunta').style.border='1px solid gray';
document.getElementById("p-corre").style.display='none'; 
});
$("#tipodepregunta").focusin(function (){
document.getElementById('error-tip').style.display='none';    
document.getElementById('tipodepregunta').style.border='1px solid gray';
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
document.getElementById("p-corre").style.display='none';
});  
$("#encuestas").change(function(){
document.getElementById('error-arch').style.display="none";
encuesta=$("#encuestas").val();
document.getElementById("p-corre").style.display='none'; 
if(encuesta!=""){
$.ajax({
type:'POST',//TIPO DE PETICION PUEDE SER GET
dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
data:{Op:'sd',tabla:'guia_pregunta',columnas:'*',
condicion:" nombre_encuesta='"+encuesta+"' ORDER BY id_guia_pregunta",
leer:'read'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
document.getElementById('tablapreguntas').style.display='initial';
document.getElementById('tipo-pregunta').style.display='none';
$("#listapreguntas").html(response.contenido);//cargo los registros que devuelve ajax
renumber_table('#tablapreguntas tbody');
document.getElementById('titulo').innerText="Lista de Preguntas de la encuesta '"+encuesta+"'";     
}
else{
alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo ");
}
},
error: function(){//SI OCURRE UN ERROR 
alert('El servicio no esta disponible intentelo mas tarde XD');//MENSAJE EN CASO DE ERROR
}
});
$("#encuestas").val("");
}
else{
document.getElementById("tipo-pregunta").style.display='none';    
document.getElementById('tablapreguntas').style.display='none';
}
return false;
});
//Helper function to keep table row from collapsing when being sorted
var fixHelperModified = function(e, tr) {
var $originals = tr.children();
var $helper = tr.clone();
$helper.children().each(function(index)
{
  $(this).width($originals.eq(index).width())
});
return $helper;
};
//Make diagnosis table sortable
$("#tablapreguntas tbody").sortable({
helper: fixHelperModified,
stop: function(event,ui) {renumber_table('#tablapreguntas')}
}).disableSelection();
function limpiar(){                
$("#mostrar-arch").prop( "checked", false );
$("#elim-arch").prop( "checked", false );
$("input[name=tipogrilla]:checked").removeAttr("checked");
$("input[name=tipovarios]:checked").removeAttr("checked");
$("#preguntasg").val("");
$("#opcionesg").val("");
var control = $("#file");
control.replaceWith( control = control.clone( true ) );
$("#vista-previa").html("");
$("#tipodepregunta").val("");
$("#nom-pregunta").val("");
$("#id-pregunta").val("");
document.getElementById("pregunta-varias").style.display='none';
document.getElementById("pregunta-grilla").style.display='none';
document.getElementById("tipo-pregunta").style.display='initial';
document.getElementById("editar-pregunta").style.display='initial';
document.getElementById("tipodepregunta").style.display='none';
document.getElementById("agregar-pregunta").style.display='none';
document.getElementById('nom-pregunta').style.border='1px solid gray';
document.getElementById('error-pre').style.display='none';                   
document.getElementById('error-tip').style.display='none';    
document.getElementById('tipodepregunta').style.border='1px solid gray';  
document.getElementById('error-opc').style.display='none';    
document.getElementById('opciones').style.border='1px solid gray';
document.getElementById('error-opcg').style.display='none';    
document.getElementById('opcionesg').style.border='1px solid gray';
document.getElementById('error-preg').style.display='none';    
document.getElementById('preguntasg').style.border='1px solid gray';
document.getElementById('error-id-pre').style.display='none';    
document.getElementById('id-pregunta').style.border='1px solid gray';
document.getElementById('error-tip').style.display='none';   
document.getElementById('file').style.display='none'; 
document.getElementById('error-rad-grilla').style.display='none'; 
document.getElementById('modif-arch').style.display='initial'; 
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
//Delete button in table rows
    var x=0;var pregunta="";
$('#tablapreguntas').on('click','#eliminar',function() {
tableID = '#' + $(this).closest('#tablapreguntas tbody').attr('id');
tr= (this);
pos=$(this).parent().parent();
variable=$(pos).children("td:eq("+1+")").text();
document.getElementById("escrito").innerText="Desea eliminar la pregunta '"+variable+"' de la encuesta "+encuesta;
$("#div-eliminar").dialog('open');
$("#eli").click(function(){ 
pregunta=variable+"-"+encuesta;
envio4(pregunta,function (resp){
if(resp==0){
envio2(pregunta,function (res){
var tabla; var condici;
if(res[1]=="Abierta"||res[1]=="Numerica"||res[1]=="Unica"||res[1]=="Multiple"){
tabla="pregunta";condici="numero_pregunta ='"+pregunta+"'";
}
if(res[1]=="Grilla"){
tabla="grilla";condici="numero_grilla ='"+pregunta+"'";
}
if(res[2]!="null"){   
var ruta="imagenes/"+encuesta+"/"+pregunta;
$.ajax({
type:'POST',//TIPO DE PETICION PUEDE SER GET
dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
data:{Op:'borrar',ruta:ruta,
leer:'xs'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
},
success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA                    
},
error: function(){//SI OCURRE UN ERROR 
//alert('Error en eliminar');//MENSAJE EN CASO DE ERROR
}
});
return false;
}
tr.closest('tr').remove();
renumber_table(tableID);
var opcion="eliminar";
$.ajax({
type:'POST',//TIPO DE PETICION PUEDE SER GET
dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
data:{Op:opcion,tabla:tabla,condici:condici,
leer:'xs'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
},
success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA
if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
}
else{
alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
}                   
},
error: function(){//SI OCURRE UN ERROR 
//alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
}
});
return false;
});  } });
$('#div-eliminar').dialog('close');
});
$("#no-eli").click(function(){
$('#div-eliminar').dialog('close');//CERRAMOS EL FORM
});                        
});

var aux=[]; var guia="";

$('#tablapreguntas').on('click','#editar',function() {
document.getElementById('tablapreguntas').style.display='none';
 pos=$(this).parent().parent();
limpiar();
variable=$(pos).children("td:eq("+1+")").text();
preguntax=variable+"-"+encuesta;
envio2(preguntax,function (res){
var x=res[5].split("-");
$("#id-pregunta").val(""+x[0]);
$("#nom-pregunta").val(""+res[0]);
aux=res; guia=$(pos).children("td:eq("+0+")").text();
if(res[2]!="null"){
document.getElementById("vista-previa").style.display='initial';
var s= res[2].split('.');
$("#vista-previa").html("");
if(s[1]=="mp4"||s[1]=="avi"||s[1]=="wmv"){
$("#vista-previa").append("<video src="+res[2]+" class='img-responsive' width='175' controls></video>&nbsp;&nbsp;");
}
else{
$("#vista-previa").append("<img src="+res[2]+" class='img-responsive' width='175' height='175'>&nbsp;&nbsp;");
}
document.getElementById('vista-previa').style.display='initial'; 
}
else{
document.getElementById("vista-previa").style.display='none';  
}
$("#mostrar-arch").on('click', function() {
if( $(this).is(':checked') ){
$("#vista-previa").html("");
if(res[2]!="null"){
document.getElementById("vista-previa").style.display='initial';
var s= res[2].split('.');
// $("#vista-previa").html("");
if(s[1]=="mp4"||s[1]=="avi"||s[1]=="wmv"){
$("#vista-previa").append("<video src="+res[2]+" class='img-responsive' width='175' controls></video>&nbsp;&nbsp;");
}
else{
$("#vista-previa").append("<img src="+res[2]+" class='img-responsive' width='175' height='175'>&nbsp;&nbsp;");
}
}
else{
document.getElementById("vista-previa").style.display='none';  
}
document.getElementById('file').style.display='initial'; 
$("#elim-arch").prop( "checked", false );
}
else{
document.getElementById('error-arch').style.display="none";
document.getElementById('file').style.display='none';         
if( !$(this).is(':checked') && !$("#elim-arch").is(':checked') ){    
if(res[2]!="null"){
document.getElementById("vista-previa").style.display='initial';  
var s= res[2].split('.');
$("#vista-previa").html("");
if(s[1]=="mp4"||s[1]=="avi"||s[1]=="wmv"){
$("#vista-previa").append("<video src="+res[2]+" class='img-responsive' width='175' controls></video>&nbsp;&nbsp;");
} 
else{
$("#vista-previa").append("<img src="+res[2]+" class='img-responsive' width='175' height='175'>&nbsp;&nbsp;");
}
}
else{
document.getElementById("vista-previa").style.display='none';  
}
}
}
});
$("#elim-arch").on('click', function() {
if( $(this).is(':checked') ){
document.getElementById('error-arch').style.display="none";
var control = $("#file");
control.replaceWith( control = control.clone( true ) );
$("#mostrar-arch").prop( "checked", false );
document.getElementById('vista-previa').style.display='none'; 
document.getElementById('file').style.display='none';         
}
else{
document.getElementById('vista-previa').style.display='initial'; 
if( !$(this).is(':checked') && !$("#mostrar-arch").is(':checked') ){
if(res[2]!="null"){
var s= res[2].split('.');
$("#vista-previa").html("");
if(s[1]=="mp4"||s[1]=="avi"||s[1]=="wmv"){
$("#vista-previa").append("<video src="+res[2]+" class='img-responsive' width='175' controls></video>&nbsp;&nbsp;");
}
else{
$("#vista-previa").append("<img src="+res[2]+" class='img-responsive' width='175' height='175'>&nbsp;&nbsp;");
}
}
else{
document.getElementById("vista-previa").style.display='none';  
}        
}
} 
});
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
if(res[1]=="Unica"||res[1]=="Multiple"){
opciones(res[5],function (resp){                       
document.getElementById("radiovarios").style.display='initial';                         
if(res[1]=="Multiple"){
$("input[value=Multiple]").prop('checked', true);            
}
if(res[1]=="Unica"){
$("input[value=Unica]").prop('checked', true);                
}                                                     
document.getElementById("pregunta-varias").style.display='initial';
var acumulador="";
for (var i =0;i<resp.length;i++){
acumulador+=(resp[i]+"\n");
}
$("#opciones").html("");            
$("#opciones").val(acumulador); 
});
}
if(res[1]=="Grilla"){            
grilla(res[5],function (valor){
document.getElementById("pregunta-grilla").style.display='initial';
if(valor=="Multiple"){
$("input[value=Multiple]").prop('checked', true);            
}
if(valor=="Unica"){
$("input[value=Unica]").prop('checked', true);            
}
columnas_grilla(res[5],function (resp){
var acumulador="";
for(var j=0;j<resp.length;j++){
acumulador+=(resp[j]+"\n");
}
$("#opcionesg").html("");            
$("#opcionesg").val(acumulador);   
});
filas_grilla(res[5],function (resp){
var acumulador="";
for(var j=0;j<resp.length;j++){
acumulador+=(resp[j]+"\n");
}
$("#preguntasg").html("");            
$("#preguntasg").val(acumulador);   
});
});
} 

});
});
  $('#editar-pregunta').click(function (){
        var vector=[];
        vector[0]="0";
        vector[1]="0";
        vector[2]="0";
        vector[3]="0";
        vector[4]="0";
        vector[5]="0";
        res=aux;
	nombre=$("#id-pregunta").val();
        preguntas=$("#nom-pregunta").val();
        if(preguntas==null || preguntas.length==0){
          document.getElementById('error-pre').style.display='block';    
          document.getElementById('nom-pregunta').style.border="1px solid red";
        vector[0]="1";      
      }
            if($("#mostrar-arch").is(':checked') ){
                var archivos= document.getElementById('file').files;
     var num= archivos.length;
     if (num<=0){
         vector[5]="1";
         document.getElementById('error-arch').style.display="initial";
         document.getElementById('error-arch').innerText="Seleccione un archivo";
     }
            }
      if(nombre==null || nombre.length==0){
          document.getElementById('error-id-pre').style.display='block';    
          document.getElementById('id-pregunta').style.border="1px solid red";
      vector[2]="1";      
      }
      if(res[1]=="Multiple"||res[1]=="Unica"){
        opciones=$("#opciones").val();
          if(opciones==null || opciones.length==0){
          document.getElementById('error-opc').style.display='block';    
          document.getElementById('opciones').style.border="1px solid red";
      vector[3]="1";      
      }
  }
     if(res[1]=="Grilla"){
         
          opcionesg=$("#opcionesg").val();
          if(opcionesg==null || opcionesg.length==0){
          document.getElementById('error-opcg').style.display='block';    
          document.getElementById('opcionesg').style.border="1px solid red";
          vector[3]="1";      
          }
          preguntasg=$("#preguntasg").val();
          if(preguntasg==null || preguntasg.length==0){
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
          
             var  id_pregunta=$("#id-pregunta").val()+"-"+encuesta+"' and not numero_pregunta= '"+res[5];
           envio3(id_pregunta,'error-id-pre',function (resp){
               var pre=nombre+"-"+encuesta;
                        var ruta=res[2];
                        var s= res[2].split('/');
                       var ruta2="imagenes/"+encuesta+"/"+pre+"/"+s[3];
                        var carpeta="imagenes/"+encuesta+"/"+pre+"/";
                        var carpeta2=s[0]+"/"+s[1]+"/"+s[2]+"/";
                       
               if(resp==1){
                   
                    if( !$("#mostrar-arch").is(':checked') && !$("#elim-arch").is(':checked') ){
                       if(res[2]!="null") {
                       if(ruta!=ruta2){
                         $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'copiar',ruta:ruta,ruta2:ruta2,carpeta:carpeta,carpeta2:carpeta2,
                           leer:'xs'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
			},
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA
                      			
			},
			error: function(){//SI OCURRE UN ERROR 
				//alert('Error en eliminar');//MENSAJE EN CASO DE ERROR
			}
                        });
                        } 
                    }
                    }
                else{
                if($("#mostrar-arch").is(':checked') ){
                     if(ruta!="null"){
                       $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'borrar',ruta:carpeta2,
                           leer:'xs'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
			},
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA
                      			
			},
			error: function(){//SI OCURRE UN ERROR 
				//alert('Error en eliminar');//MENSAJE EN CASO DE ERROR
			}
		});}
                 var  id_pregunta=$("#id-pregunta").val()+"-"+encuesta;
 var archivos= document.getElementById('file').files;
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
                         // $("#respuesta").html(response);
                        },
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
            ruta ="imagenes/"+encuesta+"/"+id_pregunta+"/"+name;
         }  }
                if($("#elim-arch").is(':checked') ){
                    if(ruta!="null"){
                       $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'borrar',ruta:carpeta2,
                           leer:'xs'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
			},
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA
                      			
			},
			error: function(){//SI OCURRE UN ERROR 
				//alert('Error en eliminar');//MENSAJE EN CASO DE ERROR
			}
		});
            }
              ruta="null";
                }}
                  tipo=res[1];
                var tabla; var condici;
                    if(res[1]=="Abierta"||res[1]=="Numerica"||res[1]=="Unica"||res[1]=="Multiple"){
                        tabla="pregunta";condici="numero_pregunta ='"+res[5]+"'";
                    }
                    if(res[1]=="Grilla"){
                        tabla="grilla";condici="numero_grilla ='"+res[5]+"'";
                    }
                    var bloque=[];
                  if(tipo=="Abierta"||tipo=="Numerica"){ 
                    bloque[0]="DELETE FROM pregunta where numero_pregunta='"+res[5]+"'";
                    bloque[1]="INSERT INTO pregunta values('"+pre+"','"+preguntas+"','"+tipo+"','"+ruta+"','"+encuesta+"',null)";
                    bloque[2]="INSERT INTO guia_pregunta values("+guia+",'"+pre+"','"+encuesta+"')";
                }
                if(tipo=="Unica"||tipo=="Multiple"){
                    bloque[0]="DELETE FROM pregunta where numero_pregunta='"+res[5]+"'";
                    bloque[1]="INSERT INTO pregunta values('"+pre+"','"+preguntas+"','"+$("input[id=tipovarios]:checked").val()+"','"+ruta+"','"+encuesta+"',null)";
                    bloque[2]="INSERT INTO guia_pregunta values("+guia+",'"+pre+"','"+encuesta+"')";
                       var lines = $("#opciones").val().split('\n');
               var x=0;
for(var i = 0;i < lines.length;i++){
    if(lines[i]!=""){
        x++;
bloque[x+2] ="INSERT INTO opcion values("+x+",'Op"+(x)+"-"+pre+"','"+lines[i]+"','"+pre+"','"+encuesta+"')";
           }
            }
                }
                if(tipo=="Grilla"){ 
                    bloque[0]="DELETE FROM grilla where numero_grilla='"+res[5]+"'";
                    bloque[1]="INSERT INTO grilla values('"+pre+"','"+$("input[name=tipogrilla]:checked").val()+"','"+encuesta+"')"
                    bloque[2]="INSERT INTO pregunta values('"+pre+"','"+preguntas+"','"+tipo+"','"+ruta+"','"+encuesta+"','"+pre+"')";
                    bloque[3]="INSERT INTO guia_pregunta values("+guia+",'"+pre+"','"+encuesta+"')";
                                  var lines = $("#opcionesg").val().split('\n');
            var x=0;
for(var i = 0;i < lines.length;i++){
    if(lines[i]!=""){
        x++;
bloque[x+3] ="INSERT INTO columnas_grilla values("+x+",'C"+(x)+"-"+pre+"','"+lines[i]+"','"+pre+"')";
                       
                           }}
                        var lines = $("#preguntasg").val().split('\n');
            var y=0;
            for(var i = 0;i < lines.length;i++){
                if(lines[i]!=""){
        y++;
bloque[x+y+3] ="INSERT INTO filas_grilla values("+y+",'F"+(y)+"-"+pre+"','"+lines[i]+"','"+pre+"')";
        }
           }
              }
               $.ajax({
			type:'POST',//TIPO DE PETICION PUEDE SER GET
			dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
			url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
			data:{Op:'bloque',bloque:bloque,tabla:'guia_pregunta',columnas:'*',
        condicion:" nombre_encuesta='"+encuesta+"' ORDER BY id_guia_pregunta",
        leer:'read'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
			beforeSend: function(){//ACCION QUE SUCEDE ANTES DE HACER EL SUBMIT
			},
			success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA
                            if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
					}
			else{
				//alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo");
                            }
        $("#listapreguntas").html(response.contenido);//cargo los registros que devuelve ajax
        document.getElementById('titulo').innerText="Lista de Preguntas de la encuesta '"+encuesta+"'";
         document.getElementById("tipo-pregunta").style.display='none'; 
         document.getElementById('error-arch').style.display="none";
        document.getElementById('tablapreguntas').style.display='initial';
			},
			error: function(){//SI OCURRE UN ERROR 
				alert('El servicio no esta disponible intentelo mas tarde');//MENSAJE EN CASO DE ERROR
			}
		});
            }
            else{
                }
        });
                        }
                    });
function valor(texto,my_callback){
var valor="";
$.ajax({
type:'POST',//TIPO DE PETICION PUEDE SER GET
dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
data:{Op:'ss',tabla:'guia_pregunta',columnas:'*',
condicion:' nombre_encuesta="'+texto+'"',
leer:'leer'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
var x=response.mensaje;
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
return valor;
}
function envio3(texto,campo, my_callback){
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
function envio4(texto, my_callback){
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
resp=1;        
}
else{
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
$("#agregar-pregunta").click(function (){
/*document.getElementById('error-pre').style.display='none';    
document.getElementById('nom-pregunta').style.display='initial';
document.getElementById('error-tip').style.display='none';    
document.getElementById('tipodepregunta').style.display='initial';
document.getElementById('error-id-pre').style.display='none';    
document.getElementById('id-pregunta').style.display='initial';
*/  var vector=[];
vector[0]="0";
vector[1]="0";
vector[2]="0";
vector[3]="0";
vector[4]="0";
vector[5]="0";    
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
var  id_pregunta=$("#id-pregunta").val()+"-"+encuesta;
var ruta=null;        
var archivos= document.getElementById('file').files;
var opcion="insertar";                    
// var navegador= window.URL || window.webkitURL;
var num= archivos.length;        
if (num<=0){}
else{
document.getElementById("vista-previa").style.display='initial';      
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
var guia=0;
envio3(id_pregunta,'error-id-pre',function (resp){
valor(encuesta,function (valor){
guia=valor;       
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
var valores =x+",'Op"+(x)+"-"+id_pregunta+"','"+lines[i]+"','"+id_pregunta+"','"+encuesta+"'";
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
});
//  document.getElementById("terminar").style.display='initial';
} 
return false;
});
function renumber_table(tableID) {
var x=0;var id=[];var guia=[];
$(tableID + " tr").each(function() {
count = $(this).parent().children().index($(this)) + 1;
$(this).find('.priority').html(count);
ooo=  $(this).find('.dato').html();
if(x>0){
id[x-1]=(ooo+"-"+encuesta);
guia[x-1]=count;
}
x++;
});
if(x>0){
$.ajax({
type:'POST',//TIPO DE PETICION PUEDE SER GET
dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
data:{Op:'guiaactualizada',tabla:'guia_pregunta',
id:id,guia:guia,
leer:'xs'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
if(response.respuesta=="GOOD"){//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
}
else{
alert("Ocurrio un error al ejecutar la operacion, intentelo de nuevo ");
}
},
error: function(){//SI OCURRE UN ERROR 
//alert('El servicio no esta disponible intentelo mas tarde XD');//MENSAJE EN CASO DE ERROR
}
});} 
return false;
}
$("#tipodepregunta").focusin(function (){
document.getElementById('error-tip').style.display='none';    
document.getElementById('tipodepregunta').style.border='1px solid gray';     
document.getElementById("p-corre").style.display='none'; 
});
$("input[name=tipogrilla]").click(function () {    
document.getElementById('error-rad-grilla').style.display='none';  
});
$("input[name=tipoimagen]").click(function () {    
document.getElementById('error-rad-img').style.display='none';  
});
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
}
else{   
document.getElementById("pregunta-varias").style.display='none';
document.getElementById("pregunta-grilla").style.display='none';
document.getElementById('agregar-pregunta').style.display='none';   
}
});
$("#file").change(function (){
$("#vista-previa").html('');
document.getElementById('vista-previa').style.display='initial'; 
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
function envio2(texto,my_callback){
var res="";
$.ajax({
type:'POST',//TIPO DE PETICION PUEDE SER GET
dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
data:{Op:'ss',tabla:'pregunta',columnas:'*',
condicion:" numero_pregunta='"+texto+"'",
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
function estado(texto,my_callback){
var res="";
$.ajax({
type:'POST',//TIPO DE PETICION PUEDE SER GET
dataType:"json",//EL TIPO DE DATO QUE DEVUELVE PUEDE SER JSON/TEXT/HTML/XML
url:"myajax.php",//DIRECCION DONDE SE ENCUENTRA LA OPERACION A REALIZAR
data:{Op:'ss',tabla:'encuesta',columnas:'*',
condicion:'nombre_encuesta="'+texto+'"',
leer:'read'},//DATOS ENVIADOS PUEDE SER TEXT A TRAVEZ DE LA URL O PUEDE SER UN OBJETO
success: function(response){//ACCION QUE SUCEDE DESPUES DE REALIZAR CORRECTAMENTE LA PETCION EL CUAL NOS TRAE UNA RESPUESTA 
//MANDAMOS EL MENSAJE QUE NOS DEVUELVE EL RESPONSE
var x=response.contenido;

my_callback(x);
},
error: function(){//SI OCURRE UN ERROR 
alert('El servicio no esta disponible intentelo mas tarde XD2');//MENSAJE EN CASO DE ERROR
}
});
return res;
}
 $("#id-pregunta").keypress(function (){
           solotexto(); 
        });
        
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