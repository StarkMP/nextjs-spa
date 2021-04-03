import ReactDOM from 'react-dom';

import Modal from 'components/Modal';

export default class BootstrapModal {
    static parent;
    static context;
    static element;

    static init(parent) {
        BootstrapModal.parent = parent;
    }

    static render(component = null, callback) {
        if (!BootstrapModal.parent) {
            throw new Error('Parent element is not defined!');
        }

        ReactDOM.render(component, BootstrapModal.parent, callback);
    }

    static open(params = {}) {
        if (!BootstrapModal.parent) {
            throw new Error('Parent element is not defined!');
        }

        BootstrapModal.render(<Modal id='modal'>{params.component || null}</Modal>, () => {
            BootstrapModal.element = BootstrapModal.parent.querySelector('#modal');
            BootstrapModal.context = new bootstrap.Modal(BootstrapModal.element);

            BootstrapModal.addClassName(params.className);

            BootstrapModal.element.addEventListener('hidden.bs.modal', BootstrapModal.destroy);
            BootstrapModal.context.show();
        });
    }

    static destroy() {
        BootstrapModal.element.removeEventListener('hidden.bs.modal', BootstrapModal.destroy);
        BootstrapModal.render(null);
        BootstrapModal.context = null;
        BootstrapModal.element = null;
    }

    static addClassName(className) {
        if (!className) {
            return;
        }

        BootstrapModal.element.classList.add(className);
    }
}