import { navbar } from './menu.js';

const pokeMenu = document.getElementById('pokemon-menu');

function setComponents() {
    pokeMenu.innerHTML = navbar;
}

setComponents();