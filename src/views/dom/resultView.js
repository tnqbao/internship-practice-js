import { customizeElement } from "../../utils/handleElement.js";
import { createBmiResultPath } from "./components/bmiResultPath.js";
import { createBMIResultIdeal } from "./components/bmiResultIdeal.js";
import { createBMIResultDesc } from "./components/bmiResultDesc.js";
import { createBMIDefault } from "./components/bmiDefaultContent.js";
import { DOMView } from './DOMView.js';

export function createResultView(controller = null) {
    class ResultView extends DOMView {
        constructor(controller) {
            super(controller);
            this.elements = {};
        }

        updateFormFields(data) {
            void data;
        }

        displayBMIResult(result) {
            if (result && result.bmi) {
                this.showBMIResult(result);
            } else {
                this.showDefaultContent();
            }
        }

        showResult(result) {
            this.displayBMIResult(result);
        }

        showBMIResult(result) {
            // Hide default content
            if (this.elements.defaultContent) {
                this.elements.defaultContent.style.display = 'none';
            }

            // Show result components
            if (this.elements.resultNumber) {
                this.elements.resultNumber.classList.remove('hidden');
            }
            if (this.elements.resultPath) {
                this.elements.resultPath.style.display = 'flex';
            }

            // Update BMI value
            if (this.elements.bmiValue) {
                this.elements.bmiValue.textContent = result.bmi.toFixed(1);
            }

            // Update category and description
            if (this.elements.categoryElement && result.category) {
                this.elements.categoryElement.textContent = result.category.label;
                this.elements.categoryElement.style.color = result.category.color;
            }

            // Update ideal weight
            if (this.elements.idealWeightElement && result.idealWeight) {
                this.elements.idealWeightElement.textContent =
                    `${result.idealWeight.min} - ${result.idealWeight.max} ${result.weightUnit}`;
            }

            // Update age
            if (this.elements.ageElement && result.age) {
                this.elements.ageElement.textContent = `${result.age} years`;
            }
        }

        showDefaultContent() {
            // Show default content
            if (this.elements.defaultContent) {
                this.elements.defaultContent.style.display = 'flex';
            }

            // Hide result components
            if (this.elements.resultNumber) {
                this.elements.resultNumber.classList.add('hidden');
            }
            if (this.elements.resultPath) {
                this.elements.resultPath.style.display = 'none';
            }
        }

        #createResultTitle() {
            const resultTitle = customizeElement(document.createElement('h2'), {
                id: 'result-default-title',
                className: ['text-center', 'mb-4', 'font-bold', 'color-primary'],
                textContent: 'Your BMI Result',
            });

            this.elements.defaultTitle = resultTitle;
            return resultTitle;
        }

        #createResultNumber() {
            const resultNumber = customizeElement(document.createElement('div'), {
                className: ['flex', 'flex-col', 'items-center', 'hidden', 'justify-center', 'gap-2'],
                id: 'result-number',
                children: [
                    customizeElement(document.createElement('h2'), {
                        className: ['text-secondary'],
                        textContent: 'Your BMI is:',
                    }),
                    customizeElement(document.createElement('h2'), {
                        className: ['font-bold', 'text-primary'],
                        id: 'bmi-value',
                        textContent: '0.0'
                    })
                ]
            });

            this.elements.resultNumber = resultNumber;
            this.elements.bmiValue = resultNumber.querySelector('#bmi-value');
            return resultNumber;
        }

        #createBMIComponents() {
            const resultPath = createBmiResultPath();
            const resultIdeal = createBMIResultIdeal();
            const resultDesc = createBMIResultDesc();
            const defaultContent = createBMIDefault();

            this.elements.resultPath = resultPath;
            this.elements.idealWeightElement = resultIdeal.querySelector('#bmi-result-weight');
            this.elements.ageElement = resultIdeal.querySelector('#bmi-result-age');
            this.elements.categoryElement = resultDesc.querySelector('#bmi-result-desc-content');
            this.elements.descriptionElement = resultDesc.querySelector('#bmi-result-description');
            this.elements.recommendationListElement = resultDesc.querySelector('#recommendation-list');
            this.elements.defaultContent = defaultContent;

            return {
                resultPath,
                resultIdeal,
                resultDesc,
                defaultContent
            };
        }

        render() {
            const resultTitle = this.#createResultTitle();
            const resultNumber = this.#createResultNumber();
            const { resultPath, resultIdeal, resultDesc, defaultContent } = this.#createBMIComponents();

            const resultWrapper = customizeElement(document.createElement('div'), {
                className: ['bmi-result-wrapper', 'flex-col', 'items-center', 'justify-between', 'w-full', 'h-full', 'p-lg','bg-secondary', 'rounded-1'],
                dataset: { component: 'result-view' },
                children: [resultTitle,
                    resultNumber,
                    resultPath,
                    resultIdeal,
                    resultDesc,
                    defaultContent]
            });

            this.elements.wrapper = resultWrapper;
            this.isInitialized = true;
            return resultWrapper;
        }
    }

    const resultView = new ResultView(controller);

    if (controller && typeof controller.registerView === 'function') {
        controller.registerView('result', resultView);
    }

    return resultView.render();
}
