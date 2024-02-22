import { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from '../../common/headerSlice';
import { addNewProject } from '../projectSlice';
import checkAuth from '../../../app/auth';
import moment from 'moment';

const token = checkAuth();

const INITIAL_PROJECT_OBJ = {
  name: '',
  desc: '',
  manager: token,
  last_updated: moment(new Date()).format('DD MMM YY'),
  created_at: moment(new Date()).format('DD MMM YY'),
};

function AddProjectModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [projectObj, setProjectObj] = useState(INITIAL_PROJECT_OBJ);

  const saveNewProject = () => {
    if (projectObj.name.trim() === '')
      return setErrorMessage('Name is required!');
    else if (projectObj.desc.trim() === '')
      return setErrorMessage('Description is required!');
    else {
      let newProjectObj = {
        name: projectObj.name,
        desc: projectObj.desc,
        manager: token,
        last_updated: moment(new Date()).format('DD MMM YY'),
        created_at: moment(new Date()).format('DD MMM YY'),
      };
      dispatch(addNewProject({ newProjectObj }));
      dispatch(showNotification({ message: 'New Project Added!', status: 1 }));
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setProjectObj({ ...projectObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type='text'
        defaultValue={projectObj.name}
        updateType='name'
        containerStyle='mt-4'
        labelTitle='Name'
        updateFormValue={updateFormValue}
      />

      <InputText
        type='text'
        defaultValue={projectObj.desc}
        updateType='desc'
        containerStyle='mt-4'
        labelTitle='Description'
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass='mt-16'>{errorMessage}</ErrorText>
      <div className='modal-action'>
        <button className='btn btn-ghost' onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className='btn btn-primary px-6'
          onClick={() => saveNewProject()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddProjectModalBody;
