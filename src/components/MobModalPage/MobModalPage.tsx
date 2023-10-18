import { useEffect, FC } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import mobModalPageStyles from './MobModalPage.module.css';
import { IMobModalPage } from '../../utils/types';

const MobModalPage: FC<IMobModalPage> = ({ title, onClose, children, orderNumber, isHeaderNav }) => {
  useEffect(() => {
    function closeByEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
   
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [onClose])
  
  return (
    <>
      <div id="modal" className={`${mobModalPageStyles.modal} pl-4 pr-4`}>
        <div className={mobModalPageStyles.header_box}>
          {title && <h2 className={`${mobModalPageStyles.title} text text_type_main-large`}>{title}</h2>}
          {orderNumber && <p className={`${mobModalPageStyles.title} text text_type_digits-default`}>{`#${orderNumber}`}</p>}
          {!isHeaderNav && <button className={mobModalPageStyles.button}><CloseIcon type="primary" onClick={onClose}/></button>}
        </div>
        {children}
      </div>
    </>
  )
}

export default MobModalPage;