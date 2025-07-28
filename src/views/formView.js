export function createFormView() {
    const formContainer = document.createElement('div');
    formContainer.className = 'form-container';
    formContainer.innerHTML = `
        <div> Keep </div>
    `;
    return formContainer;
}