import { useEffect, FC } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import modalStyles from './Modal.module.css';
import { IModal } from '../../utils/types';

const modalRoot = document.getElementById("react-modals") as HTMLElement;

const Modal: FC<IModal> = ({ title, onClose, children, orderNumber, isHeaderNav }) => {
  function toggleBurgerBtnClass() {
    return isHeaderNav ? `${modalStyles.modal_menu} pl-4 pr-4` : `${modalStyles.modal} p-10`;
  }

  useEffect(() => {
    function closeByEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
   
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [onClose])
  
  return createPortal(
    (
      <>
        <div id="modal" className={toggleBurgerBtnClass()}>
          <div className={modalStyles.header_box}>
            {title && <h2 className={`${modalStyles.title} text text_type_main-large`}>{title}</h2>}
            {orderNumber && <p className={`${modalStyles.title} text text_type_digits-default`}>{`#${orderNumber}`}</p>}
            {!isHeaderNav && <button className={modalStyles.button}><CloseIcon type="primary" onClick={onClose}/></button>}
          </div>
          {children}
        </div>
        <ModalOverlay onClose={onClose}/>
      </>
    ),
    modalRoot
  )
}

export default Modal;