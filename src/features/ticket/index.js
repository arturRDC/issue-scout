import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../common/modalSlice';
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '../../utils/globalConstantUtil';
import PaperAirplaneIcon from '@heroicons/react/24/solid/PaperAirplaneIcon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import PaperClipIcon from '@heroicons/react/24/solid/PaperClipIcon';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaClockRotateLeft } from 'react-icons/fa6';

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

function Ticket() {
  const { id } = useParams();

  const { projects } = useSelector((state) => state.project);
  const project = projects[id - 1];
  const [role, setRole] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/tickets/${id}`)
      .then((response) => {
        setTicketObj(response.data.details);
        setCommentsArr(response.data.comments);
        setAttachmentsArr(response.data.attachments);
        setHistoryArr(response.data.history);
      })
      .then(() => {
        axios.get('/api/auth/me').then((res) => {
          setRole(res.data.authorities[0].authority);
          setName(res.data.name);
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const [ticketObj, setTicketObj] = useState(null);
  const [commentsArr, setCommentsArr] = useState(null);
  const [attachmentsArr, setAttachmentsArr] = useState(null);
  const [historyArr, setHistoryArr] = useState(null);
  const [inputComment, setInputComment] = useState('');

  const handleInputCommentChange = (e) => {
    setInputComment(e.target.value);
  };

  const handleNewComment = () => {
    const content = inputComment;
    if (content.trim() === '') return;
    const dt = moment().format('DD MMM YY HH:mm');
    setCommentsArr([
      ...commentsArr,
      {
        author: name.charAt(0).toUpperCase() + name.substring(1),
        content: content,
        createdAt: dt,
      },
    ]);
    axios.post(`/api/tickets/${id}/comments`, {
      author: name.charAt(0).toUpperCase() + name.substring(1),
      content: content,
      createdAt: dt,
    });
    setInputComment('');
  };

  const handleDeleteAttachment = (attId) => {
    axios.delete(`/api/tickets/${id}/attachments/${attId}`);
    setAttachmentsArr(
      attachmentsArr.filter((att) => {
        return att.id !== attId;
      })
    );
  };

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

                  {role !== 'Submitter' ? (
                    <div className='inline-block float-right'>
                      {<TopSideButtons></TopSideButtons>}
                    </div>
                  ) : (
                    <></>
                  )}
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
                {commentsArr.map((c, k) => {
                  return (
                    <div className='chat chat-start' key={k}>
                      <div className='chat-header'>
                        {c.author}
                        <time className='text-xs opacity-50'>
                          {' '}
                          {c.createdAt}
                        </time>
                      </div>
                      <div className='chat-bubble chat-bubble-primary'>
                        {c.content}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='flex items-center p-3 gap-2'>
              <input
                type='text'
                placeholder='Type comment'
                className='input input-bordered w-full'
                value={inputComment}
                onChange={handleInputCommentChange}
              />

              <button onClick={handleNewComment}>
                <PaperAirplaneIcon
                  height={36}
                  color={'#244bfe'}
                ></PaperAirplaneIcon>
              </button>
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
          >
            <div className='card w-fit bg-base-100'>
              <div className='card-body'>
                <h2 className='card-title'>Ticket Files</h2>
                {attachmentsArr === null || attachmentsArr.length === 0 ? (
                  <h1>No Attachments</h1>
                ) : (
                  attachmentsArr.map((att, k) => {
                    return (
                      <div
                        key={k}
                        className='card w-fit bg-base-100 border-base-300 card-bordered p-2'
                      >
                        <div className='flex gap-2'>
                          <PaperClipIcon width={24}></PaperClipIcon>
                          <a className='link link-hover' href={att.address}>
                            {att.name}
                          </a>
                          <div className='cursor-pointer'>
                            <XMarkIcon
                              width={24}
                              onClick={() => handleDeleteAttachment(att.id)}
                            ></XMarkIcon>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

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
          >
            <div className='flex flex-col m-3 gap-2'>
              {historyArr === null || historyArr.length === 0 ? (
                <h1>No Changes</h1>
              ) : (
                historyArr.map((h, k) => {
                  return (
                    <div
                      key={k}
                      className='card w-fit bg-base-100 border-base-300 card-bordered p-2'
                    >
                      <div className='flex gap-1 items-center'>
                        <FaClockRotateLeft className='m-2' />
                        At <span className='font-medium'>{h.updatedAt}</span>
                        {', changed '}
                        <span className='font-medium'>{h.propertyChanged}</span>
                        {' from '}
                        <div
                          className='tooltip tooltip-bottom'
                          data-tip={h.oldValue}
                        >
                          {h.oldValue.substring(0, 30) + '...'}
                        </div>
                        {' to '}
                        <div
                          className='tooltip tooltip-bottom'
                          data-tip={h.newValue}
                        >
                          {h.newValue.substring(0, 30) + '...'}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default Ticket;
