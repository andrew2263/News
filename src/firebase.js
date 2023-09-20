import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAUIUrWvj7GqstIk20X5pIjcQ8SZm5IHp4',
  authDomain: 'news-acc8f.firebaseapp.com',
  databaseURL: 'https://news-acc8f-default-rtdb.firebaseio.com',
  projectId: 'news-acc8f',
  storageBucket: 'news-acc8f.appspot.com',
  messagingSenderId: '350511337591',
  appId: '1:350511337591:web:dd1478f8625af07b723672',
  measurementId: 'G-MYL9J4600J'
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
