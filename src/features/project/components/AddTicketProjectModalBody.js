import { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from '../../common/headerSlice';
import { addNewProject } from '../../projects/projectSlice';
import checkAuth from '../../../app/auth';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import Autocomplete from '../../../components/Input/Autocomplete';
import UsersAutocomplete from './UsersAutocomplete';
import axios from 'axios';

const token = checkAuth();

function AddTicketProjectModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = extraObject;
  const INITIAL_TICKET_PROJECT_OBJ = {
    projectId: id,
    title: '',
    desc: '',
    assignedTo: {
      name: '',
      id: null,
    },
    priority: '',
    difficulty: '',
    attachment: '',
  };
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [ticketProjectObj, setTicketProjectObj] = useState(
    INITIAL_TICKET_PROJECT_OBJ
  );

  const addTicketProject = () => {
    if (ticketProjectObj.title.trim() === '')
      return setErrorMessage('Title is required!');
    else {
      axios.post(`/api/projects/${id}/addTicket`, ticketProjectObj);
      dispatch(showNotification({ message: 'New Ticket Added!', status: 1 }));
      closeModal();
      navigate(`/app/projects/${id}`);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setTicketProjectObj({ ...ticketProjectObj, [updateType]: value });
    console.log('userProjectObj');
    console.log(ticketProjectObj);
  };
  return (
    <>
      {/* Title */}
      <InputText
        type='text'
        defaultValue={ticketProjectObj.title}
        updateType='title'
        containerStyle='mt-4'
        labelTitle='Title'
        updateFormValue={updateFormValue}
      />

      {/* Description */}
      <InputText
        type='text'
        defaultValue={ticketProjectObj.desc}
        updateType='desc'
        containerStyle='mt-4'
        labelTitle='Description'
        updateFormValue={updateFormValue}
      />

      {/* Assigned to */}
      <label className='label'>
        <span className={'label-text text-base-content '}>Assigned to</span>
      </label>
      <UsersAutocomplete updateFormValue={updateFormValue}></UsersAutocomplete>

      {/* Priority */}
      <label className='label'>
        <span className={'label-text text-base-content '}>Priority</span>
      </label>
      <select
        className='select select-bordered w-full'
        defaultValue='Low'
        onChange={(e) =>
          updateFormValue({ updateType: 'priority', value: e.target.value })
        }
      >
        <option value={'High'}>High</option>
        <option value={'Medium'}>Medium</option>
        <option value={'Low'}>Low</option>
      </select>

      {/* Difficulty */}
      <label className='label'>
        <span className={'label-text text-base-content '}>Difficulty</span>
      </label>
      <select
        className='select select-bordered w-full'
        defaultValue='Low'
        onChange={(e) =>
          updateFormValue({ updateType: 'difficulty', value: e.target.value })
        }
      >
        <option value={'High'}>High</option>
        <option value={'Medium'}>Medium</option>
        <option value={'Low'}>Low</option>
      </select>

      {/* Attachment */}
      <label className='label'>
        <span className={'label-text text-base-content '}>Attachment</span>
      </label>
      <input type='file' className='file-input file-input-bordered w-full' />

      <ErrorText styleClass='mt-16'>{errorMessage}</ErrorText>
      <div className='modal-action'>
        <button className='btn btn-ghost' onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className='btn btn-primary px-6'
          onClick={() => addTicketProject()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddTicketProjectModalBody;
