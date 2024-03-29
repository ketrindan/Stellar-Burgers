import ForgotPasswordStyles from './ForgotPassword.module.css';
import { useState, useRef, FC, FormEvent } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from '../../services/hooks';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPassword } from '../../services/actions/user';

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function submitForm(e: FormEvent) {
    e.preventDefault();
    dispatch(forgotPassword(email));
    setEmail('');
    navigate('/reset-password')
  }

  return (
    <section className={ForgotPasswordStyles.container}>
      <form className={ForgotPasswordStyles.form} onSubmit={submitForm}>
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
        <Button htmlType="submit" type="primary" size="large" disabled={!email}>Восстановить</Button>
      </form>
      <span className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль? <Link to="/login" className={ForgotPasswordStyles.link}>Войти</Link>
      </span>
    </section>
  )
}

export default ForgotPassword;