import { customizeElement } from "../utils/handleElement.js";

export function createInformation(controller = null) {
    class InformationView {
        constructor() {
            this.elements = {};
            this.isInitialized = false;
        }

        _createBMIExplanation() {
            const bmiTitle = customizeElement(document.createElement('h2'), {
                className: ['text-xl', 'font-bold'],
                textContent: 'What is BMI?',
            });

            const bmiIntro = customizeElement(document.createElement('p'), {
                textContent: `Body Mass Index (BMI) is a simple measurement used to evaluate an individual's weight status by comparing their weight to their height. This tool is widely used by healthcare professionals to provide a general overview of whether an individual is underweight, overweight, or obese, helping to guide dietary and exercise recommendations.`,
            });

            const bmiHealthRisk = customizeElement(document.createElement('p'), {
                textContent: `A BMI outside the healthy weight range may increase the risk of certain health conditions. For instance, individuals with a BMI in the obese category are at higher risk for type 2 diabetes, cardiovascular diseases, cancer, and other health issues.`,
            });

            const bmiLimitations = customizeElement(document.createElement('p'), {
                textContent: `However, BMI has limitations, as it does not directly measure body fat mass. It may not be accurate for people with a higher muscle mass, such as athletes, or older adults with muscle loss. It is important to consider BMI alongside other factors such as medical tests, physical exams, and lifestyle habits.`,
            });

            this.elements.bmiTitle = bmiTitle;
            this.elements.bmiIntro = bmiIntro;
            this.elements.bmiHealthRisk = bmiHealthRisk;
            this.elements.bmiLimitations = bmiLimitations;

            return [bmiTitle, bmiIntro, bmiHealthRisk, bmiLimitations];
        }

        _createBMICalculation() {
            const bmiCalcTitle = customizeElement(document.createElement('h2'), {
                className: ['text-xl', 'font-bold', 'pt-4'],
                textContent: 'How to calculate BMI?',
            });

            const bmiFormulaText = customizeElement(document.createElement('p'), {
                textContent: 'The BMI formula is as follows:',
            });

            const bmiFormula = customizeElement(document.createElement('i'), {
                className: ['text-center', 'block', 'my-2', 'font-semibold'],
                textContent: 'BMI = weight (kg) / (height (m))²',
            });

            const bmiExampleIntro = customizeElement(document.createElement('p'), {
                textContent: 'For example, if an individual weighs 55 kg and is 1.75 meters tall, the BMI would be:',
            });

            const bmiExampleFormula = customizeElement(document.createElement('i'), {
                className: ['text-center', 'block', 'my-2', 'font-semibold'],
                textContent: 'BMI = 55 / (1.75)² = 17.96',
            });

            const dynamicExample = customizeElement(document.createElement('div'), {
                className: ['dynamic-example', 'hidden', 'bg-blue-50', 'p-3', 'rounded', 'mt-2'],
                id: 'dynamic-bmi-example'
            });

            this.elements.bmiCalcTitle = bmiCalcTitle;
            this.elements.bmiFormula = bmiFormula;
            this.elements.bmiExample = bmiExampleFormula;
            this.elements.dynamicExample = dynamicExample;

            return [bmiCalcTitle, bmiFormulaText, bmiFormula, bmiExampleIntro, bmiExampleFormula, dynamicExample];
        }

        _createWHRInformation() {
            const whrIntro = customizeElement(document.createElement('p'), {
                textContent: `BMI helps determine if a person is underweight, overweight, or obese, but it does not provide information on where body fat is distributed. To assess fat distribution, the Waist-Hip Ratio (WHR) can be used. The WHR compares the circumference of the waist to the circumference of the hips and is used to evaluate fat distribution across the body. This ratio can help better assess health risks based on whether fat is concentrated around the abdomen or hips.`,
            });

            this.elements.whrIntro = whrIntro;
            return whrIntro;
        }

        render() {
            const explanationElements = this._createBMIExplanation();
            const calculationElements = this._createBMICalculation();
            const whrElement = this._createWHRInformation();

            const bmiExplanationWrapper = customizeElement(document.createElement('div'), {
                className: ['bmi-info', 'text-base', 'text-primary', 'leading-relaxed', 'flex', 'flex-col', 'gap-4'],
                id: 'information-view',
                dataset: { component: 'information-view' },
                children: [
                    ...explanationElements,
                    ...calculationElements,
                    whrElement
                ]
            });

            this.elements.wrapper = bmiExplanationWrapper;
            this.isInitialized = true;
            return bmiExplanationWrapper;
        }

        isInitialized() {
            return this.isInitialized;
        }
    }

    const informationView = new InformationView();

    if (controller && typeof controller.registerView === 'function') {
        controller.registerView('information', informationView);
    }

    return informationView.render();
}
