import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import api from '../../utils/api';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {    
    api.getData()
    .then((data) => {
      setIngredients(data.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      {ingredients.length > 0 && <Main data={ingredients}/>}
    </div>
  );
}

export default App;
