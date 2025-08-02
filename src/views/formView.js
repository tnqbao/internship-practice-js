import {customizeElement} from "../utils/handleElement.js";
import {createGenderToggle} from "./components/genderToggle.js";
import validation from '../config/validation.json' with { type: 'json' };

export function createFormView(controller) {
    class FormView {
        constructor(controller) {
            this.controller = controller;
            this.currentUnit = 'metric';
            this.elements = {};
        }

        bindModel(model) {
            this.model = model;
        }

        onUnitChange(newUnit) {
            this.currentUnit = newUnit;
            this._updateValidationRules();
        }

        onDataChange(modelData) {
            this._updateFormValidation(modelData);
        }

        onValidationError(field, message) {
            this._showFieldError(field, message);
        }

        _handleHeightChange(value) {
            if (value && !isNaN(value)) {
                this.controller.updateHeight(parseFloat(value));
            }
        }

        _handleWeightChange(value) {
            if (value && !isNaN(value)) {
                this.controller.updateWeight(parseFloat(value));
            }
        }

        _handleAgeChange(dateOfBirth) {
            if (dateOfBirth) {
                this.controller.updateAge(dateOfBirth);
            }
        }

        _handleUnitToggle() {
            this.controller.toggleUnit();
        }

        _handleCalculate() {
            this.controller.calculateBMI();
        }

        _updateValidationRules() {
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

        _updateFormValidation(modelData) {
            this._updateFieldValidation('height', modelData.height > 0);
            this._updateFieldValidation('weight', modelData.weight > 0);
            this._updateFieldValidation('age', modelData.age > 0);
        }

        _updateFieldValidation(fieldName, isValid) {
            const input = this.elements[`${fieldName}Input`];
            if (input) {
                input.classList.toggle('valid', isValid);
                input.classList.toggle('invalid', !isValid);
            }
        }

        _showFieldError(field, message) {
            console.warn(`${field}: ${message}`);
        }

        _createAgeField() {
            const ageField = customizeElement(document.createElement('div'), {
                className: ['flex', 'flex-col', 'flex-1', 'flex-wrap', 'm-b-sm'],
                children: [
                    customizeElement(document.createElement('label'), {
                        className: ['text-primary', 'p-x-sm'],
                        htmlFor: 'age-input',
                        innerHTML: '<h3 class="text-secondary">Your Age</h3>'
                    }),
                    customizeElement(document.createElement('input'), {
                        type: 'text',
                        className: ['age-input', 'flex', 'flex-1', 'w-full', 'p-sm', 'm-b-sm', 'border', 'rounded-1'],
                        placeholder: 'DD/MM/YYYY',
                        id: 'age-input',
                        dataset: { component: 'age-input' },
                        events: {
                            change: (event) => this._handleAgeChange(event.target.value),
                        }
                    })
                ]
            });

            this.elements.ageInput = ageField.querySelector('#age-input');
            return ageField;
        }

        _createHeightField() {
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
                            input: (event) => this._handleHeightChange(event.target.value),
                            change: (event) => this._handleHeightChange(event.target.value)
                        }
                    })
                ]
            });

            this.elements.heightInput = heightField.querySelector('#height-input');
            return heightField;
        }

        _createWeightField() {
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
                            input: (event) => this._handleWeightChange(event.target.value),
                            change: (event) => this._handleWeightChange(event.target.value)
                        }
                    })
                ]
            });

            this.elements.weightInput = weightField.querySelector('#weight-input');
            return weightField;
        }

        _createUnitToggleButton() {
            const unitToggleButton = customizeElement(document.createElement('button'), {
                className: ['unit-toggle-button', 'flex', 'w-half', 'flex-center', 'bg-secondary', 'color-primary', 'p-sm', 'rounded', 'mt-4'],
                innerHTML: '<span id="unit-toggle-text">Switch to Imperial</span>',
                id: 'unit-toggle-button',
                dataset: { component: 'unit-toggle-button', currentUnit: 'metric' },
                events: {
                    click: (event) => {
                        event.preventDefault();
                        this._handleUnitToggle();
                    }
                }
            });

            this.elements.toggleButton = unitToggleButton;
            return unitToggleButton;
        }

        _createCalculateButton() {
            const calculateButton = customizeElement(document.createElement('button'), {
                className: ['calculate-button', 'flex', 'w-half', 'flex-center', 'bg-primary', 'color-secondary', 'p-sm', 'rounded', 'mt-4'],
                innerHTML: '<span>Calculate BMI</span>',
                id: 'calculate-button',
                dataset: { component: 'calculate-button' },
                events: {
                    click: (event) => {
                        event.preventDefault();
                        this._handleCalculate();
                    }
                }
            });

            this.elements.calculateButton = calculateButton;
            return calculateButton;
        }

        render() {
            const genderToggle = createGenderToggle();
            const ageField = this._createAgeField();
            const heightField = this._createHeightField();
            const weightField = this._createWeightField();
            const calculateButton = this._createCalculateButton();
            const unitToggleButton = this._createUnitToggleButton();

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
