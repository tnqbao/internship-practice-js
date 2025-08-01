import { BmiModel } from '../models/bmiModel.js';

export function bmiController(resultView) {
    return () => {
        console.log('[DEBUG] bmiController triggered');

        const weight = parseFloat(document.getElementById('weight-input')?.value);
        const height = parseFloat(document.getElementById('height-input')?.value);
        const dob = document.getElementById('age-input')?.value;

        if (!weight || !height || !dob) {
            console.warn('[WARN] Missing input');
            return;
        }

        const age = calculateAge(dob);
        const model = new BmiModel({ height, weight, age, type: 'metric' });

        if (!model.isValid()) {
            alert("Invalid input values.");
            return;
        }

        const bmi = model.calculateBMI().toFixed(1);
        const category = model.getBMICategory();
        const idealRange = model.getIdealWeightRange();

        resultView.render({
            bmi,
            label: category.label,
            color: category.color,
            idealRange: {
                min: idealRange[0].toFixed(1),
                max: idealRange[1].toFixed(1),
            },
            id: category.id
        });
    };
}

function calculateAge(dob) {
    const [day, month, year] = dob.split('/').map(Number);
    const today = new Date();
    let age = today.getFullYear() - year;
    const m = today.getMonth() - (month - 1);
    if (m < 0 || (m === 0 && today.getDate() < day)) age--;
    return age;
}
