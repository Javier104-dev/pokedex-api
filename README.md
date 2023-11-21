<h1 align='center'>Pokedex API</h1>

### Introducción
Segundo proyecto enfocado en el consumo de APIs externas, esta vez tuvimos que hacer una pokedex utilizando la api `https://pokeapi.co/api/v2/pokemon`.

La página renderiza una lista de 20 tarjetas por página donde se podrá ver la imagen del pokemon y un botón que redirecciona a otra página donde se muestra a detalle las características del pokemon. También cuenta con un paginador que actualizara la lista y mostrara las tarjetas que siguen en lista.

### Características importantes
Para crear esta página se aplicaron algunas `buenas prácticas de programación` para avanzar y tener un código más prolijo, legible y profesional. Todo se hizo sin el uso de librerías externas usando únicamente JavaScript, HTML y CSS puro.

Los caracteristicas a destacar son las siguientes:

| Característica  | Explicación |
| :-- |:--  |
| Codigo modular  | El código está dividido según la función especifica que cumplen, así se logra un código más legible, mejora su mantenimiento y escalabilidad |
| Abstracción y encapsulamiento | El proyecto se enfocó en el uso de `clases` para filtrar la información proveniente de la API. Todo el código está estructurado en torno a esta clase y sus propiedades, lo que permite una modularidad mayor. Esto evita que el código sea dependiente de la API, si sufre algún cambio o si se debe cambiar, solamente se deberá cambiar la implementación de esa clase |
| Almacenamiento local de datos| La página utiliza el `Local storage` para almacenar los datos filtrados de la API, así se evita hacer peticiones innecesarias y mejora el rendimiento de la página significativamente |

### Especificaciones:
- API utilizada: https://pokeapi.co/
- Versión: 0.1.0
- Diseño responsivo
- Autor: Javier Anibal Villca
- Repositorio GitHub: git+https://github.com/Javier104-dev/pokedex-api.git

### GitHub Pages
Para visitar la página clic en el enlace.
- https://javier104-dev.github.io/pokedex-api/

<h2 align='center'>Requisitos del proyecto</h2>

### Requisitos:
- Utilizar la API https://pokeapi.co/ para crear la página.
- Usar los métodos `async` y `await` para trabajar con las promesas.

<h2 align='center'>Instrucciones de instalación</h2>

### Requerimientos:
- IDE - Visual Studio Code v1.84.2
- Git v2.43.0
- Extensión Live Server

Usamos Live Server para facilitar el trabajo y ver los cambios en tiempo real al realizar el mantenimiento del código, también para no tener que instalar una dependencia.

### Preparando el ambiente:
- Descargar o clonar el repositorio.
- Instalar la Extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para visualizar el `index.html`.
- Abrir el archivo `index.html`, que se encuentra en la raíz del proyecto, usando Live Server.

<h2 align='center'>Lo que encontrarás</h2>

### Página principal
<p align='left'>
  <img
    alt='Página principal'
    src='https://github.com/Javier104-dev/pokedex-api/assets/105408069/c0263623-aaf9-445a-a436-19b127049e4e'
  >
</p>
<br>

### Pokémon seleccionado
<p align='left'>
  <img
    alt='Pokémon seleccionado'
    src='https://github.com/Javier104-dev/pokedex-api/assets/105408069/ad05bab4-5903-459e-b22e-9a8dca04cc5c'
  >
</p>
<br>

### Versión responsiva
<p align='left'>
  <img
    alt='Versión responsiva'
    src='https://github.com/Javier104-dev/pokedex-api/assets/105408069/36b8ed00-e03f-4c96-b95c-49d821c80b5f'
  >
</p>
<br>

<p align='left'>
  <img
    alt='Versión responsiva'
    src='https://github.com/Javier104-dev/pokedex-api/assets/105408069/635e00e2-e0ca-4ab2-a140-c050a53a89b5'
  >
</p>
<br>

---

### Autor:
| [<img src='https://avatars.githubusercontent.com/u/105408069?v=4' width=115><br><sub>Javier Anibal Villca</sub>](https://github.com/Javier104-dev) |
| :------------------------------------------------------------------------------------------------------------------------------------------------: |
