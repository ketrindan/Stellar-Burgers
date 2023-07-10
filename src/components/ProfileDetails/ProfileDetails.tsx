import profileDetailsStyles from './ProfileDetails.module.css';
import { useState, useEffect, useRef, FC, FormEvent } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../../services/actions/user';

const ProfileDetails: FC = () => {
  const user = useSelector((state) => state.user.user);

  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const dispatch = useDispatch();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(updateUser(name, email, password));
    setIsNameChanged(false);
    setIsEmailChanged(false);
    setIsPasswordChanged(false);
  }

  function onCancelClick() {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword('');
      setIsNameChanged(false);
      setIsEmailChanged(false);
      setIsPasswordChanged(false);
    }
  }

  return (
    <form className={profileDetailsStyles.form} onSubmit={onSubmit}>
      <Input 
        type={'text'}
        placeholder={'Имя'}
        onChange={e => {
          const value = e.target.value; 
          setName(value); 
          value === (user && user.name) ? setIsNameChanged(false) : setIsNameChanged(true);
        }}
        value={name}
        name={'name'}
        error={false}
        ref={inputRef}
        errorText={'Ошибка'}
        icon={"EditIcon"}
      />
      <Input 
        type={'email'}
        placeholder={'Логин'}
        onChange={e => {
          const value = e.target.value; 
          setEmail(value); 
          value === (user && user.name) ? setIsEmailChanged(false) : setIsEmailChanged(true);
        }}
        value={email}
        name={'email'}
        error={false}
        ref={inputRef}
        errorText={'Ошибка'}
        icon={"EditIcon"}
      />
      <Input
        type={'password'}
        placeholder={'Пароль'} 
        onChange={e => {
          const value = e.target.value; 
          setPassword(value); 
          value === "" ? setIsPasswordChanged(false) : setIsPasswordChanged(true);
        }}
        value={password}
        name={'password'}
        error={false}
        ref={inputRef}
        errorText={'Ошибка'}
        icon={"EditIcon"}
      />
    {(isNameChanged || isEmailChanged ||isPasswordChanged) && 
    <div className={profileDetailsStyles.btns}>
      <Button htmlType="reset" type="primary" size="medium" onClick={onCancelClick}>Отменить</Button>
      <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
    </div>}
  </form>
  )
}

export default ProfileDetails;
