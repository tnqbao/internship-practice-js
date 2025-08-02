import validation from '../config/validation.json' with { type: 'json' };

export class MetricStrategy {
    calculateBMI(height, weight) {
        const heightInMeters = height / 100;
        return weight / (heightInMeters ** 2);
    }

    isValid(height, weight) {
        const rule = validation.metric;
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
        const heightInMeters = height / 100;

        return [
            minBMI * heightInMeters * heightInMeters,
            maxBMI * heightInMeters * heightInMeters
        ];
    }

    getUnitType() {
        return 'metric';
    }

    getWeightUnit() {
        return 'kg';
    }

    getHeightUnit() {
        return 'cm';
    }
}
