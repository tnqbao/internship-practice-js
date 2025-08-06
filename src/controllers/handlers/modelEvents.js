export function handleModelChange(controller, model, property, newValue, oldValue) {
    switch (property) {
        case 'type':
            controller.toggleUnit?.(); // trigger unit toggle
            break;
        case 'height':
        case 'weight':
        case 'age':
            controller.views?.forEach(view => {
                if (typeof view.onDataChange === 'function') {
                    view.onDataChange(model.toJSON());
                }
            });
            break;
    }
}