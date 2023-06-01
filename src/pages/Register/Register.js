import registerStyles from './Register.module.css';
import { useState, useRef} from 'react';
import { Link } from "react-router-dom";
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputRef = useRef(null);

  return (
    <section className={registerStyles.container}>
      <form className={registerStyles.form}>
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
        <Button htmlType="button" type="primary" size="large">Зарегистрироваться</Button>
      </form>
      <span className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы? <Link to="/login" className={registerStyles.link}>Войти</Link>
      </span>
    </section>
  )
}

export default Register;
