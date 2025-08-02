import { customizeElement } from "../utils/handleElement.js";
import { createBmiResultPath } from "./components/bmiResultPath.js";
import { createBMIResultIdeal } from "./components/bmiResultIdeal.js";
import { createBMIResultDesc } from "./components/bmiResultDesc.js";
import { createBMIDefault } from "./components/bmiDefaultContent.js";

export function createResultView(controller = null) {
    class ResultView {
        constructor(controller) {
            this.controller = controller;
            this.elements = {};
            this.isInitialized = false;
            this.currentResult = null;
        }

        bindModel(model) {
            this.model = model;
        }

        bindController(controller) {
            this.controller = controller;
        }

        onResultChange(resultData) {
            this.currentResult = resultData;
            this._updateResultDisplay(resultData);
        }

        onUnitChange(newUnit) {
            if (this.currentResult) {
                this._updateUnitDependentElements(newUnit);
            }
        }

        onDataChange(modelData) {
            if (!modelData.isValid || !modelData.bmi) {
                this._showDefaultContent();
            }
        }

        showResult(resultData) {
            this.currentResult = resultData;
            this._updateResultDisplay(resultData);
        }

        hideResult() {
            this._showDefaultContent();
            this.currentResult = null;
        }

        reset() {
            this._showDefaultContent();
            this._resetResultPath();
            this.currentResult = null;
        }

        _updateResultDisplay(data) {
            this._hideDefaultContent();
            this._showResultNumber();
            this._updateBMIValue(data);
            this._updateResultDetails(data);
            this._updateResultPath(data);
        }

        _updateBMIValue(data) {
            const bmiValueEl = this.elements.bmiValue;
            if (bmiValueEl) {
                bmiValueEl.textContent = data.bmi;
                bmiValueEl.style.color = data.color;
            }
        }

        _updateResultDetails(data) {
            // Update age
            const ageEl = this.elements.ageElement;
            if (ageEl) {
                ageEl.textContent = `${data.age} Years`;
            }

            // Update ideal weight range
            const idealWeightEl = this.elements.idealWeightElement;
            if (idealWeightEl) {
                idealWeightEl.textContent = `${data.idealRange.min} ${data.weightUnit} to ${data.idealRange.max} ${data.weightUnit}`;
            }

            // Update category
            const categoryEl = this.elements.categoryElement;
            if (categoryEl) {
                categoryEl.textContent = data.label;
                categoryEl.style.color = data.color;
            }
        }

        _updateResultPath(data) {
            const pathEl = this.elements.resultPath;
            if (!pathEl) return;

            // Reset all arrows
            const allArrows = pathEl.querySelectorAll('.bmi-arrow');
            allArrows.forEach(arrow => arrow.style.opacity = '0');

            // Highlight current range
            const currentRange = pathEl.querySelector(`[data-range="${data.id}"]`);
            if (currentRange) {
                const currentArrow = currentRange.querySelector('.bmi-arrow');
                if (currentArrow) {
                    currentArrow.style.opacity = '1';
                    currentRange.classList.add('active');
                }
            }
        }

        _resetResultPath() {
            const pathEl = this.elements.resultPath;
            if (!pathEl) return;

            const allArrows = pathEl.querySelectorAll('.bmi-arrow');
            allArrows.forEach(arrow => arrow.style.opacity = '0');

            const allRanges = pathEl.querySelectorAll('[data-range]');
            allRanges.forEach(range => range.classList.remove('active'));
        }

        _showDefaultContent() {
            if (this.elements.defaultContent) {
                this.elements.defaultContent.classList.remove('hidden');
            }
            if (this.elements.defaultTitle) {
                this.elements.defaultTitle.classList.remove('hidden');
            }
        }

        _hideDefaultContent() {
            if (this.elements.defaultContent) {
                this.elements.defaultContent.classList.add('hidden');
            }
            if (this.elements.defaultTitle) {
                this.elements.defaultTitle.classList.add('hidden');
            }
        }

        _showResultNumber() {
            if (this.elements.resultNumber) {
                this.elements.resultNumber.classList.remove('hidden');
            }
        }

        _hideResultNumber() {
            if (this.elements.resultNumber) {
                this.elements.resultNumber.classList.add('hidden');
            }
        }

        _updateUnitDependentElements(newUnit) {
            // Update any unit-dependent displays
            if (this.currentResult) {
                // Re-render ideal weight with new unit
                this._updateResultDetails({
                    ...this.currentResult,
                    weightUnit: newUnit === 'metric' ? 'kg' : 'lbs'
                });
            }
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
                    customizeElement(document.createElement('div'), {
                        className: ['text-6xl', 'font-bold', 'text-primary'],
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
                className: ['bmi-result-wrapper', 'flex', 'flex-col', 'items-center', 'justify-center', 'w-full', 'h-full', 'p-lg'],
                id: 'result-view',
                dataset: { component: 'result-view' },
                children: [
                    resultTitle,
                    resultNumber,
                    resultPath,
                    resultIdeal,
                    resultDesc,
                    defaultContent
                ]
            });

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
