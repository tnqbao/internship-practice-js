import {customizeElement} from "../../utils/handleElement.js";

export function createBMIDefault() {
    const textDefaultContent = customizeElement(document.createElement('p'), {
        className: ['text-secondary', 'text-sm', 'color-primary', 'text-center', 'w-full'],
        innerText: 'Please enter your birthdate (to calculate age), weight, and gender above to see your BMI.',
    });

    const noteTextContent = customizeElement(document.createElement('p'), {
        className: ['text-secondary', 'text-sm', 'color-primary', 'text-center', 'w-full'],
        innerText: 'Note: This tool is applicable for all ages except for pregnant'
    });

    return customizeElement(document.createElement('div'), {
        className: ['bmi-result-desc', 'flex', 'flex-col','flex-wrap','items-center', 'justify-between', 'w-full','gap-4'],
        id: 'bmi-result-desc',
        children: [
            textDefaultContent,
            noteTextContent
        ],
    });
}
