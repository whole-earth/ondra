// live, not linked (yet)

window.addEventListener('load', function () {

        aspectRatio();

        // date within lib-info
        let today = new Date();
        let launch = new Date("2023-01-12");
        let daysSince = Math.round((today - launch) / (1000 * 60 * 60 * 24));
        document.getElementById('numDaysAgo').innerHTML = "Launched " + daysSince + " days ago";

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
            console.log(`Considering image ${currImage.src} with ${currImage.naturalWidth} and height ${currImage.naturalHeight}`);
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

    // lib info functions
    // on info open, disable body overflow
    document.getElementById('library-info').addEventListener('click', function () {
        document.body.style.overflow = 'hidden';
    });

    // mirror click to info div
    document.getElementById('mirrorClickInfo').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('library-info').click();
    });

    let libInfoBody = document.querySelector('.lib-info-body');

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.offsetHeight !== 0) {
                const main = document.querySelector('.lib-info-main');
                const aboutTrigger = document.getElementById('libAboutTrigger');
                const functionTrigger = document.getElementById('libFunctionTrigger');
                const purposeTrigger = document.getElementById('libPurposeTrigger');
                const feedbackTrigger = document.getElementById('libFeedbackTrigger');
                const aboutSection = document.getElementById('libAbout');
                const functionSection = document.getElementById('libFunction');
                const purposeSection = document.getElementById('libPurpose');
                const feedbackSection = document.getElementById('libFeedback');

                let aboutPos = aboutSection.offsetTop;
                let functionPos = functionSection.offsetTop;
                let purposePos = purposeSection.offsetTop;
                let feedbackPos = feedbackSection.offsetTop;

                aboutTrigger.addEventListener('click', function (event) {
                    event.preventDefault();
                    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
                });

                functionTrigger.addEventListener('click', function (event) {
                    event.preventDefault();
                    functionSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
                });

                purposeTrigger.addEventListener('click', function (event) {
                    event.preventDefault();
                    purposeSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
                });

                feedbackTrigger.addEventListener('click', function (event) {
                    event.preventDefault();
                    feedbackSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
                });

                main.addEventListener('scroll', function () {

                    let currentPos = main.scrollTop;
                    aboutPos = aboutSection.offsetTop;
                    purposePos = purposeSection.offsetTop;
                    functionPos = functionSection.offsetTop;
                    feedbackPos = feedbackSection.offsetTop;

                    // if within 'ABOUT'
                    if (currentPos >= aboutPos && currentPos < purposePos) {
                        purposeTrigger.classList.remove('info-label-active');
                        functionTrigger.classList.remove('info-label-active');
                        feedbackTrigger.classList.remove('info-label-active');
                        aboutTrigger.classList.add('info-label-active');
                    }

                    // if within 'FUNCTION'
                    if (currentPos >= functionPos && currentPos < purposePos) {
                        aboutTrigger.classList.remove('info-label-active');
                        purposeTrigger.classList.remove('info-label-active');
                        feedbackTrigger.classList.remove('info-label-active');
                        functionTrigger.classList.add('info-label-active');
                    }

                    // if within 'PURPOSE'
                    if (currentPos >= purposePos && currentPos < feedbackPos) {
                        aboutTrigger.classList.remove('info-label-active');
                        functionTrigger.classList.remove('info-label-active');
                        feedbackTrigger.classList.remove('info-label-active');
                        purposeTrigger.classList.add('info-label-active');
                    }

                    // if within 'FEEDBACK'
                    if (currentPos >= feedbackPos) {
                        aboutTrigger.classList.remove('info-label-active');
                        purposeTrigger.classList.remove('info-label-active');
                        functionTrigger.classList.remove('info-label-active');
                        feedbackTrigger.classList.add('info-label-active');
                    }
                });
            }
        });
    });

    observer.observe(libInfoBody, { attributes: true, attributeFilter: ['style'] });

    // on info close, preserve body overflow
    document.querySelector('.lib-info-escape').addEventListener('click', function () {
        document.body.style.overflow = 'auto';
    });

    // on click outside of the info body div, close module
    document.querySelector('.lib-info').addEventListener('click', function () {
        if (!event.target.closest('.lib-info-body')) {
            document.querySelector('.lib-info-escape').click();
        }
    });

    // on escape button press close module
    document.addEventListener('keydown', function () {
        if (event.key === 'Escape') {
            if (!(document.querySelector('.lib-info').style.display === 'none')) {
                document.querySelector('.lib-info-escape').click();
            }
        }
    });

    // Email checkbox validation
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    let updateDiv = document.getElementById("libEmailUpdateDiv");
    let emailInput = document.getElementById("libEmailInput");

    emailInput.addEventListener("input", function () {
        if (validateEmail(emailInput.value)) {
            updateDiv.style.color = "#222";
        } else {
            updateDiv.style.color = "afafaf";
        }
    });
