import { AbstractView } from '../AbstractView.js';

export class ConsoleView extends AbstractView {
    constructor(controller) {
        super(controller);
        this.prefix = '[BMI Calculator]';
    }

    render() {
        console.log(`${this.prefix} Console View initialized`);
        this.showWelcome();
        return null;
    }

    // Scale later xD
}
