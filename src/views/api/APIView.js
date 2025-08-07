import { AbstractView } from '../AbstractView.js';

export class APIView extends AbstractView {
    constructor(controller, endpoint) {
        super(controller);
        this.endpoint = endpoint;
        this.headers = {
            'Content-Type': 'application/json'
        };
    }

    render() {
        return null;
    }

    // Scale later xD
}
