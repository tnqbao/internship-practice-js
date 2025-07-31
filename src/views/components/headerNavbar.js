import { customizeElement, wrapElement } from "../../utils/handleElement.js";

export function createHeaderNavbar(logo, repositoryButton) {
    const headerNavbar = customizeElement(document.createElement('div'), {
        className: ['header-navbar', 'flex', 'container','justify-between', 'items-center', 'gap-4', 'w-full', 'flex-1', 'container', 'p-sm'],
        id: 'header-navbar',
        dataset: {
            component: 'header-navbar'
        },
        children: [logo, repositoryButton]
    });

    return wrapElement(headerNavbar, 'div', {
        className: ['header-navbar-wrapper', 'flex','w-full', 'flex-1','bg-secondary'],
    });
}
