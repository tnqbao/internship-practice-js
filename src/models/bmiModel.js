class BmiModel {
    constructor(height, weight,age,type = 'metric') {
        this.height = height;
        this.weight = weight;
        this.age = age;
        this.type = type;
    }

    calculateBMI() {
        if (this.type === 'metric') {
            return this.weight / ((this.height / 100) ** 2);
        } else if (this.type === 'imperial') {
            return (this.weight / (this.height ** 2)) * 703;
        } else {
            throw new Error('Invalid type');
        }
    }

    getBMICategory() {
        const bmi = this.calculateBMI();
        if (bmi < 16) {
            return 'Severe thinness';
        } else if (bmi >= 16 && bmi < 17) {
            return 'Thinness';
        } else if (bmi >= 17 && bmi < 18.5) {
            return 'Underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
            return 'Normal';
        } else if (bmi >= 25 && bmi < 30) {
            return 'Pre-obesity';
        } else if (bmi >= 30 && bmi < 35) {
            return 'Class 1 obesity';
        } else if (bmi >= 35 && bmi < 40) {
            return 'Class 2 obesity';
        } else {
            return 'Class 3 obesity';
        }
    }

    getMinNormalWeight() {
        if (this.type === 'metric') {
            const heightInMeters = this.height / 100;
            return 18.5 * (heightInMeters ** 2);
        } else if (this.type === 'imperial') {
            return 18.5 * ((this.height ** 2) / 703);
        } else {
            throw new Error('Invalid type');
        }
    }

    getMaxNormalWeight() {
        if (this.type === 'metric') {
            const heightInMeters = this.height / 100;
            return 24.9 * (heightInMeters ** 2);
        } else if (this.type === 'imperial') {
            return 24.9 * ((this.height ** 2) / 703);
        } else {
            throw new Error('Invalid type');
        }
    }

    getIdealWeightRange() {
        return {
            min: this.getMinNormalWeight(),
            max: this.getMaxNormalWeight()
        };
    }

}

export default BmiModel;
