import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleCard from '../../components/Cards/TitleCard';
import { openModal } from '../common/modalSlice';
import { deleteProject, getProjectsContent } from '../projects/projectSlice';
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '../../utils/globalConstantUtil';
import PaperAirplaneIcon from '@heroicons/react/24/solid/PaperAirplaneIcon';
import { showNotification } from '../common/headerSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Team from './components/Team';
import Tickets from './components/Tickets';
import axios from 'axios';

const TopSideButtons = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const deleteCurrentTicket = (index) => {
    dispatch(
      openModal({
        title: 'Confirmation',
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this ticket?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.TICKET_DELETE,
          index,
        },
      })
    );
  };

  const openEditTicketModal = () => {
    dispatch(
      openModal({
        title: 'Edit Ticket',
        bodyType: MODAL_BODY_TYPES.TICKET_EDIT,
        extraObject: id,
      })
    );
  };

  return (
    <div className='inline-block float-right flex gap-2'>
      <button
        className='btn px-6 btn-sm normal-case btn-primary'
        onClick={() => openEditTicketModal()}
      >
        Edit Ticket
      </button>
      <button
        className='btn px-6 btn-sm normal-case btn'
        onClick={() => deleteCurrentTicket(id)}
      >
        Delete Ticket
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

function Ticket() {
  const { id } = useParams();

  const { projects } = useSelector((state) => state.project);
  const project = projects[id - 1];

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/tickets/${id}`)
      .then((response) => {
        setTicketObj(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const [ticketObj, setTicketObj] = useState(null);
  if (!project) {
    return <div>Loading...</div>;
  }
  return ticketObj !== null ? (
    <>
      <div>
        {/* Details */}
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
                  {ticketObj.title}
                  <div className='inline-block float-right'>
                    {<TopSideButtons></TopSideButtons>}
                  </div>
                </div>
                <div className='divider mt-2'></div>
                <div className='grid grid-cols-2 gap-y-4'>
                  <p className='font-semibold'>Id: </p>
                  <p className='prose'>{ticketObj.id}</p>

                  <p className='font-semibold'>Description: </p>
                  <p className='prose'>{ticketObj.desc}</p>

                  <p className='font-semibold'>Priority:</p>
                  <p>{ticketObj.priority}</p>

                  <p className='font-semibold'>Difficulty:</p>
                  <p>{ticketObj.difficulty}</p>

                  <p className='font-semibold'>Assigned to:</p>
                  <p>{ticketObj.assignedTo.name}</p>

                  <p className='font-semibold'>Submitted by:</p>
                  <p>{ticketObj.submittedBy}</p>

                  <p className='font-semibold'>Status:</p>
                  <p>{ticketObj.status}</p>

                  <p className='font-semibold'>Type:</p>
                  <p>{ticketObj.type}</p>

                  <p className='font-semibold'>Created at:</p>
                  <p>{ticketObj.createdAt}</p>

                  <p className='font-semibold'>Last Updated:</p>
                  <p>{ticketObj.updatedAt}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Comments */}
          <input
            type='radio'
            name='my_tabs_1'
            role='tab'
            className='tab'
            aria-label='Comments'
          />
          <div
            role='tabpanel'
            className='tab-content bg-base-100 border-base-300 rounded-box'
          >
            <div className='card w-full h-96 overflow-y-auto'>
              <div className='card-body'>
                {/* <div className='text-xl font-semibold'>
                  {project.name}'s comments
                                    
                  <div className='inline-block float-right'>
                    {<AddUserButton></AddUserButton>}
                  </div>
                </div>

                <div className='divider mt-2'></div> */}
                <div className='chat chat-start'>
                  <div className='chat-header'>
                    Obi-Wan Kenobi
                    <time className='text-xs opacity-50'> 21 May 24 16:59</time>
                  </div>
                  <div className='chat-bubble chat-bubble-primary'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam maximus dictum neque sed sagittis. Curabitur nec
                    dignissim arcu, id fringilla massa. Duis blandit justo ut
                    ipsum rutrum cursus. Curabitur pulvinar libero interdum
                    tellus semper, ut ultricies nisi interdum. Aenean porttitor
                    nibh risus, in suscipit nunc tincidunt et. Suspendisse
                    elementum posuere lacus, sed semper diam rutrum eu. Nulla
                    aliquam auctor venenatis. Aliquam sit amet tellus viverra,
                    porttitor magna sit amet, tempus diam. Praesent egestas,
                    arcu tincidunt euismod sollicitudin, nisi lorem blandit
                    mauris, sodales porta ex dolor vitae lacus. In ac lacinia
                    elit. Nulla sapien velit, varius id sem sit amet, ultrices
                    consectetur augue. Nam eget mattis neque. Vivamus euismod
                    eros mauris, id placerat elit suscipit at. Aenean efficitur
                    est sit amet eleifend tempor. Donec gravida efficitur neque,
                    mollis malesuada mauris tempus ut.
                  </div>
                </div>
                <div className='chat chat-start'>
                  <div className='chat-header'>
                    Obi-Wan Kenobi
                    <time className='text-xs opacity-50'> 21 May 24 16:59</time>
                  </div>
                  <div className='chat-bubble chat-bubble-primary'>
                    I loved you.
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center p-3 gap-2'>
              <input
                type='text'
                placeholder='Type comment'
                class='input input-bordered w-full'
              />

              <PaperAirplaneIcon height={36} color={'#244bfe'}></PaperAirplaneIcon>
            </div>
          </div>

          {/* Attachments */}
          <input
            type='radio'
            name='my_tabs_1'
            role='tab'
            className='tab'
            aria-label='Attachments'
          />
          <div
            role='tabpanel'
            className='tab-content bg-base-100 border-base-300 rounded-box'
          ></div>

          {/* History */}
          <input
            type='radio'
            name='my_tabs_1'
            role='tab'
            className='tab'
            aria-label='History'
          />
          <div
            role='tabpanel'
            className='tab-content bg-base-100 border-base-300 rounded-box'
          ></div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default Ticket;
