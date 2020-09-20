import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

class EditExercise extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }
  // Here we use componentdidmount method
  componentDidMount(){

    axios.get('http://localhost:5000/exercise/'+this.props.match.params.id)
    .then(response => {
      this.setState({
        username: response.data.username,
        description: response.data.description,
        duration: response.data.duration,
        date: new Date(response.data.date)
      })   
    })
    .catch(function (error) {
      console.log(error);
    })

    axios.get('http://localhost:5000/user/')
      .then(res => {

        if(res.data.length > 0){
          this.setState({
            users: res.data.map( user => user.username)
          })
        }

      })
      
  }

  onChangeUsername = (e)=> {
    this.setState({
      username: e.target.value
    });
  }
  onChangeDescription = (e)=> {
    this.setState({
      description: e.target.value
    });
  }
  onChangeDuration = (e)=> {
    this.setState({
      duration: e.target.value
    });
  }
  onChangeDate = (date)=> {
    this.setState({
      date: date
    });
  }

  onSubmit = (e)=> {

    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }
    console.log(exercise);
    axios.post('http://localhost:5000/exercise/update/'+ this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/'; 

  }

  render() {
    return (
      <div>
        <h3>Edit Exercise</h3>
        <form onSubmit={this.onSubmit}>

          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {
                this.state.users.map((user)=> {
                  return (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  );
                })
              }
            </select>
          </div>

          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>

          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>

        </form>
      </div>
    );

  }
}

export default EditExercise;
