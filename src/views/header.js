export function createHeader() {
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
        <div> Keep</div>
    `;
    return header;
}
