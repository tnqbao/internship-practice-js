import { customizeElement } from "../utils/handleElement.js";
import { createBmiResultPath } from "./components/bmiResultPath.js";
import { createBMIResultIdeal } from "./components/bmiResultIdeal.js";
import { createBMIResultDesc } from "./components/bmiResultDesc.js";
import { createBMIDefault } from "./components/bmiDefaultContent.js";

export function createResultView(controller = null) {
    class ResultView {
        constructor() {
            this.elements = {};
        }

        bindModel(model) {
            this.model = model;
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
