import {customizeElement, wrapElement} from "../../../utils/handleElement.js";

export function createHeaderInformation() {
    const author = customizeElement(document.createElement('p'), {
        className: ['author', 'text-sm', 'font-bold', 'color-secondary'],
        id: 'author',
        textContent: 'Author: Tran Nguyen Quoc Bao',
        dataset: {
            component: 'author'
        }
    })

    const email = customizeElement(document.createElement('a'), {
        className: ['email', 'text-sm'],
        id: 'email',
        innerHTML: `
        <img src="https://cdn.gauas.online/images/internship/email-icon.svg" alt="Email Icon" width="30px" height="30px">
        `,
        href: 'mailto:qquocbao.job106204@gmail.com',
        dataset: {
            component: 'email'
        },
        target: '_blank',
        rel: 'noopener noreferrer',
        ariaLabel: 'Email to Tran Nguyen Quoc Bao',
        events: {
            mouseenter: (e) => e.target.style.transform = 'scale(1.1)',
            mouseleave: (e) => e.target.style.transform = 'scale(1)'
        },
    });

    const phone_number = customizeElement(document.createElement('a'), {
        className: ['phone-number', 'text-sm'],
        id: 'phone-number',
        innerHTML: `
        <img src="https://cdn.gauas.online/images/internship/phone-call-icon.svg" alt="Phone Icon" width="30px" height="30px">
        `,
        href: 'tel:+84367641617',
        dataset: {
            component: 'phone-number'
        },
        target: '_blank',
        rel: 'noopener noreferrer',
        ariaLabel: 'Call Tran Nguyen Quoc Bao',
        events: {
            mouseenter: (e) => e.target.style.transform = 'scale(1.1)',
            mouseleave: (e) => e.target.style.transform = 'scale(1)'
        },
    });

    const linkedIn = customizeElement(document.createElement('a'), {
        className: ['linked-in', 'text-sm'],
        id: 'linked-in',
        innerHTML: `
        <img src="https://cdn.gauas.online/images/internship/linkedin-icon.svg" alt="LinkedIn Icon" width="30px" height="30px">
        `,
        href: 'https://www.linkedin.com/in/tnqb2004/',
        target: '_blank',
        rel: 'noopener noreferrer',
        ariaLabel: 'LinkedIn profile of Tran Nguyen Quoc Bao',
        dataset: {
            component: 'linked-in'
        }
    });

    const referencesInformation = customizeElement(document.createElement('div'), {
        className: ['references-information', 'flex', 'flex-col', 'gap-4'],
        id: 'references-information',
        children: [email, phone_number, linkedIn]
    });

    const headerInfo = customizeElement(document.createElement('div'), {
        className: ['header-information', 'flex', 'w-full', 'flex-1', 'justify-between', 'items-center', 'container'],
        id: 'header-information',
        children: [author, referencesInformation]
    });

    return wrapElement(headerInfo, 'div', {
        className: ['header-information-wrapper', 'flex', 'w-full', 'justify-between', 'items-center', 'flex-1', 'p-sm'],
    })
}
