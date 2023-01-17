import { listarPokemones, obtenerDetallesPokemon, obtenerNextPagina } from "./services.js";

const botonNext = document.querySelector("[data-btn-next]");

const crearDiv = (nombre, foto) =>{
    const div = document.createElement("div");
    div.classList.add("tarjeta");
    const contenido =
    `
    <img class="tarjeta__foto" src="${foto}" alt="">
    <span class="tarjeta__nombre">${nombre}</span>
    <a class="tarjeta__detalles" href="index.html?id=${nombre}">Ver detalles</a>
    `
    div.innerHTML = contenido;
    return div;
}

const exponerPokemones = async () =>{
    const divContenedorHTML = document.querySelector("[data-listado]");
    const urlActual = new URL(window.location).searchParams;
    
    if((urlActual.get("offset")) && (urlActual.get("limit"))){
        return;
    }

    try{
        const listaJSON = await listarPokemones();
        botonNext.href = modificarUrl(listaJSON.next);
        const listaPokemones = listaJSON.results
        listaPokemones.forEach(({name}) => {

            obtenerDetallesPokemon(name).then(({sprites})=>{
                const foto = sprites.front_default;
                const nuevoDiv = crearDiv(name, foto);
                divContenedorHTML.appendChild(nuevoDiv);
            });
            
        });
    }catch(error) {alert("Ocurrio un error")};
};

const modificarUrl = (next) =>{
    const apiUrl = new URL(next);
    const parametrosUrl = new URLSearchParams(apiUrl.search);
    const parametroOff = parametrosUrl.get("offset");
    const parametroLimit = parametrosUrl.get("limit");
    
    const urlActual = new URL(window.location);

    urlActual.searchParams.set("offset", parametroOff);
    urlActual.searchParams.set("limit", parametroLimit);
    
    const nuevaUrl = `${urlActual.origin}${urlActual.pathname}?${urlActual.searchParams}`
    return nuevaUrl;
};

exponerPokemones();
export{crearDiv, modificarUrl};