export default function Details(props) {
  return (
    <>
      <button type='button'>Voltar</button>
      <section>
        <img src={props.imageLink} alt={props.title} />
        <h1>{props.title}</h1>
        <strong>{props.author}</strong>
        <p>{props.country}</p>
        <p>{props.language}</p>
        <a href={props.link}>Acessar</a>
        <p>{props.pages}</p>
        <p>{props.year}</p>
      </section>
    </>
  );
}
