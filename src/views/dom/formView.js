import {customizeElement} from "../../utils/handleElement.js";
import {createGenderToggle} from "./components/genderToggle.js";
import validation from '../../config/validation.json' with { type: 'json' };
import { DOMView } from './DOMView.js';

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

        #createAgeField() {
            // Calculate the maximum date (200 years ago from today)
            const today = new Date();
            const maxDate = new Date(today.getFullYear() - 200, today.getMonth(), today.getDate());
            const maxDateString = maxDate.toISOString().split('T')[0];
            const todayString = today.toISOString().split('T')[0];

            const ageField = customizeElement(document.createElement('div'), {
                className: ['flex', 'flex-col', 'flex-1', 'flex-wrap', 'm-b-sm'],
                children: [
                    customizeElement(document.createElement('label'), {
                        className: ['text-primary', 'p-x-sm'],
                        htmlFor: 'age-input',
                        innerHTML: '<h3 class="text-secondary">Date of Birth</h3>'
                    }),
                    customizeElement(document.createElement('input'), {
                        type: 'date',
                        className: ['age-input', 'flex', 'flex-1', 'w-full', 'p-sm', 'm-b-sm', 'border', 'rounded-1'],
                        id: 'age-input',
                        dataset: { component: 'age-input' },
                        min: maxDateString,
                        max: todayString,
                        events: {
                            change: (event) => this.#handleAgeChange(event.target.value),
                        }
                    })
                ]
            });

            this.elements.ageInput = ageField.querySelector('#age-input');
            return ageField;
        }

        #createHeightField() {
            const heightField = customizeElement(document.createElement('div'), {
                className: ['flex', 'flex-col', 'flex-1', 'flex-wrap', 'm-b-md'],
                children: [
                    customizeElement(document.createElement('label'), {
                        className: ['text-primary', 'p-x-sm'],
                        htmlFor: 'height-input',
                        innerHTML: '<h3 class="text-secondary">Height</h3>'
                    }),
                    customizeElement(document.createElement('input'), {
                        type: 'number',
                        className: ['height-input', 'flex', 'flex-1', 'w-full', 'p-sm', 'm-b-sm', 'border', 'rounded-1'],
                        placeholder: 'Enter your height',
                        id: 'height-input',
                        dataset: { component: 'height-input' },
                        step: 0.1,
                        min: validation.metric.height.min,
                        max: validation.metric.height.max,
                        events: {
                            input: (event) => this.#handleHeightChange(event.target.value),
                            change: (event) => this.#handleHeightChange(event.target.value)
                        }
                    })
                ]
            });

            this.elements.heightInput = heightField.querySelector('#height-input');
            return heightField;
        }

        #createWeightField() {
            const weightField = customizeElement(document.createElement('div'), {
                className: ['flex', 'flex-col', 'flex-1', 'flex-wrap', 'm-b-xs'],
                children: [
                    customizeElement(document.createElement('label'), {
                        className: ['text-primary', 'p-x-sm'],
                        htmlFor: 'weight-input',
                        innerHTML: '<h3 class="text-secondary">Weight</h3>'
                    }),
                    customizeElement(document.createElement('input'), {
                        type: 'number',
                        className: ['weight-input', 'flex', 'flex-1', 'w-full', 'p-sm', 'm-b-lg', 'border', 'rounded-1'],
                        placeholder: 'Enter your weight',
                        id: 'weight-input',
                        dataset: { component: 'weight-input' },
                        step: 0.1,
                        min: validation.metric.weight.min,
                        max: validation.metric.weight.max,
                        events: {
                            input: (event) => this.#handleWeightChange(event.target.value),
                            change: (event) => this.#handleWeightChange(event.target.value)
                        }
                    })
                ]
            });

            this.elements.weightInput = weightField.querySelector('#weight-input');
            return weightField;
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
            const ageField = this.#createAgeField();
            const heightField = this.#createHeightField();
            const weightField = this.#createWeightField();
            const calculateButton = this.#createCalculateButton();
            const unitToggleButton = this.#createUnitToggleButton();

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
