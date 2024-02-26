import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { parse, formatDistanceToNowStrict, format } from 'date-fns';

function Users() {
  const [members, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await axios.get('/api/users', {});
      const users = res.data.data;
      setUsers(users);
    }
    fetchUsers();
  }, []);

  return (
    <>
      <div className='card w-full bg-base-100 border-base-300 rounded-box'>
        <div className='card-body'>
          {/* Team Member list in table format */}
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
                            {l.avatar === '' ? (
                              <div className='avatar placeholder'>
                                <div className='bg-secondary text-neutral-content rounded-full w-8'>
                                  <span className='text-sm'>
                                    {l.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className='mask mask-circle w-12 h-12'>
                                <img src={l.avatar} alt='Avatar' />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className='font-bold'>
                              {l.name.charAt(0).toUpperCase() +
                                l.name.substring(1)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{l.email}</td>
                      <td>{l.joinedOn}</td>
                      <td>{l.role.slice(1, -1)}</td>
                      <td>
                        {formatDistanceToNowStrict(
                          parse(l.lastActive, 'dd MMM yy HH:mm', moment().format('DD MMM YY HH:mm')),
                          { addSuffix: true }
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
