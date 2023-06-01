import ResetPasswordStyles from './ResetPassword.module.css';
import { useState, useRef} from 'react';
import { Link } from "react-router-dom";
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const inputRef = useRef(null);

  return (
    <section className={ResetPasswordStyles.container}>
      <form className={ResetPasswordStyles.form}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <PasswordInput 
          placeholder={'Введите новый пароль'}
          onChange={e => setPassword(e.target.value)}
          value={password}
          name={'password'}
        />
        <Input 
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={e => setCode(e.target.value)}
          value={code}
          name={'code'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
        />
        <Button htmlType="button" type="primary" size="large">Сохранить</Button>
      </form>
      <span className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль? <Link to="/login" className={ResetPasswordStyles.link}>Войти</Link>
      </span>
    </section>
  )
}

export default ResetPassword;