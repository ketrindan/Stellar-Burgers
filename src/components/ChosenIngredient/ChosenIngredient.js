import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import { useRef, useCallback } from 'react';
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

  const handleChangeOrder = useCallback((dragI, hoverI) => {
    const draggingIng = chosenIngredients[dragI]
    const mixedIngredients = [...chosenIngredients];
    
    mixedIngredients.splice(dragI, 1);
    mixedIngredients.splice(hoverI, 0, draggingIng);

    dispatch(changeOrder(mixedIngredients));
  }, [chosenIngredients, dispatch])

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { id, index },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const opacity = isDrag ? 0 : 1;

  const [{ handlerId }, dropTarget] = useDrop({
    accept: "ingredient",
    collect(monitor) {
      return {
          handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
      const dragI = item.index;
      const hoverI = index;

      if (!ref.current) {
        return;
      }

      if (dragI === hoverI) {
        return;
      } 

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragI < hoverI && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragI > hoverI && hoverClientY > hoverMiddleY) {
        return;
      }

      handleChangeOrder(dragI, hoverI)
      
      item.index = hoverI;
    },
  });

  dragRef(dropTarget(ref))

  return(
    <div className={ChosenIngredientStyles.item} ref={ref} style={{ opacity }} data-handler-id={handlerId} draggable>
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