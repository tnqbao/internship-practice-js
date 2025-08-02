import validation from '../config/validation.json' with { type: 'json' };

export class ImperialStrategy {
    calculateBMI(height, weight) {
        return (weight / (height ** 2)) * 703;
    }

    isValid(height, weight) {
        const rule = validation.imperial;
        return (
            height >= rule.height.min &&
            height <= rule.height.max &&
            weight >= rule.weight.min &&
            weight <= rule.weight.max
        );
    }

    getIdealWeightRange(height) {
        const minBMI = 18.5;
        const maxBMI = 24.9;

        return [
            minBMI * height * height / 703,
            maxBMI * height * height / 703
        ];
    }

    getUnitType() {
        return 'imperial';
    }

    getWeightUnit() {
        return 'lbs';
    }

    getHeightUnit() {
        return 'in';
    }
}
