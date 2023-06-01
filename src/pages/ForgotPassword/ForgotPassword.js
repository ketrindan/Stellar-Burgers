import ForgotPasswordStyles from './ForgotPassword.module.css';
import { useState, useRef} from 'react';
import { Link } from "react-router-dom";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const inputRef = useRef(null);

  return (
    <section className={ForgotPasswordStyles.container}>
      <form className={ForgotPasswordStyles.form}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <Input 
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={e => setEmail(e.target.value)}
          value={email}
          name={'email'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
        />
        <Button htmlType="button" type="primary" size="large">Войти</Button>
      </form>
      <span className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль? <Link to="/login" className={ForgotPasswordStyles.link}>Войти</Link>
      </span>
    </section>
  )
}

export default ForgotPassword;