import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createChannel } from '../apiService';

function CreateChannel() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    if (name.trim().length < 3) {
      alert('Channel name must be at least 3 characters long.');
      return;
    }
    setIsLoading(true);
    try {
      await createChannel({ name, description }); // Assume createChannel is a function that makes the API call
      alert('Channel created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to create channel:', error);
      alert('An error occurred while creating the channel. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Channel</h2>
      <form onSubmit={handleCreateChannel}>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default CreateChannel;