import bmiRanges from '../config/bmiRanges.json';
import { MetricStrategy } from '../strategies/metricStrategy.js';
import { ImperialStrategy } from '../strategies/imperialStrategy.js';

export class BmiModel {
    #height = 0;
    #weight = 0;
    #age = 0;
    #type = 'metric';
    #strategy;
    #observers = [];
    #detailedAge;

    constructor({ height = 0, weight = 0, age = 0, type = 'metric' } = {}) {
        this.#height = height;
        this.#weight = weight;
        this.#age = age;
        this.#type = type;
        this.#strategy = this.#createStrategy(type);
        this.#observers = [];
    }

    get height() { return this.#height; }
    set height(value) {
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue <= 0) {
            throw new Error('Height must be a positive number');
        }
        this.#height = numValue;
        this.#notifyObservers('height', numValue);
    }

    get weight() { return this.#weight; }
    set weight(value) {
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue <= 0) {
            throw new Error('Weight must be a positive number');
        }
        this.#weight = numValue;
        this.#notifyObservers('weight', numValue);
    }

    get age() { return this.#age; }
    set age(value) {
        const numValue = parseInt(value);
        if (isNaN(numValue) || numValue <= 0) {
            throw new Error('Age must be a positive number');
        }
        this.#age = numValue;
        this.#notifyObservers('age', numValue);
    }

    get type() { return this.#type; }
    set type(value) {
        if (!['metric', 'imperial'].includes(value)) {
            throw new Error('Type must be either "metric" or "imperial"');
        }
        const oldType = this.#type;
        this.#type = value;
        this.#strategy = this.#createStrategy(value);
        this.#notifyObservers('type', value, oldType);
    }

    #createStrategy(type) {
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
        return this.#strategy.calculateBMI(this.#height, this.#weight);
    }

    getBMICategory() {
        const bmi = this.calculateBMI();
        const matched = bmiRanges.find(r => bmi >= r.min && bmi < r.max);
        return matched
            ? { label: matched.label, color: matched.color, id: matched.id }
            : { label: 'Unknown', color: '#ccc', id: null };
    }

    isValid() {
        return this.isDataComplete() && this.#strategy.isValid(this.#height, this.#weight);
    }

    isDataComplete() {
        return this.#height > 0 && this.#weight > 0 && this.#age > 0;
    }

    getIdealWeightRange() {
        if (!this.#height) {
            throw new Error('Height is required to calculate ideal weight range');
        }
        return this.#strategy.getIdealWeightRange(this.#height);
    }

    getWeightUnit() {
        return this.#strategy.getWeightUnit();
    }

    getHeightUnit() {
        return this.#strategy.getHeightUnit();
    }

    getUnitType() {
        return this.#strategy.getUnitType();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter(obs => obs !== observer);
    }

    #notifyObservers(property, newValue, oldValue = null) {
        this.#observers.forEach(observer => {
            if (typeof observer.onModelChange === 'function') {
                observer.onModelChange(property, newValue, oldValue);
            }
        });
    }

    convertToUnit(targetUnit) {
        if (this.#type === targetUnit) return;

        if (this.#height > 0) {
            this.#height = this.#convertHeight(this.#height, this.#type, targetUnit);
        }
        if (this.#weight > 0) {
            this.#weight = this.#convertWeight(this.#weight, this.#type, targetUnit);
        }

        this.type = targetUnit;
    }

    #convertHeight(value, fromUnit, toUnit) {
        if (fromUnit === 'metric' && toUnit === 'imperial') {
            return value / 2.54;
        } else if (fromUnit === 'imperial' && toUnit === 'metric') {
            return value * 2.54;
        }
        return value;
    }

    #convertWeight(value, fromUnit, toUnit) {
        if (fromUnit === 'metric' && toUnit === 'imperial') {
            return value * 2.20462;
        } else if (fromUnit === 'imperial' && toUnit === 'metric') {
            return value / 2.20462;
        }
        return value;
    }

    convertHeight(value, fromUnit, toUnit) {
        return this.#convertHeight(value, fromUnit, toUnit);
    }
    convertWeight(value, fromUnit, toUnit) {
        return this.#convertWeight(value, fromUnit, toUnit);
    }

    calculateAgeFromDateOfBirth(dateOfBirth) {
        if (!dateOfBirth) throw new Error('Date of birth is required');

        const [day, month, year] = dateOfBirth.split('/').map(Number);
        if (!day || !month || !year) {
            throw new Error('Invalid date format. Use DD/MM/YYYY');
        }

        const today = new Date();
        let age = today.getFullYear() - year;
        let monthDiff = today.getMonth() - (month - 1);

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
            age--;
            monthDiff += 12;
        }

        if (today.getDate() < day) {
            monthDiff--;
            if (monthDiff < 0) {
                monthDiff += 12;
                age--;
            }
        }

        if (age < 0 || age > 150) {
            throw new Error('Invalid age calculated from date of birth');
        }

        return { years: age, months: monthDiff };
    }

    setAgeFromDateOfBirth(dateOfBirth) {
        const ageData = this.calculateAgeFromDateOfBirth(dateOfBirth);
        this.age = ageData.years;
        this.#detailedAge = ageData;
        this.#notifyObservers('age', ageData.years, null);
        return ageData;
    }

    getDetailedAge() {
        return this.#detailedAge || { years: this.#age, months: 0 };
    }

    toJSON() {
        return {
            height: this.#height,
            weight: this.#weight,
            age: this.#age,
            type: this.#type,
            bmi: this.isDataComplete() ? this.calculateBMI() : null,
            category: this.isDataComplete() ? this.getBMICategory() : null,
            isValid: this.isValid()
        };
    }
}
