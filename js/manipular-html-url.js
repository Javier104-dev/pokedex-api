/******* Funciones para crear elementos HTML *******/

const mostrarPokemon = (nombre, foto, contenedor) =>{
    const nuevoDiv = crearTarjetas(nombre, foto);
    contenedor.appendChild(nuevoDiv);
};

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

const crearTarjetaDetalladas = (foto, nombre, altura, peso, tipo, hablidades) =>{

    const classNameSpan = "pokemon__descripcion__item";

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
            span4.textContent = `Tipo:`;
            primerDiv.appendChild(span4);

            primerDiv.appendChild(crearElemento("ul", "pokemon__descripcion__tipo"));

            const span5 = crearElemento("span", classNameSpan);
            span5.textContent = `Habilidades:`;
            primerDiv.appendChild(span5);

            primerDiv.appendChild(crearElemento("ul", "pokemon__descripcion__poder"));

        const segundoDiv = crearElemento("div", "pokemon__imagen__contenedor");
            const imagen = crearElemento("img", "pokemon__imagen");;
            imagen.src = `${foto}`;
            imagen.alt = `Foto Pokemon`;
            segundoDiv.appendChild(imagen);

    divContenedor.appendChild(primerDiv);
    divContenedor.appendChild(segundoDiv);

    obtenerPoderesPokemon(tipo, divContenedor, ".pokemon__descripcion__tipo");
    obtenerPoderesPokemon(hablidades, divContenedor, ".pokemon__descripcion__poder");
    return divContenedor;
};

const crearElemento = (tipoElemento, classList) =>{
    const elemento = document.createElement(tipoElemento);
    elemento.classList.add(classList);
    return elemento;
}

const obtenerPoderesPokemon = (hablidades, div, ul) => {
    const ulDiv = div.querySelector(ul);

    hablidades.forEach((habilidad)=>{
        const li = crearElemento("li", "pokemon__descripcion__item");
        li.textContent = habilidad;
        ulDiv.appendChild(li);
        });
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

/******* Ocultar botones cuando seleccionamos un pokemon *******/

const ocultarBotones = () => {
    const boton = document.querySelector(".paginador");
    const botonOculto = document.querySelector(".paginador__opcion__oculto");
    boton.style.display = "none"
    botonOculto.style.display = "block"
}

export { 
    crearTarjetas, 
    crearTarjetaDetalladas, 
    crearElemento, 
    modificarUrlActual, 
    crearUrlApi, 
    obtenerUrlActual, 
    ocultarBotones,
    mostrarPokemon
};