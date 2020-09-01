import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
      const transformedIngredients = Object.keys(props.ingredients)
            .map(igKey => {
                  return [...Array(props.ingredients[igKey])].map((_,index) => {
                        return <BurgerIngredient key={igKey + index} type={igKey} />
                  }) 
            }).reduce((arr, el) => {
                  return arr.concat(el)
            }, []);
      // console.log(transformedIngredients);
      return (
            <div className={classes.Burger}>
                  <BurgerIngredient type="bread-top"/>
                  { transformedIngredients.length === 0 ? <p> Start adding ingredients!!! </p> : transformedIngredients }
                  <BurgerIngredient type="bread-bottom"/>
            </div>
      );
}

export default Burger;
