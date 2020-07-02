import React, { useEffect, useState } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Container, Form, SubmitButton, List } from './styles';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      setRepos([...repos, data]);

      setNewRepo('');
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  function localRepositories() {
    const localRepos = JSON.parse(localStorage.getItem('repos'));
    if (localRepos) {
      setRepos(localRepos);
    }
  }

  useEffect(localRepositories, []);

  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repos));
  }, [repos]);

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#fff" size={16} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repos.map((repo) => {
          return (
            <Link
              key={repo.name}
              to={`/repository/${encodeURIComponent(repo.name)}`}
            >
              <li>{repo.name}</li>
            </Link>
          );
        })}
      </List>
    </Container>
  );
}
