import {customizeElement} from "../../utils/handleElement.js";
import {createGenderToggle} from "./components/genderToggle.js";
import validation from '../../config/validation.json' with { type: 'json' };
import { DOMView } from './DOMView.js';
import { createAgeField } from './components/ageField.js';
import { createHeightField } from './components/heightField.js';
import { createWeightField } from './components/weightField.js';

export function createFormView(controller) {
    class FormView extends DOMView {
        constructor(controller) {
            super(controller);
            this.currentUnit = 'metric';
        }

        onUnitChange(newUnit) {
            this.currentUnit = newUnit;
            this.#updateValidationRules();
        }

        updateDisplay(modelData) {
            this.#updateFormValidation(modelData);
        }

        showValidationError(field, message) {
            super.showValidationError(field, message);
        }

        updateFormFields(data) {
            if (data) {
                this.updateFieldValidation('height', data.height > 0);
                this.updateFieldValidation('weight', data.weight > 0);
                this.updateFieldValidation('age', data.age > 0);
            }
        }

        #handleHeightChange(value) {
            if (value && !isNaN(value)) {
                this.controller.updateHeight(parseFloat(value));
            }
        }

        #handleWeightChange(value) {
            if (value && !isNaN(value)) {
                this.controller.updateWeight(parseFloat(value));
            }
        }

        #handleAgeChange(dateOfBirth) {
            if (dateOfBirth) {
                this.controller.updateAge(dateOfBirth);
            }
        }

        #handleUnitToggle() {
            this.controller.toggleUnit();
        }

        #handleCalculate() {
            this.controller.calculateBMI();
        }

        #updateValidationRules() {
            const heightInput = this.elements.heightInput;
            const weightInput = this.elements.weightInput;

            if (heightInput && weightInput) {
                const rules = validation[this.currentUnit];
                heightInput.min = rules.height.min;
                heightInput.max = rules.height.max;
                weightInput.min = rules.weight.min;
                weightInput.max = rules.weight.max;
            }
        }

        #updateFormValidation(modelData) {
            this.updateFieldValidation('height', modelData.height > 0);
            this.updateFieldValidation('weight', modelData.weight > 0);
            this.updateFieldValidation('age', modelData.age > 0);
        }

        #createUnitToggleButton() {
            const unitToggleButton = customizeElement(document.createElement('button'), {
                className: ['unit-toggle-button', 'flex', 'w-half', 'flex-center', 'bg-secondary', 'color-primary', 'p-sm', 'rounded', 'mt-4'],
                innerHTML: '<span id="unit-toggle-text">Switch to Imperial</span>',
                id: 'unit-toggle-button',
                dataset: { component: 'unit-toggle-button', currentUnit: 'metric' },
                events: {
                    click: (event) => {
                        event.preventDefault();
                        this.#handleUnitToggle();
                    }
                }
            });

            this.elements.toggleButton = unitToggleButton;
            return unitToggleButton;
        }

        #createCalculateButton() {
            const calculateButton = customizeElement(document.createElement('button'), {
                className: ['calculate-button', 'flex', 'w-half', 'flex-center', 'bg-primary', 'color-secondary', 'p-sm', 'rounded', 'mt-4'],
                innerHTML: '<span>Calculate BMI</span>',
                id: 'calculate-button',
                dataset: { component: 'calculate-button' },
                events: {
                    click: (event) => {
                        event.preventDefault();
                        this.#handleCalculate();
                    }
                }
            });

            this.elements.calculateButton = calculateButton;
            return calculateButton;
        }

        render() {
            const genderToggle = createGenderToggle();
            const ageField = createAgeField(this.#handleAgeChange.bind(this));
            const heightField = createHeightField(this.#handleHeightChange.bind(this), this.currentUnit);
            const weightField = createWeightField(this.#handleWeightChange.bind(this), this.currentUnit);
            const calculateButton = this.#createCalculateButton();
            const unitToggleButton = this.#createUnitToggleButton();

            this.elements.ageInput = ageField.querySelector('#age-input');
            this.elements.heightInput = heightField.querySelector('#height-input');
            this.elements.weightInput = weightField.querySelector('#weight-input');

            const formWrapper = customizeElement(document.createElement('div'), {
                className: ['bmi-form-wrapper', 'flex', 'flex-col', 'container', 'flex-wrap', 'items-center', 'justify-center', 'w-full', 'h-full', 'p-lg', 'rounded-6', 'gap-sm'],
                id: 'form-view',
                dataset: { component: 'form-view' },
                children: [genderToggle, ageField, weightField, heightField, calculateButton, unitToggleButton]
            });

            this.isInitialized = true;
            return formWrapper;
        }
    }

    const formView = new FormView(controller);

    controller.registerView('form', formView);

    return formView.render();
}
