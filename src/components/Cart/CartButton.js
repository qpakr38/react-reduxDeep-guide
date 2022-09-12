import classes from './CartButton.module.css';
import {useDispatch} from "react-redux";
import {uiAction} from "../../store/ui-slice";

const CartButton = (props) => {
    const dispatch =useDispatch();
    const toggleCartHandler=()=>{
        dispatch(uiAction.toggle());
    };
  return (
    <button onClick={toggleCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
