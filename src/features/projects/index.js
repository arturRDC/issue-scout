import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleCard from '../../components/Cards/TitleCard';
import { openModal } from '../common/modalSlice';
import { deleteProject, getProjectsContent } from './projectSlice';
import { MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { showNotification } from '../common/headerSlice';
import { useNavigate } from 'react-router-dom';
import { parse, formatDistanceToNow } from 'date-fns';

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewProjectModal = () => {
    dispatch(
      openModal({
        title: 'Add New Project',
        bodyType: MODAL_BODY_TYPES.PROJECT_ADD_NEW,
      })
    );
  };

  return (
    <div className='inline-block float-right'>
      <button
        className='btn px-6 btn-sm normal-case btn-primary'
        onClick={() => openAddNewProjectModal()}
      >
        New Project
      </button>
    </div>
  );
};

function Projects() {
  const { projects } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goRouteId = (id) => {
    navigate(`/app/projects/${id}`);
  };

  useEffect(() => {
    dispatch(getProjectsContent());
  }, []);

  return (
    <>
      <TitleCard
        title='Current Projects'
        topMargin='mt-2'
        TopSideButtons={<TopSideButtons />}
      >
        {/* Projects List in table format loaded from slice after api call */}
        <div className='overflow-x-auto w-full'>
          <table className='table w-full'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Last Updated</th>
                <th>Manager</th>
                <th>Created at</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((l, k) => {
                return (
                  <tr
                    key={k}
                    className='hover cursor-pointer'
                    onClick={() => {
                      goRouteId(k + 1);
                    }}
                  >
                    <td>
                      <div className='flex items-center space-x-3'>
                        <div className='font-bold'>{l.name}</div>
                      </div>
                    </td>
                    <td>
                      {formatDistanceToNow(
                        parse(l.updatedAt, 'dd MMM yy HH:mm', new Date()),
                        { addSuffix: true }
                      )}
                    </td>
                    <td>{l.manager}</td>
                    <td>{l.createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Projects;
