import registerStyles from './Register.module.css';
import { useState, useRef, FC } from 'react';
import { Link  } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { register } from '../../services/actions/user';


const Register: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  function submitRegistration(e: any) {
    e.preventDefault();
    dispatch(register(name, email, password) as any);
  }

  return (
    <section className={registerStyles.container}>
      <form className={registerStyles.form} onSubmit={submitRegistration}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input 
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setName(e.target.value)}
          value={name}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
        />
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
        <Button htmlType="submit" type="primary" size="large" disabled={!name || !email || !password}>Зарегистрироваться</Button>
      </form>
      <span className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы? <Link to="/login" className={registerStyles.link}>Войти</Link>
      </span>
    </section>
  )
}

export default Register;
