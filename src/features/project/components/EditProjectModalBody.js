import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from '../../common/headerSlice';
import { editProject } from '../../projects/projectSlice';
import checkAuth from '../../../app/auth';
import moment from 'moment';
import axios from 'axios';

function EditProjectModalBody({ closeModal, extraObject: index }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { projects } = useSelector((state) => state.project);
  const INITIAL_PROJECT_OBJ = projects[index - 1];
  const [projectObj, setProjectObj] = useState(INITIAL_PROJECT_OBJ);

  const saveProject = () => {
    if (projectObj.name.trim() === '')
      return setErrorMessage('Name is required!');
    else if (projectObj.desc.trim() === '')
      return setErrorMessage('Description is required!');
    else {
      let updatedProjectObj = {
        id: Number(index),
        name: projectObj.name,
        desc: projectObj.desc,
        manager: projectObj.manager,
        updatedAt: moment(new Date()).format('DD MMM YY HH:mm'),
        createdAt: projectObj.createdAt,
      };
      let fData = new FormData();
      fData.append("id", Number(index));
      fData.append("name", projectObj.name);
      fData.append("desc", projectObj.desc);

      axios
        .put(`/api/projects/${index}`, fData)
        .then(() => {
          dispatch(showNotification({ message: 'Project Saved!', status: 1 }));
          dispatch(editProject({ index: index - 1, updatedProjectObj }));
        })
        .catch((e) => {
          dispatch(
            showNotification({ message: 'Unable to save Project', status: 0 })
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
        <button className='btn btn-primary px-6' onClick={() => saveProject()}>
          Save
        </button>
      </div>
    </>
  );
}

export default EditProjectModalBody;
