import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

function App() {
  const [API, setAPI] = useState();
  const [loading, setLoading] = useState(true);
  const [inputFind, setInputFind] = useState('');
  const [buttonFind, setButtonFind] = useState(inputFind);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(`?_page=${page}`);
  const [filterYearMin, setfilterYearMin] = useState(0);
  const [filterYearMax, setfilterYearMax] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:4000/books${filter}${buttonFind}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setAPI(data);
      });
  }, [loading, filter, buttonFind, page, filterYearMin]);

  return (
    <>
      <header className='App-header'>
        <h1>Lista de Livros</h1>
        <p>Você pode filtrar através do campo de pesquisa.</p>
        <nav>
          <div id='find'>
            <input
              type='text'
              id='findbook'
              placeholder='Autor, país, título'
              value={inputFind}
              onChange={({ target }) => setInputFind(target.value)}
            />
            <strong>Filtrar por Ano: </strong>
            <input
              onChange={({ target }) => setfilterYearMin(target.value)}
              type='number'
              id='filterYearMin'
              placeholder='min'
              value={filterYearMin}
            />
            <input
              onChange={({ target }) => setfilterYearMax(target.value)}
              type='number'
              id='filterYearMax'
              placeholder='max'
              value={filterYearMax}
            />
            <button
              type='submit'
              onClick={() => {
                setLoading(true);
                setButtonFind(`&q=${inputFind}`);
              }}
            >
              Pesquisar
            </button>
          </div>
          <div>
            <strong>{loading ? <p>Aguarde</p> : API.length} livros encontrados</strong>
          </div>
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
              </tr>
              {API.map((book) => (
                <tr key={nanoid()}>
                  <td key={nanoid()}>{book.title}</td>
                  <td key={nanoid()}>{book.author}</td>
                  <td key={nanoid()}>{book.country}</td>
                  <td key={nanoid()}>{book.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button
              onClick={() => {
                setPage(1);
                setFilter(`?_page=${page}`);
              }}
            >
              Início
            </button>
            <button
              onClick={() => {
                setFilter(`?_page=${page + 1}`);
                setPage((prev) => (prev += 1));
              }}
              disabled={API.length < 10 ? true : false}
            >
              Avançar
            </button>
            <button
              onClick={() => {
                setFilter(`?_page=${page - 1}`);
                setPage((prev) => (prev <= 2 ? (prev = 1) : (prev -= 1)));
              }}
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
