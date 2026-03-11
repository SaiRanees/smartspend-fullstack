import './Modal.css';

const Modal = ({ title, onClose, children, footer }) => (
  <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal__header">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" onClick={onClose} aria-label="Close modal">✕</button>
      </div>
      <div className="modal__body">{children}</div>
      {footer && <div className="modal__footer">{footer}</div>}
    </div>
  </div>
);

export default Modal;
