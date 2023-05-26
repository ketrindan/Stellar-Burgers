import loaderStyles from './Loader.module.css';

function Loader() {
  return (
    <div className={loaderStyles.loader_container}>
      <div className={loaderStyles.loader}></div>
    </div>
  )
}

export default Loader;