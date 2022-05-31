const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

const lista = document.getElementById('lista');
const txtPokemon = document.getElementById('txtPokemon');
txtPokemon.addEventListener("keypress", pokemonEnter);
const button = document.getElementById('btnSearchPokemon').addEventListener("click", searchPokemon);

document.title = 'Home - Pokémon';

let myList = ''; 

async function loadData() {
    await fetch(API_URL).then(data => data.json().then(pokemon => {
        for (let value of pokemon.results) {
            fetch(value.url)
                .then(dataPokemon => dataPokemon.json()
                .then(pokeData => {
                    //console.log(pokeData.species, pokeData.types, pokeData.sprites);
                    myList += `
                        <li> <a href="./pokemon.html?id=${pokeData.id}">${pokeData.species.name}</a> 
                        type: ${pokeData.types[0].type.name} 
                        image: <img src="${pokeData.sprites.front_default}"/></li>
                    `;
                })).finally(setData);
        }
    }));
}

function searchPokemon() {
    const pokemon = txtPokemon.value.trim();
    let parametro = '';

    //console.log(isNumber(pokemon))

    parametro = isNumber(pokemon) ? 'id' : 'name';

    // if (pokemon == '') return alert ('Escribe el nombre de un pokemon');
    // window.location.href = `./pokemon.html?id=${pokemon}`;

    pokemon == '' ? alert ('Escribe el nombre de un pokemon') : window.location.href = `./pokemon.html?${parametro}=${pokemon}`;
    
}

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

function pokemonEnter(e) {
    let keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode == '13') searchPokemon()
}


loadData();

function setData() {
    lista.innerHTML = myList;
}


