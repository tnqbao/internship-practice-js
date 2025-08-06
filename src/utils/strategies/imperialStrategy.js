import validation from '../../config/validation.json' with { type: 'json' };

export class ImperialStrategy {
    calculateBMI(height, weight) {
        // 703 is used to convert BMI calculated with imperial units (lbs/in^2) to the standard BMI scale.
        const BMI_CONVERSION_FACTOR = 703;
        return (weight / (height ** 2)) * BMI_CONVERSION_FACTOR;
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
        // 18.5 and 24.9 are chosen because they are the World Health Organization's recommended BMI thresholds for healthy weight.
        const minBMI = 18.5; // lower healthy BMI limit
        const maxBMI = 24.9; // upper healthy BMI limit
        const BMI_CONVERSION_FACTOR = 703; // imperial conversion factor

        return [
            minBMI * height * height / BMI_CONVERSION_FACTOR,
            maxBMI * height * height / BMI_CONVERSION_FACTOR
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
