import  { useState } from 'react';

function Problem1() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '' && status.trim() !== '') {
      setTasks([...tasks, { name, status }]);
      setName('');
      setStatus('');
    }
  };

  const handleFilterFunction= (filter) => {
    setFilter(filter);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') {
      return task.status === 'active';
    } else if (filter === 'completed') {
      return task.status === 'completed';
    } else {
      return true;
    }
  });

  const sortedlist = filteredTasks.sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') {
      return -1; 
    }
    if (a.status !== 'active' && b.status === 'active') {
      return 1; 
    }
    if (a.status === 'completed' && b.status !== 'completed') {
      return -1; 
    }
    if (a.status !== 'completed' && b.status === 'completed') {
      return 1; 
    }
  
    return 0;
  });
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Task name"
        />
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Task Status"
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <button onClick={() => handleFilterFunction('active')}>Active</button>
        <button onClick={() => handleFilterFunction('completed')}>Completed</button>
        <button onClick={() => handleFilterFunction('all')}>All</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name of task</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedlist.map((task, index) => (

            <tr key={index}>
              <td>{task.name}</td>
              <td>{task.status}</td>
            </tr>


          ))}
        </tbody>
      </table>
    </div>
  );
}

export default  Problem1;
