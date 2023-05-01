import { useEffect} from 'react';
import modalOverlayStyles from './ModalOverlay.module.css';

function ModalOverlay (props) {
  useEffect(() => {
    if (!props.isOpen) return;

    function closeByEscape(e) {
      if (e.key === 'Escape') {
        props.onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
   
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [props.isOpen, props.onClose])

  function handleClick(e) {
    if (e.target === e.currentTarget) {
      {props.onClose()}
    }
  }

  return (
    <div className={modalOverlayStyles.overlay} onClick={handleClick}>
      
    </div>
  );
};

export default ModalOverlay;