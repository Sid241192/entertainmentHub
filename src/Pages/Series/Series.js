import React, { useEffect, useState } from "react";
import Genres from "../../components/Genres/Genres";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import axios from "axios";
import useGenre from "../../hooks/useGenre";
import SingleComponent from "../../components/SingleComponent/SingleComponent";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setcontent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenre, setselectedGenre] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenre);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setcontent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genreforURL]);
  return (
    <div>
      <span className="pageTitle">Series</span>
      <Genres
        type="tv"
        selectedGenre={selectedGenre}
        setselectedGenre={setselectedGenre}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((item, index) => {
            return (
              <SingleComponent
                key={item.id}
                id={item.id}
                poster={item.poster_path}
                title={item.title || item.name}
                date={item.first_air_date || item.release_date}
                media_type="tv"
                vote_average={item.vote_average}
              />
            );
          })}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Series;
