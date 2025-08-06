import { customizeElement } from '../../../utils/handleElement.js';
import validation from '../../../config/validation.json' with { type: 'json' };

export function createHeightField(handleHeightChange, currentUnit = 'metric') {
    const rules = validation[currentUnit];
    const heightField = customizeElement(document.createElement('div'), {
        className: ['flex', 'flex-col', 'flex-1', 'flex-wrap', 'm-b-md'],
        children: [
            customizeElement(document.createElement('label'), {
                className: ['text-primary', 'p-x-sm'],
                htmlFor: 'height-input',
                innerHTML: '<h3 class="text-secondary">Height</h3>'
            }),
            customizeElement(document.createElement('input'), {
                type: 'number',
                className: ['height-input', 'flex', 'flex-1', 'w-full', 'p-sm', 'm-b-sm', 'border', 'rounded-1'],
                placeholder: 'Enter your height',
                id: 'height-input',
                dataset: { component: 'height-input' },
                step: 0.1,
                min: rules.height.min,
                max: rules.height.max,
                events: {
                    input: (event) => handleHeightChange(event.target.value),
                    change: (event) => handleHeightChange(event.target.value)
                }
            })
        ]
    });

    return heightField;
}
