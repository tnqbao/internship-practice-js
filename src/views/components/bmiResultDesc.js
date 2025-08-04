import {customizeElement} from "../../utils/handleElement.js";

export function createBMIResultDesc() {
    const assessmentDesc = customizeElement(document.createElement('p'), {
        className: ['bmi-result-assessment-desc', 'text-secondary'],
        id: 'bmi-result-assessment-desc',
        innerHTML: `
            <span class='color-primary'>
                <strong>
                Assessment:
                </strong> 
            </span>
            <span id='bmi-result-desc-content' class='color-primary'> Normal </span>
        `,
    });

    const descriptionSection = customizeElement(document.createElement('div'), {
        className: ['bmi-result-description-section', 'text-secondary'],
        id: 'bmi-result-description-section',
        innerHTML: `
            <span class='color-primary'>
                <strong>
                Description:
                </strong> 
            </span>
            <p id='bmi-result-description' class='text-secondary text-center p-md'>
                The body is developing proportionally and within a healthy range.
            </p>
        `,
    });

    const recommendationDesc = customizeElement(document.createElement('div'), {
        className: ['bmi-result-recommendation-desc', 'text-secondary'],
        id: 'bmi-result-recommendation-desc',
        innerHTML: `
            <span class='color-primary'>
                <strong>
                Recommendations:  
                </strong> 
            </span>
            <ul id='recommendation-list' class="p-l-xl">
            </ul>
        `,
    });

    return customizeElement(document.createElement('div'), {
        className: ['bmi-result-desc', 'flex', 'flex-col','flex-wrap','items-center', 'justify-between', 'w-full','gap-4','hidden'],
        id: 'bmi-result-desc',
        children: [
            assessmentDesc,
            descriptionSection,
            recommendationDesc
        ],
    });
}
