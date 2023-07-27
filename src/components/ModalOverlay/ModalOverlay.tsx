import { FC } from 'react';
import modalOverlayStyles from './ModalOverlay.module.css';
import { IModalOverlay } from "../../utils/types";

const ModalOverlay: FC<IModalOverlay> = ({onClose}) => {
  return (
    <div className={modalOverlayStyles.overlay} onClick={onClose} data-cy="modal-overlay"> </div>
  );
};

export default ModalOverlay;