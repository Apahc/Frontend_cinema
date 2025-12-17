import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Flex, Typography, Tag } from "antd";
import { getMovie } from "../../utils/requests";
import "./MoviePage.css";

const MoviePage = () => {
  const { movieId } = useParams(); 
  const [movie, setMovie] = useState({
    id: 1,
    title: {
      ru: "Дюна: Часть вторая",
      en: "Dune: Part Two",
    },
    rating: 8.2,
    details: {
      year: 2024,
      director: "Дени Вильнёв",
      screenwriter: "Дени Вильнёв",
      genres: ["драма", "боевик", "фантастика"],
      country: "США",
      description:
        "Герцог Пол Атрейдес присоединяется к фрименам, чтобы стать Муад'Дибом, одновременно пытаясь остановить наступление войны.",
    },
    poster:
      "https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/34ecdec6-c76f-4cd7-818c-905803184ed8/orig",
    actors: [
      "Тимоти Шаламе",
      "Зендая",
      "Ребекка Фергюсон",
      "Хавьер Бардем",
      "Остин Батлер",
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await getMovie(movieId);
        setMovie(res.data); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setLoading(false); 
      }
    };

    fetchMovie();
  }, [movieId]);

  const items = [
    { label: "год", children: movie.details.year },
    {
      label: "режиссер",
      children: movie.details.director,
    },
    {
      label: "сценарист",
      children: movie.details.screenwriter,
    },
    {
      label: "жанр",
      children: (
        <>
          {movie.details.genres.map((genre) => (
            <Tag color="#FF7A85" key={genre}>
              {genre}
            </Tag>
          ))}
        </>
      ),
    },
    {
      label: "страна",
      children: movie.details.country,
    },
    {
      label: "описание",
      children: movie.details.description,
      span: 3,
    },
  ];

  if (loading) {
    return <div>Loading...</div>; // Or use a spinner from Ant Design
  }

  return (
    <div id="movie-page">
      <div className="content-movie-container">
        <Flex gap={30} align="center">
          <Typography.Title className="movie-title" level={4}>
            {movie.title.ru}
          </Typography.Title>
          <Typography.Title className="movie-title light" level={4}>
            {movie.title.en}
          </Typography.Title>
        </Flex>
      </div>
      <div className="content-movie-container">
        <Flex gap={90}>
          <img className="movie-img" src={movie.poster} alt={movie.title.ru} />
          <div className="movie-info-container">
            <Flex></Flex>
            <Descriptions
              column={1}
              colon={false}
              title={"О фильме"}
              bordered
              items={items}
            ></Descriptions>
          </div>
        </Flex>
      </div>
      <div className="content-movie-container"></div>
    </div>
  );
};

export default MoviePage;