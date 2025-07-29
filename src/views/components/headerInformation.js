import {customizeElement, wrapElement} from "../../utils/handleElement.js";

export function createHeaderInformation() {
    const author = document.createElement('p');
    author.textContent = 'Author: Tran Nguyen Quoc Bao';

    const headerInfo = customizeElement( document.createElement('div'),{
        className: ['header-information', 'w-full', 'flex', 'flex-1'],
        id: 'header-information',
        children: [author]
    });

    return wrapElement(headerInfo, 'div', {
        className: ['header-information-wrapper', 'flex', 'w-full']
    })
}
