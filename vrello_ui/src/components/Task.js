import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { formatDistanceToNow } from 'date-fns';

const Task = ({ tasks, onEdit, onDelete }) => {
  const [viewingTask, setViewingTask] = React.useState(null);

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleEdit = (task) => {
    onEdit(task);
  };

  const handleViewDetails = (task) => {
    setViewingTask(task);
  };

  const handleCloseDetails = () => {
    setViewingTask(null);
  };

  return (
    <div>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{ ...styles.taskCard, ...provided.draggableProps.style }}
            >
              <div style={styles.taskHeader}>
                <h4>{task.title}</h4>
                <small>{formatDistanceToNow(new Date(task.timestamp))} ago</small>
              </div>
              <p>{task.description}</p>
              <small>Created on: {new Date(task.timestamp).toLocaleString()}</small>
              <div style={styles.cardActions}>
                <button onClick={() => handleEdit(task)} style={{ ...styles.cardButton, ...styles.editButton }}>Edit</button>
                <button onClick={() => handleDelete(task.id)} style={{ ...styles.cardButton, ...styles.deleteButton }}>Delete</button>
                <button onClick={() => handleViewDetails(task)} style={{ ...styles.cardButton, ...styles.viewDetailsButton }}>View Details</button>
              </div>
            </div>
          )}
        </Draggable>
      ))}
      
      {viewingTask && (
        <div style={styles.detailsPopup}>
          <div style={styles.detailsPopupContent}>
            <button onClick={handleCloseDetails} style={styles.closeButton}>×</button>
            <h3>{viewingTask.title}</h3>
            <p>{viewingTask.description}</p>
            <small>Created At: {new Date(viewingTask.timestamp).toLocaleString()}</small>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  taskCard: {
    backgroundColor: '#FFFBF0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '10px',
    boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
    transition: 'background-color 0.2s ease',
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardActions: {
    display: 'flex',
    gap: '10px',
    paddingTop: '20px'
  },
  cardButton: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
  },
  editButton: {
    backgroundColor: '#007bff', // Blue background for Edit button
  },
  deleteButton: {
    backgroundColor: '#dc3545', // Red background for Delete button
  },
  viewDetailsButton: {
    backgroundColor: '#28a745', // Green background for View Details button
    paddingTop: '10px' // Adds top padding to View Details button
  },
  detailsPopup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
    padding: '20px',
    borderRadius: '4px',
  },
  detailsPopupContent: {
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#f00',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '25px',
    height: '25px',
    textAlign: 'center',
    lineHeight: '25px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Task;
