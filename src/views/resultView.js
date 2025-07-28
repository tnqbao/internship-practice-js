export function createResultView() {
    const resultContainer = document.createElement('div');
    resultContainer.className = 'result-container';
    resultContainer.id = 'result-container';
    resultContainer.innerHTML = `
        <div> Keep </div>
    `;
    return resultContainer;
}