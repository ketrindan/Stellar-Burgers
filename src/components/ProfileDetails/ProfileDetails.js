import profileDetailsStyles from './ProfileDetails.module.css';
import { useState, useRef} from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function ProfileDetails() {
  const [isChanged, setIsChanged] = useState(false)
  const [name, setName] = useState('Имя');
  const [email, setEmail] = useState('qwerty@mail.ru');
  const [password, setPassword] = useState('12345');
  const inputRef = useRef(null);

  return (
    <form className={profileDetailsStyles.form}>
      <Input 
        type={'text'}
        placeholder={'Имя'}
        onChange={e => {setName(e.target.value); setIsChanged(true)}}
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
        onChange={e => {setEmail(e.target.value); setIsChanged(true)}}
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
        onChange={e => {setPassword(e.target.value); setIsChanged(true)}}
        value={password}
        name={'password'}
        error={false}
        ref={inputRef}
        errorText={'Ошибка'}
        icon={"EditIcon"}
      />
    {isChanged && 
    <div className={profileDetailsStyles.btns}>
      <Button htmlType="reset" type="primary" size="medium">Отменить</Button>
      <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
    </div>}
  </form>
  )
}

export default ProfileDetails;
