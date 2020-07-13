import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

// import { Container } from './styles';

export default function Repository({ match }) {
  const [repoInfo, setRepoInfo] = useState({});
  const [repoIssues, setRepoIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getRepoInfo() {
    const repoName = decodeURIComponent(match.params.repo);

    const response = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    setRepoInfo(response[0].data);
    setRepoIssues(response[1].data);

    await setLoading(false);
  }

  useEffect(getRepoInfo, []);

  return <h1>Repository</h1>;
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repo: PropTypes.string,
    }),
  }).isRequired,
};
