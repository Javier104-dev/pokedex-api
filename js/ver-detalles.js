const url = new URL(window.location);
const id = url.searchParams.get("id");
const lista = document.querySelector("[data-listado]");

if(id === null){
    
    console.log("no hacer nada")
   
}else{
    lista.remove();
    console.log(id);
}

