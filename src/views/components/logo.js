import {customizeElement} from "../../utils/handleElement.js";

export function createLogo() {

    const logo = document.createElement('a');
    logo.className = 'logo-picture';
    logo.innerHTML = `
        <img src="https://cdn.gauas.online/images/internship/logo.svg" alt="Logo" class="logo-image" style="width: 100px; display: block;">
    `;

    return customizeElement(logo, {
        id: 'logo',
        events: {
            click: () => window.location.href = '/'
        },
        dataset: {
            component: 'logo'
        },
        target: '_self',
        rel: 'noopener noreferrer',
        ariaLabel: 'Go to homepage',
        className: ['logo','p-2']
    });

}
