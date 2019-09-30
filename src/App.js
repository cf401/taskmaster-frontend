import React, {useState, useEffect} from 'react';

import './App.css';

let form = new FormData();

  //api for backend beanstalk
  const API = 'http://taskmaster-dev.us-west-2.elasticbeanstalk.com/api1/v2/tasks';
  //api for api gateway
  const APIGET = 'https://09i76htrtf.execute-api.us-west-2.amazonaws.com/dev/tasks';
  const APIGETSLASH = 'https://09i76htrtf.execute-api.us-west-2.amazonaws.com/dev/tasks/';
  const APIGETSUB = 'https://09i76htrtf.execute-api.us-west-2.amazonaws.com/dev/tasks/sub';

  // beanstalk image
  const APIPIC = 'http://taskmaster-dev.us-west-2.elasticbeanstalk.com/api1/v2/tasks/images';
  //local testing only
  const LOCAL = 'http://localhost:5000/api1/v2/tasks/images';

function App() {

  const [tasks, setTasks] = useState([]);

  function _getTasks() {
    fetch(APIGET, {
      mode: 'cors'
    })
      .then( data => data.json() )
      .then( fetchedTasks => setTasks(fetchedTasks) );
  }

  function _deleteTask(id) {
    fetch(API, {
      method: 'DELETE',
      mode: 'cors'
    })
    .then()
  }

  useEffect( _getTasks, [] );

  return (
    <div className="app">
    <Nav />
    <h1>TaskMaster: Lab 28</h1>
    <Subscribe />
      <ul>
        {tasks.map( (task,idx) => {
          return (
            <li key={task.id}>
              <details>
                <summary>
                  <span onClick={_deleteTask}>Title: {task.title}</span>
                  <div><a href={APIGETSLASH + task.assignee}>Assignee: {task.assignee} </a></div>
                  <div>Description: {task.description}</div>
                </summary>
                <History history={task.historyList} />
              
              <img src={task.url} alt="task"></img>
              </details>
            </li>
          )
        })}
      </ul>
      <Forming />
    </div>
  );
}

function Nav(props) {
  return (
    <nav>
    <ul>
      <li><a href="https://github.com/cf401/taskmaster-frontend">GitHub</a></li>
    </ul>
    </nav>
  )
}

function History(props) {
  return (
    <ol>
      {props.history.map( (record,idx) => {
        return (
          <li key={idx}>
            <span>{record.date}</span><br/>
            <span>{record.action}</span>
          </li>
        )
      })}
    </ol>
  )
}

//this function handles forms with a post form method
function Forming(props){

  const [formData, setFormData] = useState({});
  
  function _handleChange(event) {
    // For the JSON version of the form
  setFormData( {...formData, [event.target.name]:event.target.value});
  }

function _handleSubmit(event) {
  event.preventDefault();
  fetch(`${APIGET}`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    mode: 'cors',
    body: JSON.stringify(formData),
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
}

  return (
    <div>
      <form onSubmit={_handleSubmit}>
        <label>
        <div>Title</div>
          <input onChange={_handleChange} name="title" type="text" placeholder="title" />
        </label>  
        <label>
          <div>Description</div>
          <input onChange={_handleChange} name="description" type="text"/>
        </label>
        <label>
        <div>Assignee</div>
          <input onChange={_handleChange} name="assignee" type="text" />
        </label>
        <label>
          <span>Upload Image</span>
          <input onChange={_handleChange} name="file" type="file" />
        </label>
        <button>Save</button>
      </form>
    </div>
  );
}

//this function handles subscriptions with a post form method
function Subscribe(props){

  const [formData, setFormData] = useState({});
  
  function _handleChange(event) {
    // For the JSON version of the form
  setFormData( {...formData, [event.target.name]:event.target.value});
  }

function _handleSubmit(event) {
  event.preventDefault();
  fetch(`${APIGETSUB}`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    mode: 'cors',
    body: JSON.stringify(formData),
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
}

  return (
    <div>
      <form onSubmit={_handleSubmit}>
        <h2>Subscribe to TaskMaster</h2>
        <label>
        <div>Phone Number</div>
          <input onChange={_handleChange} name="phoneNumber" type="text" placeholder="phoneNumber" />
        </label>  
        <button>Subscribe</button>
      </form>
    </div>
  );
}

export default App;