import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const savedUser = JSON.parse(await AsyncStorage.getItem('user'));
      if (!savedUser) {
        throw new Error('something went wrong');
      } else {
        setUser(savedUser);
        // console.log(savedUser);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{loading, user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
