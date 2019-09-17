import React, {useState, useEffect} from 'react';

import './App.css';

const API = 'http://taskmaster-dev.us-west-2.elasticbeanstalk.com/api1/v2/tasks';

// On Load - Get that data from the API
// Iterate and display major task points
// Some Interaction to expose history

// TODO : Add a link to delete or change status

function App() {

  const [tasks, setTasks] = useState([]);

  function _getTasks() {
    fetch(API, {
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
      <ul>
        {tasks.map( (task,idx) => {
          return (
            <li key={task.id}>
              <details>
                <summary>
                  <span onClick={_deleteTask}>{task.title}</span>
                </summary>
                <History history={task.historyList} />
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
            <span>{record.date}</span>
            <span>{record.action}</span>
          </li>
        )
      })}
    </ol>
  )
}

let form = new FormData();
const APIPIC = 'http://taskmaster-dev.us-west-2.elasticbeanstalk.com/api1/v2/tasks/images';
const LOCAL = 'http://localhost:5000/api1/v2/tasks/images';


function Forming(props){
  function _handleChange(event) {
    let value = event.target.files ? event.target.files[0] : event.target.value;
    form.set(event.target.name, value);
  }
  function _upload(event) {
    event.preventDefault();
    fetch(APIPIC, {
      method: "POST",
      body: form,
    })
    .then(response => {console.log(response); return response.json()})
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }
  return (
    <div>
      <form onSubmit={_upload} method="post" encType="multipart/form-data">
        <label>
          <input onChange={_handleChange} name="title" type="text" placeholder="title" />
        </label>
        <label>
          <div>Create new Task</div>
          <input onChange={_handleChange} name="description" type="text"/>
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


export default App;