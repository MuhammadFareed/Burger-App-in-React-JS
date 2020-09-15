import React, { Component } from 'react';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
      salad: 10,
      cheese: 5,
      meat: 20,
      mutton: 40
}

class BurgerBuilder extends Component {
      state = {
            ingredients: null,
            //       {
            //       salad: 0,
            //       cheese: 0,
            //       meat: 0,
            //       mutton: 0
            // },
            totalPrice: 75,
            purchaseable: false,
            purchasing: false,
            loading: false,
            error: false
      }
      componentDidMount= () => {
            axios.get('https://myburger-react-app-1aa2d.firebaseio.com/orders/ingredients.json')
            .then(res => {
                  this.setState({
                        ingredients: res.data
                  });
            })
            .catch( error => {
                  this.setState({
                        error: true
                  });
            });
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
            this.setState({
                  loading: true
            })
            const order = {
                  ingredients: this.state.ingredients,
                  price: this.state.totalPrice + ' Rupees',
                  customer: {
                        name: 'Muhammad Fareed Alam',
                        address: {
                              street: 'Test street 1',
                              zipCode: '75800',
                              country: 'Pakistan'
                        },
                        email: 'test@test.com' 
                  },
                  deliveryMethod: 'fastest'            
            } 
            axios.post('/orders.json', order)
                  .then(response => {
                              // console.log(response);
                              this.setState({
                                    loading: false,
                                    purchasing: false
                              })
                              if(response) {
                                    alert('Received your order. We will deliver it to you soon.');
                              }           
                  })
                  .catch(error => {
                        // console.log(error);
                              this.setState({
                                    loading: false,
                                    purchasing: false
                              });
                        
                  });
            // Redirecting to dashboard...
            // this.props.history.push('/');
      }
      render() {
            const disabledInfo = {
                  ...this.state.ingredients
            }
            for(let key in disabledInfo) {
                  disabledInfo[key] = ( disabledInfo[key] <= 0)
            }
            let orderSummary = null;
            let burger = this.state.error ? <h1>Ingredients cann't be loaded!!!</h1> : <Spinner/>
            if(this.state.ingredients) {
                  burger = (
                        <Auxilliary>
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
                  orderSummary = <OrderSummary  
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}
                  />
            }
            if(this.state.loading) {
                  orderSummary = <Spinner/>
            }
            return (
                  <Auxilliary>
                        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                              {orderSummary}
                        </Modal>
                        {burger}
                  </Auxilliary>
            );
      }
}

export default WithErrorHandler(BurgerBuilder); 