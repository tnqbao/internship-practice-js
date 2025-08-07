import {customizeElement} from "../../../utils/handleElement.js";

export function createBMIDefault() {
    const textDefaultContent = customizeElement(document.createElement('p'), {
        className: ['text-secondary', 'text-sm', 'color-primary', 'text-center', 'w-full'],
        innerHTML: `<span>Please enter your birthdate (to calculate age), weight, and gender above to see your BMI.</span>`,
    });

    const noteTextContent = customizeElement(document.createElement('p'), {
        className: ['text-secondary', 'text-sm', 'color-primary', 'text-center', 'w-full'],
        innerHTML: `
        <span id='red-note'> Note: </span>
        <span>This tool is applicable for all ages except for pregnant </span>`
    });

    return customizeElement(document.createElement('div'), {
        className: ['bmi-default-content', 'flex', 'flex-col','flex-wrap','items-center', 'justify-between', 'w-full','gap-4'],
        id: 'bmi-default-content',
        children: [
            textDefaultContent,
            noteTextContent
        ],
    });
}
