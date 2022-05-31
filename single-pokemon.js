let url_string = window.location.href;
let url = new URL(url_string);

let id = url.searchParams.get("id");
let name = url.searchParams.get("name");

let isId = url.searchParams.has("id");
let isName = url.searchParams.has("name");

const btnPokeList = document.getElementById('pokeList');
btnPokeList.addEventListener("click", addToList);

let pokemonObj = {};
let pokeArray = [];

const API_URL = `https://pokeapi.co/api/v2/pokemon/${id || name}`;


function validateParams() {
    let isPokeNumber = isNumber(id);
    let isPokeName = isNumber(name);

    if ((isId && isPokeNumber) || (isName && !isPokeName)) {
        loadPokemon();
    }
}

//if (id > 151 || id == undefined || id == '') window.location.href = './index.html';

async function loadPokemon() {
    await fetch(API_URL).then(data => data.json()).then(pokemon => {
        let pokeTypes = [];

        for (let types of pokemon.types) {    
            pokeTypes.push(types.type.name)
        }

        const oldPokeName = pokemon.name;
        const pokeName = oldPokeName
                            .trim()
                            .toLowerCase()
                            .replace(/\w\S*/g, (w) => (w.replace(/^\w/, 
                                (c) => c.toUpperCase())));
        pokemonObj = {
            name: `${pokeName}`,
            id: `${pokemon.id}`,
            images: {
                front_img: `${pokemon.sprites.front_default}`,
                back_img: `${pokemon.sprites.front_default}`,
                front_shiny: `${pokemon.sprites.front_default}`,
                back_shiny: `${pokemon.sprites.front_default}`
            },
            types: pokeTypes
        };
        validateData(pokemonObj);
    }).catch(error => console.log(error));
}

function validateData(pokemonObj) {
    if (pokemonObj.id > 151) return false;
    setData(pokemonObj); 
}

function setData(pokemonObj) {
    document.title = `You're viewing ${pokemonObj.name}'s Data`;
    document.getElementById('pokemonName').innerHTML = `${pokemonObj.name}`;
    document.getElementById('pokeImg').src = pokemonObj.images.front_img;
    document.getElementById('pokeTypes').innerHTML = `${pokemonObj.types}`;
    document.getElementById('pokeId').innerHTML = `${pokemonObj.id}`;
}

function addToList() {
    //get them back
    if (localStorage.getItem("pokemon-list")) pokeArray = JSON.parse(localStorage.getItem("pokemon-list"));

    if (pokeArray.includes(pokemonObj.name)) {
        alert('Este pokémon ya está en tu lista');
        return false;
    }

    alert(`El Pokémon ${pokemonObj.name} ha sido agregado a tu lista.`);
    pokeArray.push(pokemonObj.name)
    localStorage.setItem('pokemon-list', JSON.stringify(pokeArray)); //store pokemon
}

function isNumber(n) { 
    return !isNaN(parseFloat(n)) && !isNaN(n - 0) 
};

validateParams();