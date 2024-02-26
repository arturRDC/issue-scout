import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from '../../common/headerSlice';
import { addNewProject } from '../projectSlice';
import moment from 'moment';
import axios from 'axios';

function AddProjectModalBody({ closeModal }) {
  const [name, setName] = useState('');
  const INITIAL_PROJECT_OBJ = {
    name: '',
    desc: '',
    manager: name,
    updatedAt: moment(new Date()).format('dd MMM yy HH:mm'),
    createdAt: moment(new Date()).format('dd MMM yy'),
  };
  useEffect(() => {
    axios
      .get('/api/auth/me')
      .then((res) => setName(res.data.username))
      .catch(() => console.error('error fetching data'));
  }, []);

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
        manager: name.charAt(0).toUpperCase() + name.substring(1),
        updatedAt: moment(new Date()).format('DD MMM YY HH:mm'),
        createdAt: moment(new Date()).format('DD MMM YY'),
      };
      let fData = new FormData();
      fData.append("name", projectObj.name);
      fData.append("desc", projectObj.desc);
      axios
        .post('/api/projects', fData)
        .then(() => {
          dispatch(
            showNotification({ message: 'New Project Added!', status: 1 })
          );
          dispatch(addNewProject({ newProjectObj }));
        })
        .catch((e) => {
          dispatch(
            showNotification({ message: 'Unable to create Project', status: 0 })
          );
        });
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
