export function wrapElement(element, wrapperTag = 'div', options = {}) {
    if (!element || !(element instanceof HTMLElement)) {
        throw new Error('First parameter must be a valid HTMLElement');
    }

    const wrapper = document.createElement(wrapperTag);

    if (options.id) wrapper.id = options.id;

    if (options.className) {
        wrapper.classList.add(
            ...(Array.isArray(options.className)
                ? options.className
                : options.className.trim().split(/\s+/))
        );
    }

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

    if (Array.isArray(options.children)) {
        options.children.forEach(child => {
            if (child instanceof HTMLElement) {
                wrapper.appendChild(child);
            }
        });
    }

    if (options.innerHTML) {
        wrapper.innerHTML = options.prepend
            ? options.innerHTML + wrapper.innerHTML
            : wrapper.innerHTML + options.innerHTML;
    }

    return wrapper;
}


export function customizeElement(element, options = {}) {
    if (!element || !(element instanceof HTMLElement)) {
        throw new Error('First parameter must be a valid HTMLElement');
    }

    const directProps = [
        'id', 'step', 'type', 'value', 'name', 'src', 'alt', 'title',
        'disabled', 'checked', 'required', 'multiple', 'min', 'max',
        'href', 'target', 'rel', 'placeholder','htmlFor','d', 'stroke', 'strokeWidth', 'fill', 'viewBox', 'width', 'height', 'xmlns','innerText', 'title'
    ];
    directProps.forEach(prop => {
        if (options[prop] !== undefined) element[prop] = options[prop];
    });

    if (options.className) {
        element.classList.add(
            ...(Array.isArray(options.className)
                ? options.className
                : options.className.trim().split(/\s+/))
        );
    }

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
        Object.entries(options.styles).forEach(([key, value]) => {
            element.style[key] = value;
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

    if (Array.isArray(options.children)) {
        options.children.forEach(child => {
            if (child instanceof HTMLElement) {
                element.appendChild(child);
            }
        });
    }

    return element;
}

