import React from 'react'
import { useArtistStore } from '.././store/artist-store';


export default function Home() {
    const {
    artists,
    getArtist,
    createArtist,
    updateArtist,
    deleteArtist
  } = useArtistStore();

  return (
    <>
        <h1>HOME</h1>
    </>
  )
}
