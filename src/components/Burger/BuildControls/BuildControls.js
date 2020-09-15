import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
      { label: 'Cheese', type: 'cheese' },
      { label: 'Meat', type: 'meat' },
      { label: 'Mutton', type: 'mutton' },
      { label: 'Salad', type: 'salad' },
];

const BuildControls = (props) => (
      <div className={classes.BuildControls}>
            <h2>Current Price : {props.price}</h2>
            { controls.map( ctrl => (
                  <BuildControl 
                        key={ctrl.label} 
                        label={ctrl.label}
                        added={() => props.ingredientAdded(ctrl.type)}
                        removed={() => props.ingredientRemoved(ctrl.type)}
                        disabled={props.disabled[ctrl.type]}
                  />
            ))}
            <button
                  className={classes.OrderButton}
                  disabled={!props.purchaseable}
                  onClick={props.ordered}
            >ORDER NOW</button>
      </div>
);

export default BuildControls;
