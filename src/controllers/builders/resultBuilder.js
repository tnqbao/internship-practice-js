import bmiRanges from '../../config/bmiRanges.json';

export function buildBMIResult(model) {
    const bmi = model.calculateBMI();
    const category = model.getBMICategory();
    const idealRange = model.getIdealWeightRange();
    const details = bmiRanges.find(r => r.id === category.id);

    return {
        bmi: bmi.toFixed(1),
        label: category.label,
        color: category.color,
        id: category.id,
        age: model.age,
        unit: model.type,
        weightUnit: model.getWeightUnit(),
        heightUnit: model.getHeightUnit(),
        idealRange: {
            min: idealRange[0].toFixed(2),
            max: idealRange[1].toFixed(2),
        },
        description: details?.description || '',
        recommendations: details?.recommendation || []
    };
}
