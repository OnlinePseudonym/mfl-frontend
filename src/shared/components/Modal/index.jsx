import React, { useEffect } from 'react';

const Modal = ({ children, isOpen }) => {
  useEffect(() => {
    const { M } = window;
    M.Modal.init(document.querySelectorAll('.modal'), { dismissible: false });

    if (isOpen === true) {
      const modal = M.Modal.getInstance(document.querySelector('.modal'));
      if (modal) modal.open();
    }
  }, [isOpen]);

  return (
    <div className="container">
      <div className="modal card">
        <div className="card-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
