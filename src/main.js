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
            console.log('BMI Application initialized successfully');

        } catch (error) {
            console.error('Failed to initialize BMI Application:', error);
            this._showInitializationError();
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
            headerElement.appendChild(createHeader());
        }

        if (footerElement) {
            footerElement.appendChild(createFooter());
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
            const resultView = createResultView();
            resultSection.appendChild(resultView);
            this.views.set('result', resultView);

            if (typeof resultView.bindController === 'function') {
                resultView.bindController(this.controller);
                this.controller.registerView('result', resultView);
            }
        }
    }

    _createInformationView() {
        const infoSection = document.getElementById('info-section');
        if (infoSection) {
            const infoView = createInformation();
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
        // Handle window resize, beforeunload etc.
        window.addEventListener('beforeunload', () => {
            this._cleanup();
        });
    }

    _cleanup() {
        // Cleanup resources when app is destroyed
        if (this.controller) {
            this.views.forEach((view, name) => {
                this.controller.unregisterView(name);
            });
        }
        this.views.clear();
    }

    _showInitializationError() {
        const body = document.body;
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div style="
                position: fixed; 
                top: 50%; 
                left: 50%; 
                transform: translate(-50%, -50%);
                background: #f8d7da;
                color: #721c24;
                padding: 20px;
                border-radius: 8px;
                border: 1px solid #f5c6cb;
                max-width: 400px;
                text-align: center;
                z-index: 9999;
            ">
                <h3>Application Error</h3>
                <p>Failed to initialize BMI Calculator. Please refresh the page and try again.</p>
                <button onclick="location.reload()" style="
                    background: #721c24;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 10px;
                ">Refresh Page</button>
            </div>
        `;
        body.appendChild(errorDiv);
    }

    // Public API
    getController() {
        return this.controller;
    }

    getView(name) {
        return this.views.get(name);
    }

    isReady() {
        return this.isInitialized && this.controller !== null;
    }
}

// Application initialization
const bmiApp = new BMIApplication();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    bmiApp.initialize();
});

// Export for potential external access
window.BMIApp = bmiApp;
