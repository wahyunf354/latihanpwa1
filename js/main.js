// Pendaftaran Service Worker
if (!("serviceWorker" in navigator)) {
    console.log('Browser tidak mendukung service worker');
} else {
    navigator.serviceWorker
        .register("/sw.js")
        .then(function (regis) {
            console.log("Sevice Terdaftar scope : ", regis.scope);
        })
        .catch((error) => {
            console.log("Pendaftaran gagal sw, Error : ", error);
        });
}
// akhir pendaftaran sw

// Memanggil API pertama kali

document.addEventListener('DOMContentLoaded', () => {
    getApi();
});