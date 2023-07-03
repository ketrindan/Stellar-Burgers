import { FC } from 'react';
import NotFoundStyles from './NotFound.module.css';

const NotFound: FC = () => {

  return (
    <section className={NotFoundStyles.container}>
      <div className={NotFoundStyles.box}>
        <p className="text text_type_digits-large">404</p>
        <p className="text text_type_main-medium">Страница не найдена &#58;&#40;</p>
      </div>
    </section>
  )
}

export default NotFound;