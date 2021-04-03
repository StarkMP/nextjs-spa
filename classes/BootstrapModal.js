import ReactDOM from 'react-dom';

export default class BootstrapModal {
    static context;
    static element;

    static init(element, params = {}) {
        BootstrapModal.element = element;
        BootstrapModal.context = new bootstrap.Modal(BootstrapModal.element, params);
    }

    static render(component) {
        if (!component) {
            throw new Error('Modal component is not defined');
        }

        ReactDOM.render(component, BootstrapModal.element.querySelector('.modal-content'));
    }

    static open(params = {}) {
        BootstrapModal.render(params.component);
        BootstrapModal.addClassName(params.className);
        BootstrapModal.show();
    }

    static show() {
        BootstrapModal.context.show();
    }

    static hide() {
        BootstrapModal.context.hide();
    }

    static addClassName(className) {
        if (!className) {
            return;
        }

        BootstrapModal.element.classList.add(className)
    } 
}