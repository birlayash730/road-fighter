function determineAppServerKey() {
  var vapidPublicKey = "BDpCryIIPrBwiHh-5VFU0p2Qpn1230bXUqAUAwnl7UItgKkFY5XSzffnv2OhXCLFIHzTmh9k_r4TCtJGtACNxkw";
  return urlBase64ToUint8Array(vapidPublicKey);
}

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ("serviceWorker" in navigator) {
  // window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(
        async (response) => {
          const subscription = await response.pushManager.getSubscription();
          return await response.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: determineAppServerKey()
          }).catch(error => {
          console.log("Registration failed");
          console.log(error);
        });
      })
    }
  



  // "BDpCryIIPrBwiHh-5VFU0p2Qpn1230bXUqAUAwnl7UItgKkFY5XSzffnv2OhXCLFIHzTmh9k_r4TCtJGtACNxkw"

  //------------------------------Notification--------------------------------
  function hasNetwork(online) {
    const element = document.querySelector(".status");
    // Update the DOM to reflect the current status
    if (online) {
      element.classList.remove("offline");
      element.classList.add("online");
      element.innerText = "Online";
    } else {
      element.classList.remove("online");
      element.classList.add("offline");
      element.innerText = "Offline";
    }
  }

  window.addEventListener("load", () => {
    hasNetwork(navigator.onLine);
  
    window.addEventListener("online", () => {
      // Set hasNetwork to online when they change to online.
      hasNetwork(true);
    });
  
    window.addEventListener("offline", () => {
      // Set hasNetwork to offline when they change to offline.
      hasNetwork(false);
    });
  });