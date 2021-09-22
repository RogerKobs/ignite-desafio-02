import { Dispatch, SetStateAction, useState, useEffect } from 'react';

import { GenreResponseProps } from '../App';
import { api } from '../services/api';

import { Button } from './Button';

interface SideBarProps {
  setSelectedGenreId: Dispatch<SetStateAction<number>>
  selectedGenreId: number
}

export function SideBar({ setSelectedGenreId, selectedGenreId }: SideBarProps) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return(
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}