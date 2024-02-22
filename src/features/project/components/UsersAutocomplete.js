import React, { useEffect, useState } from 'react';
import Autocomplete from '../../../components/Input/Autocomplete';
import axios from 'axios';

function UsersAutocomplete({ updateFormValue, updateType }) {
  //query typed by user
  const [val, setVal] = useState('');

  function handleChange(obj) {
    setVal(obj.name);
    // console.log('obj.name');
    // console.log(obj.name);
    // updateFormValue({ updateType: 'id', value: obj.id });
    // console.log('obj.id');
    // console.log(obj.id);
    // updateFormValue({ updateType: 'name', value: obj.name });
    updateFormValue({updateType: updateType, value: obj});
  }

  //a list to hold all the users
  const [users, setUsers] = useState([]);

  //a list to show on the dropdown when user types
  const [items, setItems] = useState([]);

  //query rest users api and set the users list
  useEffect(() => {
    async function fetchData() {
      const url = '/api/users/names';
      const responseax = await axios.get(url, {});
      const users = responseax.data.data;
      const newItems = users.sort();
      setUsers(newItems);
    }

    fetchData();
  }, []);

  useEffect(() => {
    //if there is no value, return the users list.
    if (!val) {
      setItems(users);
      return;
    }

    //if the val changes, we filter items so that it can be filtered and set it as new state
    const newItems = users
      .filter((p) => p.name.toLowerCase().includes(val.toLowerCase()))
      .sort();
    setItems(newItems);
  }, [users, val]);

  return <Autocomplete items={items} value={val} onChange={handleChange} />;
}

export default UsersAutocomplete;
