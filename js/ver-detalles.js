import { pokemonServices } from "./services.js";

const contenedorHtml = document.querySelector("[data-detalles]");
const listado = document.querySelector("[data-listado]");



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
        <ul class="pokemon__descripcion__poder">
            
        </ul>
    </div>
    <div>
        <img class="pokemon__imagen" src="${foto}" alt="Foto Pokemon">
    </div>
    `;

    div.innerHTML = contenido;
    return div;
}

const detallesPokemones = async () =>{
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if(id === null){
        console.log("crear pagina de error")
        return;
    }

    try{
        const pokemonSeleccionado = await pokemonServices.obtenerDetallesPokemon(id);
            let tipos = [];

            const nombre = pokemonSeleccionado.name;
            const foto = pokemonSeleccionado.sprites.front_default;
            const altura = pokemonSeleccionado.height;
            const peso = pokemonSeleccionado.weight
            const types = pokemonSeleccionado.types;
            //const poderes = pokemonSeleccionado.abilities;
                types.forEach((tipo)=>{
                    tipos.push(tipo.type.name);
                });
                const tiposString = tipos.join(", ");
                /*
                poderes.forEach(poder =>{
                    const li = document.createElement("li");
                    li.textContent = poder.ability.name;
                    listadoPoderes.appendChild(li);
                });
                */
            const div = crearDiv(nombre, foto, altura, peso, tiposString);
            listado.remove();
            contenedorHtml.appendChild(div);
    }catch(error) {alert("Ocurrio un error")};
}

detallesPokemones();
