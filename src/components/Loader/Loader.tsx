import { FC } from 'react';
import loaderStyles from './Loader.module.css';

const Loader: FC = () => {
  return (
    <div className={loaderStyles.loader_container}>
      <div className={loaderStyles.loader}></div>
    </div>
  )
}

export default Loader;