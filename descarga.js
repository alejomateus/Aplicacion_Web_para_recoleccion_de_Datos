$(function(){

$("#encuestas").change(function(){ $("#contenedor").html("");
        var encuesta=$("#encuestas").val();
        if(encuesta!=""){
               $("#contenedor").html("<br><a href='reporte_excel.php?encuesta="+encuesta+"'><img src='imagenes/descarga.jpg' width='80'/></a>");

    
              //  document.getElementById('elegir').style.display='initial';    
         
            }
            else{
            document.getElementById('elegir').style.display='none';
            }
    });
    $("#elegir").click(function (){
         var encuesta=$("#encuestas").val();
    $("#contenedor").html("<br><a href='reporte_excel.php?encuesta="+encuesta+"'><img src='imagenes/descarga.jpg' width='80'/></a>");
    });
    });
    