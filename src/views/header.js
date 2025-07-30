import { createLogo } from './components/logo.js';
import { createRepositoryButton} from "./components/githubButton.js";
import {createHeaderInformation} from "./components/headerInformation.js";
import {customizeElement} from "../utils/handleElement.js";
import {createHeaderNavbar} from "./components/headerNavbar.js";

export function createHeader() {
    const header = document.createElement('header');
    const headerInfo = createHeaderInformation()
    const logo = createLogo();
    const repositoryButton = createRepositoryButton();
    const headerNavbar = createHeaderNavbar(logo, repositoryButton);

    return customizeElement(header, {
        className: ['header', 'flex','flex-wrap', 'justify-between', 'items-center', 'bg-gray-800', 'text-white'],
        id: 'header',
        children: [headerInfo, headerNavbar]
    });
}
