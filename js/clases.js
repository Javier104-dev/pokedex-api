class Pokemon {
    constructor(foto, nombre, altura, peso, tipo, habilidades){
        this.foto = foto;
        this.nombre = nombre;
        this.altura = altura;
        this.peso = peso;
        this.tipo = tipo;
        this.habilidades = habilidades;
    }
}

class Pokemones {
    constructor(pokemones, anterior, siguiente){
        this.pokemones = pokemones;
        this.anterior = anterior;
        this.siguiente = siguiente;
    }
}

export { 
    Pokemon,
    Pokemones 
}