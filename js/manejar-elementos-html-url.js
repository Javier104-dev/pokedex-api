import { obtenerDetallesPokemon } from "./services.js";

/******* Funciones para crear elementos HTML *******/

const crearTarjetas = (nombre, foto) =>{
    const div = crearElemento("div", "tarjeta");

        const img = crearElemento("img", "tarjeta__foto");
        img.src = `${foto}`;
        img.alt = "Foto del pokemon";
        div.appendChild(img);

        const span = crearElemento("span", "tarjeta__nombre");
        span.textContent = `${nombre}`;
        div.appendChild(span);

        const a = crearElemento("a", "tarjeta__detalles");
        a.textContent = "Ver detalles";
        a.href = `index.html?id=${nombre}`;

    div.appendChild(a);

    return div;
}

const crearTarjetaDetalladas = (nombre, foto, altura, peso, tipo) =>{
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

        const segundoDiv = crearElemento("div", "pokemon__imagen__contenedor");
            const imagen = crearElemento("img", "pokemon__imagen");;
            imagen.src = `${foto}`;
            imagen.alt = `Foto Pokemon`;
            segundoDiv.appendChild(imagen);

    divContenedor.appendChild(primerDiv);
    divContenedor.appendChild(segundoDiv);

    obtenerPoderesPokemon(nombre, divContenedor);
    return divContenedor;
};

const crearElemento = (tipoElemento, classList) =>{
    const elemento = document.createElement(tipoElemento);
    elemento.classList.add(classList);
    return elemento;
}

const obtenerPoderesPokemon = async (nombre, div) => {
    const ulDiv = div.querySelector(".pokemon__descripcion__poder");
    try{
        const pokemonSeleccionado = await obtenerDetallesPokemon(nombre);
        const arrayHabilidades = pokemonSeleccionado.abilities;
        arrayHabilidades.forEach((habilidad)=>{
            const li = crearElemento("li", "pokemon__descripcion__item");
            li.textContent = habilidad.ability.name;
            ulDiv.appendChild(li);
         });
    }catch(error) {alert("Ocurrio un error")};
};

/******* Funciones para crear url *******/

const obtenerUrlActual = () =>{
    const url = new URL (window.location).searchParams;
    return url;
}

const modificarUrlActual = (next) =>{
    const apiUrl = new URL(next);
    const parametrosUrl = new URLSearchParams(apiUrl.search);
    const parametroOff = parametrosUrl.get("offset");
    const parametroLimit = parametrosUrl.get("limit");
    
    let urlActual = new URL(window.location);
    
    urlActual.searchParams.set("offset", parametroOff);
    urlActual.searchParams.set("limit", parametroLimit);
    
    urlActual = `${urlActual.origin}${urlActual.pathname}?${urlActual.searchParams}`
    return urlActual;
};

const crearUrlApi = () =>{
    const obtenerParametros = obtenerUrlActual();
    let urlApi = new URL("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");

    if((!obtenerParametros.get("offset")) && (!obtenerParametros.get("limit"))){
        return urlApi;

    }else{
        const parametroOff = obtenerParametros.get("offset");
        const parametroLimit = obtenerParametros.get("limit");

        urlApi.searchParams.set("offset", parametroOff);
        urlApi.searchParams.set("limit", parametroLimit);
        urlApi = `${urlApi.origin}${urlApi.pathname}?${urlApi.searchParams}`

        return urlApi
    }
};

export { crearTarjetas, crearTarjetaDetalladas, crearElemento, modificarUrlActual, crearUrlApi, obtenerUrlActual };