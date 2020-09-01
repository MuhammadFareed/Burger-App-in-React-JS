import React from 'react';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from "./SideDrawer.module.css";
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
      let attachedClasses = [classes.SideDrawer, classes.Close];
      if(props.open) {
            attachedClasses = [classes.SideDrawer, classes.Open]
      }
      return (
            <Auxilliary>
                  <Backdrop show={props.open} clicked={props.closed}/>
                  <div className={attachedClasses.join(' ')}>                        
                        {/* <Logo height='11%'/> */}
                        <div className={classes.Logo}>
                              <Logo/>
                        </div>
                        <nav>
                              <NavigationItems/>
                        </nav>
                        
                  </div>
            </Auxilliary>
      );
}

export default SideDrawer;