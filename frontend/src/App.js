import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [task, setTask] = useState('');
  const[taskDesc,setTaskDesc]=useState('')
  const [teamId, setTeamId] = useState('');
  const [assignedMember, setAssignedMember] = useState(null);
  const [teams, setTeams] = useState()

  const handleAssignTask = async () => {
    if (taskDesc && teamId) {
      try {
        const response = await axios.post('http://localhost:3000/assignTask', { taskDesc, teamId });
        setAssignedMember(response.data.assignedMember);
        setTask(response.data.taskDesc)
        setTaskDesc('')
        setTeamId('')
      } catch (error) {
        console.error(error);
      }
    }else{
      alert("Please fill in all the fields")
    }
  };

  const getAllTeamsInfo = async () => {
    let data = await axios.get('http://localhost:3000/getAllTeams')
    console.log(data)
    setTeams(data.data)
  }

  useEffect(() => {
    getAllTeamsInfo()
  }, [])

  return (
    <div className="mt-5">
      <h1 className='text-center'>Task Assignment System</h1>
      <div className='card w-25 mx-auto mt-5 p-3'>
        <div className='d-flex justify-content-between pb-2'>
          <label>Task Description:</label>
          <input type="text" className='form-control w-50' value={taskDesc} onChange={e => setTaskDesc(e.target.value)} />
        </div>
        <div className='d-flex justify-content-between pb-2'>
          <label>Select Team:</label>
          <select value={teamId} className='form-control w-50' onChange={e => setTeamId(Number(e.target.value))}>
            <option value=''>Please Select</option>
            {teams?.map((e) => <option value={e.id}>{e.name}</option>)}
          </select>
        </div>
        <button className='btn btn-primary' onClick={handleAssignTask}>Assign Task</button>
      </div>
      {assignedMember && (
        <div className='card w-25 mt-5 mx-auto p-3'>
          <p >Assigned to: &nbsp;&nbsp;&nbsp;{assignedMember.name}</p>
          <p>Task:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {task}</p>
        </div>
      )}
    </div>
  );
}

export default App;
