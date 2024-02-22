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

function AddUserProjectModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = extraObject;
  const INITIAL_USER_PROJECT_OBJ = {
    role: 'developer',
    projectId: id,
    user: {
      name: '',
      id: null,
    },
  };
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userProjectObj, setUserProjectObj] = useState(
    INITIAL_USER_PROJECT_OBJ
  );

  const addUserProject = () => {
    if (userProjectObj.user.name.trim() === '')
      return setErrorMessage('Name is required!');
    else if (userProjectObj.role === '')
      return setErrorMessage('Role is required!');
    else {
      axios.post(`/api/projects/${id}/addUser/${userProjectObj.user.id}`);
      dispatch(showNotification({ message: 'New User Added!', status: 1 }));
      closeModal();
      navigate(`/app/projects/${id}`);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setUserProjectObj({ ...userProjectObj, [updateType]: value });
    console.log('userProjectObj');
    console.log(userProjectObj);
  };
  const users = ['Artur', 'Barbara', 'Carlos'];
  const [value, setValue] = useState('');

  const [role, setRole] = useState('developer');
  return (
    <>
      <label className='label'>
        <span className={'label-text text-base-content '}>Name</span>
      </label>
      <UsersAutocomplete
        updateFormValue={updateFormValue}
        updateType={'user'}
      ></UsersAutocomplete>

      <label className='label'>
        <span className={'label-text text-base-content '}>Role</span>
      </label>
      <select
        className='select select-bordered w-full'
        defaultValue='developer'
        onChange={(e) =>
          updateFormValue({ updateType: 'role', value: e.target.value })
        }
      >
        <option value={'developer'}>Developer</option>
        <option value={'manager'}>Manager</option>
        <option value={'submitter'}>Submitter</option>
      </select>

      <ErrorText styleClass='mt-16'>{errorMessage}</ErrorText>
      <div className='modal-action'>
        <button className='btn btn-ghost' onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className='btn btn-primary px-6'
          onClick={() => addUserProject()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddUserProjectModalBody;
