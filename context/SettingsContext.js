import React, {useState, useEffect, useContext} from 'react';

// Context for error handling
const SettingsContext = React.createContext();

// Create provider
const SettingsProvider = props => {
  const [dataColor, setDataColor] = useState('rgb(55, 12, 120)');

  const defaultContext = {
    dataColor,
    setDataColor,
  };

  return <SettingsContext.Provider value={defaultContext}>{props.children}</SettingsContext.Provider>;
};

const useSettingsContext = () => {
  return useContext(SettingsContext);
};

export {SettingsContext, SettingsProvider, useSettingsContext};
