import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../common/modalSlice';
import { getProjectsContent } from '../projects/projectSlice';
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '../../utils/globalConstantUtil';
import { useParams } from 'react-router-dom';
import Team from './components/Team';
import Tickets from './components/Tickets';
import axios from 'axios';

const TopSideButtons = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const deleteCurrentProject = (index) => {
    dispatch(
      openModal({
        title: 'Confirmation',
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this project?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.PROJECT_DELETE,
          index,
        },
      })
    );
  };

  const openEditProjectModal = () => {
    dispatch(
      openModal({
        title: 'Edit Project',
        bodyType: MODAL_BODY_TYPES.PROJECT_EDIT,
        extraObject: id,
      })
    );
  };

  return (
    <div className='inline-block float-right flex gap-2'>
      <button
        className='btn px-6 btn-sm normal-case btn-primary'
        onClick={() => openEditProjectModal()}
      >
        Edit Project
      </button>
      <button
        className='btn px-6 btn-sm normal-case btn'
        onClick={() => deleteCurrentProject(id - 1)}
      >
        Delete Project
      </button>
    </div>
  );
};

const AddUserButton = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const openAddUserProjectModal = () => {
    dispatch(
      openModal({
        title: 'Add User',
        bodyType: MODAL_BODY_TYPES.PROJECT_ADD_USER,
        extraObject: id,
      })
    );
  };

  return (
    <div className='inline-block float-right flex gap-2'>
      <button
        className='btn px-6 btn-sm normal-case btn-primary'
        onClick={() => openAddUserProjectModal()}
      >
        Add User
      </button>
    </div>
  );
};

const AddTicketButton = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const openAddTicketProjectModal = () => {
    dispatch(
      openModal({
        title: 'Add Ticket',
        bodyType: MODAL_BODY_TYPES.PROJECT_ADD_TICKET,
        extraObject: id,
      })
    );
  };

  return (
    <div className='inline-block float-right flex gap-2'>
      <button
        className='btn px-6 btn-sm normal-case btn-primary'
        onClick={() => openAddTicketProjectModal()}
      >
        Add Ticket
      </button>
    </div>
  );
};

function Project() {
  const { id } = useParams();

  const { projects } = useSelector((state) => state.project);
  const project = projects[id - 1];
  const [role, setRole] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectsContent());
    axios
      .get('/api/auth/me')
      .then((res) => {
        setRole(res.data.authorities[0].authority);
      })
      .catch(() => console.error('error fetching data'));
  }, []);
  if (!project) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <div role='tablist' className='tabs tabs-lifted'>
          <input
            type='radio'
            name='my_tabs_1'
            role='tab'
            className='tab'
            aria-label='Details'
            defaultChecked
          />
          <div
            role='tabpanel'
            className='tab-content bg-base-100 border-base-300 rounded-box'
          >
            <div className='card w-full'>
              <div className='card-body'>
                <div className='text-xl font-semibold'>
                  {project.name}
                  {role === 'ROLE_MANAGER' || role === 'ROLE_ADMIN' ? (
                    <div className='inline-block float-right'>
                      {<TopSideButtons></TopSideButtons>}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className='divider mt-2'></div>
                <p>{project.desc}</p>
              </div>
            </div>
          </div>

          <input
            type='radio'
            name='my_tabs_1'
            role='tab'
            className='tab'
            aria-label='Users'
          />
          <div
            role='tabpanel'
            className='tab-content bg-base-100 border-base-300 rounded-box'
          >
            <div className='card w-full'>
              <div className='card-body'>
                <div className='text-xl font-semibold'>
                  {project.name}'s users
                  {role === 'ROLE_MANAGER' || role === 'ROLE_ADMIN' ? (
                    <div className='inline-block float-right'>
                      {<AddUserButton></AddUserButton>}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className='divider mt-2'></div>
                <Team id={id} role={role}></Team>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-2'>
        <div role='tablist' className='tabs tabs-lifted'>
          <input
            type='radio'
            name='my_tabs_2'
            role='tab'
            className='tab'
            aria-label='Tickets'
            defaultChecked
          />
          <div
            role='tabpanel'
            className='tab-content bg-base-100 border-base-300 rounded-box'
          >
            <div className='card w-full'>
              <div className='card-body'>
                <div className='text-xl font-semibold'>
                  {project.name}'s tickets
                  <div className='inline-block float-right'>
                    {<AddTicketButton></AddTicketButton>}
                  </div>
                </div>
                <div className='divider mt-2'></div>
                <Tickets></Tickets>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Project;
