import bmiRanges from '../config/bmiRanges.json';
import validation from '../config/validation.json';

export class BmiModel {
    constructor({ height, weight, age, type = 'metric' }) {
        this.height = height;
        this.weight = weight;
        this.age = age;
        this.type = type;
    }

    calculateBMI() {
        if (this.type === 'metric') {
            return this.weight / ((this.height / 100) ** 2);
        }
        return (this.weight / (this.height ** 2)) * 703;
    }

    getBMICategory() {
        const bmi = this.calculateBMI();
        const matched = bmiRanges.find(r => bmi >= r.min && bmi < r.max);

        return matched
            ? { label: matched.label, color: matched.color, id: matched.id }
            : { label: 'Unknown', color: '#ccc', id: null };
    }

    isValid() {
        const rule = validation[this.type];
        return (
            this.height >= rule.height.min &&
            this.height <= rule.height.max &&
            this.weight >= rule.weight.min &&
            this.weight <= rule.weight.max
        );
    }

    getIdealWeightRange() {
        const min = 18.5;
        const max = 24.9;
        const h = this.type === 'metric' ? this.height / 100 : this.height;
        const result = this.type === 'metric'
            ? [min * h * h, max * h * h]
            : [min * h * h / 703, max * h * h / 703];
        return result;
    }
}
