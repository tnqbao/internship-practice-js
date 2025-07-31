import {customizeElement} from "../../utils/handleElement.js";

export function createBMIResultIdeal() {
    const bmiResultNumberAge = customizeElement(document.createElement('div'), {
        className: ['bmi-result-number-age', 'text-secondary'],
        id: 'bmi-result-number-age',
        innerHTML: `
            <p class='color-primary'>
                <h3>
                Age:
                </h3> 
            </p>
            <p id='bmi-result-age' class='color-primary'> 0 Years</p>
        `,
    });
    const bmiResultWeightIdeal = customizeElement(document.createElement('div'), {
        className: ['bmi-result-weight-ideal', 'text-secondary'],
        id: 'bmi-result-weight-ideal',
        innerHTML: `
            <p class='color-primary'>
                <h3>
                Ideal Weight:
                </h3>
            </p>
            <p id='bmi-result-weight' class='color-primary text-lg'> 0 Kg to 0 Kg</p>
        `,
    });

    return customizeElement(document.createElement('div'), {
        className: ['bmi-result-ideal', 'flex', 'items-center', 'justify-between', 'w-full','gap-4'],
        id: 'bmi-result-ideal',
        children: [
            bmiResultNumberAge,
            bmiResultWeightIdeal,
        ],
    });
}
