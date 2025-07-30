import {customizeElement} from "../../utils/handleElement.js";

export function createGenderToggle() {
    const maleButton = customizeElement(document.createElement('button'), {
        id: 'male-button',
        className: ['male-button', 'flex', 'flex-2', 'bg-secondary', 'justify-center', 'items-center', 'gap-2', 'border-0', 'p-sm', 'active'],
        innerHTML: `
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3287e4" stroke-width="0.8160000000000001">
            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
            <g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15 3C15 2.44772 15.4477 2 16 2H20C21.1046 2 22 2.89543 22 4V8C22 8.55229 21.5523 9 21 9C20.4477 9 20 8.55228 20 8V5.41288L15.4671 9.94579C15.4171 9.99582 15.363 10.0394 15.3061 10.0767C16.3674 11.4342 17 13.1432 17 15C17 19.4183 13.4183 23 9 23C4.58172 23 1 19.4183 1 15C1 10.5817 4.58172 7 9 7C10.8559 7 12.5642 7.63197 13.9214 8.69246C13.9587 8.63539 14.0024 8.58128 14.0525 8.53118L18.5836 4H16C15.4477 4 15 3.55228 15 3ZM9 20.9963C5.68831 20.9963 3.00365 18.3117 3.00365 15C3.00365 11.6883 5.68831 9.00365 9 9.00365C12.3117 9.00365 14.9963 11.6883 14.9963 15C14.9963 18.3117 12.3117 20.9963 9 20.9963Z" fill="#3287e4"/> </g>
        </svg>
        <span>Male</span>            
        `,
        events: {
            click: (event) => {
                event.preventDefault();
                document.getElementById('male-button').classList.add('active');
                document.getElementById('female-button').classList.remove('active');
            }
        }
    });

    const femaleButton = customizeElement(document.createElement('button'), {
        id: 'female-button',
        className: ['female-button', 'flex', 'flex-2', 'bg-secondary', 'justify-center', 'items-center', 'gap-2', 'border-0', 'p-sm', 'rounded'],
        innerHTML: `
        <svg width="24px" height="24px" viewBox="-3 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#f570e8" stroke="#f570e8">
            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
            <g id="SVGRepo_iconCarrier"> <title>female [#1363]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke-width="0.0002" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-103.000000, -2079.000000)" fill="#f149e0"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M54.010058,1930.97067 C52.6753909,1930.97067 51.421643,1930.45194 50.4775859,1929.51025 C47.3327267,1926.36895 49.5904718,1920.99511 54.010058,1920.99511 C58.4266471,1920.99511 60.6903863,1926.36595 57.5425301,1929.51025 C56.5984729,1930.45194 55.344725,1930.97067 54.010058,1930.97067 M58.9411333,1930.92079 C63.3617184,1926.50661 60.1768991,1919 54.007061,1919 C47.8512088,1919 44.6294265,1926.50661 49.0510106,1930.92079 C50.1609021,1932.02908 51.9840813,1932.67949 52.9830836,1932.88598 L52.9830836,1935.00978 L49.9860767,1935.00978 L49.9860767,1937.00489 L52.9830836,1937.00489 L52.9830836,1939 L54.9810882,1939 L54.9810882,1937.00489 L57.9780951,1937.00489 L57.9780951,1935.00978 L54.9810882,1935.00978 L54.9810882,1932.88598 C56.9790928,1932.67949 57.8302427,1932.02908 58.9411333,1930.92079" id="female-[#1363]"> </path> </g> </g> </g> </g>
        </svg>
        <span>Female</span>
    `,
        events: {
            click: (event) => {
                event.preventDefault();
                document.getElementById('female-button').classList.add('active');
                document.getElementById('male-button').classList.remove('active');
            }
        }
    });

    return customizeElement(document.createElement('div'), {
        className: ['gender-toggle', 'flex', 'w-full', 'flex-1', 'justify-center', 'items-center', 'gap-1', 'm-b-lg', 'p-sm', 'bg-tertiary', 'rounded-6'],
        id: 'gender-toggle',
        children: [maleButton, femaleButton],
    })
}

