import { obtenerDetallesPokemon} from "./services.js";

const contenedorHtml = document.querySelector("[data-detalles]");
const listado = document.querySelector("[data-listado]");

const verPokemon = () =>{
    const id = obtenerId();
    ocultarBotones(id);
    detallarPokemones(id);
}

const detallarPokemones = async (id) =>{
    if(!id){
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

const crearDiv = (nombre, foto, altura, peso, tipo) =>{
    let classNameSpan = "pokemon__descripcion__item";

    const divContenedor = crearElemento("div", "pokemon");

        const primerDiv = crearElemento("div", "pokemon__descripcion");
            const span1 = crearElemento("span", classNameSpan);
            span1.textContent = `Nombre: ${nombre}`;
            primerDiv.appendChild(span1);

            const span2 = crearElemento("span", classNameSpan);
            span2.textContent = `Altura: ${altura}`;
            primerDiv.appendChild(span2);

            const span3 = crearElemento("span", classNameSpan);
            span3.textContent = `Peso: ${peso}`;
            primerDiv.appendChild(span3);

            const span4 = crearElemento("span", classNameSpan);
            span4.textContent = `Tipo: ${tipo}`;
            primerDiv.appendChild(span4);

            const span5 = crearElemento("span", classNameSpan);
            span5.textContent = `Habilidades:`;
            primerDiv.appendChild(span5);

            const ul = crearElemento("ul", "pokemon__descripcion__poder");
            primerDiv.appendChild(ul);

        const segundoDiv = crearElemento("div", null);
            const imagen = crearElemento("img", "pokemon__imagen");;
            imagen.src = `${foto}`;
            imagen.alt = `Foto Pokemon`;
            segundoDiv.appendChild(imagen);

    divContenedor.appendChild(primerDiv);
    divContenedor.appendChild(segundoDiv);

    obtenerPoderesPokemon(nombre, divContenedor);
    return divContenedor;
};

const obtenerPoderesPokemon = async (nombre, div) => {
    const ulDiv = div.querySelector(".pokemon__descripcion__poder");
    try{
        const pokemonSeleccionado = await obtenerDetallesPokemon(nombre);
        const arrayHabilidades = pokemonSeleccionado.abilities;
        arrayHabilidades.forEach((habilidad)=>{
            const li = document.createElement("li");
            li.classList.add("pokemon__descripcion__item");
            li.textContent = habilidad.ability.name;
            ulDiv.appendChild(li);
         });
    }catch(error) {alert("Ocurrio un error")};
};

const obtenerId =()=>{
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    return id;
}

function ocultarBotones(id){
    if(!id){
        return;
    }else{
        const boton = document.querySelector(".paginador");
        const botonOculto = document.querySelector(".paginador__opcion__oculto");
        boton.style.display = "none"
        botonOculto.style.display = "block"
    }
}

const crearElemento = (tipoElemento, classList) =>{
    const elemento = document.createElement(tipoElemento);
    elemento.classList.add(classList);
    return elemento;
}

verPokemon();