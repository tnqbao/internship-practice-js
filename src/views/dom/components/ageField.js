import { customizeElement } from '../../../utils/handleElement.js';

export function createAgeField(handleAgeChange) {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 200, today.getMonth(), today.getDate());
    const maxDateString = maxDate.toISOString().split('T')[0];
    const todayString = today.toISOString().split('T')[0];

    const ageField = customizeElement(document.createElement('div'), {
        className: ['flex', 'flex-col', 'flex-1', 'flex-wrap', 'm-b-sm'],
        children: [
            customizeElement(document.createElement('label'), {
                className: ['text-primary', 'p-x-sm'],
                htmlFor: 'age-input',
                innerHTML: '<h3 class="text-secondary">Date of Birth</h3>'
            }),
            customizeElement(document.createElement('input'), {
                type: 'date',
                className: ['age-input', 'flex', 'flex-1', 'w-full', 'p-sm', 'm-b-sm', 'border', 'rounded-1'],
                id: 'age-input',
                dataset: { component: 'age-input' },
                min: maxDateString,
                max: todayString,
                events: {
                    change: (event) => handleAgeChange(event.target.value),
                }
            })
        ]
    });

    return ageField;
}

