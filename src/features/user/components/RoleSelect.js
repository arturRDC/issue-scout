import { useState } from 'react';

function RoleSelect({ updateType, updateFormValue, defaultValue }) {
  const [role, setRole] = useState(defaultValue);
  const handleRoleSelect = (val) => {
    setRole([val]);
    updateFormValue({ updateType, value: [val] });
  };
  return (
    <>
      <label className='label'>
        <span className={'label-text text-base-content mt-4'}>Role</span>
      </label>
      <select
        className='select select-bordered select w-full'
        value={role}
        onChange={(e) => handleRoleSelect(e.target.value)}
      >
        <option value={'Admin'}>Admin</option>
        <option value={'Developer'}>Developer</option>
        <option value={'Manager'}>Manager</option>
        <option value={'Submitter'}>Submitter</option>
      </select>
    </>
  );
}
export default RoleSelect;