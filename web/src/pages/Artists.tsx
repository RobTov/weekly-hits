import React, { useEffect } from 'react'
import { useArtistStore } from '../store/artist-store';

const Artists = () => {
  const {
    artists,
    getArtist,
    createArtist,
    updateArtist,
    deleteArtist
  } = useArtistStore();

  useEffect(() => {
    const onComponentLoad = () => {
      getArtist()
    };

    onComponentLoad();
  }, []);

  return (
    <div>
      <h1>Product Management</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Artists
