import {BmiModel} from '../models/bmiModel.js';
import bmiRanges from '../config/bmiRanges.json';

export class BmiController {
    #model;
    #views;

    constructor() {
        this.#model = new BmiModel();
        this.#views = new Map();
        this.#initializeModel();
    }

    #initializeModel() {
        this.#model.addObserver(this);
    }

    onModelChange(property, newValue, oldValue) {
        switch (property) {
            case 'type':
                this.#handleUnitChange(newValue, oldValue);
                break;
            case 'height':
            case 'weight':
            case 'age':
                this.#validateAndUpdateViews();
                break;
        }
    }

    registerView(viewName, view) {
        this.#views.set(viewName, view);
        if (typeof view.bindModel === 'function') {
            view.bindModel(this.#model);
        }

    }

    unregisterView(viewName) {
        this.#views.delete(viewName);
    }

    updateHeight(value) {
        try {
            this.#model.height = value;
        } catch (error) {
            this.#handleValidationError('height', error.message);
        }
    }

    updateWeight(value) {
        try {
            this.#model.weight = value;
        } catch (error) {
            this.#handleValidationError('weight', error.message);
        }
    }

    updateAge(dateOfBirth) {
        try {
            this.#model.setAgeFromDateOfBirth(dateOfBirth);
        } catch (error) {
            this.#handleValidationError('age', error.message);
        }
    }

    toggleUnit() {
        const currentUnit = this.#model.type;
        const newUnit = currentUnit === 'metric' ? 'imperial' : 'metric';

        try {
            this.#model.convertToUnit(newUnit);

            this.#updateViewsForUnitChange(newUnit);

        } catch (error) {
            this.#handleError('Unit conversion failed', error);
        }
    }

    calculateBMI() {
        try {
            if (!this.#model.isDataComplete()) {
                this.#showValidationMessage('Please fill in all fields: date of birth, height, and weight.');
                return null;
            }

            if (!this.#model.isValid()) {
                this.#showValidationMessage('Invalid input values. Please check your height and weight.');
                return null;
            }
            const result = this.#buildBMIResult();
            this.#updateResultViews(result);
            return result;

        } catch (error) {
            this.#handleError('BMI calculation failed', error);
            return null;
        }
    }

    #buildBMIResult() {
        const bmi = this.#model.calculateBMI();
        const category = this.#model.getBMICategory();
        const idealRange = this.#model.getIdealWeightRange();

        const categoryData = bmiRanges.find(range => range.id === category.id);

        return {
            bmi: bmi.toFixed(1),
            label: category.label,
            color: category.color,
            idealRange: {
                min: idealRange[0].toFixed(1),
                max: idealRange[1].toFixed(1),
            },
            id: category.id,
            age: this.#model.age,
            unit: this.#model.type,
            weightUnit: this.#model.getWeightUnit(),
            heightUnit: this.#model.getHeightUnit(),
            description: categoryData?.description || '',
            recommendations: categoryData?.recommendation || []
        };
    }

    #handleUnitChange(newUnit, oldUnit) {
        this.#convertAndUpdateInputValues(oldUnit, newUnit);

        this.#updateUnitLabels(newUnit);

        this.#updateToggleButton(newUnit);
    }

    #convertAndUpdateInputValues(fromUnit, toUnit) {
        const heightInput = document.getElementById('height-input');
        const weightInput = document.getElementById('weight-input');

        if (heightInput && heightInput.value) {
            const convertedHeight = this.#convertHeightUsingStrategies(
                parseFloat(heightInput.value),
                fromUnit,
                toUnit
            );
            heightInput.value = convertedHeight.toFixed(1);
        }

        if (weightInput && weightInput.value) {
            const convertedWeight = this.#convertWeightUsingStrategies(
                parseFloat(weightInput.value),
                fromUnit,
                toUnit
            );
            weightInput.value = convertedWeight.toFixed(1);
        }
    }

    #convertHeightUsingStrategies(value, fromUnit, toUnit) {
        if (fromUnit !== toUnit) {
            return this.#model.convertHeight(value, fromUnit, toUnit);
        }
        return value;
    }

    #convertWeightUsingStrategies(value, fromUnit, toUnit) {
        if (fromUnit !== toUnit) {
            return this.#model.convertWeight(value, fromUnit, toUnit);
        }
        return value;
    }

    #updateUnitLabels() {
        const heightLabel = document.querySelector('label[for="height-input"] h3');
        const weightLabel = document.querySelector('label[for="weight-input"] h3');
        const heightInput = document.getElementById('height-input');
        const weightInput = document.getElementById('weight-input');

        const heightUnit = this.#model.getHeightUnit();
        const weightUnit = this.#model.getWeightUnit();

        if (heightLabel) heightLabel.textContent = `Height (${heightUnit})`;
        if (weightLabel) weightLabel.textContent = `Weight (${weightUnit})`;
        if (heightInput) heightInput.placeholder = `Height in ${heightUnit}`;
        if (weightInput) weightInput.placeholder = `Weight in ${weightUnit}`;
    }

    #updateToggleButton(unit) {
        const toggleText = document.getElementById('unit-toggle-text');
        const toggleButton = document.getElementById('unit-toggle-button');

        if (toggleText && toggleButton) {
            toggleText.textContent = unit === 'metric' ? 'Switch to Imperial' : 'Switch to Metric';
            toggleButton.dataset.currentUnit = unit;
        }
    }

    #updateViewsForUnitChange(newUnit) {
        this.#views.forEach((view) => {
            if (typeof view.onUnitChange === 'function') {
                view.onUnitChange(newUnit);
            }
        });
    }

    #updateResultViews(result) {
        this.#updateResultNumber(result);
        this.#updateResultDetails(result);
        this.#updateResultPath(result);
        this.#hideDefaultContent();
    }

    #updateResultNumber(data) {
        const resultNumberEl = document.getElementById('result-number');
        const bmiValueEl = document.getElementById('bmi-value');

        if (resultNumberEl) resultNumberEl.classList.remove('hidden');
        if (bmiValueEl) {
            bmiValueEl.textContent = data.bmi;
            bmiValueEl.style.color = data.color;
        }
    }

    #updateResultDetails(data) {
        const ageEl = document.getElementById('bmi-result-age');
        const idealWeightEl = document.getElementById('bmi-result-weight');
        const categoryEl = document.getElementById('bmi-result-desc-content');
        const descriptionEl = document.getElementById('bmi-result-description');
        const recommendationListEl = document.getElementById('recommendation-list');

        if (ageEl) {
            const detailedAge = this.#model.getDetailedAge();
            ageEl.textContent = `${detailedAge.years} Years ${detailedAge.months} Months`;
        }

        if (idealWeightEl) {
            idealWeightEl.textContent = `${data.idealRange.min} ${data.weightUnit} to ${data.idealRange.max} ${data.weightUnit}`;
        }

        if (categoryEl) {
            categoryEl.textContent = data.label;
            categoryEl.style.color = data.color;
        }

        if (descriptionEl && data.description) {
            descriptionEl.textContent = data.description;
        }

        if (recommendationListEl && data.recommendations && data.recommendations.length > 0) {
            recommendationListEl.innerHTML = '';
            data.recommendations.forEach(rec => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${rec.title}:</strong> ${rec.description}`;
                listItem.className = 'mb-2';
                recommendationListEl.appendChild(listItem);
            });
        }
    }

    #updateResultPath(data) {
        const pathEl = document.getElementById('bmi-result-path');
        if (!pathEl) return;

        const allArrows = pathEl.querySelectorAll('.bmi-arrow');
        allArrows.forEach(arrow => arrow.style.opacity = '0');

        const currentRange = pathEl.querySelector(`[data-range="${data.id}"]`);
        if (currentRange) {
            const currentArrow = currentRange.querySelector('.bmi-arrow');
            if (currentArrow) {
                currentArrow.style.opacity = '1';
                currentRange.classList.add('active');
            }
        }
    }

    #hideDefaultContent() {
        const defaultContent = document.getElementById('bmi-default-content');
        const defaultTitle = document.getElementById('result-default-title');
        const bmiResultDesc = document.getElementById('bmi-result-desc');
        const bmiResultIdeal = document.getElementById('bmi-result-ideal');
        if (bmiResultIdeal) bmiResultIdeal.classList.remove('hidden');
        if (bmiResultDesc) bmiResultDesc.classList.remove('hidden');
        if (defaultContent) defaultContent.classList.add('hidden');
        if (defaultTitle) defaultTitle.classList.add('hidden');

    }

    #validateAndUpdateViews() {
        this.#views.forEach((view) => {
            if (typeof view.onDataChange === 'function') {
                view.onDataChange(this.#model.toJSON());
            }
        });
    }

    #handleValidationError(field, message) {
        console.warn(`Validation error for ${field}: ${message}`);
        this.#views.forEach((view) => {
            if (typeof view.onValidationError === 'function') {
                view.onValidationError(field, message);
            }
        });
    }

    #handleError(context, error) {
        console.error(`${context}:`, error);
        this.#showErrorMessage(`${context}. Please try again.`);
    }

    #showValidationMessage(message) {
        alert(message);
    }

    #showErrorMessage(message) {
        alert(message);
    }
}
