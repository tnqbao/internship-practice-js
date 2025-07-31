import { customizeElement } from "../utils/handleElement";

export function createInformation() {
    const bmiExplanationWrapper = customizeElement(document.createElement('div'), {
        className: ['bmi-info', 'text-base', 'text-primary', 'leading-relaxed', 'flex', 'flex-col', 'gap-4'],
    });

    const bmiTitle = customizeElement(document.createElement('h2'), {
        className: ['text-xl', 'font-bold'],
        innerText: 'What is BMI?',
    });

    const bmiIntro = customizeElement(document.createElement('p'), {
        innerText: `Body Mass Index (BMI) is a simple measurement used to evaluate an individual's weight status by comparing their weight to their height. This tool is widely used by healthcare professionals to provide a general overview of whether an individual is underweight, overweight, or obese, helping to guide dietary and exercise recommendations.`,
    });

    const bmiHealthRisk = customizeElement(document.createElement('p'), {
        innerText: `A BMI outside the healthy weight range may increase the risk of certain health conditions. For instance, individuals with a BMI in the obese category are at higher risk for type 2 diabetes, cardiovascular diseases, cancer, and other health issues.`,
    });

    const bmiLimitations = customizeElement(document.createElement('p'), {
        innerText: `However, BMI has limitations, as it does not directly measure body fat mass. It may not be accurate for people with a higher muscle mass, such as athletes, or older adults with muscle loss. It is important to consider BMI alongside other factors such as medical tests, physical exams, and lifestyle habits.`,
    });

    const bmiCalcTitle = customizeElement(document.createElement('h2'), {
        className: ['text-xl', 'font-bold', 'pt-4'],
        innerText: 'How to calculate BMI?',
    });

    const bmiFormulaText = customizeElement(document.createElement('p'), {
        innerText: 'The BMI formula is as follows:',
    });

    const bmiFormula = customizeElement(document.createElement('i'), {
        className: ['text-center'],
        innerText: 'BMI = weight (kg) / (height (m))²',
    });

    const bmiExampleIntro = customizeElement(document.createElement('p'), {
        innerText: 'For example, if an individual weighs 55 kg and is 1.75 meters tall, the BMI would be:',
    });

    const bmiExampleFormula = customizeElement(document.createElement('i'), {
        className: ['text-center'],
        innerText: 'BMI = 55 / (1.75)² = 17.96',
    });

    const whrIntro = customizeElement(document.createElement('p'), {
        innerText: `BMI helps determine if a person is underweight, overweight, or obese, but it does not provide information on where body fat is distributed. To assess fat distribution, the Waist-Hip Ratio (WHR) can be used. The WHR compares the circumference of the waist to the circumference of the hips and is used to evaluate fat distribution across the body. This ratio can help better assess health risks based on whether fat is concentrated around the abdomen or hips.`,
    });

    const whrExample = customizeElement(document.createElement('p'), {
        innerText: `For example, someone with a normal BMI but a high WHR may be at increased risk for heart disease or diabetes due to abdominal fat accumulation. The formula for WHR is:`,
    });

    const whrFormula = customizeElement(document.createElement('p'), {
        className: ['italic', 'text-center'],
        innerText: 'WHR = waist circumference (cm) / hip circumference (cm)',
    });

    const bmiConclusionTitle = customizeElement(document.createElement('h2'), {
        className: ['text-xl', 'font-bold', 'pt-4'],
        innerText: 'Conclusion',
    });

    const bmiConclusionText = customizeElement(document.createElement('p'), {
        innerText: `BMI is a simple yet effective tool for evaluating weight status and overall health. However, it should not be the sole measure of health. To achieve a healthy body and avoid health risks, BMI should be considered alongside other testing methods, a balanced diet, and regular exercise.`,
    });

    return customizeElement(document.createElement('div'), {
        className: ['information-view', 'flex', 'flex-col', 'flex-wrap', 'items-center', 'justify-start', 'w-full', 'rounded-xl', 'p-lg', 'gap-4'],
        id: 'information-view',
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
}
