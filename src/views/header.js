import { createLogo } from './components/logo.js';
import { createRepositoryButton} from "./components/github-button.js";

export function createHeader() {
    const header = document.createElement('header');
    header.className = 'header';

    const logo = createLogo();
    const repositoryButton = createRepositoryButton();

    header.appendChild(logo);
    header.appendChild(repositoryButton);

    return header;
}
