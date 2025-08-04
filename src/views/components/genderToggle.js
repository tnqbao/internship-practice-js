import {customizeElement} from "../../utils/handleElement.js";

export function createGenderToggle() {
    const maleButton = customizeElement(document.createElement('button'), {
        id: 'male-button',
        className: ['male-button', 'flex', 'flex-2', 'bg-secondary', 'justify-center', 'items-center', 'gap-2', 'border-0', 'p-sm', 'active'],
        innerHTML: `
        <img src="https://cdn.gauas.online/images/internship/male-icon.svg" alt="Male Icon">
        <span>Male</span>            
        `,
        events: {
            click: (event) => {
                event.preventDefault();
                document.getElementById('male-button').classList.add('active');
                document.getElementById('female-button').classList.remove('active');
            }
        }
    });

    const femaleButton = customizeElement(document.createElement('button'), {
        id: 'female-button',
        className: ['female-button', 'flex', 'flex-2', 'bg-secondary', 'justify-center', 'items-center', 'gap-2', 'border-0', 'p-sm', 'rounded'],
        innerHTML: `
        <img src="https://cdn.gauas.online/images/internship/female-icon.svg" alt="Female Icon">
        <span>Female</span>
    `,
        events: {
            click: (event) => {
                event.preventDefault();
                document.getElementById('female-button').classList.add('active');
                document.getElementById('male-button').classList.remove('active');
            }
        }
    });

    return customizeElement(document.createElement('div'), {
        className: ['gender-toggle', 'flex', 'w-full', 'flex-1', 'justify-center', 'items-center', 'gap-1', 'm-b-lg', 'p-sm', 'bg-tertiary', 'rounded-6'],
        id: 'gender-toggle',
        children: [maleButton, femaleButton],
    })
}

