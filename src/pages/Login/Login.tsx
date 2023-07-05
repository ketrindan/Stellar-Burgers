import LoginStyles from './Login.module.css';
import { useState, useRef, FC, FormEvent } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from '../../services/hooks';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { login } from '../../services/actions/user';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  function submitLogin(e: FormEvent) {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <section className={LoginStyles.container}>
      <form className={LoginStyles.form} onSubmit={submitLogin}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <Input 
          type={'email'}
          placeholder={'E-mail'}
          onChange={e => setEmail(e.target.value)}
          value={email}
          name={'email'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
        />
        <PasswordInput 
          onChange={e => setPassword(e.target.value)}
          value={password}
          name={'password'}
        />
        <Button htmlType="submit" type="primary" size="large" disabled={!email || !password}>Войти</Button>
      </form>
      <span className="text text_type_main-default text_color_inactive mt-20">
        Вы - новый пользователь? <Link to="/register" className={LoginStyles.link}>Зарегистрироваться</Link>
      </span>
      <span className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль? <Link to="/forgot-password" className={LoginStyles.link}>Восстановить пароль</Link>
      </span>
    </section>
  )
}

export default Login;