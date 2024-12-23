import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewChannel } from "../apiService.js";

function CreateNewChannel(){
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleCreateNewChannel = async (e) => {
    e.preventDefault();
    await createNewChannel({ name, description });
    navigate('/');
  };

  return (
    <div>
      <h2>Create Channel</h2>
      <form onSubmit={handleCreateNewChannel}>
        <input
          type="text"
          placeholder="Channel Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateNewChannel;