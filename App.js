import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './src/navigation/AuthNavigation';
import AuthenticatedStack from './src/navigation/AuthenticatedStack';
import {Provider} from 'react-redux';
import {AuthContext} from './src/store/AuthContext';

import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authenticate} from './src/store/AuthToken';
import LoadingOverlay from './src/components/ui/LoadingOverlay';

function Navigation() {
  const token = useSelector(state => state.authToken.token);
  //console.log(token);
  return (
    <NavigationContainer>
      {token ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsTryingLogin(true);
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        dispatch(authenticate({token: storedToken}));
      }

      setIsTryingLogin(false);
    }
    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <LoadingOverlay />;
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={AuthContext}>
        <Root />
      </Provider>
    </>
  );
}
