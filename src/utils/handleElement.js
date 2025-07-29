export function wrapElement(element, wrapperTag = 'div', options = {}) {
    if (!element || !(element instanceof HTMLElement)) {
        throw new Error('First parameter must be a valid HTMLElement');
    }

    const wrapper = document.createElement(wrapperTag);

    if (options.className) {
        if (Array.isArray(options.className)) {
            wrapper.classList.add(...options.className);
        } else if (typeof options.className === 'string') {
            wrapper.classList.add(...options.className.trim().split(/\s+/));
        }
    }

    if (options.id) wrapper.id = options.id;

    if (options.attributes && typeof options.attributes === 'object') {
        Object.entries(options.attributes).forEach(([key, value]) => {
            wrapper.setAttribute(key, value);
        });
    }

    if (options.dataset && typeof options.dataset === 'object') {
        Object.entries(options.dataset).forEach(([key, value]) => {
            wrapper.dataset[key] = value;
        });
    }

    if (options.styles && typeof options.styles === 'object') {
        Object.entries(options.styles).forEach(([property, value]) => {
            wrapper.style[property] = value;
        });
    }

    if (options.events && typeof options.events === 'object') {
        Object.entries(options.events).forEach(([eventType, handler]) => {
            if (typeof handler === 'function') {
                wrapper.addEventListener(eventType, handler);
            }
        });
    }

    if (options.textContent) wrapper.textContent = options.textContent;

    const parent = element.parentNode;
    if (parent) parent.insertBefore(wrapper, element);

    if (options.prepend) {
        wrapper.insertBefore(element, wrapper.firstChild);
    } else {
        wrapper.appendChild(element);
    }

    if (options.children && Array.isArray(options.children)) {
        options.children.forEach(child => {
            if (child instanceof HTMLElement) {
                wrapper.appendChild(child);
            }
        });
    }

    if (options.innerHTML) {
        if (options.prepend) {
            wrapper.innerHTML = options.innerHTML + wrapper.innerHTML;
        } else {
            wrapper.innerHTML += options.innerHTML;
        }
    }

    return wrapper;
}

export function customizeElement(element, options = {}) {
    if (!element || !(element instanceof HTMLElement)) {
        throw new Error('First parameter must be a valid HTMLElement');
    }

    if (options.className) {
        if (Array.isArray(options.className)) {
            element.classList.add(...options.className);
        } else if (typeof options.className === 'string') {
            element.classList.add(...options.className.trim().split(/\s+/));
        }
    }

    if (options.id) element.id = options.id;

    if (options.attributes && typeof options.attributes === 'object') {
        Object.entries(options.attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }

    if (options.dataset && typeof options.dataset === 'object') {
        Object.entries(options.dataset).forEach(([key, value]) => {
            element.dataset[key] = value;
        });
    }

    if (options.styles && typeof options.styles === 'object') {
        Object.entries(options.styles).forEach(([property, value]) => {
            element.style[property] = value;
        });
    }

    if (options.events && typeof options.events === 'object') {
        Object.entries(options.events).forEach(([eventType, handler]) => {
            if (typeof handler === 'function') {
                element.addEventListener(eventType, handler);
            }
        });
    }

    if (options.textContent) element.textContent = options.textContent;

    if (options.innerHTML) element.innerHTML = options.innerHTML;

    if (options.children && Array.isArray(options.children)) {
        options.children.forEach(child => {
            if (child instanceof HTMLElement) {
                element.appendChild(child);
            }
        });
    }

    return element;
}
