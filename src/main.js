import { createHeader } from './views/header.js';
import { createFooter } from './views/footer.js';
import { createFormView } from './views/formView.js';
import { createResultView } from './views/resultView.js';
import { createInformation } from './views/information.js';
import { bmiController, setUnit } from './controllers/bmiController.js';

function initializePage() {
    const headerElement = document.getElementById('header');
    headerElement.appendChild(createHeader());

    const footerElement = document.getElementById('footer');
    footerElement.appendChild(createFooter());

    const resultView = createResultView();
    const resultSection = document.getElementById('result-section');
    resultSection.appendChild(resultView);

    const handleBMICalculation = bmiController(resultView);

    const handleUnitToggle = (newUnit) => {
        setUnit(newUnit);
        console.log(`Unit switched to: ${newUnit}`);
    };

    const formSection = document.getElementById('form-section');
    formSection.appendChild(createFormView(handleBMICalculation, handleUnitToggle));

    const infoSection = document.getElementById('info-section');
    infoSection.appendChild(createInformation());

    const bmiContent = document.getElementById('bmi-content');
    bmiContent.classList.add('flex', 'flex-col', 'items-center', 'justify-center');

    const mainContent = document.getElementById('main-content');
    mainContent.classList.add('flex', 'items-start', 'justify-center', 'flex-wrap', 'container','m-t-lg', 'gap-4');
}

document.addEventListener('DOMContentLoaded', initializePage);
