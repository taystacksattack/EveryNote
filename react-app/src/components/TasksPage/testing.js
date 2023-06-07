
import { useDispatch, useSelector, Sort  } from "react-redux"
import { useEffect, useState, useMemo } from "react"
import { useHistory, NavLink } from "react-router-dom"
import { deleteTaskThunk, getTasksThunk } from "../../store/tasks"
import OpenModalButton from "../OpenModalButton"
import DeleteTaskModal, {deleted} from '../DeleteTaskModal'
// import { closeModal } from "../DeleteTaskModal";


const CurrentTasks = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState('title');

  useEffect(() => {
    dispatch(getTasksThunk());
  }, [dispatch]);

  const tasksObj = useSelector(state => state.tasks);

  const tasksArr = useMemo(() => {
    if (tasksObj.allTasks) {
      return Object.values(tasksObj.allTasks);
    }
    return [];
  }, [tasksObj]);

  useEffect(() => {
    const sortedTasks = type => {
      const types = {
        due: 'due_date',
        created: 'created_at',
        titled: 'title'
      };
      const sortProperty = types[type];
      const sorted = [...tasksArr].sort((a, b) => {
        if (sortProperty === 'title') {
          return a[sortProperty].localeCompare(b[sortProperty]);
        } else {
          return new Date(a[sortProperty]) - new Date(b[sortProperty]);
        }
      });
      setData(sorted);
    };
    sortedTasks(sortType);
  }, [sortType, tasksArr]);

    useEffect(() => {
    // Trigger sorting when tasks are fetched
    if (tasksArr.length > 0) {
      setSortType('due');
    }
  }, [tasksArr]);

  if (!tasksObj) return <div>Loading</div>;

  return (
    <div>
      <h1>Tasks</h1>
      <NavLink exact to="/tasks/new" id="new_task_link">
        New task
      </NavLink>
      <select onChange={e => setSortType(e.target.value)}>
        <option value="due">Due Date</option>
        <option value="created">Created Date</option>
        <option value="titled">Title, A-Z</option>
      </select>
      {data.map(task => (
        <div key={task.id}>
          <p>Task: {task.title}</p>
          <p>Due: {task.due_date.slice(0, 16)}</p>
          <NavLink exact to={`/tasks/${task.id}/edit`} id="edit_task_link">
            Edit task
          </NavLink>
          <OpenModalButton
            buttonText="Delete"
            modalComponent={<DeleteTaskModal task={task} />}
          />
        </div>
      ))}
    </div>
  );
};

export default CurrentTasks;
