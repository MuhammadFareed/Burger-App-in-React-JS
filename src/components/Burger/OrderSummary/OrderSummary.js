import React from 'react';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
      // componentWillUpdate = () => {
      //       console.log('[OderSummary] will update');
      // }
      
      const ingredientSummary = Object.keys(props.ingredients)
            .map(igKey => {
                  return <li key={igKey}>
                              <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
                        </li>
                  }
            );

      return (
            <Auxilliary>
                  <h3>Your Order</h3>
                  <p>A delicious burger with the following ingredients :</p>
                  <ul>
                        { ingredientSummary }
                  </ul>
                  <p><strong>Total Price : {props.price} Rupees</strong></p>
                  <p>Continue to Checkout ?</p>
                  <Button buttonType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
                  <Button buttonType="Success" clicked={props.purchaseContinued}>Continue</Button>


            </Auxilliary>
      );
}

export default OrderSummary;
