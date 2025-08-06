import {customizeElement} from "../../utils/handleElement.js";
import { DOMView } from './DOMView.js';

export function createInformation(controller = null) {
    class InformationView extends DOMView {
        constructor(controller) {
            super(controller);
            this.elements = {};
            this.isInitialized = false;
        }

        updateFormFields(data) {
            void data;
        }

        displayBMIResult(result) {
            void result;
        }

        showResult(result) {
            void result;
        }

        onUnitChange(newUnit) {
            this.#updateFormulaDisplay(newUnit);
        }

        onDataChange(modelData) {
            this.#updateExamples(modelData);
        }

        #updateFormulaDisplay(newUnit) {
            if (this.elements.bmiFormula) {
                this.elements.bmiFormula.innerText = newUnit === 'metric'
                    ? 'BMI = weight (kg) / (height (m))²'
                    : 'BMI = (weight (lbs) / (height (in))²) × 703';
            }

            if (this.elements.bmiExampleFormula) {
                this.elements.bmiExampleFormula.innerText = newUnit === 'metric'
                    ? 'BMI = 55 / (1.75)² = 17.96'
                    : 'BMI = (121 / (69)²) × 703 = 17.87';
            }
        }

        #updateExamples(modelData) {
            if (modelData && modelData.height && modelData.weight) {
                this.#generateDynamicExample(modelData);
            }
        }

        #generateDynamicExample(modelData) {
            if (this.elements.dynamicExample && modelData.height && modelData.weight) {
                const unit = modelData.type;
                this.elements.dynamicExample.innerText = unit === 'metric'
                    ? `With your input: BMI = ${modelData.weight} / (${(modelData.height / 100).toFixed(2)})² = ${modelData.bmi?.toFixed(2) || 'calculating...'}`
                    : `With your input: BMI = (${modelData.weight} / (${modelData.height})²) × 703 = ${modelData.bmi?.toFixed(2) || 'calculating...'}`;
                this.elements.dynamicExample.classList.remove('hidden');
            }
        }

        #createBMIExplanationWrapper() {
            const bmiExplanationWrapper = customizeElement(document.createElement('div'), {
                className: ['bmi-info', 'text-base', 'text-primary', 'leading-relaxed', 'flex', 'flex-col', 'gap-4'],
            });

            this.elements.bmiExplanationWrapper = bmiExplanationWrapper;
            return bmiExplanationWrapper;
        }

        #createBMITitle() {
            const bmiTitle = customizeElement(document.createElement('h2'), {
                className: ['text-xl', 'font-bold'],
                innerText: 'What is BMI?',
            });

            this.elements.bmiTitle = bmiTitle;
            return bmiTitle;
        }

        #createBMIIntro() {
            const bmiIntro = customizeElement(document.createElement('p'), {
                innerText: `Body Mass Index (BMI) is a simple measurement used to evaluate an individual's weight status by comparing their weight to their height. This tool is widely used by healthcare professionals to provide a general overview of whether an individual is underweight, overweight, or obese, helping to guide dietary and exercise recommendations.`,
            });

            this.elements.bmiIntro = bmiIntro;
            return bmiIntro;
        }

        #createBMIHealthRisk() {
            const bmiHealthRisk = customizeElement(document.createElement('p'), {
                innerText: `A BMI outside the healthy weight range may increase the risk of certain health conditions. For instance, individuals with a BMI in the obese category are at higher risk for type 2 diabetes, cardiovascular diseases, cancer, and other health issues.`,
            });

            this.elements.bmiHealthRisk = bmiHealthRisk;
            return bmiHealthRisk;
        }

        #createBMILimitations() {
            const bmiLimitations = customizeElement(document.createElement('p'), {
                innerText: `However, BMI has limitations, as it does not directly measure body fat mass. It may not be accurate for people with a higher muscle mass, such as athletes, or older adults with muscle loss. It is important to consider BMI alongside other factors such as medical tests, physical exams, and lifestyle habits.`,
            });

            this.elements.bmiLimitations = bmiLimitations;
            return bmiLimitations;
        }

        #createBMICalcTitle() {
            const bmiCalcTitle = customizeElement(document.createElement('h2'), {
                className: ['text-xl', 'font-bold', 'pt-4'],
                innerText: 'How to calculate BMI?',
            });

            this.elements.bmiCalcTitle = bmiCalcTitle;
            return bmiCalcTitle;
        }

        #createBMIFormulaText() {
            const bmiFormulaText = customizeElement(document.createElement('p'), {
                innerText: 'The BMI formula is as follows:',
            });

            this.elements.bmiFormulaText = bmiFormulaText;
            return bmiFormulaText;
        }

        #createBMIFormula() {
            const bmiFormula = customizeElement(document.createElement('i'), {
                className: ['text-center'],
                innerText: 'BMI = weight (kg) / (height (m))²',
            });

            this.elements.bmiFormula = bmiFormula;
            return bmiFormula;
        }

        #createBMIExampleIntro() {
            const bmiExampleIntro = customizeElement(document.createElement('p'), {
                innerText: 'For example, if an individual weighs 55 kg and is 1.75 meters tall, the BMI would be:',
            });

            this.elements.bmiExampleIntro = bmiExampleIntro;
            return bmiExampleIntro;
        }

        #createBMIExampleFormula() {
            const bmiExampleFormula = customizeElement(document.createElement('i'), {
                className: ['text-center'],
                innerText: 'BMI = 55 / (1.75)² = 17.96',
            });

            this.elements.bmiExampleFormula = bmiExampleFormula;
            return bmiExampleFormula;
        }

        #createWHRIntro() {
            const whrIntro = customizeElement(document.createElement('p'), {
                innerText: `BMI helps determine if a person is underweight, overweight, or obese, but it does not provide information on where body fat is distributed. To assess fat distribution, the Waist-Hip Ratio (WHR) can be used. The WHR compares the circumference of the waist to the circumference of the hips and is used to evaluate fat distribution across the body. This ratio can help better assess health risks based on whether fat is concentrated around the abdomen or hips.`,
            });

            this.elements.whrIntro = whrIntro;
            return whrIntro;
        }

        #createWHRExample() {
            const whrExample = customizeElement(document.createElement('p'), {
                innerText: `For example, someone with a normal BMI but a high WHR may be at increased risk for heart disease or diabetes due to abdominal fat accumulation. The formula for WHR is:`,
            });

            this.elements.whrExample = whrExample;
            return whrExample;
        }

        #createWHRFormula() {
            const whrFormula = customizeElement(document.createElement('p'), {
                className: ['italic', 'text-center'],
                innerText: 'WHR = waist circumference (cm) / hip circumference (cm)',
            });

            this.elements.whrFormula = whrFormula;
            return whrFormula;
        }

        #createBMIConclusionTitle() {
            const bmiConclusionTitle = customizeElement(document.createElement('h2'), {
                className: ['text-xl', 'font-bold', 'pt-4'],
                innerText: 'Conclusion',
            });

            this.elements.bmiConclusionTitle = bmiConclusionTitle;
            return bmiConclusionTitle;
        }

        #createBMIConclusionText() {
            const bmiConclusionText = customizeElement(document.createElement('p'), {
                innerText: `BMI is a simple yet effective tool for evaluating weight status and overall health. However, it should not be the sole measure of health. To achieve a healthy body and avoid health risks, BMI should be considered alongside other testing methods, a balanced diet, and regular exercise.`,
            });

            this.elements.bmiConclusionText = bmiConclusionText;
            return bmiConclusionText;
        }

        render() {
            const bmiExplanationWrapper = this.#createBMIExplanationWrapper();
            const bmiTitle = this.#createBMITitle();
            const bmiIntro = this.#createBMIIntro();
            const bmiHealthRisk = this.#createBMIHealthRisk();
            const bmiLimitations = this.#createBMILimitations();
            const bmiCalcTitle = this.#createBMICalcTitle();
            const bmiFormulaText = this.#createBMIFormulaText();
            const bmiFormula = this.#createBMIFormula();
            const bmiExampleIntro = this.#createBMIExampleIntro();
            const bmiExampleFormula = this.#createBMIExampleFormula();
            const whrIntro = this.#createWHRIntro();
            const whrExample = this.#createWHRExample();
            const whrFormula = this.#createWHRFormula();
            const bmiConclusionTitle = this.#createBMIConclusionTitle();
            const bmiConclusionText = this.#createBMIConclusionText();

            const informationWrapper = customizeElement(document.createElement('div'), {
                className: ['information-view', 'flex', 'flex-col', 'flex-wrap', 'items-center', 'justify-start', 'w-full', 'rounded-xl', 'p-lg', 'gap-4'],
                id: 'information-view',
                dataset: { component: 'information-view' },
                children: [
                    bmiTitle,
                    bmiIntro,
                    bmiHealthRisk,
                    bmiLimitations,
                    bmiCalcTitle,
                    bmiFormulaText,
                    bmiFormula,
                    bmiExampleIntro,
                    bmiExampleFormula,
                    whrIntro,
                    whrExample,
                    whrFormula,
                    bmiConclusionTitle,
                    bmiConclusionText,
                    bmiExplanationWrapper
                ]
            });

            this.elements.wrapper = informationWrapper;
            this.isInitialized = true;
            return informationWrapper;
        }

        isInitialized() {
            return this.isInitialized;
        }
    }

    const informationView = new InformationView(controller);

    if (controller && typeof controller.registerView === 'function') {
        controller.registerView('information', informationView);
    }

    return informationView.render();
}
