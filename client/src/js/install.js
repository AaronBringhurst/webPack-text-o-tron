const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// click handler for beforeinstallprompt
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.style.display = 'block';
});

// click handler for butInstall
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
        butInstall.style.display = 'none';
    }
});

// handler for appinstalled
window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed');
});