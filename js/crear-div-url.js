import { obtenerDetallesPokemon } from "./services.js";


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
            const li = crearElemento("li", "pokemon__descripcion__item");
            li.textContent = habilidad.ability.name;
            ulDiv.appendChild(li);
         });
    }catch(error) {alert("Ocurrio un error")};
};

const crearElemento = (tipoElemento, classList) =>{
    const elemento = document.createElement(tipoElemento);
    elemento.classList.add(classList);
    return elemento;
}

export { crearTarjetas, crearTarjetaDetalladas, crearElemento };