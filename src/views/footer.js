import {customizeElement} from "../utils/handleElement.js";
import {createLogo} from "./components/logo.js";

export function createFooter(controller = null) {
    class FooterView {
        constructor() {
            this.elements = {};
            this.isInitialized = false;
        }

        _createPhoneContact() {
            const phoneContact = customizeElement(document.createElement('div'), {
                className: ['phone-contact', 'flex', 'items-center', 'gap-2'],
                id: 'phone-contact',
                innerHTML: `
                <div class="phone-icon flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 13.922 13.922">
                        <path id="Контур_7" data-name="Контур 7" d="M2,2.87A.87.87,0,0,1,2.87,2H4.744a.87.87,0,0,1,.858.727l.644,3.859a.87.87,0,0,1-.47.922l-1.347.673a9.6,9.6,0,0,0,5.312,5.312l.673-1.347a.87.87,0,0,1,.921-.47l3.859.644a.87.87,0,0,1,.727.858v1.873a.87.87,0,0,1-.87.87h-1.74A11.311,11.311,0,0,1,2,4.61Z" transform="translate(-2 -2)" fill="#a4c8ff"/>
                    </svg>
                </div>
                <span class="phone-number text-xxl">1900 1717</span>
                `,
            });

            this.elements.phoneNumber = phoneContact.querySelector('.phone-number');
            return phoneContact;
        }

        _createReferencesInformation() {
            const phoneContact = this._createPhoneContact();

            const referencesInformation = customizeElement(document.createElement('div'), {
                className: ['references-information', 'flex', 'flex-col', 'gap-4'],
                id: 'references-information',
                children: [phoneContact]
            });

            this.elements.referencesInfo = referencesInformation;
            return referencesInformation;
        }

        _createFooterInfo() {
            const logo = createLogo();
            const referencesInformation = this._createReferencesInformation();

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
            const footerInfo = this._createFooterInfo();
            this.isInitialized = true;
            return footerInfo;
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
