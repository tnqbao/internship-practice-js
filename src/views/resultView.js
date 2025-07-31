import {customizeElement} from "../utils/handleElement.js";

export function createResultView() {
    const resultTitle = customizeElement(document.createElement('h2'), {
        className: ['flex','flex-center', 'flex-1','mb-4'],
        textContent: 'Your BMI Result',
    })

    const resultNumber = customizeElement(document.createElement('h2'), {
        className: ['flex', 'flex-start','text-primary'],
        id: 'result-number',
        innerHTML: `
            <h2 class="text-secondary">Your BMI is: </h2>
            <h2 class="text-primary" id="bmi-value"> 0 </h2>
        `
    });

    return customizeElement(document.createElement('div'), {
        className: ['result-view', 'flex', 'flex-1','flex-col', 'flex-wrap','items-center', 'justify-center', 'bg-secondary','rounded-xl','p-4'],
        id: 'result-view',
        children: [
            resultTitle,
            resultNumber
        ]
    });
}
