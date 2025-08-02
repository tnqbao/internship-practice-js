import {BmiModel} from '../models/bmiModel.js';

export class BmiController {
    constructor() {
        this._model = new BmiModel();
        this._views = new Map();
        this._initializeModel();
    }

    _initializeModel() {
        this._model.addObserver(this);
    }

    onModelChange(property, newValue, oldValue) {
        switch (property) {
            case 'type':
                this._handleUnitChange(newValue, oldValue);
                break;
            case 'height':
            case 'weight':
            case 'age':
                this._validateAndUpdateViews();
                break;
        }
    }

    registerView(viewName, view) {
        this._views.set(viewName, view);
        if (typeof view.bindModel === 'function') {
            view.bindModel(this._model);
        }

    }

    unregisterView(viewName) {
        this._views.delete(viewName);
    }

    updateHeight(value) {
        try {
            this._model.height = value;
        } catch (error) {
            this._handleValidationError('height', error.message);
        }
    }

    updateWeight(value) {
        try {
            this._model.weight = value;
        } catch (error) {
            this._handleValidationError('weight', error.message);
        }
    }

    updateAge(dateOfBirth) {
        try {
            this._model.age = this._calculateAge(dateOfBirth);
        } catch (error) {
            this._handleValidationError('age', error.message);
        }
    }

    toggleUnit() {
        const currentUnit = this._model.type;
        const newUnit = currentUnit === 'metric' ? 'imperial' : 'metric';

        try {
            this._model.convertToUnit(newUnit);

            this._updateViewsForUnitChange(newUnit);

        } catch (error) {
            this._handleError('Unit conversion failed', error);
        }
    }

    calculateBMI() {
        try {
            if (!this._model.isDataComplete()) {
                this._showValidationMessage('Please fill in all fields: date of birth, height, and weight.');
                return null;
            }

            if (!this._model.isValid()) {
                this._showValidationMessage('Invalid input values. Please check your height and weight.');
                return null;
            }
            const result = this._buildBMIResult();
            this._updateResultViews(result);
            return result;

        } catch (error) {
            this._handleError('BMI calculation failed', error);
            return null;
        }
    }

    _buildBMIResult() {
        const bmi = this._model.calculateBMI();
        const category = this._model.getBMICategory();
        const idealRange = this._model.getIdealWeightRange();

        return {
            bmi: bmi.toFixed(1),
            label: category.label,
            color: category.color,
            idealRange: {
                min: idealRange[0].toFixed(1),
                max: idealRange[1].toFixed(1),
            },
            id: category.id,
            age: this._model.age,
            unit: this._model.type,
            weightUnit: this._model.getWeightUnit(),
            heightUnit: this._model.getHeightUnit()
        };
    }

    _handleUnitChange(newUnit, oldUnit) {
        this._convertAndUpdateInputValues(oldUnit, newUnit);

        this._updateUnitLabels(newUnit);

        this._updateToggleButton(newUnit);
    }

    _convertAndUpdateInputValues(fromUnit, toUnit) {
        const heightInput = document.getElementById('height-input');
        const weightInput = document.getElementById('weight-input');

        if (heightInput && heightInput.value) {
            const convertedHeight = this._convertHeightUsingStrategies(
                parseFloat(heightInput.value),
                fromUnit,
                toUnit
            );
            heightInput.value = convertedHeight.toFixed(1);
        }

        if (weightInput && weightInput.value) {
            const convertedWeight = this._convertWeightUsingStrategies(
                parseFloat(weightInput.value),
                fromUnit,
                toUnit
            );
            weightInput.value = convertedWeight.toFixed(1);
        }
    }

    _convertHeightUsingStrategies(value, fromUnit, toUnit) {
        if (fromUnit !== toUnit) {
            return this._model._convertHeight(value, fromUnit, toUnit);
        }
        return value;
    }

    _convertWeightUsingStrategies(value, fromUnit, toUnit) {
        if (fromUnit !== toUnit) {
            return this._model._convertWeight(value, fromUnit, toUnit);
        }
        return value;
    }

    _updateUnitLabels() {
        const heightLabel = document.querySelector('label[for="height-input"] h3');
        const weightLabel = document.querySelector('label[for="weight-input"] h3');
        const heightInput = document.getElementById('height-input');
        const weightInput = document.getElementById('weight-input');

        const heightUnit = this._model.getHeightUnit();
        const weightUnit = this._model.getWeightUnit();

        if (heightLabel) heightLabel.textContent = `Height (${heightUnit})`;
        if (weightLabel) weightLabel.textContent = `Weight (${weightUnit})`;
        if (heightInput) heightInput.placeholder = `Height in ${heightUnit}`;
        if (weightInput) weightInput.placeholder = `Weight in ${weightUnit}`;
    }

    _updateToggleButton(unit) {
        const toggleText = document.getElementById('unit-toggle-text');
        const toggleButton = document.getElementById('unit-toggle-button');

        if (toggleText && toggleButton) {
            toggleText.textContent = unit === 'metric' ? 'Switch to Imperial' : 'Switch to Metric';
            toggleButton.dataset.currentUnit = unit;
        }
    }

    _updateViewsForUnitChange(newUnit) {
        this._views.forEach((view) => {
            if (typeof view.onUnitChange === 'function') {
                view.onUnitChange(newUnit);
            }
        });
    }

    _updateResultViews(result) {
        this._updateResultNumber(result);
        this._updateResultDetails(result);
        this._updateResultPath(result);
        this._hideDefaultContent();
    }

    _updateResultNumber(data) {
        const resultNumberEl = document.getElementById('result-number');
        const bmiValueEl = document.getElementById('bmi-value');

        if (resultNumberEl) resultNumberEl.classList.remove('hidden');
        if (bmiValueEl) {
            bmiValueEl.textContent = data.bmi;
            bmiValueEl.style.color = data.color;
        }
    }

    _updateResultDetails(data) {
        const ageEl = document.getElementById('bmi-result-age');
        const idealWeightEl = document.getElementById('bmi-result-weight');
        const categoryEl = document.getElementById('bmi-result-desc-content');
        if (ageEl) ageEl.textContent = `${data.age} Years`;
        if (idealWeightEl) {
            idealWeightEl.textContent = `${data.idealRange.min} ${data.weightUnit} to ${data.idealRange.max} ${data.weightUnit}`;
        }
        if (categoryEl) {
            categoryEl.textContent = data.label;
            categoryEl.style.color = data.color;
        }
    }

    _updateResultPath(data) {
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

    _hideDefaultContent() {
        const defaultContent = document.getElementById('bmi-default-content');
        const defaultTitle = document.getElementById('result-default-title');
        const bmiResultDesc = document.getElementById('bmi-result-desc');
        const bmiResultIdeal = document.getElementById('bmi-result-ideal');
        if (bmiResultIdeal) bmiResultIdeal.classList.remove('hidden');
        if (bmiResultDesc) bmiResultDesc.classList.remove('hidden');
        if (defaultContent) defaultContent.classList.add('hidden');
        if (defaultTitle) defaultTitle.classList.add('hidden');

    }

    _validateAndUpdateViews() {
        this._views.forEach((view) => {
            if (typeof view.onDataChange === 'function') {
                view.onDataChange(this._model.toJSON());
            }
        });
    }

    _calculateAge(dateOfBirth) {
        if (!dateOfBirth) throw new Error('Date of birth is required');

        const [day, month, year] = dateOfBirth.split('/').map(Number);
        if (!day || !month || !year) {
            throw new Error('Invalid date format. Use DD/MM/YYYY');
        }

        const today = new Date();
        let age = today.getFullYear() - year;
        const monthDiff = today.getMonth() - (month - 1);

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
            age--;
        }

        if (age < 0 || age > 150) {
            throw new Error('Invalid age calculated from date of birth');
        }

        return age;
    }

    _handleValidationError(field, message) {
        console.warn(`Validation error for ${field}: ${message}`);
        this._views.forEach((view) => {
            if (typeof view.onValidationError === 'function') {
                view.onValidationError(field, message);
            }
        });
    }

    _handleError(context, error) {
        console.error(`${context}:`, error);
        this._showErrorMessage(`${context}. Please try again.`);
    }

    _showValidationMessage(message) {
        alert(message);
    }

    _showErrorMessage(message) {
        alert(message);
    }

    get isDataComplete() {
        return this._model.isDataComplete();
    }
}
