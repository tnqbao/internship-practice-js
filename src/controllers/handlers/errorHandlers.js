export function handleValidationError(views, field, message) {
    console.warn(`Validation error for ${field}: ${message}`);
    views.forEach((view) => {
        if (typeof view.onValidationError === 'function') {
            view.onValidationError(field, message);
        }
    });
}

export function handleError(context, error) {
    console.error(`${context}:`, error);
    alert(`${context}. Please try again.`);
}

export function showValidationMessage(message) {
    alert(message);
}
