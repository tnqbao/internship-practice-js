import { createHeader } from './views/header.js';
import { createFooter } from './views/footer.js';
import { createFormView } from './views/formView.js';
import { createResultView } from './views/resultView.js';
import { createInformation } from './views/information.js';
import { BmiController } from './controllers/bmiController.js';

class BMIApplication {
    constructor() {
        this.controller = null;
        this.views = new Map();
        this.isInitialized = false;
    }

    async initialize() {
        try {
            this._initializeController();
            this._initializeViews();
            this._setupLayout();
            this._bindEvents();

            this.isInitialized = true;

        } catch (error) {
            console.error('Failed to initialize BMI Application:', error);
        }
    }

    _initializeController() {
        this.controller = new BmiController();

        this.controller.onError = (error) => {
            console.error('Controller error:', error);
        };
    }

    _initializeViews() {
        this._createLayoutViews();
        this._createApplicationViews();
    }

    _createLayoutViews() {
        const headerElement = document.getElementById('header');
        const footerElement = document.getElementById('footer');

        if (headerElement) {
            const headerView = createHeader(this.controller);
            headerElement.appendChild(headerView);
            this.views.set('header', headerView);
        }

        if (footerElement) {
            const footerView = createFooter(this.controller);
            footerElement.appendChild(footerView);
            this.views.set('footer', footerView);
        }
    }

    _createApplicationViews() {
        this._createFormView();
        this._createResultView();
        this._createInformationView();
    }

    _createFormView() {
        const formSection = document.getElementById('form-section');
        if (formSection) {
            const formView = createFormView(this.controller);
            formSection.appendChild(formView);
            this.views.set('form', formView);
        }
    }

    _createResultView() {
        const resultSection = document.getElementById('result-section');
        if (resultSection) {
            const resultView = createResultView(this.controller);
            resultSection.appendChild(resultView);
            this.views.set('result', resultView);
        }
    }

    _createInformationView() {
        const infoSection = document.getElementById('info-section');
        if (infoSection) {
            const infoView = createInformation(this.controller);
            infoSection.appendChild(infoView);
            this.views.set('information', infoView);
        }
    }

    _setupLayout() {
        this._setupBMIContent();
        this._setupMainContent();
    }

    _setupBMIContent() {
        const bmiContent = document.getElementById('bmi-content');
        if (bmiContent) {
            bmiContent.classList.add('flex', 'flex-col', 'items-center', 'justify-center');
        }
    }

    _setupMainContent() {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.classList.add('flex', 'items-start', 'justify-center', 'flex-wrap', 'container', 'm-t-lg', 'gap-4');
        }
    }

    _bindEvents() {
        this._bindKeyboardEvents();
        this._bindWindowEvents();
    }

    _bindKeyboardEvents() {
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey || event.metaKey) {
                switch (event.key) {
                    case 'Enter':
                        event.preventDefault();
                        this.controller.calculateBMI();
                        break;
                    case 'u':
                        event.preventDefault();
                        this.controller.toggleUnit();
                        break;
                }
            }
        });
    }

    _bindWindowEvents() {
        window.addEventListener('beforeunload', () => {
            this._cleanup();
        });
    }

    _cleanup() {
        if (this.controller) {
            this.views.forEach((view, name) => {
                this.controller.unregisterView(name);
            });
        }
        this.views.clear();
    }
}

const bmiApp = new BMIApplication();

document.addEventListener('DOMContentLoaded', () => {
    bmiApp.initialize();
});

window.BMIApp = bmiApp;
