export function updateInputValues(fromUnit, toUnit, model) {
    const heightInput = document.getElementById('height-input');
    const weightInput = document.getElementById('weight-input');

    if (heightInput?.value) {
        const value = parseFloat(heightInput.value);
        heightInput.value = model.convertHeight(value, fromUnit, toUnit).toFixed(2);
    }

    if (weightInput?.value) {
        const value = parseFloat(weightInput.value);
        weightInput.value = model.convertWeight(value, fromUnit, toUnit).toFixed(2);
    }
}

export function updateUnitLabels(unit, model) {
    const heightLabel = document.querySelector('label[for="height-input"] h3');
    const weightLabel = document.querySelector('label[for="weight-input"] h3');
    const heightInput = document.getElementById('height-input');
    const weightInput = document.getElementById('weight-input');

    const heightUnit = model.getHeightUnit();
    const weightUnit = model.getWeightUnit();

    if (heightLabel) heightLabel.textContent = `Height (${heightUnit})`;
    if (weightLabel) weightLabel.textContent = `Weight (${weightUnit})`;
    if (heightInput) heightInput.placeholder = `Height in ${heightUnit}`;
    if (weightInput) weightInput.placeholder = `Weight in ${weightUnit}`;
}

export function updateToggleButton(unit) {
    const text = document.getElementById('unit-toggle-text');
    const btn = document.getElementById('unit-toggle-button');

    if (text && btn) {
        text.textContent = unit === 'metric' ? 'Switch to Imperial' : 'Switch to Metric';
        btn.dataset.currentUnit = unit;
    }
}
