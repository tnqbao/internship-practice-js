import { createLogo } from './components/logo.js';
import {createNavbar} from "./components/navnar.js";
import {createSearchButton} from "./components/search-button.js";

export function createHeader() {
    const header = document.createElement('header');
    header.className = 'header';

    const logo = createLogo();
    const navbar = createNavbar();
    const searchButton = createSearchButton();

    header.appendChild(logo);
    header.appendChild(navbar);
    header.appendChild(searchButton);

    return header;
}
