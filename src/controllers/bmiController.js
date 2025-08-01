import { BmiModel } from '../models/bmiModel.js';

let currentUnit = 'metric';

function renderBMIResult(data) {
    const resultNumberEl = document.getElementById('result-number');
    if (resultNumberEl) {
        resultNumberEl.classList.remove('hidden');
    }

    const bmiValueEl = document.getElementById('bmi-value');
    if (bmiValueEl) {
        bmiValueEl.textContent = data.bmi;
        bmiValueEl.style.color = data.color;
    }

    const ageEl = document.getElementById('bmi-result-age');
    if (ageEl) {
        ageEl.textContent = `${data.age} Years`;
    }

    const idealWeightEl = document.getElementById('bmi-result-weight');
    if (idealWeightEl) {
        const unit = data.unit === 'metric' ? 'kg' : 'lbs';
        idealWeightEl.textContent = `${data.idealRange.min} ${unit} to ${data.idealRange.max} ${unit}`;
    }

    const categoryEl = document.getElementById('bmi-result-desc-content');
    if (categoryEl) {
        categoryEl.textContent = data.label;
        categoryEl.style.color = data.color;
    }

    const pathEl = document.getElementById('bmi-result-path');
    if (pathEl) {
        const allArrows = pathEl.querySelectorAll('.bmi-arrow');
        allArrows.forEach(arrow => {
            arrow.style.opacity = '0';
        });

        const currentRange = pathEl.querySelector(`[data-range="${data.id}"]`);
        if (currentRange) {
            const currentArrow = currentRange.querySelector('.bmi-arrow');
            if (currentArrow) {
                currentArrow.style.opacity = '1';
                currentRange.classList.add('active');
            }
        }
    }

    const defaultContent = document.getElementById('bmi-default-content');
    if (defaultContent) {
        defaultContent.classList.add('hidden');
    }
}

export function bmiController() {
    return () => {

        const weight = parseFloat(document.getElementById('weight-input')?.value);
        const height = parseFloat(document.getElementById('height-input')?.value);
        const dob = document.getElementById('age-input')?.value;

        if (!weight || !height || !dob) {
            console.warn('Missing input');
            alert('Please fill in all fields: date of birth, height, and weight.');
            return;
        }

        const age = calculateAge(dob);
        const model = new BmiModel({ height, weight, age, type: currentUnit });

        if (!model.isValid()) {
            alert("Invalid input values. Please check your height and weight.");
            return;
        }

        const bmi = model.calculateBMI().toFixed(1);
        const category = model.getBMICategory();
        const idealRange = model.getIdealWeightRange();

        renderBMIResult({
            bmi,
            label: category.label,
            color: category.color,
            idealRange: {
                min: idealRange[0].toFixed(1),
                max: idealRange[1].toFixed(1),
            },
            id: category.id,
            age: age,
            unit: currentUnit
        });
    };
}

export function setUnit(unit) {
    currentUnit = unit;
}

export function getUnit() {
    return currentUnit;
}

function calculateAge(dob) {
    const [day, month, year] = dob.split('/').map(Number);
    const today = new Date();
    let age = today.getFullYear() - year;
    const m = today.getMonth() - (month - 1);
    if (m < 0 || (m === 0 && today.getDate() < day)) age--;
    return age;
}
