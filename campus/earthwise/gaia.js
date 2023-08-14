document.addEventListener("DOMContentLoaded", () => {
    console.log("Propagated");
    favicon();
});

function favicon() {
    const favicon32 = document.head.querySelector('link[rel="shortcut icon"]');
    const favicon256 = document.head.querySelector('link[rel="apple-touch-icon"]');
    
    if (favicon32) {
        favicon32.href = 'https://uploads-ssl.webflow.com/61cbb439e6b4856c4aea9529/6475569a90745d54a119a184_win-favicon-32.png';
    }

    if (favicon256) {
        favicon256.href = 'https://uploads-ssl.webflow.com/61cbb439e6b4856c4aea9529/647553e954d0e02cef92e400_win-favicon-256.png';
    }

}