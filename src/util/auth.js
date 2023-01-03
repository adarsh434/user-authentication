import axios from 'axios';

const API_KEY = 'AIzaSyDSlr8LeX_JoNXfMusD4atbiABAuMqP_74';

async function authentication(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  return token;
}

export function createUser(email, password) {
  return authentication('signUp', email, password);
}

export function login(email, password) {
  return authentication('signInWithPassword', email, password);
}
