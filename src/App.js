
import './App.css';
import { useState } from 'react';

function App() {
  const [tasks, settasks] = useState([
    { id: 1, name: 'Task A' },
    { id: 2, name: 'Task B' },
    { id: 3, name: 'Task C' },
    { id: 4, name: 'Task D' },
    { id: 5, name: 'Task E' }
  ]);

  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

  function addTask() {
    if (name.trim() !== '') {
      settasks([...tasks, { id: Date.now(), name: name.trim() }]);
      setName('');
    }
  }

  function editTask(item) {
    setName(item.name);
    setEditId(item.id);
  }

  function updateTask() {
    if (name.trim() !== '') {
      settasks(
        tasks.map((t) =>
          t.id === editId ? { ...t, name: name.trim() } : t
        )
      );

      setName('');
      setEditId(null);
    }
  }

  function cancelEdit() {
    setName('');
    setEditId(null);
  }

  function deleteTask(id) {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this task?'
    );

    if (isConfirmed) {
      settasks(tasks.filter((t) => t.id !== id));

      if (editId === id) {
        cancelEdit();
      }
    }
  }

  return (
    <div className="app">
      <h1 className="title">To Do List</h1>

      <div className="card">
        <div className="input-row">
          <input
            type="text"
            className="todo-input"
            placeholder="What needs to be done?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {editId === null ? (
            <button className="add-btn" onClick={addTask}>
              Add
            </button>
          ) : (
            <>
              <button className="add-btn" onClick={updateTask}>
                Update
              </button>

              <button className="delete-btn" onClick={cancelEdit}>
                Cancel
              </button>
            </>
          )}
        </div>

        <ul className="todo-list">
          {tasks.map((item) => (
            <li key={item.id} className="todo-item">
              <span>{item.name}</span>

              <div>
                <button
                  className="edit-btn"
                  onClick={() => editTask(item)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(item.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
