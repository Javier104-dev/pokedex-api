import { obtenerDetallesPokemon } from "./services.js";

const contenedorHtml = document.querySelector("[data-detalles]");
const listado = document.querySelector("[data-listado]");

const detallarPokemones = async () =>{
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if(id === null){
        return;
    }

    try{
        const pokemonSeleccionado = await obtenerDetallesPokemon(id);
            let tipos = [];

            const nombre = pokemonSeleccionado.name;
            const foto = pokemonSeleccionado.sprites.front_default;
            const altura = pokemonSeleccionado.height;
            const peso = pokemonSeleccionado.weight
            const types = pokemonSeleccionado.types;
                types.forEach((tipo)=>{
                    tipos.push(tipo.type.name);
                });
                const tiposString = tipos.join(", ");
            const div = crearDiv(nombre, foto, altura, peso, tiposString);
            listado.remove();
            contenedorHtml.appendChild(div);
    }catch(error) {alert("Ocurrio un error")};
};

detallarPokemones();

const crearDiv = (nombre, foto, altura, peso, tipo) =>{
    const div = document.createElement("div");
    div.classList.add("pokemon");
    const contenido =
    `
    <div class="pokemon__descripcion">
        <span class="pokemon__descripcion__item">Nombre: ${nombre}</span>
        <span class="pokemon__descripcion__item">Altura: ${altura}</span>
        <span class="pokemon__descripcion__item">Peso: ${peso}</span>
        <span class="pokemon__descripcion__item">Tipo: ${tipo}</span>
        <span class="pokemon__descripcion__item">Habilidades:</span>
        <ul class="pokemon__descripcion__poder">
            
        </ul>
    </div>
    <div>
        <img class="pokemon__imagen" src="${foto}" alt="Foto Pokemon">
    </div>
    `;

    div.innerHTML = contenido;
    obtenerPoderesPokemon(nombre, div);
    return div;
};

const obtenerPoderesPokemon = async (nombre, div) => {
    const ulDiv = div.querySelector(".pokemon__descripcion__poder");
    try{
        const pokemonSeleccionado = await obtenerDetallesPokemon(nombre);
        const arrayHabilidades = pokemonSeleccionado.abilities;
            arrayHabilidades.forEach((habilidad)=>{
                const li = document.createElement("li");
                li.textContent = habilidad.ability.name;
                ulDiv.appendChild(li);
            });
    }catch(error) {alert("Ocurrio un error")};
};