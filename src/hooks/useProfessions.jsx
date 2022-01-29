import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import professionService from '../services/profession.service';

const ProfessionsContext = React.createContext();

export const useProfessions = () => {
  return useContext(ProfessionsContext);
};

export const ProfessionsProvider = ({ children }) => {
  const [professions, setProfessions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    toast.error(error);
    setError(null);
  }, []);

  useEffect(() => {
    getProfessionsList();
  }, [error]);

  function getProfession(id) {
    return professions.find((p) => p._id === id);
  }

  async function getProfessionsList() {
    try {
      const { content } = await professionService.get();
      setProfessions(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }

  return (
    <ProfessionsContext.Provider
      value={{ professions, isLoading, getProfession }}
    >
      {children}
    </ProfessionsContext.Provider>
  );
};

ProfessionsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
