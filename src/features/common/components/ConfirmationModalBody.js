import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_CLOSE_TYPES,
} from '../../../utils/globalConstantUtil';
import { deleteLead } from '../../leads/leadSlice';
import { showNotification } from '../headerSlice';
import { deleteProject } from '../../projects/projectSlice';
import { useNavigate } from 'react-router-dom';

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const { message, type, _id, index } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE) {
      // positive response, call api or dispatch redux function
      dispatch(deleteLead({ index }));
      dispatch(showNotification({ message: 'Lead Deleted!', status: 1 }));
    }
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.PROJECT_DELETE) {
      // positive response, call api or dispatch redux function
      dispatch(deleteProject({ index }));
      dispatch(showNotification({ message: 'Project Deleted!', status: 1 }));
      navigate('/app/projects');
    }
    closeModal();
  };

  return (
    <>
      <p className=' text-xl mt-8 text-center'>{message}</p>

      <div className='modal-action mt-12'>
        <button className='btn btn-outline   ' onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className='btn btn-primary w-36'
          onClick={() => proceedWithYes()}
        >
          Yes
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
