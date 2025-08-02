import { createLogo } from './components/logo.js';
import { createRepositoryButton} from "./components/githubButton.js";
import {createHeaderInformation} from "./components/headerInformation.js";
import {customizeElement} from "../utils/handleElement.js";
import {createHeaderNavbar} from "./components/headerNavbar.js";

export function createHeader(controller = null) {
    class HeaderView {
        constructor() {
            this.elements = {};
            this.isInitialized = false;
        }

        _createHeaderComponents() {
            const headerInfo = createHeaderInformation();
            const logo = createLogo();
            const repositoryButton = createRepositoryButton();
            const headerNavbar = createHeaderNavbar(logo, repositoryButton);

            this.elements.headerInfo = headerInfo;
            this.elements.logo = logo;
            this.elements.repositoryButton = repositoryButton;
            this.elements.headerNavbar = headerNavbar;

            return { headerInfo, headerNavbar };
        }

        render() {
            const { headerInfo, headerNavbar } = this._createHeaderComponents();

            const header = customizeElement(document.createElement('header'), {
                className: ['header', 'flex','flex-wrap', 'justify-between', 'items-center', 'bg-gray-800', 'text-white'],
                id: 'header',
                dataset: { component: 'header-view' },
                children: [headerInfo, headerNavbar]
            });

            this.elements.header = header;
            this.isInitialized = true;
            return header;
        }

        isInitialized() {
            return this.isInitialized;
        }
    }

    const headerView = new HeaderView();

    if (controller && typeof controller.registerView === 'function') {
        controller.registerView('header', headerView);
    }

    return headerView.render();
}
