import { listarPokemones, obtenerDetallesPokemon } from "./services.js";

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

const divContenedorHTML = document.querySelector("[data-listado]");

const exponerPokemones = async () =>{
    try{
        const listaJSON = await listarPokemones();
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

exponerPokemones();