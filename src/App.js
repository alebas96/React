import React, { useState } from 'react';
//import logo from './logo.svg';
import classes from './App.module.css';
import Person from './Person/Person';
//import person from './Person/Person';
import styled from 'styled-components'
import Radium,  { StyleRoot } from 'radium'
//Error haldlare High Order Component
import GenericError from './Error/ErrorBoundyGeneric'

const App = (props) => {
  /*
    useState() is a react Hook function that lets you use states on React (> 16.8) funciton for components.
    components created with functions like this one did not have access to states with out extening 
    the class like the example at the bottom.

    retuns:
      current state

      function () to REPLACE the current state
      multiple states are supported since it repleces it

    use of descructuring:  const [currentState, setPersonState]

    styled-components: theory https://styled-components.com/
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
        `string text
        multiline as well ${} for placeholders, you can execute javascript code, variable and ternary expression for comparison`

        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates
  */
  const [currentState, setPersonState] = useState({
    person: [
      {id:'id1',name: "Max", age: 28},
      {id:'id2',name: "Manu", age: 28},
      {id:'id3',name: "Stephanie", age: 26}
    ]
  });
  
  const [readyState, setReadyState] = useState({
    ready : false
  });
  const [unsedState, setUnusedState] = useState({
    useless : true
  });
  

  /*
    create a new inline style for an element
      
      **mind this is JS not CSS
      both '' or camelCapital is supported for css properties
  */
  

  const styles = {
    color : 'red',
    fontSize: '30px',
    ':hover' :{ //  Radium detects styles with pseudo or media query selectors and converts it CSS
      color : 'salmon'
    },
     // Javascript Object with CSS property -> inline code!
    // this requires StyleRoot component with sytle property to wrapp the application, in the index.js file
    '@media (minWidth: 500px)': {
      fontSize : '20px'
    }

  }
  
  /*
    Event listener called Handled for naming convention

  */  
  const editNameHandler = (event,id) => {
    const personIndex = currentState.person.findIndex((p)=>p.id === id)
    const persons = [...currentState.person]

    persons[personIndex].name = event.target.value;
    setPersonState( { 
      person:persons
     });
  }
  const getPersonsHandler = () => {
    console.log("clicked");
    // Better clone the object first before, edit it and setting the state
    const showPeopleState = {...readyState};
    setReadyState({ready : !showPeopleState.ready});
  };

  const deletePersonHandler = (indexP) => {
    let persons = [...currentState.person]
    persons.splice(indexP,1)
    
    setPersonState( { 
      person:persons
     });
  }

  // Use lists and condition to render  the app  dynamicaly
  let persons = null;
  if(readyState.ready){
    persons = currentState.person.map((person, index) => {
      return (
      <GenericError key={person.id}>
      <Person 
        click={()=>deletePersonHandler(index)} 
        change={(event)=>editNameHandler(event, person.id)} 
        name={person.name} age={person.age} >
          My hobbies are: 
        </Person>
        </GenericError>
      )
    });
  }

  //  Styled-component approach
  const StyledButton = styled.button`
     background-color: ${readyState.ready?'red':'green'};
     padding: 16px;
     border : 1px solid blue; 
     fontSize : 18p;
     color : white;
  

     &:hover {
       background-color: ${readyState.ready?'salmon':'lightgreen'};
     }
   `
    
  return (
      /* classes.App from class modules 
          Classes are put in a JS object, where they can be referenced with classes['property'] as class name.

        Modules lets isolate style for componatens in a page with unique classs names, so that not all the components or the 
        tags will have the same unwanted style.
          
      */
      <div className={classes.App}>
        <header className={classes["App-header"]}>App for People</header>
        <h1> People Portal! </h1>
        <p style={styles}> with JSX </p>
         <StyledButton 
          onClick={getPersonsHandler}>Get People!</StyledButton> 
        {persons}
      </div> 
    );

}

export default App;





/*
class App extends Component {
  state = {
    person: [
      {name: "Max", age: 28},
      {name: "Manu", age: 28},
      {name: "Stephanie", age: 26}
    ]
  };

  changeNameHandler = () => {
    console.log("clicked")
    this.setState( { 
      person : [
        {name: "Alessandro", age: 28},
        {name: "Manu", age: 28},
        {name: "Stephanie", age: 26}
      ] 
     }
     )
  }

  render(){
    return (
      <div className="App">
        <h1> Hello, there! </h1>
        <p> with JSX </p>
        <button onClick={this.changeNameHandler}>Change Name!</button>
        <Person name={this.state.person[0].name}>My hobbis are</Person>
      </div> ); //only one root component and NO sibilings,a json  can be returned for multi root components
    }
  // when compiled the code is formed as follow
  //React.createElement('div',{className:"App"}, React.createElement('h1',null,'Hello, there!'));
}
*/
//export defaul Radium(App) -> High Order Component to wrap components JSX with styles