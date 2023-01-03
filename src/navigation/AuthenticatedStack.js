import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import {Colors} from '../config/styles';
import IconButton from '../components/ui/IconButton';

import {useDispatch} from 'react-redux';
import {logOut} from '../store/AuthToken';

const Stack = createNativeStackNavigator();

function AuthenticatedStack() {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({tintColor}) => (
            <IconButton
              icon="close"
              color={tintColor}
              size={24}
              onPress={() => dispatch(logOut())}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthenticatedStack;
