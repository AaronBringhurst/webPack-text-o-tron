const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// click handler for beforeinstallprompt
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    window.deferredPrompt = event;
    butInstall.style.display = 'block';
});

// click handler for butInstall
butInstall.addEventListener('click', async () => {
    if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        const { outcome } = await window.deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        window.deferredPrompt = null;
        butInstall.style.display = 'none';
    }
});

// handler for appinstalled
window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed');
});