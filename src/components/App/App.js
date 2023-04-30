import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Main />
    </div>
  );
}

export default App;
