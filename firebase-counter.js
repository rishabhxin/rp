
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import {
  getDatabase,
  ref,
  runTransaction,
  onValue
} from
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Paste your complete Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyDwltnm6Txu4wngpRZ-WKYxOsCo5S0MeS8",
  authDomain: "rpblog25.firebaseapp.com",
  databaseURL: "https://rpblog25-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rpblog25",
  storageBucket: "rpblog25.firebasestorage.app",
  messagingSenderId: "583869648670",
  appId: "1:583869648670:web:226b74625748738acac30f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Lifetime page views
const lifetimeRef = ref(database, "stats/lifetimeVisits");

const countElement = document.getElementById("lifetime-count");

// Display the current count
onValue(lifetimeRef, (snapshot) => {
  const count = snapshot.val() || 0;

  if (countElement) {
    countElement.textContent =
      new Intl.NumberFormat("en-IN").format(count);
  }
});

// Increase count on every page load
if (countElement) {
  runTransaction(lifetimeRef, (current) => {
    return (current || 0) + 1;
  }).catch((error) => {
    console.error("Counter error:", error);
  });
}
