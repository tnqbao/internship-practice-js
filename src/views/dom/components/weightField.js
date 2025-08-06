import { customizeElement } from '../../../utils/handleElement.js';
import validation from '../../../config/validation.json' with { type: 'json' };

export function createWeightField(handleWeightChange, currentUnit = 'metric') {
    const rules = validation[currentUnit];
    const weightField = customizeElement(document.createElement('div'), {
        className: ['flex', 'flex-col', 'flex-1', 'flex-wrap', 'm-b-xs'],
        children: [
            customizeElement(document.createElement('label'), {
                className: ['text-primary', 'p-x-sm'],
                htmlFor: 'weight-input',
                innerHTML: '<h3 class="text-secondary">Weight</h3>'
            }),
            customizeElement(document.createElement('input'), {
                type: 'number',
                className: ['weight-input', 'flex', 'flex-1', 'w-full', 'p-sm', 'm-b-lg', 'border', 'rounded-1'],
                placeholder: 'Enter your weight',
                id: 'weight-input',
                dataset: { component: 'weight-input' },
                step: 0.1,
                min: rules.weight.min,
                max: rules.weight.max,
                events: {
                    input: (event) => handleWeightChange(event.target.value),
                    change: (event) => handleWeightChange(event.target.value)
                }
            })
        ]
    });

    return weightField;
}

