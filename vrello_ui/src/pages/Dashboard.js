import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Task from '../components/Task';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [task, setTask] = useState({ title: '', description: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
      // Handle successful logout, e.g., redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleShowPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      // Update existing task
      setTasks(tasks.map(t =>
        t.id === taskToEdit.id ? { ...taskToEdit, ...task } : t
      ));
      setTaskToEdit(null);
    } else {
      // Add new task
      setTasks([...tasks, { ...task, id: Date.now(), status: 'todo', timestamp: new Date() }]);
    }
    setTask({ title: '', description: '' });
    handleClosePopup();
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSortChange = (e) => setSortBy(e.target.value);

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setTask({ title: task.title, description: task.description });
    handleShowPopup();
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const updatedTasks = [...tasks];

    // Get the task being dragged
    const [movedTask] = updatedTasks.splice(source.index, 1);
    // Update the task's status
    movedTask.status = destination.droppableId;
    // Insert the task into the new position
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div>
        <nav style={styles.navbar}>
        <h2>Welcome, {currentUser && currentUser.email}</h2>
          <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </nav>
        <div style={styles.content}>
          <button style={styles.addButton} onClick={handleShowPopup}>Add Task</button>
          {showPopup && (
            <div style={styles.popup}>
              <div style={styles.popupContent}>
                <h3>{taskToEdit ? 'Edit Task' : 'Create New Task'}</h3>
                <form onSubmit={handleSubmit}>
                  <div style={styles.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={task.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={task.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Created At</label>
                    <input
                      type="text"
                      value={taskToEdit ? new Date(taskToEdit.timestamp).toLocaleString() : new Date().toLocaleString()}
                      readOnly
                    />
                  </div>
                  <div style={styles.buttonContainer}>
    <button style={styles.submitButton} type="submit">
      {taskToEdit ? 'Update' : 'Submit'}
    </button>
    <button style={styles.cancelButton} type="button" onClick={handleClosePopup}>
      Cancel
    </button>
  </div>
                </form>
              </div>
            </div>
          )}
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={styles.searchInput}
            />
            <select value={sortBy} onChange={handleSortChange} style={styles.sortSelect}>
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
          <div style={styles.columns}>
            <Droppable droppableId="todo">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={styles.column}
                >
                  <h3>Todo</h3>
                  <Task
                    tasks={filteredTasks.filter(task => task.status === 'todo')}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="in-progress">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={styles.column}
                >
                  <h3>In Progress</h3>
                  <Task
                    tasks={filteredTasks.filter(task => task.status === 'in-progress')}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="done">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={styles.column}
                >
                  <h3>Done</h3>
                  <Task
                    tasks={filteredTasks.filter(task => task.status === 'done')}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

const styles = {
  navbar: {
    fontFamily: '"Roboto", sans-serif',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#392F5A',
    color: '#fff',
    width: '100vw', 
    margin: 0, 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    zIndex: 2, 
  },
  logoutButton: {
    backgroundColor: '#FF8811',
    color: '#fff',
    border: 'none',
    padding: '12px',
    marginRight:'30px',
    cursor: 'pointer',
    borderRadius:'50px',
    fontSize:'16px',
  },
  content: {
    padding: '20px',
    marginTop: '80px', 
  },
  addButton: {
    margin: '10px 0',
    padding: '20px',
    backgroundColor: '#FF0054',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius:'50px',
    fontSize:'20px'
  },
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    backgroundColor: '#FFF8F0',
    border: '1px solid #ccc',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
  },
  popupContent: {
    fontFamily: '"Roboto", sans-serif',
    padding: '20px',
  },
  formGroup: {
    fontFamily: '"Roboto", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px' 
  },
  label: {
    fontFamily: '"Roboto", sans-serif',
    marginBottom: '10px' 
  },
  input: {
    fontFamily: '"Roboto", sans-serif',
    padding: '8px', 
    borderRadius: '4px', 
    border: '1px solid #ccc' 
  },
  timestamp: {
    display: 'block',
    marginTop: '5px',
    color: '#808080'
  },
  buttonContainer: {
    display: 'flex',
    gap:'10px'
  },
  submitButton: {
    backgroundColor: '#4F9D69',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
  },
  searchContainer: {
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center'
  },
  searchInput: {
    marginRight: '10px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    flex: 1
  },
  sortSelect: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  columns: {
    fontFamily: '"Roboto", sans-serif',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  column: {
    flex: 1,
    margin: '0 10px'
  }
};

export default Dashboard;
