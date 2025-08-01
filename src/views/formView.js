import {customizeElement} from "../utils/handleElement.js";
import {createGenderToggle} from "./components/genderToggle.js";
import validation from '../config/validation.json' with { type: 'json' };
export function createFormView(handleSubmit, handleUnitToggle) {
    const genderToggle = createGenderToggle();
    const ageField = customizeElement(document.createElement('div'), {
        className: ['flex', 'flex-col', 'flex-1', 'flex-wrap', 'm-b-sm'],
        children: [
            customizeElement(document.createElement('label'), {
                className: ['text-primary', 'p-x-sm'],
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

    const unitToggleButton = customizeElement(document.createElement('button'), {
        className: ['unit-toggle-button', 'flex', 'w-half', 'flex-center', 'bg-secondary', 'color-primary', 'p-sm', 'rounded', 'mt-4'],
        innerHTML: `
        <span id="unit-toggle-text">
            Switch to Imperial
        </span>
        `,
        id: 'unit-toggle-button',
        dataset: {
            component: 'unit-toggle-button',
            currentUnit: 'metric'
        },
        events: {
            click: (event) => {
                event.preventDefault();
                const currentUnit = event.target.dataset.currentUnit || 'metric';
                const newUnit = currentUnit === 'metric' ? 'imperial' : 'metric';

                const toggleText = document.getElementById('unit-toggle-text');
                if (toggleText) {
                    toggleText.textContent = newUnit === 'metric' ? 'Switch to Imperial' : 'Switch to Metric';
                }
                event.target.dataset.currentUnit = newUnit;

                updateInputPlaceholders(newUnit);

                if (handleUnitToggle) {
                    handleUnitToggle(newUnit);
                }
            }
        }
    });

    const heightField = customizeElement(document.createElement('div'), {
        className: ['flex', 'flex-col', 'flex-1', 'flex-wrap', 'm-b-xs'],
        children: [
            customizeElement(document.createElement('label'), {
                className: ['text-primary', 'p-x-sm'],
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
                min: (unitToggleButton.dataset.currentUnit === 'metric') ? validation.metric.height.min : validation.imperial.height.min,
                max: (unitToggleButton.dataset.currentUnit === 'metric') ? validation.metric.height.max : validation.imperial.height.max
            })
        ]
    });

    const weightField = customizeElement(document.createElement('div'), {
        className: ['flex', 'flex-col', 'flex-1', 'flex-wrap', 'm-b-xs'],
        children: [
            customizeElement(document.createElement('label'), {
                className: ['text-primary', 'p-x-sm'],
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
                min: (unitToggleButton.dataset.currentUnit === 'metric') ? validation.metric.weight.min : validation.imperial.weight.min,
                max: (unitToggleButton.dataset.currentUnit === 'metric') ? validation.metric.weight.max : validation.imperial.weight.max
            })
        ]
    });

    const calculateButton = customizeElement(document.createElement('button'), {
        className: ['calculate-button', 'flex', 'w-half', 'flex-center', 'bg-primary', 'color-secondary', 'p-sm', 'rounded', 'mt-4'],
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
                console.log('[DEBUG] Calculate button clicked');
                if (handleSubmit) {
                    handleSubmit();
                }
            }
        }
    });



    return customizeElement(document.createElement('div'), {
        className: ['bmi-form-wrapper', 'flex', 'flex-col', 'container', 'flex-wrap', 'items-center', 'justify-center', 'w-full', 'h-full', 'p-lg', 'rounded-6'],
        id: 'form-view',
        dataset: {
            component: 'form-view'
        },
        children: [genderToggle, ageField, weightField, heightField, calculateButton, unitToggleButton]
    });
}

function updateInputPlaceholders(unit) {
    const heightInput = document.getElementById('height-input');
    const weightInput = document.getElementById('weight-input');

    if (unit === 'metric') {
        if (heightInput) {
            heightInput.placeholder = 'Enter your height (cm)';
            heightInput.max = validation.metric.height.max;
            heightInput.min = validation.metric.height.min;
        }
        if (weightInput) {
            weightInput.placeholder = 'Enter your weight (kg)';
            weightInput.max = validation.metric.weight.max;
            weightInput.min = validation.metric.weight.min;
        }
    } else {
        if (heightInput) {
            heightInput.placeholder = 'Enter your height (inches)';
            heightInput.max = validation.imperial.height.max;
            heightInput.min = validation.imperial.height.min;
        }
        if (weightInput) {
            weightInput.placeholder = 'Enter your weight (lbs)';
            weightInput.max = validation.imperial.weight.max;
            weightInput.min = validation.imperial.weight.min;
        }
    }
}
