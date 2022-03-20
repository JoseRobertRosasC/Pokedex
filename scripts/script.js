//Proyecto "Pokedex" desarrollado por Robert Rosas

//Seleccionamos cada uno de los elementos creado en el html
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeMoves = document.querySelector('[data-poke-moves]');

//Diccionario de colores para el tipo de pokemon y el fondo
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

//Función de busqueda del pokemon
const searchPokemon = event => { 
    //Cancelamos el Submit del form al inciar el html
    event.preventDefault(); 
    //Guardamo el valor del input en este evento
    const { value } = event.target.pokemon;
    //Fetch al API, conviertiendo toda la cadena a minusculas
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        //Obtenemos la respuesta
        .then(data => data.json())
        //Guardamos
        .then(response => renderPokemonData(response))
        //Función para borrar el contenido en caso de no encontrarlo
        .catch(err => renderNotFound())
}

//Recibimos la data en esta función
const renderPokemonData = data => {
    //Constante que almacenará la ruta del nombre a buscar
    const sprite =  data.sprites.front_default;
    //Constante donde se almacenará la data de los movimientos, estadísticas y tipode pokemon
    const { moves, stats, types, } = data;

    //Rellenamos los elementos con los valores
    //Cambiamos el texto de Pokedex por el nombre del pokemon
    pokeName.textContent = data.name;
    //Cambiamos la imagen anterior por la nueva del pokemon
    pokeImg.setAttribute('src', sprite);
    //Agregamos el número identificador del pokemon
    pokeId.textContent = `Nº ${data.id}`;
    //Relacionamos el color de fondo del pokemon con su mismo color
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    renderPokemonMoves(moves);
}

//Damos color al color de la tarjeta, variando según el color del pokemon. Utilizamos los datos de colores de nuestro diccionario
const setCardColor = types => {  
    //Tomamos el primer valor del type
    const colorOne = typeColors[types[0].type.name];
    //Si tiene un segundo tipo de pokemon, asignamos un segundo color, si no le damos un color default de nuestro diccionario de colores
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    //Fondo utilizando un circulo y el color asignado arriba
    //pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    //Tamaño del circulo de fondo
    //pokeImg.style.backgroundSize = ' 5px 5px';
    
}


//Función para las estadísticas del pokemon
const renderPokemonStats = stats => {
    //Borramos el contenido de la llamada anterior
    pokeStats.innerHTML = '';
    //Función para iterar cada una de esas estadísticas
    stats.forEach(stat => {
        
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        //API del name
        statElementName.textContent = stat.stat.name;
        //API del amount
        statElementAmount.textContent = stat.base_stat;
        //Elementos en los que se agregan los datos de los otros elementos
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);  
    });
}


//Función para leer los tipos de pokemones
const renderPokemonTypes = types => {
    
    //Borramos los tipos de pokemones que estén de la busqueda anterior
    pokeTypes.innerHTML = '';
    //Función para iterar los tipos de pokemones
    types.forEach(type => {
        //Creamos un elemento para el tipo de texto
        const typeTextElement = document.createElement("div");
        //Damos un color al texto en específico como en la función anterior
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        //Si viene un tipo renderizamos ese uno y si vienen dos renderizamos esos dos
        pokeTypes.appendChild(typeTextElement);
    });
}

//Función para los movimientos del pokemon
const renderPokemonMoves = moves => {
    //Borramos el contenido de la llamada anterior
    pokeMoves.innerHTML = '';
    //Función para iterar cada una de esas estadísticas
    moves.forEach(move => {
        const moveElement = document.createElement("div");
        const moveElementName = document.createElement("div");
        //API del name
        moveElementName.textContent = move.move.name;
        //Elementos en los que se agregan los datos de los otros elementos
        moveElement.appendChild(moveElementName);
        pokeMoves.appendChild(moveElement);
    });
}

//Función para borrar el contenido al no encontrar un resultado, además de mostrar imágen y texto alusivo al suceso
const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', './images/pokemon.png');
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
    pokeMoves.textContent = '';
}
