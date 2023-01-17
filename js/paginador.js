import { obtenerNextPagina, obtenerDetallesPokemon } from "./services.js";
import { crearDiv, modificarUrl } from "./listar-pokemones.js";

const botonNext = document.querySelector("[data-btn-next]");
const botonPrevious = document.querySelector("[data-btn-previous]");

botonNext.addEventListener("click", (event)=>{
    event.preventDefault();
    window.location = botonNext.href;
})

const obtenerNuevaLista = async ()=>{
    const divContenedorHTML = document.querySelector("[data-listado]");
    const urlActual = new URL(window.location).searchParams;
    
    if(!(urlActual.get("offset")) && !(urlActual.get("limit"))){
        return;
    }
    try{
        const url = crearUrl();
        const paginaJson = await obtenerNextPagina(url);
        const pokemones = paginaJson.results;
        pokemones.forEach(({name}) => {
            obtenerDetallesPokemon(name).then(({sprites})=>{
                const foto = sprites.front_default;
                const nuevoDiv = crearDiv(name, foto);
                divContenedorHTML.appendChild(nuevoDiv);
            });
        });
        
        if(paginaJson.previous === null){
            botonPrevious.href = "";
        }else{
            botonPrevious.href = modificarUrl(paginaJson.previous);
        }
        botonNext.href = modificarUrl(paginaJson.next);
        
    }catch(error) {alert("Ocurrio un error")};
};

const crearUrl = () =>{
    const url = new URL (window.location);
    const parametrosUrl = new URLSearchParams(url.search);
    const parametroOff = parametrosUrl.get("offset");
    const parametroLimit = parametrosUrl.get("limit");

    let urlApi = new URL("https://pokeapi.co/api/v2/pokemon");

    urlApi.searchParams.set("offset", parametroOff);
    urlApi.searchParams.set("limit", parametroLimit);
    urlApi = `${urlApi.origin}${urlApi.pathname}?${urlApi.searchParams}`
    
    return urlApi
};

obtenerNuevaLista();