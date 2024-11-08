/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCvf-Aln2qMSJcWO9lyDA0hvOaCeq_2kGM",
  authDomain: "saborexpress-3673b.firebaseapp.com",
  projectId: "saborexpress-3673b",
  storageBucket: "saborexpress-3673b.appspot.com",
  messagingSenderId: "786702884332",
  appId: "1:786702884332:web:b26c7892da1a685ea934c9"
});

const messaging = firebase.messaging();

// Notificaciones en segundo plano
messaging.onBackgroundMessage((payload) => {
  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: 'logo.png',
    data: payload.notification.data || {}
  });
});