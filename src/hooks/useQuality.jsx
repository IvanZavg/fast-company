import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import qualityService from '../services/qualities.service';

const QualityContext = React.createContext();
export const useQuality = () => {
  return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => getQualitiesList(), []);

  useEffect(() => {
    toast.error(error);
    setError(null);
  }, [error]);

  function getQualityById(id) {
    return qualities.find((q) => q._id === id);
  }

  function getQualitiesListByIds(idsArr) {
    return qualities.filter((q) => idsArr.includes(q._id));
  }

  async function getQualitiesList() {
    try {
      const { content } = await qualityService.get();
      setQualities(content);
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
    <QualityContext.Provider
      value={{ qualities, isLoading, getQualitiesListByIds, getQualityById }}
    >
      {children}
    </QualityContext.Provider>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
