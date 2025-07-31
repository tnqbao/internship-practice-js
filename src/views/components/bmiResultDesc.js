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
            <span id='bmi-result-assessment' class='color-primary'> Normal </span>
        `,
    });

    const recommendationDesc = customizeElement(document.createElement('p'), {
        className: ['bmi-result-recommendation-desc', 'text-secondary'],
        id: 'bmi-result-recommendation-desc',
        innerHTML: `
            <span class='color-primary'>
                <strong>
                Recommendations:  
                </strong> 
            </span>
            <ul id='recommendation-list' class="p-l-xl">
                <li >Maintain a balanced diet.</li>
                <li>Engage in regular physical activity.</li>
                <li>Monitor your weight regularly.</li>
                <li>Consult with a healthcare provider for personalized advice.</li>
            </ul>
        `,
    });

    return customizeElement(document.createElement('div'), {
        className: ['bmi-result-desc', 'flex', 'flex-col','flex-wrap','items-center', 'justify-between', 'w-full','gap-4'],
        id: 'bmi-result-desc',
        children: [
            assessmentDesc,
            recommendationDesc
        ],
    });
}
