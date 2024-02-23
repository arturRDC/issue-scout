import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleCard from '../../../components/Cards/TitleCard';
import { showNotification } from '../../common/headerSlice';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { parse, formatDistanceToNow } from 'date-fns';


function Tickets() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchTickets() {
      const res = await axios.get(`/api/projects/${id}/tickets`, {});
      const tickets = res.data.data;
      setTickets(tickets);
    }
    fetchTickets();
  }, []);

  const getPriorityComponent = (pr) => {
    if (pr === 'High') return <div className='badge badge-accent'>{pr}</div>;
    if (pr === 'Medium') return <div className='badge badge-primary'>{pr}</div>;
    if (pr === 'Low') return <div className='badge badge-ghost'>{pr}</div>;
    else return <div className='badge badge-ghost'>{pr}</div>;
  };

  const getDifficultyComponent = getPriorityComponent;

  const goRouteId = (id) => {
    navigate(`/app/tickets/${id}`);
  };

  return (
    <>
      <div className='overflow-x-auto w-full'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Difficulty</th>
              <th>Assigned</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((l, k) => {
              return (
                <tr
                  key={k}
                  className='hover cursor-pointer'
                  onClick={() => {
                    goRouteId(l.id);
                  }}
                >
                  <td>{l.id}</td>
                  <td>
                    <div className='font-bold'>{l.title}</div>
                  </td>
                  <td>{l.type}</td>
                  <td>{getPriorityComponent(l.priority)}</td>
                  <td>{getDifficultyComponent(l.difficulty)}</td>
                  <td>{l.assignedTo.name}</td>
                  <td>{l.status}</td>
                  <td>
                    {formatDistanceToNow(
                      parse(l.updatedAt, 'dd MMM yy HH:mm', new Date()),
                      { addSuffix: true }
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Tickets;
