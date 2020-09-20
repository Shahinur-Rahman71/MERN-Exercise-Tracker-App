import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/navbar.components';
import ExercisesList from './components/exercise-list.components';
import EditExercise from './components/edit-exercise.components';
import CreateExercise from './components/create-exercise.components';
import CreateUser from './components/create-user.components';

class App extends Component {

  render() {
    return (

      <Router>
        <div className='container'>
          <Navbar />
          <br />
          <Route path="/" exact component={ExercisesList} />
          <Route path="/edit/:id" component={EditExercise} />
          <Route path="/create" component={CreateExercise} />
          <Route path="/user" component={CreateUser} />
        </div>
      </Router>

    );
  }
}

export default App;
