import PropTypes from "prop-types";
import modalOverlayStyles from './ModalOverlay.module.css';

function ModalOverlay (props) {
  return (
    <div className={`${modalOverlayStyles.overlay} ${props.isOpen ? `${modalOverlayStyles.overlay_opened}` : ""}`}  onClick={props.onClose}> </div>
  );
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  isOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};