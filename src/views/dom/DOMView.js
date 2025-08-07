import { AbstractView } from '../AbstractView.js';

export class DOMView extends AbstractView {
    constructor(controller) {
        super(controller);
        this.elements = {};
    }

    updateDisplay(data) {
        if (data) {
            this.updateFormFields(data);
        }
    }

    showValidationError(field, message) {
        console.warn(`DOM View - ${field}: ${message}`);
        this.highlightErrorField(field);
    }

    showResult(result) {
        this.displayBMIResult(result);
    }

    // DOM-specific helper methods
    createElement(tag, options = {}) {
        const element = document.createElement(tag);

        if (options.className) {
            element.className = Array.isArray(options.className)
                ? options.className.join(' ')
                : options.className;
        }

        if (options.textContent) element.textContent = options.textContent;
        if (options.innerHTML) element.innerHTML = options.innerHTML;
        if (options.id) element.id = options.id;

        return element;
    }

    updateFieldValidation(fieldName, isValid) {
        const input = this.elements[`${fieldName}Input`];
        if (input) {
            input.classList.toggle('valid', isValid);
            input.classList.toggle('invalid', !isValid);
        }
    }

    highlightErrorField(field) {
        const input = this.elements[`${field}Input`];
        if (input) {
            input.classList.add('error');
            setTimeout(() => input.classList.remove('error'), 3000);
        }
    }

    updateFormFields(data) {
        void data;
    }

    displayBMIResult(result) {
        void result;
    }

    destroy() {
        super.destroy();
        this.elements = {};
    }
}
