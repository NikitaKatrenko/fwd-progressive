if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('service worker registered', reg))
        .catch((reg) => console.log('service worker not registered', reg))
}

navigator.serviceWorker.getRegistrations().then(
    regs => {
        for(const reg of regs) {
            reg.unregister();
        }
    }
)