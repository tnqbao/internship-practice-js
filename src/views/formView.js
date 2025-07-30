import {customizeElement} from "../utils/handleElement.js";
import {createGenderToggle} from "./components/genderToggle.js";

export function createFormView() {
    const genderToggle = createGenderToggle();
    const ageField = customizeElement(document.createElement('div'), {
        className: ['flex', 'flex-col', 'flex-1', 'flex-wrap', 'm-b-sm'],
        children: [
            customizeElement(document.createElement('label'), {
                className: ['text-primary','p-x-sm'],
                htmlFor: 'age-input',
                innerHTML: `
                <h3 class="text-secondary">Your Age</h3>`
            }),
            customizeElement(document.createElement('input'), {
                type: 'text',
                className: ['age-input', 'flex', 'flex-1', 'w-full', 'p-sm', 'm-b-sm', 'border', 'border-gray-300', 'rounded-1'],
                placeholder: 'DD/MM/YYYY',
                id: 'age-input',
                dataset: {
                    component: 'age-input'
                },

            })
        ]
    });

    const heightField = customizeElement(document.createElement('div'), {
        className: ['flex', 'flex-col', 'flex-1', 'flex-wrap', 'm-b-xs'],
        children: [
            customizeElement(document.createElement('label'), {
                className: ['text-primary','p-x-sm'],
                htmlFor: 'height-input',
                innerHTML: `
                <h3 class="text-secondary">Height</h3>`
            }),
        customizeElement(document.createElement('input'), {
            type: 'number',
            className: ['height-input', 'flex', 'flex-1', 'w-full', 'p-sm', 'm-b-sm', 'border', 'border-gray-300', 'rounded-1'],
            placeholder: 'Enter your height',
            id: 'height-input',
            dataset: {
                component: 'height-input'
            },
            step: 0.1,
            min: 0,
            max: 200
        })
        ]
    });

    const weightField = customizeElement(document.createElement('div'), {
        className: ['flex', 'flex-col', 'flex-1', 'flex-wrap', 'm-b-xs'],
        children: [
            customizeElement(document.createElement('label'), {
                className: ['text-primary','p-x-sm'],
                htmlFor: 'weight-input',
                innerHTML: `
                <h3 class="text-secondary">Weight</h3>`
            }),
            customizeElement(document.createElement('input'), {
            type: 'number',
            className: ['weight-input', 'flex', 'flex-1', 'w-full', 'p-sm', 'm-b-lg', 'border', 'border-gray-300', 'rounded-1'],
            placeholder: 'Enter your weight',
            id: 'weight-input',
            dataset: {
                component: 'weight-input'
            },
            step: 0.1,
            min: 0,
            max: 200
        })
        ]
    });

    const calculateButton = customizeElement(document.createElement('button'), {
        className: ['calculate-button', 'flex', 'flex-1', 'flex-center', 'bg-primary', 'color-secondary', 'p-sm', 'rounded', 'mt-4'],
        innerHTML: `
        <span>
            Calculate BMI
        </span>
        `,
        id: 'calculate-button',
        dataset: {
            component: 'calculate-button'
        },
        events: {
            click: (event) => {
                event.preventDefault();
            }
        }
    });

    return customizeElement(document.createElement('div'), {
        className: ['bmi-form-wrapper', 'flex', 'flex-col', 'container', 'flex-wrap', 'items-center', 'justify-center', 'w-full', 'h-full', 'p-lg', 'rounded-6'],
        id: 'form-view',
        dataset: {
            component: 'form-view'
        },
        children: [genderToggle, ageField, heightField, weightField, calculateButton]
    });
}
