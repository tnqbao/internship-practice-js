export function createInformation() {
    const infoContainer = document.createElement('div');
    infoContainer.className = 'info-container';
    infoContainer.innerHTML = `
        <div>  </div>
    `;
    return infoContainer;
}
