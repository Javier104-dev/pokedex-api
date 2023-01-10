import { pokemonServices } from "./services.js";

const crearDiv = (nombre) =>{
    const div = document.createElement("div");
    div.classList.add("tarjeta");
    const contenido =
    `
    <img class="tarjeta__foto" src="styles/image/25.png" alt="">
    <span class="tarjeta__nombre">${nombre}</span>
    <span class="tarjeta__detalles">Ver detalles</span>
    `

    div.innerHTML = contenido;
    return div;
}

const divContenedorHTML = document.querySelector("[data-listado]");

pokemonServices.listaPokemones().then((pokemonesJSON) => {
    const listaPokemones = pokemonesJSON.results
    listaPokemones.forEach(({name}) => {
        const nuevoDiv = crearDiv(name);
        divContenedorHTML.appendChild(nuevoDiv);
    });
}).catch((error) => alert("Ocurrio un error"));