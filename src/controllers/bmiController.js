import { BmiModel } from '../models/bmiModel.js';
import * as ModelHandlers from './handlers/modelEvents.js';
import * as ErrorHandlers from './handlers/errorHandlers.js';
import * as ViewUpdaters from './handlers/viewUpdaters.js';
import * as Converters from './converters/unitConverter.js';
import { buildBMIResult } from './builders/resultBuilder.js';

export class BmiController {
    #model = new BmiModel();
    #views = new Map();

    constructor() {
        this.#model.addObserver(this);
    }

    onModelChange = (prop, newVal, oldVal) => {
        ModelHandlers.handleModelChange(this, this.#model, prop, newVal, oldVal);
    };

    registerView(name, view) {
        this.#views.set(name, view);
        if (view.bindModel) view.bindModel(this.#model);
    }

    unregisterView(name) {
        this.#views.delete(name);
    }

    updateHeight(value) {
        try {
            this.#model.height = value;
        } catch (err) {
            ErrorHandlers.handleValidationError(this.#views, 'height', err.message);
        }
    }

    updateWeight(value) {
        try {
            this.#model.weight = value;
        } catch (err) {
            ErrorHandlers.handleValidationError(this.#views, 'weight', err.message);
        }
    }

    updateAge(dob) {
        try {
            this.#model.setAgeFromDateOfBirth(dob);
        } catch (err) {
            ErrorHandlers.handleValidationError(this.#views, 'age', err.message);
        }
    }

    toggleUnit() {
        const from = this.#model.type;
        const to = from === 'metric' ? 'imperial' : 'metric';

        try {
            this.#model.convertToUnit(to);
            Converters.updateInputValues(from, to, this.#model);
            Converters.updateUnitLabels(to, this.#model);
            Converters.updateToggleButton(to);
            ViewUpdaters.updateViewsForUnitChange(this.#views, to);
        } catch (err) {
            ErrorHandlers.handleError('Unit conversion failed', err);
        }
    }

    calculateBMI() {
        try {
            if (!this.#model.isDataComplete()) return ErrorHandlers.showValidationMessage('Please fill all fields.');
            if (!this.#model.isValid()) return ErrorHandlers.showValidationMessage('Invalid input values.');

            const result = buildBMIResult(this.#model);
            ViewUpdaters.updateResultViews(this.#views, result, this.#model);
            return result;

        } catch (err) {
            ErrorHandlers.handleError('BMI calculation failed', err);
            return null;
        }
    }
}
