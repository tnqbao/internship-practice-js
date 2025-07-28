import {createHeader} from './views/header.js';
import { createFooter } from './views/footer.js';
import { createFormView } from './views/formView.js';
import { createResultView } from './views/resultView.js';
import { createInformation } from './views/information.js';

function initializePage() {
    const headerElement = document.getElementById('header');
    const header = createHeader();
    headerElement.appendChild(header);

    const footerElement = document.getElementById('footer');
    const footer = createFooter();
    footerElement.appendChild(footer);

    const formSection = document.getElementById('form-section');
    const formView = createFormView();
    formSection.appendChild(formView);

    const resultSection = document.getElementById('result-section');
    const resultView = createResultView();
    resultSection.appendChild(resultView);

    const infoSection = document.getElementById('info-section');
    const informationView = createInformation();
    infoSection.appendChild(informationView);
}

document.addEventListener('DOMContentLoaded', initializePage);
