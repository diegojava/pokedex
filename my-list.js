const API_URL = `https://pokeapi.co/api/v2/pokemon/`;

let pokeArray = JSON.parse(localStorage.getItem("pokemon-list"));

const pokeTable = document.getElementById('pokeTable');

let pokemonObj = {};

document.title = 'My List';

async function loadMyPokemon() {
    let pokemonName = '';
    
    
    for (let name of pokeArray) {
        let pokeTypes = [];
        pokemonName = name.toLowerCase();
        await fetch(`${API_URL}${pokemonName}`).then(data => data.json()).then(pokemon => {

            for (let types of pokemon.types) {
                pokeTypes.push(types.type.name)
            }

            pokemonObj[pokemon.id] = {
                name: `${pokemon.name}`,
                id: `${pokemon.id}`,
                image: `${pokemon.sprites.front_default}`,
                types: pokeTypes
            };
        })
    }
    setPokeData(pokemonObj);
}

function setPokeData(pokemonObj) {
    pokeTable.innerHTML += `
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Image</th>
        <th scope="col">Name</th>
        <th scope="col">Type</th>
        <th scope="col">Action</th>
        </tr>
    </thead>
    <tbody>
    `
    
    for (let [key] of Object.entries(pokemonObj)) {
        let pokeName = pokemonObj[key].name;
        
        pokeTable.innerHTML += `
        <tr id="pokeRow">
            <td>${pokemonObj[key].id}</td>
            <th scope="row"><img src="${pokemonObj[key].image}" width="50px" height="50px"></th>
            <td>${capitalizeName(pokeName)}</td>
            <td>${pokemonObj[key].types}</td>
            <td><button id="myLink" title="Delete ${capitalizeName(pokeName)} from list" class="btn btn-danger"
            onclick="deleteFromList('${pokeName}')">Delete</button></td>
        </tr>
        `
    }

    if (pokeArray.length == 0) {
        pokeTable.innerHTML += `
        <tr>
            <td colspan="5">No hay registros.</td>
        </tr>
        `;
    }

    pokeTable.innerHTML += `
    </tbody>
    `
}

function capitalizeName(name) {
    return name.trim()
            .toLowerCase()
            .replace(/\w\S*/g, (w) => (w.replace(/^\w/, 
                (c) => c.toUpperCase())));
}

window.deleteFromList = function(pokemon) {
    const pokeName = capitalizeName(pokemon);
                        
    let ask = confirm(`Esto eliminará a ${pokeName} de tu lista`);
    let index = pokeArray.indexOf(`${pokeName}`);
    console.log(pokeName);

    if (!ask) return false;

    if (index != -1) {
        pokeArray.splice(index, 1);
        localStorage.setItem('pokemon-list', JSON.stringify(pokeArray));
        window.location.reload();
    }
}

loadMyPokemon();
