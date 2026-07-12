const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 animate-fade-in">
      <div className="bg-surface rounded-xl w-full max-w-md p-6 shadow-lg animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-text font-semibold text-lg">{title}</h3>
          <button
            onClick={onClose}
            className="text-text/60 hover:text-text transition-colors"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="text-text/90">{children}</div>

        {footer && <div className="flex justify-end gap-2 mt-6">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
