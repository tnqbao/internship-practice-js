import { customizeElement } from "../../utils/handleElement.js";
import bmiRanges from "../../config/bmiRanges.json" with { type: 'json' };

function createBmiLine({ id, label }) {
    return customizeElement(document.createElement('div'), {
        id: `range-${id}`,
        className: ['bmi-result-line', 'w-full', 'h-4', 'rounded', 'transition-all', 'duration-300'],
        dataset: {
            range: id
        },
        title: label,
        innerHTML: `
            <span class="bmi-result-line"> </span>
            <div class="bmi-arrow range-${id} opacity-0">
                <img src="https://cdn.gauas.online/internship/arrow.svg" alt="Arrow Icon" width="20" height="20">
            </div>
        `,
    });
}

export function createBmiResultPath() {
    const children = bmiRanges.map(createBmiLine);

    return customizeElement(document.createElement('div'), {
        id: 'bmi-result-path',
        className: ['bmi-result-path',
            'flex',
            'w-full',
            'flex-1',
            'justify-center',
            'items-center',
            'gap-1',
            'm-b-lg',
            'p-sm',
            'rounded-6',
        ],
        children,
    });
}
