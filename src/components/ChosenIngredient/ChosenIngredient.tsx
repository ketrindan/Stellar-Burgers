import { useDispatch, useSelector } from 'react-redux';
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { useRef, useCallback, FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredient, changeOrder } from '../../services/actions/ingredients';
import ChosenIngredientStyles from './ChosenIngredient.module.css';
import { IChosenIngredientProps, IIngredient } from '../../utils/types';

const ChosenIngredient: FC<IChosenIngredientProps> = ({ data, index}) => {
  const { id } = data;

  const ref = useRef<HTMLDivElement>(null);
  const chosenIngredients = useSelector((state: any) => state.ingredients.chosenIngredients);

  const dispatch = useDispatch();

  function handleDelete(item: IIngredient) {
    dispatch(deleteIngredient(item));
  }

  const handleChangeOrder = useCallback((dragI: number, hoverI: number) => {
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

  const [{ handlerId }, dropTarget] = useDrop<{id: string | undefined; index: number}, unknown, {handlerId: any}>({
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
      const clientOffset = monitor.getClientOffset() as XYCoord;
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
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={() => handleDelete(data)} 
      />
    </div> 
  )
}

export default ChosenIngredient;