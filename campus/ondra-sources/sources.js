window.addEventListener('load', function () {
    aspectRatio();
});

// disable 'enter' button
window.addEventListener('keydown', function (e) {
    if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
        if (e.target.nodeName == 'INPUT' && e.target.type == 'text') {
            e.preventDefault(); return false;
        }
    }
}, true);

function aspectRatio() {
    const wrap = document.querySelectorAll('.source');
    const images = document.querySelectorAll('.source-thumbnail-src');

    for (let i = 0; i < images.length; i++) {
        const currImage = images[i];
        // console.log(`Considering image ${currImage.src} with ${currImage.naturalWidth} and height ${currImage.naturalHeight}`);
        if (currImage.naturalWidth > currImage.naturalHeight) {
            wrap[i].classList.add('landscape');
        } else if (currImage.naturalWidth < currImage.naturalHeight) {
            wrap[i].classList.add('portrait');
        } else {
            wrap[i].classList.add('square');
        }
    }
}

// Swiper initialize
const swiper1 = new Swiper(".swiper", {
    direction: "horizontal",
    slidesPerView: 'auto',
    freeMode: true,
    grabCursor: true,
    scroll: true,
});