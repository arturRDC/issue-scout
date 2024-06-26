import { useEffect } from 'react';
import { MODAL_BODY_TYPES } from '../utils/globalConstantUtil';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../features/common/modalSlice';
import AddLeadModalBody from '../features/leads/components/AddLeadModalBody';
import AddProjectModalBody from '../features/projects/components/AddProjectModalBody';
import AddUserProjectModalBody from '../features/project/components/AddUserProjectModalBody';
import ConfirmationModalBody from '../features/common/components/ConfirmationModalBody';
import EditProjectModalBody from '../features/project/components/EditProjectModalBody';
import AddTicketProjectModalBody from '../features/project/components/AddTicketProjectModalBody';
import EditTicketModalBody from '../features/ticket/components/EditTicketModalBody';

function ModalLayout() {
  const { isOpen, bodyType, size, extraObject, title } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const close = (e) => {
    dispatch(closeModal(e));
  };

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
        <div className={`modal-box  ${size === 'lg' ? 'max-w-5xl' : ''}`}>
          <button
            className='btn btn-sm btn-circle absolute right-2 top-2'
            onClick={() => close()}
          >
            ✕
          </button>
          <h3 className='font-semibold text-2xl pb-6 text-center'>{title}</h3>

          {/* Loading modal body according to different modal type */}
          {
            {
              [MODAL_BODY_TYPES.LEAD_ADD_NEW]: (
                <AddLeadModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.PROJECT_ADD_NEW]: (
                <AddProjectModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.PROJECT_ADD_USER]: (
                <AddUserProjectModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.PROJECT_ADD_TICKET]: (
                <AddTicketProjectModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.PROJECT_EDIT]: (
                <EditProjectModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.TICKET_EDIT]: (
                <EditTicketModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION]: (
                <ConfirmationModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
