import {customizeElement} from "../../utils/handleElement.js";

export function BmiResultPath() {
    const path = customizeElement(document.createElement('path'), {
        d: 'M 0 0 L 0 24 L 24 24 L 24 0 Z',
        fill: 'none',
        stroke: '#f149e0',
        strokeWidth: '2'
    });

    return customizeElement(document.createElement('div'), {
        className: ['gender-toggle', 'flex', 'w-full', 'flex-1', 'justify-center', 'items-center', 'gap-1', 'm-b-lg', 'p-sm', 'bg-tertiary', 'rounded-6'],
        id: 'gender-toggle',
        children: [path],
    })
}

