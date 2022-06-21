import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Details() {
  const {
    state: { imageLink, title, author, country, language, link, pages, year },
  } = useLocation();

  return (
    <>
      <Link to='/'>Voltar</Link>
      <section>
        <img src={imageLink} alt={title} />
        <h1>{title}</h1>
        <strong>{author}</strong>
        <p>{country}</p>
        <p>{language}</p>
        <a href={link} rel='no-referrer'>
          Acessar
        </a>
        <p>{pages}</p>
        <p>{year}</p>
      </section>
    </>
  );
}
