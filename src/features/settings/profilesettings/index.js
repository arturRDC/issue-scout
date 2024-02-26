import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleCard from '../../../components/Cards/TitleCard';
import { showNotification } from '../../common/headerSlice';
import InputText from '../../../components/Input/InputText';
import TextAreaInput from '../../../components/Input/TextAreaInput';
import ToogleInput from '../../../components/Input/ToogleInput';
import axios from 'axios';

function ProfileSettings() {
  const dispatch = useDispatch();

  let initialProfileObj = null;

  useEffect(() => {
    axios
      .get('/api/auth/me')
      .then((res) =>
        setProfileObj({
          name: res.data.username,
          email: res.data.email,
          password: '',
          repeatPassword: '',
          profilePicture: '',
        })
      )
      .catch(() => console.error('error fetching data'));
  }, []);

  const [profileObj, setProfileObj] = useState(initialProfileObj);
  // Call API to update profile settings changes
  const updateProfile = () => {
    dispatch(showNotification({ message: 'Profile Updated', status: 1 }));
    if (
      (profileObj.password || profileObj.repeatPassword) &&
      profileObj.password === profileObj.repeatPassword
    ) {
      dispatch(
        showNotification({
          message: 'Error: Passwords do not match',
          status: 0,
        })
      );
    }
    const formData = new FormData();
    for (let property in profileObj) {
      if (
        profileObj.hasOwnProperty(property) &&
        property !== 'repeatPassword' &&
        profileObj[property] !== ''
      )
        formData.append(property, profileObj[property]);
    }
    axios.put('/api/users/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const updateFormValue = ({ updateType, value }) => {
    setProfileObj({ ...profileObj, [updateType]: value });
  };

  return profileObj !== null ? (
    <>
      <TitleCard title='Profile Settings' topMargin='mt-2'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <InputText
            labelTitle='Name'
            defaultValue={profileObj.name}
            updateType={'name'}
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle='Email'
            defaultValue={profileObj.email}
            updateType={'email'}
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle='Password'
            type='password'
            updateType={'password'}
            defaultValue={profileObj.password}
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle='Repeat Password'
            type='password'
            updateType={'repeatPassword'}
            defaultValue={profileObj.repeatPassword}
            updateFormValue={updateFormValue}
          />
          <div className='col-span-2'>
            <label className='label'>
              <span className={'label-text text-base-content '}>
                Profile Picture
              </span>
            </label>
            <input
              type='file'
              className='file-input file-input-bordered w-full '
              onChange={(e) =>
                updateFormValue({
                  updateType: 'profilePicture',
                  value: e.target.files[0],
                })
              }
            />
          </div>
        </div>

        <div className='mt-8'>
          <button
            className='btn btn-primary float-right'
            onClick={() => updateProfile()}
          >
            Update
          </button>
        </div>
      </TitleCard>
    </>
  ) : (
    <></>
  );
}

export default ProfileSettings;
