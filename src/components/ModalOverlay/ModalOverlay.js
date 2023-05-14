import PropTypes from "prop-types";
import modalOverlayStyles from './ModalOverlay.module.css';

function ModalOverlay (props) {
  return (
    <div className={modalOverlayStyles.overlay} onClick={props.onClose}> </div>
  );
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};