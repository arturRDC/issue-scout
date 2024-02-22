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
import { useEffect } from 'react';
const token = checkAuth();

function EditTicketModalBody({ closeModal, extraObject }) {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = extraObject;
  // {
  //   projectId: id,
  //   title: '',
  //   desc: '',
  //   assignedTo: {
  //     name: '',
  //     id: null,
  //   },
  //   priority: 'Low',
  //   difficulty: 'Low',
  //   attachment: '',
  // };
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [ticketObj, setTicketObj] = useState(null);

  const [selectedFiles, setSelectedFiles] = useState([]);

  // function getTicket() {
  //   const response = axios.get(`/api/tickets/${id}`);
  //   const ticket = response.data;
  //   console.log('ticket');
  //   console.log(ticket);
  // }

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const editTicket = () => {
    if (ticketObj.title.trim() === '')
      return setErrorMessage('Title is required!');
    else {
      const formData = new FormData();
      for (let property in ticketObj) {
        if (
          ticketObj.hasOwnProperty(property) &&
          property !== 'assignedTo' &&
          property !== 'attachment'
        )
          formData.append(property, ticketObj[property]);
      }
      formData.append('assignedTo', JSON.stringify(ticketObj.assignedTo));

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('attachment', selectedFiles[i]);
      }
      console.log(formData);

      axios.post(`/api/tickets/${id}`, formData);

      dispatch(showNotification({ message: 'Ticket Saved!', status: 1 }));
      closeModal();
      navigate(`/app/projects`);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setTicketObj({ ...ticketObj, [updateType]: value });
  };
  return ticketObj !== null ? (
    <>
      {/* Title */}
      <InputText
        type='text'
        defaultValue={ticketObj.title}
        updateType='title'
        containerStyle='mt-4'
        labelTitle='Title'
        updateFormValue={updateFormValue}
      />

      {/* Description */}
      <InputText
        type='text'
        defaultValue={ticketObj.desc}
        updateType='desc'
        containerStyle='mt-4'
        labelTitle='Description'
        updateFormValue={updateFormValue}
      />

      {/* Assigned to */}
      <label className='label'>
        <span className={'label-text text-base-content '}>Assigned to</span>
      </label>
      <UsersAutocomplete
        updateFormValue={updateFormValue}
        updateType={'assignedTo'}
        defaultValue={ticketObj.assignedTo.name}
      ></UsersAutocomplete>

      {/* Priority */}
      <label className='label'>
        <span className={'label-text text-base-content '}>Priority</span>
      </label>
      <select
        className='select select-bordered w-full'
        defaultValue={ticketObj.priority}
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
        defaultValue={ticketObj.difficulty}
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
      <input
        type='file'
        className='file-input file-input-bordered w-full'
        multiple={'multiple'}
        onChange={handleFileChange}
      />

      <ErrorText styleClass='mt-16'>{errorMessage}</ErrorText>
      <div className='modal-action'>
        <button className='btn btn-ghost' onClick={() => closeModal()}>
          Cancel
        </button>
        <button className='btn btn-primary px-6' onClick={() => editTicket()}>
          Save
        </button>
      </div>
    </>
  ) : (
    <></>
  );
}

export default EditTicketModalBody;
