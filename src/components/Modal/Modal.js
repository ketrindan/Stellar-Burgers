import { useEffect} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from "prop-types";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import modalStyles from './Modal.module.css';

const modalRoot = document.getElementById("react-modals");

function Modal(props) {
  useEffect(() => {
    if (!props.isOpen) return;

    function closeByEscape(e) {
      if (e.key === 'Escape') {
        props.onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
   
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [props])
  
  return createPortal(
    (
      <>
        <div className={`${modalStyles.modal} p-10`}>
          <div className={modalStyles.header_box}>
            {props.title && <h2 className={`${modalStyles.title} text text_type_main-large`}>{props.title}</h2>}
            <CloseIcon type="primary"  onClick={props.onClose}/>
          </div>
          {props.children}
        </div>
        <ModalOverlay isOpen={props.isOpen} onClose={props.onClose}/>
      </>
    ),
    modalRoot
  )
}

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
};