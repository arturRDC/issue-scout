import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleCard from '../../../components/Cards/TitleCard';
import { showNotification } from '../../common/headerSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom';





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

  return (
    <>
      {/* Team Member list in table format loaded constant */}
      <div className='overflow-x-auto w-full'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
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
                  {/* <td>{RoleSelect(l.role, l.id)}</td> */}
                  <td>
                    {l.role}
                  </td>
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
