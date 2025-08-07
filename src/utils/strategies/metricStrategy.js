import validation from '../../config/validation.json' with { type: 'json' };

export class MetricStrategy {
    calculateBMI(height, weight) {
        // BMI formula requires height in meters; height is provided in centimeters, so divide by 100.
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
        // 18.5 and 24.9 are chosen because they are the World Health Organization's recommended BMI thresholds for healthy weight.
        const minBMI = 18.5; // lower healthy BMI limit
        const maxBMI = 24.9; // upper healthy BMI limit
        const heightInMeters = height / 100; // convert cm to meters

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
