import React from 'react'
// Style CSS Module 
import classes from './Person.module.css'

// CSS components with JavaScript
import styled from 'styled-components'
import Radium,  { StyleRoot } from 'radium'


// we need to import React
const person = (props) => { //props is best practice to use custom property of a component <Person age="" name="">
    
    return ( // children contains  <Person age="" name=""> the text or html</Person> inside a component
        <div  className={classes.Person}>
            <p onClick={props.click}>I am {props.name}, I am {props.age}</p>
            <p>{props.children}</p> 
            <input type="text" defautvalue={props.name} onChange={props.change}/>
        </div> 
    );
}

//export the component funciton which will return THE JSX
export default Radium(person);