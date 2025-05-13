import { useState } from 'react'
import axios from 'axios'

function Create() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [task, setTask] = useState('')

  const token = localStorage.getItem('token')
  const handleAdd = () => {

    console.log(token);
    
    if (!task.trim()) { // Check if task is empty
      console.log("Please enter a task!");
      return;
    }

    axios.post('http://localhost:3001/add', { task }, {

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        console.log('task added:');
        setTask('')

        location.reload()
        console.log(res.data);

      })
      .catch(err => console.log(err))
  }

  return (
    <div className='create_form'>
      <input type="text" name="task" id="" placeholder="Enter your task" onChange={(e) => setTask(e.target.value)} />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create