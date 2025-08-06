export class AbstractView {
    constructor(controller) {
        if (new.target === AbstractView) {
            throw new Error('AbstractView is an abstract class and cannot be instantiated directly');
        }
        this.controller = controller;
        this.model = null;
    }

    // Abstract methods - must be implemented by subclasses
    render() {
        throw new Error('render() method must be implemented by subclass');
    }

    updateDisplay(data) {
        console.log(data);
        throw new Error('updateDisplay() method must be implemented by subclass');
    }

    showValidationError(field, message) {
        void {field, message}; // Prevent unused variable warning
        throw new Error('showValidationError() method must be implemented by subclass');
    }

    showResult(result) {
        void result
        throw new Error('showResult() method must be implemented by subclass');
    }

    // Common interface methods
    bindModel(model) {
        this.model = model;
    }

    onModelChange(property, newValue, oldValue) {
        this.updateDisplay(this.model);
        void {property,newValue,oldValue}; // Prevent unused variable warning
    }

    onDataChange(modelData) {
        this.updateDisplay(modelData);
    }

    onValidationError(field, message) {
        this.showValidationError(field, message);
    }

    // Template method pattern
    initialize() {
        this.setupView();
        return this.render();
    }

    setupView() {
        // Default setup - can be overridden
    }

    destroy() {
        this.controller = null;
        this.model = null;
    }
}
