import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Details() {
  const {
    state: { imageLink, title, author, country, language, link, pages, year },
  } = useLocation();

  return (
    <>
      <Link to='/' id='backLibraries'>
        &lt; Voltar
      </Link>
      <section id='details'>
        <div>
          <img src={imageLink} alt={title} />
        </div>
        <div>
          <h1>{title}</h1>
          <strong>Autor: {author}</strong>
          <p>País: {country}</p>
          <p>Idioma: {language}</p>
          <p>Total Páginas: {pages}</p>
          <p>Ano de publicação: {year}</p>
          <a href={link} rel='no-referrer'>
            Ver na Wikipédia
          </a>
        </div>
      </section>
    </>
  );
}
