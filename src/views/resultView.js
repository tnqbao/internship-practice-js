import {customizeElement} from "../utils/handleElement.js";
import {createBmiResultPath} from "./components/bmiResultPath.js";
import {createBMIResultIdeal} from "./components/bmiResultIdeal.js";
import {createBMIResultDesc} from "./components/bmiResultDesc.js";
import {createBMIDefault} from "./components/bmiDefaultContent.js";

export function createResultView() {
    const resultTitle = customizeElement(document.createElement('h2'), {
        className: ['flex','flex-center', 'flex-1','mb-4'],
        textContent: 'Your BMI Result',
    })

    const resultNumber = customizeElement(document.createElement('h2'), {
        className: ['flex', 'flex-start','text-primary', 'hidden'],
        id: 'result-number',
        innerHTML: `
            <h2 class="text-secondary">Your BMI is: </h2>
            <h2 class="text-primary" id="bmi-value"> 0 </h2>
        `
    });

    const resulPaths = createBmiResultPath();
    const bmiResultIdeal = createBMIResultIdeal();
    const bmiResultDesc = createBMIResultDesc();
    const bmiDefaultContent = createBMIDefault();
    return customizeElement(document.createElement('div'), {
        className: ['result-view', 'flex','flex-col', 'flex-wrap','items-center', 'justify-center', 'bg-secondary','w-full','rounded-xl','p-lg','gap-4'],
        id: 'result-view',
        children: [
            resultTitle,
            resultNumber,
            resulPaths,
            bmiResultIdeal,
            bmiResultDesc,
            bmiDefaultContent
        ]
    });
}
