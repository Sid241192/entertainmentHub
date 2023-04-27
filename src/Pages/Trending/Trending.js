import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleComponent from "../../components/SingleComponent/SingleComponent";
import "./Trending.css";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setcontent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setcontent(data.results);
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line 
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
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
                media_type={item.media_type}
                vote_average={item.vote_average}
              />
            );
          })}
      </div>
      <CustomPagination  setPage={setPage} />
    </div>
  );
};

export default Trending;
