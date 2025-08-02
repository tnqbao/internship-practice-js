import { customizeElement } from "../utils/handleElement.js";
import { createBmiResultPath } from "./components/bmiResultPath.js";
import { createBMIResultIdeal } from "./components/bmiResultIdeal.js";
import { createBMIResultDesc } from "./components/bmiResultDesc.js";
import { createBMIDefault } from "./components/bmiDefaultContent.js";

export function createResultView() {
    const resultTitle = customizeElement(document.createElement('h2'), {
        id : 'result-default-title',
        className: ['text-center', 'mb-4', 'font-bold', 'color-primary'],
        textContent: 'Your BMI Result',
    });

    const resultNumber = customizeElement(document.createElement('div'), {
        className: ['flex', 'flex-col', 'items-center', 'hidden','justify-center', 'gap-2'],
        id: 'result-number',
        children: [
            customizeElement(document.createElement('h2'), {
                className: ['text-secondary'],
                textContent: 'Your BMI is:',
            }),
            customizeElement(document.createElement('h2'), {
                id: 'bmi-value',
                className: ['text-primary'],
                textContent: '0',
            })
        ]
    });

    return customizeElement(document.createElement('div'), {
        className: ['result-view', 'flex', 'flex-col', 'flex-wrap', 'items-center', 'justify-center', 'bg-secondary', 'w-full', 'rounded-xl', 'p-lg', 'gap-4'],
        id: 'result-view',
        children: [
            resultTitle,
            resultNumber,
            createBmiResultPath(),
            createBMIResultIdeal(),
            createBMIResultDesc(),
            createBMIDefault()
        ]
    });
}
