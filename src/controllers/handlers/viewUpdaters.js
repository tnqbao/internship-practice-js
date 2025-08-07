export function updateViewsForUnitChange(views, unit) {
    views.forEach((view) => {
        if (typeof view.onUnitChange === 'function') {
            view.onUnitChange(unit);
        }
    });
}

export function updateResultViews(views, result, model) {
    const {
        bmi, color, label, id, idealRange, weightUnit, description, recommendations
    } = result;

    const resultNumberEl = document.getElementById('result-number');
    const bmiValueEl = document.getElementById('bmi-value');
    if (resultNumberEl) resultNumberEl.classList.remove('hidden');
    if (bmiValueEl) {
        bmiValueEl.textContent = bmi;
        bmiValueEl.style.color = color;
    }

    const ageEl = document.getElementById('bmi-result-age');
    const idealWeightEl = document.getElementById('bmi-result-weight');
    const categoryEl = document.getElementById('bmi-result-desc-content');
    const descEl = document.getElementById('bmi-result-description');
    const recList = document.getElementById('recommendation-list');

    if (ageEl) {
        const age = model.getDetailedAge();
        ageEl.textContent = `${age.years} Years ${age.months} Months`;
    }

    if (idealWeightEl)
        idealWeightEl.textContent = `${idealRange.min} ${weightUnit} to ${idealRange.max} ${weightUnit}`;
    if (categoryEl) {
        categoryEl.textContent = label;
        categoryEl.style.color = color;
    }
    if (descEl) descEl.textContent = description;

    if (recList && recommendations?.length) {
        recList.innerHTML = '';
        recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.className = 'mb-2';
            li.innerHTML = `<strong>${rec.title}:</strong> ${rec.description}`;
            recList.appendChild(li);
        });
    }

    updateResultPath(id);
    hideDefaultContent();
}

function updateResultPath(categoryId) {
    const pathEl = document.getElementById('bmi-result-path');
    if (!pathEl) return;

    pathEl.querySelectorAll('.bmi-arrow').forEach(el => el.style.opacity = '0');
    const current = pathEl.querySelector(`[data-range="${categoryId}"]`);
    if (current) {
        const arrow = current.querySelector('.bmi-arrow');
        if (arrow) arrow.style.opacity = '1';
        current.classList.add('active');
    }
}

function hideDefaultContent() {
    ['bmi-default-content', 'result-default-title'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    ['bmi-result-ideal', 'bmi-result-desc'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('hidden');
    });
}
