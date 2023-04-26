import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import mainStyles from './Main.module.css';

import {data} from '../../utils/data';

function Main() {
  return (
    <section className={mainStyles.main}>
      <BurgerIngredients data={data} />    
    </section>
  )
}

export default Main;