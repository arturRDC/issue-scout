import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleCard from '../../../components/Cards/TitleCard';
import { showNotification } from '../../common/headerSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const addNewTeamMember = () => {
    dispatch(
      showNotification({ message: 'Add New Member clicked', status: 1 })
    );
  };

  return (
    <div className='inline-block float-right'>
      <button
        className='btn px-6 btn-sm normal-case btn-primary'
        onClick={() => addNewTeamMember()}
      >
        Invite New
      </button>
    </div>
  );
};

function RoleSelect({ role, userId }) {
  const { id } = useParams();
  const handleRoleSelect = (e) => {
    const role = e.target.value;
    axios.post(`/api/projects/${id}/changeRole/${userId}/${role}`);
  };
  return (
    <>
      <select
        className='select select-bordered select-sm w-max'
        defaultValue={role}
        onChange={handleRoleSelect}
      >
        <option value={'Developer'}>Developer</option>
        <option value={'Manager'}>Manager</option>
        <option value={'Submitter'}>Submitter</option>
      </select>
    </>
  );
}

function Tickets() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await axios.get('/api/users', {});
      const users = res.data.data;
      setMembers(users);
    }
    fetchUsers();
  }, []);

    const getPriorityComponent = (pr) => {
      if (pr === 'High')
        return <div className='badge badge-error'>{pr}</div>;
      if (pr === 'Medium') return <div className='badge badge-primary'>{pr}</div>;
      if (pr === 'Low')
        return <div className='badge badge-ghost'>{pr}</div>;
      else return <div className='badge badge-ghost'>{pr}</div>;
    };

    const getDifficultyComponent = getPriorityComponent;

  return (
    <>
      <div className='overflow-x-auto w-full'>
        <table className='table w-full'>
          <thead>
            <tr>
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
            {members.map((l, k) => {
              return (
                <tr key={k}>
                  <td>
                    <div className='font-bold'>l.title</div>
                  </td>
                  <td>l.type</td>
                  <td>getPriorityComponent(l.priority)</td>
                  <td>getDifficultyComponent(l.difficulty)</td>
                  <td>l.assignedTo</td>
                  <td>l.status</td>
                  <td>--
                    {/* formatDistanceToNow(
                        parse(l.updatedAt, 'dd MMM yy HH:mm', new Date()),
                        { addSuffix: true }
                      ) */}
                      </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* </TitleCard> */}
    </>
  );
}

export default Tickets;
