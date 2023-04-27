import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

const Genres = ({
  type,
  selectedGenre,
  setselectedGenre,
  genres,
  setGenres,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setselectedGenre([...selectedGenre, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const handleRemove = (genre) => {
    setselectedGenre(selectedGenre.filter((g) => g.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };
  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres([]);
    };
  }, []);
  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenre &&
        selectedGenre.map((item, index) => {
          return (
            <Chip
              label={item.name}
              key={item.id}
              color="primary"
              style={{ margin: 2 }}
              clickable
              size="small"
              onDelete={()=>handleRemove(item)}
            />
          );
        })}

      {genres &&
        genres.map((item, index) => {
          return (
            <Chip
              label={item.name}
              key={item.id}
              color="warning"
              style={{ margin: 2 }}
              clickable
              size="small"
              onClick={() => handleAdd(item)}
            />
          );
        })}
    </div>
  );
};

export default Genres;
