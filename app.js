let deferredPrompt;  // To hold the beforeinstallprompt event

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default install prompt from showing automatically
  e.preventDefault();

  // Save the event so it can be triggered later
  deferredPrompt = e;

  // Show a message or give a hint to the user
  // You can use this to display a custom "Install" button or alert
  setTimeout(() => {
    alert("You can install the app now! Press the 'Add to Home Screen' option.");
    
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's response to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Reset the deferredPrompt after the prompt
      deferredPrompt = null;
    });
  }, 2000); // Optionally delay the prompt
});

// You can also check if the app is already installed by listening to the appinstalled event
window.addEventListener('appinstalled', (e) => {
  console.log('PWA was installed successfully!');
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker registered successfully'))
        .catch((error) => console.error('Service Worker registration failed:', error));
}
