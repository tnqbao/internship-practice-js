import bmiRanges from '../config/bmiRanges.json';
import { MetricStrategy } from '../strategies/metricStrategy.js';
import { ImperialStrategy } from '../strategies/imperialStrategy.js';

export class BmiModel {
    constructor({ height = 0, weight = 0, age = 0, type = 'metric' } = {}) {
        this._height = height;
        this._weight = weight;
        this._age = age;
        this._type = type;
        this._strategy = this._createStrategy(type);
        this._observers = [];
    }

    // Getters and Setters with validation
    get height() { return this._height; }
    set height(value) {
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue <= 0) {
            throw new Error('Height must be a positive number');
        }
        this._height = numValue;
        this._notifyObservers('height', numValue);
    }

    get weight() { return this._weight; }
    set weight(value) {
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue <= 0) {
            throw new Error('Weight must be a positive number');
        }
        this._weight = numValue;
        this._notifyObservers('weight', numValue);
    }

    get age() { return this._age; }
    set age(value) {
        const numValue = parseInt(value);
        if (isNaN(numValue) || numValue <= 0) {
            throw new Error('Age must be a positive number');
        }
        this._age = numValue;
        this._notifyObservers('age', numValue);
    }

    get type() { return this._type; }
    set type(value) {
        if (!['metric', 'imperial'].includes(value)) {
            throw new Error('Type must be either "metric" or "imperial"');
        }
        const oldType = this._type;
        this._type = value;
        this._strategy = this._createStrategy(value);
        this._notifyObservers('type', value, oldType);
    }

    _createStrategy(type) {
        switch (type) {
            case 'metric':
                return new MetricStrategy();
            case 'imperial':
                return new ImperialStrategy();
            default:
                throw new Error(`Unsupported strategy type: ${type}`);
        }
    }

    calculateBMI() {
        if (!this.isDataComplete()) {
            throw new Error('Incomplete data: height, weight, and age are required');
        }
        return this._strategy.calculateBMI(this._height, this._weight);
    }

    getBMICategory() {
        const bmi = this.calculateBMI();
        const matched = bmiRanges.find(r => bmi >= r.min && bmi < r.max);
        return matched
            ? { label: matched.label, color: matched.color, id: matched.id }
            : { label: 'Unknown', color: '#ccc', id: null };
    }

    isValid() {
        return this.isDataComplete() && this._strategy.isValid(this._height, this._weight);
    }

    isDataComplete() {
        return this._height > 0 && this._weight > 0 && this._age > 0;
    }

    getIdealWeightRange() {
        if (!this._height) {
            throw new Error('Height is required to calculate ideal weight range');
        }
        return this._strategy.getIdealWeightRange(this._height);
    }

    // Strategy delegation methods
    getWeightUnit() {
        return this._strategy.getWeightUnit();
    }

    getHeightUnit() {
        return this._strategy.getHeightUnit();
    }

    getUnitType() {
        return this._strategy.getUnitType();
    }

    addObserver(observer) {
        this._observers.push(observer);
    }

    removeObserver(observer) {
        this._observers = this._observers.filter(obs => obs !== observer);
    }

    _notifyObservers(property, newValue, oldValue = null) {
        this._observers.forEach(observer => {
            if (typeof observer.onModelChange === 'function') {
                observer.onModelChange(property, newValue, oldValue);
            }
        });
    }

    convertToUnit(targetUnit) {
        if (this._type === targetUnit) return;

        if (this._height > 0) {
            this._height = this._convertHeight(this._height, this._type, targetUnit);
        }
        if (this._weight > 0) {
            this._weight = this._convertWeight(this._weight, this._type, targetUnit);
        }

        this.type = targetUnit;
    }

    _convertHeight(value, fromUnit, toUnit) {
        if (fromUnit === 'metric' && toUnit === 'imperial') {
            return value / 2.54;
        } else if (fromUnit === 'imperial' && toUnit === 'metric') {
            return value * 2.54;
        }
        return value;
    }

    _convertWeight(value, fromUnit, toUnit) {
        if (fromUnit === 'metric' && toUnit === 'imperial') {
            return value * 2.20462; // kg to lbs
        } else if (fromUnit === 'imperial' && toUnit === 'metric') {
            return value / 2.20462; // lbs to kg
        }
        return value;
    }

    // Utility methods
    toJSON() {
        return {
            height: this._height,
            weight: this._weight,
            age: this._age,
            type: this._type,
            bmi: this.isDataComplete() ? this.calculateBMI() : null,
            category: this.isDataComplete() ? this.getBMICategory() : null,
            isValid: this.isValid()
        };
    }

    clone() {
        return new BmiModel({
            height: this._height,
            weight: this._weight,
            age: this._age,
            type: this._type
        });
    }
}
