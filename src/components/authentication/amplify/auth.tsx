import { Auth, } from 'aws-amplify';

export async function signIn(username: string, password: string) {
  return new Promise((resolve, reject) => {
    try {
      resolve(Auth.signIn(username, password));
    } catch (error) {
      reject(error);
    }
  })
}

export async function signOut() {
  return new Promise((resolve, reject) => {
    try {
      resolve(Auth.signOut());
    } catch (error) {
      reject(error);
    }
  })
}

export async function globalSignOut() {
  try {
    await Auth.signOut({ global: true });
  } catch (error) {
    console.log('error signing out: ', error);
  }
}