import React, { Component } from 'react';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
      salad: 10,
      cheese: 5,
      meat: 20,
      mutton: 40
}

class BurgerBuilder extends Component {
      // constructor(props) {
      //       super(props);
      //       this.state = {...}
      // }
      state = {
            ingredients: {
                  salad: 0,
                  cheese: 0,
                  meat: 0,
                  mutton: 0
            },
            totalPrice: 0,
            purchaseable: false,
            purchasing: false
      }
      addIngredientHandler = (type) => {
            const oldCount = this.state.ingredients[type];
            const updatedCount = oldCount + 1;
            const updatedIngredients = {
                  ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            
            const priceAddition = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice + priceAddition;

            this.setState({
                  ingredients: updatedIngredients,
                  totalPrice: newPrice
            })
            this.updatePurchaseableState(updatedIngredients);
      }
      removeIngredientHandler = (type) => {
            const oldCount = this.state.ingredients[type];
            if (oldCount <= 0 ) {
                  return null;
            } else {
                  const updatedCount = oldCount - 1;
                  const updatedIngredients = {
                        ...this.state.ingredients
                  };
                  updatedIngredients[type] = updatedCount;
                  
                  const priceDeduction = INGREDIENT_PRICES[type];
                  const oldPrice = this.state.totalPrice;
                  const newPrice = oldPrice - priceDeduction;

                  this.setState({
                        ingredients: updatedIngredients,
                        totalPrice: newPrice
                  })
                  this.updatePurchaseableState(updatedIngredients);
            }
            
      }
      updatePurchaseableState = (ingredients) => {
            const sum = Object.keys(ingredients)
                  .map((igKey) => {
                        return ingredients[igKey]
                  }).reduce((sum, el) => {
                        return sum + el;
                  }, 0);
                  this.setState({ purchaseable: (sum > 0) });
      }
      purchaseHandler = () => {
            this.setState({
                  purchasing: true
            })
      }
      purchaseCancelHandler = () => {
            this.setState({
                  purchasing: false
            })
      }
      purchaseContinueHandler = () => {
            alert('You continue!');
      }
      render() {
            const disabledInfo = {
                  ...this.state.ingredients
            }
            for(let key in disabledInfo) {
                  disabledInfo[key] = ( disabledInfo[key] <= 0)
            }
            return (
                  <Auxilliary>
                        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                              <OrderSummary  
                                    ingredients={this.state.ingredients}
                                    purchaseCancelled={this.purchaseCancelHandler}
                                    purchaseContinued={this.purchaseContinueHandler}
                                    price={this.state.totalPrice}
                              />
                        </Modal>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls
                              purchaseable={this.state.purchaseable}
                              price={this.state.totalPrice}
                              ingredientAdded={this.addIngredientHandler}      
                              ingredientRemoved={this.removeIngredientHandler}      
                              disabled={disabledInfo}
                              ordered={this.purchaseHandler}
                        />

                  </Auxilliary>
            );
      }
}

export default BurgerBuilder;