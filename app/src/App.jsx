import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchField, setSearchField] = useState('');
  const [search, setSearch] = useState(searchField);
  const [filter, setFilter] = useState(`?_page=${page}`);
  const [filterYearMin, setfilterYearMin] = useState(null);
  const [filterYearMax, setfilterYearMax] = useState(null);

  useEffect(() => {
    const baseURL = `http://localhost:4000/books`;
    const yearMin = filterYearMin ? `&year_gte=${filterYearMin}` : ``;
    const yearMax = filterYearMax ? `&year_lte=${filterYearMax}` : ``;

    fetch(baseURL + filter + search + yearMin + yearMax)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setData(res);
      });
  }, [loading, filter, search, page]);

  return (
    <>
      <header className='App-header'>
        <h1>Lista de Livros</h1>
        <p>Você pode também pode filtrar a pesquisa por ano.</p>
        <nav>
          <div id='find'>
            <input
              type='text'
              id='findbook'
              placeholder='Pesquise por autor, país ou título'
              value={searchField}
              onChange={({ target }) => setSearchField(target.value)}
            />
            <input
              type='number'
              max='2099'
              step='1'
              id='filterYearMin'
              placeholder='Ex: 1910'
              onChange={({ target }) => setfilterYearMin(target.value)}
            />
            <input
              type='number'
              max='2099'
              step='1'
              id='filterYearMax'
              placeholder='Ex: 2010'
              onChange={({ target }) => setfilterYearMax(target.value)}
            />
            <button
              type='submit'
              onClick={() => {
                setLoading(true);
                setPage(1);
                setFilter(`?_page=1`);
                setSearch(`&q=${searchField}`);
              }}
            >
              Pesquisar
            </button>
          </div>
          {loading ? (
            <em>Buscando livros...</em>
          ) : (
            <p>
              <strong>{data.length}</strong> livros encontrados
            </p>
          )}
        </nav>
      </header>
      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <section>
          <table>
            <tbody>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>País</th>
                <th>Ano</th>
                <th>Ações</th>
              </tr>
              {data.map((book) => (
                <tr key={nanoid()}>
                  <td key={nanoid()}>{book.title}</td>
                  <td key={nanoid()}>{book.author}</td>
                  <td key={nanoid()}>{book.country}</td>
                  <td key={nanoid()}>{book.year}</td>
                  <td key={nanoid()}>
                    <Link to='/detalhes' state={book}>
                      Ver livro
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div id='navigation'>
            <button
              onClick={() => {
                setFilter(`?_page=1`);
                setPage(1);
              }}
              disabled={page <= 1 ? true : false}
            >
              Início
            </button>
            <button
              onClick={() => {
                setFilter(`?_page=${page + 1}`);
                setPage((prev) => (prev += 1));
              }}
              disabled={data.length < 10 ? true : false}
            >
              Avançar
            </button>
            <button
              onClick={() => {
                setFilter(`?_page=${page - 1}`);
                setPage((prev) => (prev <= 2 ? (prev = 1) : (prev -= 1)));
              }}
              disabled={page <= 1 ? true : false}
            >
              Voltar
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export default App;
