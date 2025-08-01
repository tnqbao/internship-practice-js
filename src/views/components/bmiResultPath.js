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
            <div class="bmi-arrow range-${id}">
                <svg width="20" height="20" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fill-rule="evenodd">
                        <g fill="#000000" transform="translate(32, 42.666667)">
                            <path d="M246.31,5.63 C252.93,9.41 258.41,14.89 262.19,21.51 L444.67,340.84 
                                     C456.36,361.3 449.25,387.36 428.79,399.05 C422.34,402.74 415.05,404.68 
                                     407.62,404.68 L42.67,404.68 C19.1,404.68 0,385.57 0,362.01 C0,354.58 
                                     1.94,347.29 5.62,340.84 L188.1,21.51 C199.79,1.05 225.85,-6.06 246.31,5.63 Z"/>
                        </g>
                    </g>
                </svg>
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
