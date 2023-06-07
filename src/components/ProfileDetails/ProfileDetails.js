import profileDetailsStyles from './ProfileDetails.module.css';
import { useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie';

function ProfileDetails() {
  const user = useSelector((state) => state.user.user);
  const accessToken = getCookie('token');

  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(updateUser(name, email, password, accessToken));
    setIsNameChanged(false);
    setIsEmailChanged(false);
    setIsPasswordChanged(false);
  }

  function onCancelClick(e) {
    e.preventDefault();
    setName(user.name);
    setEmail(user.email);
    setPassword('');
    setIsNameChanged(false);
    setIsEmailChanged(false);
    setIsPasswordChanged(false);
  }

  return (
    <form className={profileDetailsStyles.form} onSubmit={onSubmit}>
      <Input 
        type={'text'}
        placeholder={'Имя'}
        onChange={e => {
          const value = e.target.value; 
          setName(value); 
          value === user.name ? setIsNameChanged(false) : setIsNameChanged(true);
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
          value === user.email ? setIsEmailChanged(false) : setIsEmailChanged(true);
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
