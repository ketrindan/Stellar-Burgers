import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import { useRef } from 'react';
import PropTypes from "prop-types";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/prop-types';
import { deleteIngredient, changeOrder } from '../../services/actions/ingredients';
import ChosenIngredientStyles from './ChosenIngredient.module.css'

function ChosenIngredient(props) {
  const { id } = props.data;
  const index = props.index;
  const ref = useRef(null);
  const chosenIngredients = useSelector(state => state.ingredients.chosenIngredients);

  const dispatch = useDispatch();

  function handleDelete(item) {
    dispatch(deleteIngredient(item));
  }

  function handleChangeOrder(dragI, hoverI) {
    const draggingIng = chosenIngredients[dragI]
    const mixedIngredients = [...chosenIngredients];
    
    mixedIngredients.splice(dragI, 1);
    mixedIngredients.splice(hoverI, 0, draggingIng);

    dispatch(changeOrder(mixedIngredients));
  }

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { id, index },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      const dragI = item.index;
      const hoverI = index;

      if (dragI === hoverI) {
        return
      } else {
        handleChangeOrder(dragI, hoverI);
      }
    },
  });

  dragRef(dropTarget(ref))

  return(
    !isDrag && 
    <div className={ChosenIngredientStyles.item} ref={ref} draggable>
      <DragIcon type="primary" />
      <ConstructorElement
        text={props.data.name}
        price={props.data.price}
        thumbnail={props.data.image}
        handleClose={() => handleDelete(props.data)} 
      />
    </div> 
  )
}

export default ChosenIngredient;

ChosenIngredient.propTypes = {
  data: PropTypes.shape(ingredientPropTypes).isRequired,
};