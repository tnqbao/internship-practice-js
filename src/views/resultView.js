import { customizeElement } from "../utils/handleElement.js";
import { createBmiResultPath } from "./components/bmiResultPath.js";
import { createBMIResultIdeal } from "./components/bmiResultIdeal.js";
import { createBMIResultDesc } from "./components/bmiResultDesc.js";
import { createBMIDefault } from "./components/bmiDefaultContent.js";

export function createResultView(controller = null) {
    class ResultView {
        constructor(controller) {
            this.elements = {};
        }

        bindModel(model) {
            this.model = model;
        }

        bindController(controller) {
            this.controller = controller;
        }


        _createResultTitle() {
            const resultTitle = customizeElement(document.createElement('h2'), {
                id: 'result-default-title',
                className: ['text-center', 'mb-4', 'font-bold', 'color-primary'],
                textContent: 'Your BMI Result',
            });

            this.elements.defaultTitle = resultTitle;
            return resultTitle;
        }

        _createResultNumber() {
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

        _createBMIComponents() {
            const resultPath = createBmiResultPath();
            const resultIdeal = createBMIResultIdeal();
            const resultDesc = createBMIResultDesc();
            const defaultContent = createBMIDefault();

            this.elements.resultPath = resultPath;
            this.elements.idealWeightElement = resultIdeal.querySelector('#bmi-result-weight');
            this.elements.ageElement = resultIdeal.querySelector('#bmi-result-age');
            this.elements.categoryElement = resultDesc.querySelector('#bmi-result-desc-content');
            this.elements.defaultContent = defaultContent;

            return {
                resultPath,
                resultIdeal,
                resultDesc,
                defaultContent
            };
        }

        render() {
            const resultTitle = this._createResultTitle();
            const resultNumber = this._createResultNumber();
            const { resultPath, resultIdeal, resultDesc, defaultContent } = this._createBMIComponents();

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