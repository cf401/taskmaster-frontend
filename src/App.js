import React, {useState, useEffect} from 'react';

import './App.css';

const API = 'http://taskmaster1-dev.us-west-2.elasticbeanstalk.com/api1/v2/tasks';

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

export default App;