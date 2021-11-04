import { useState, useEffect } from "react";
import { RepositoryItem } from "./RepositoryItem";
import "../style/repositories.scss";
//https://api.github.com/orgs/rocketseat/repos
interface  Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([ ]);
   //Cuidar para não deixar o useEffect sem a variável de estado
  useEffect(() => {
      //busca os repositorios
      fetch('https://api.github.com/orgs/rocketseat/repos')
      //Quando a busca devolver uma resposta, transforma a resposta em .json
      .then(response => response.json())
      //Quando a busca terminar será devolvido os dados e armazenado na variavel de estado
      .then(data => setRepositories(data))
      //Quando os dados forem devolvidos será alterado o estado da variável
  }, [repositories])
  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>
      <ul>
          {repositories.map(repository => {
              return <RepositoryItem key={repository.name} repository={repository} />
          })}
      </ul>
    </section>
  );
}
