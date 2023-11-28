const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.info("Service worker installing.");
      } else if (registration.waiting) {
        console.log("Service worker installed.");
      } else if (registration.active) {
        console.info("Service worker active.");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}.`);
    }
  }
};

const unregisterServiceWorkers = async () => {
  workers = await navigator.serviceWorker.getRegistrations();
  workers.forEach( async worker => {
    await worker.unregister();
  })
}

const updateServiceWorker = async () => {
  await unregisterServiceWorkers();
  await registerServiceWorker();
}

registerServiceWorker();
