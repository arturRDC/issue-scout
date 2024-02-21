import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleCard from '../../../components/Cards/TitleCard';
import { showNotification } from '../../common/headerSlice';
import axios from 'axios';

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

function Team() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await axios.get('/api/users', {});
      const users = res.data.data;
      setMembers(users);
    }
    fetchUsers();
  }, []);

  //   const getRoleComponent = (role) => {
  //     if (role === 'Developer')
  //       return <div className='badge badge-secondary'>{role}</div>;
  //     if (role === 'Manager') return <div className='badge'>{role}</div>;
  //     if (role === 'Owner')
  //       return <div className='badge badge-primary'>{role}</div>;
  //     if (role === 'Submitter')
  //       return <div className='badge badge-accent'>{role}</div>;
  //     else return <div className='badge badge-ghost'>{role}</div>;
  //   };
  const getRoleComponent = (role) => {
    return (
      <>
        <select
          className='select select-bordered select-sm w-max'
          defaultValue={role}
        >
          <option value={'Manager'}>Manager</option>
          <option value={'Developer'}>Developer</option>
          <option value={'Submitter'}>Submitter</option>
        </select>
      </>
    );
  };

  return (
    <>
      {/* Team Member list in table format loaded constant */}
      <div className='overflow-x-auto w-full'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email Id</th>
              <th>Joined On</th>
              <th>Role</th>
              <th>Last Active</th>
            </tr>
          </thead>
          <tbody>
            {members.map((l, k) => {
              return (
                <tr key={k}>
                  <td>
                    <div className='flex items-center space-x-3'>
                      <div className='avatar'>
                        <div className='mask mask-circle w-12 h-12'>
                          <img src={l.avatar} alt='Avatar' />
                        </div>
                      </div>
                      <div>
                        <div className='font-bold'>{l.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{l.email}</td>
                  <td>{l.joinedOn}</td>
                  <td>{getRoleComponent(l.role)}</td>
                  <td>{l.lastActive}</td>
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

export default Team;
