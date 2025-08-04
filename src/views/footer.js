import {customizeElement, wrapElement} from "../utils/handleElement.js";
import {createLogo} from "./components/logo.js";

export function createFooter(controller = null) {
    class FooterView {
        constructor() {
            this.elements = {};
            this.isInitialized = false;
        }

        #createPhoneContact() {
            const phoneContact = customizeElement(document.createElement('div'), {
                className: ['phone-contact', 'flex', 'items-center', 'gap-2'],
                id: 'phone-contact',
                innerHTML: `
                <div class="phone-icon flex items-center justify-center">
                    <img src="https://cdn.gauas.online/internship/phone.svg" alt="phone-button"/>
                </div>
                <span class="phone-number text-xxl">1900 1717</span>
                `,
            });

            this.elements.phoneNumber = phoneContact.querySelector('.phone-number');
            return phoneContact;
        }

        #createReferencesInformation() {
            const phoneContact = this.#createPhoneContact();

            const referencesInformation = customizeElement(document.createElement('div'), {
                className: ['references-information', 'flex', 'flex-col', 'gap-4'],
                id: 'references-information',
                children: [phoneContact]
            });

            this.elements.referencesInfo = referencesInformation;
            return referencesInformation;
        }

        #createFooterInfo() {
            const logo = createLogo();
            const referencesInformation = this.#createReferencesInformation();

            const footerInfo = customizeElement(document.createElement('div'), {
                className: ['footer-information', 'flex', 'container', 'w-full', 'flex-1', 'justify-between', 'items-center'],
                id: 'footer-information',
                children: [logo, referencesInformation]
            });

            this.elements.logo = logo;
            this.elements.footerInfo = footerInfo;
            return footerInfo;
        }

        render() {
            const footerInfo = this.#createFooterInfo();
            const footerWrapper = wrapElement(footerInfo, 'div', {
                className: ['footer-information-wrapper', 'flex', 'flex-col', 'items-center', 'justify-center', 'w-full', 'p-md'],
                id: 'footer',
                children: [footerInfo]
            });
            this.isInitialized = true;
            return footerWrapper;
        }

        isInitialized() {
            return this.isInitialized;
        }
    }

    const footerView = new FooterView();

    if (controller && typeof controller.registerView === 'function') {
        controller.registerView('footer', footerView);
    }

    return footerView.render();
}
