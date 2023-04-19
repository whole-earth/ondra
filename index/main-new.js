// 9:08 LA time
// 4.19.23

// weather emoji
fetch('https://api.openweathermap.org/data/2.5/weather?lat=34.019451&lon=-118.491188&units=imperial&appid=e94859be42276a7dd1791b66b543e1b5')
    .then(response => response.json())
    .then(data => {

        icons = {
            "01d": "☀️",
            "02d": "⛅️",
            "03d": "☁️",
            "04d": "☁️",
            "09d": "\uD83C\uDF27",
            "10d": "\uD83C\uDF26",
            "11d": "⛈",
            "13d": "❄️",
            "50d": "\uD83C\uDF2B",
            "01n": "\uD83C\uDF11",
            "02n": "\uD83C\uDF11 ☁",
            "03n": "☁️",
            "04n": "️️☁",
            "09n": "\uD83C\uDF27",
            "10n": "☔️",
            "11n": "⛈",
            "13n": "❄️",
            "50n": "\uD83C\uDF2B"
        }

        const apiResponse = JSON.stringify(data);
        const response = JSON.parse(apiResponse);

        // Extract from JSON obj
        const inputIcon = response.weather[0].icon;
        const temp = Math.round(response.main.temp);

        let weatherEmoji = '';
        if (inputIcon in icons) {
            weatherEmoji = icons[inputIcon];
        }

        document.getElementById('clIcon').innerHTML = weatherEmoji;
        document.getElementById('clDegrees').innerHTML = temp + "°F";

    })
    .catch(error => console.error(error));

window.addEventListener('DOMContentLoaded', function () {

    navCollapse();
    document.querySelector('.nav').style.opacity = "1";

    // place grid
    let gridContainer = document.querySelector(".head-dev-grid");

    let gridContainerWidth = gridContainer.offsetWidth + 12;
    let gridContainerHeight = gridContainer.offsetHeight + 12;
    let gridNumCols = Math.floor(gridContainerWidth / 16);
    let gridNumRows = Math.floor(gridContainerHeight / 16);

    for (let row = 0; row < gridNumRows; row++) {
        for (let col = 0; col < gridNumCols; col++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.style.left = `${col * 16}px`;
            square.style.top = `${row * 16}px`;
            gridContainer.appendChild(square);
        }
    }

    document.querySelector('.head-research').addEventListener('mouseenter', researchAnimate);
    document.querySelector('.head-design').addEventListener('mouseenter', designAnimate);
    document.querySelector('.head-dev').addEventListener('mouseenter', devAnimate);

});

window.addEventListener('load', async () => {

    minMetaBtn.style.display = 'none';

    const buttons = document.querySelectorAll('.campus-interact-form-view');
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            buttonCount++;
            if (window.innerWidth >= 768) {
                three.style.marginLeft = '0';
                minMetaBtn.style.display = 'block';
            }
        });
    });

    // hover to expand
    bubbles.forEach(bubble => {
        bubble.addEventListener('mouseover', function () {
            if (navState % 2 === 1) {
                navExpand();
            }
        });
    });

    setTimeout(navExpand, 600);

    // cover scroll transform animation
    fixedCoverScroll();

    // initialize 'pinned' class based on window.width
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    // initialize campusAnimateCheck (screen sizes)
    campusAnimCheck();
    window.addEventListener("resize", campusAnimCheck);

    // label animations
    document.querySelector('.intro-wrap').style.pointerEvents = 'none';

    await delay(1000);
    researchAnimate();
    await waitUntil(() => !researchIsAnimating);

    await delay(400);
    designAnimate();
    await waitUntil(() => !designIsAnimating);

    await delay(400);
    devAnimate();
    await waitUntil(() => !devIsAnimating);

    document.querySelector('.intro-wrap').style.pointerEvents = 'auto';

});

let researchIsAnimating = false;
let designIsAnimating = false;
let devIsAnimating = false;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function waitUntil(condition) {
    return new Promise(resolve => {
        const checkCondition = () => {
            if (condition()) {
                clearInterval(interval);
                resolve();
            }
        };
        const interval = setInterval(checkCondition, 100);
    });
}

function researchAnimate() {

    const researchWord = document.querySelector('.head-research');
    const glass = document.querySelector('.research-glass');
    const moveWidth = (researchWord.offsetWidth) - (glass.offsetWidth) + 24;


    if (researchIsAnimating) return;
    researchIsAnimating = true;

    // move glass to right-edge of parent elem
    glass.style.transform = `translateX(${moveWidth}px)`;
    glass.style.transition = 'transform 900ms ease-in-out';

    // return to original position
    setTimeout(() => {
        glass.style.transform = 'translateX(0)';
        glass.style.transition = 'transform 750ms ease-in-out';

        setTimeout(() => {
            researchIsAnimating = false;
        }, 1000);
    }, 900);
}

function designAnimate() {

    if (designIsAnimating) return;
    designIsAnimating = true;

    const headDesign = document.querySelector('.head-design');
    const transitionDuration = parseFloat(window.getComputedStyle(headDesign).getPropertyValue('transition-duration').replace('s', '')) * 1000;

    const headDesignWidth = document.getElementById('headDesignWidth');
    const subtractionAmount = Math.round(32 / transitionDuration);

    headDesign.style.letterSpacing = '-4px';

    let initialValue = 148;
    let targetValue = 102;
    let intervalDuration = 20;

    let currentValue = initialValue;
    let interval = setInterval(() => {
        let timeElapsed = Date.now() - startTime;
        if (timeElapsed >= transitionDuration) {
            clearInterval(interval);
            let currentValueInterval = setInterval(() => {
                let timeElapsedBack = Date.now() - (startTime + transitionDuration);
                if (timeElapsedBack >= transitionDuration) {
                    clearInterval(currentValueInterval);
                    currentValue = initialValue;
                } else {
                    let progressBack = timeElapsedBack / transitionDuration;
                    currentValue = Math.round(targetValue - (targetValue - initialValue) * progressBack);
                }
                headDesignWidth.innerHTML = currentValue;
            }, intervalDuration);
        } else {
            let progress = timeElapsed / transitionDuration;
            currentValue = Math.round(initialValue - (initialValue - targetValue) * progress);
        }
        headDesignWidth.innerHTML = currentValue;
    }, intervalDuration);

    let startTime = Date.now();

    setTimeout(() => {
        headDesign.style.letterSpacing = '0';

        setTimeout(() => {
            designIsAnimating = false;
        }, (transitionDuration));
    }, transitionDuration);

}

function devAnimate() {

    const devDesign = document.querySelector('.head-dev');

    if (devIsAnimating) return;
    devIsAnimating = true;

    const grid = document.querySelector('.head-dev-grid');
    grid.style.opacity = '0.8';

    // rotate text
    const rect = devDesign.getBoundingClientRect();
    const middleX = rect.left + rect.width / 2;
    const middleY = rect.top + rect.height / 2;

    devDesign.style.transition = 'transform 0.5s ease-in-out';

    devDesign.style.transform = `rotate(-3deg)`;

    // animate arrow
    setTimeout(() => {
        let arrow = document.createElement('div');
        arrow.setAttribute("id", "arrow");
        arrow.style.position = 'absolute';
        arrow.style.top = '4px';
        arrow.style.left = '0';
        arrow.style.width = '0';
        arrow.style.height = '0';
        arrow.style.border = 'solid black';
        arrow.style.borderWidth = '0 2px 2px 0';
        arrow.style.padding = '0px';
        arrow.style.transform = 'rotate(-45deg)';
        arrow.style.transition = 'opacity 0.3s ease-out';
        devDesign.appendChild(arrow);

        let line = document.createElement('div');
        line.setAttribute("id", "line");
        line.style.position = 'absolute';
        line.style.top = '8px';
        line.style.left = '0';
        line.style.width = '0';
        line.style.height = '2.4px';
        line.style.backgroundColor = 'black';
        line.style.transition = 'opacity 0.3s ease-out';
        devDesign.appendChild(line);

        let endPos = devDesign.offsetWidth - 16;
        let startPos = arrow.offsetLeft;
        let duration = 1000; // in milliseconds
        let startTime = null;

        function animate(currentTime) {
            if (startTime === null) {
                startTime = currentTime;
            }
            let timeElapsed = currentTime - startTime;
            let newPos = easeInOutQuad(timeElapsed, startPos, endPos, duration);
            arrow.style.left = newPos + 'px';
            line.style.width = newPos + 12 + 'px';
            if (timeElapsed < duration) {
                requestAnimationFrame(animate);
            }
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) {
                return c / 2 * t * t + b;
            }
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        requestAnimationFrame(animate);
    }, 300);

    // undo animation
    setTimeout(() => {
        devDesign.style.transform = `rotate(0)`;
        let arrow = document.getElementById('arrow');
        let line = document.getElementById('line');
        arrow.style.opacity = '0';
        line.style.opacity = '0';

        setTimeout(() => {
            grid.removeAttribute("style");
            arrow.remove();
            line.remove();
        }, 300);

    }, 1800);

    setTimeout(() => {
        devIsAnimating = false;
    }, 2400);

}

// disable pointer events on:scroll
let timeout;
window.addEventListener("scroll", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        if (window.innerWidth >= 768) {
            if (window.scrollY > 5) {
                document.querySelector('.intro-wrap').style.pointerEvents = 'none';
            } else {
                document.querySelector('.intro-wrap').style.pointerEvents = 'auto';
            }
        } else { // for window.widths < 768px
            if (window.scrollY > 20) {
                document.querySelector('.intro-wrap').style.pointerEvents = 'none';
            } else {
                document.querySelector('.intro-wrap').style.pointerEvents = 'auto';
            }
        }
    }, 100);
});

// navExpand() at top of page
window.addEventListener("scroll", function () {
    if (window.scrollY == 0) {
        navExpand();
        functionDisabled = true;
        let transitionSpeed = parseFloat(getComputedStyle(document.querySelector('.nav-item')).transitionDuration) * 1000;
        setTimeout(() => { functionDisabled = false; }, transitionSpeed);
    }

    else if (navState % 2 === 0) {
        navCollapse();
    }

});

const cover = document.querySelector('.intro-wrap');
const content = document.querySelector('.content');
const startScale = window.innerHeight < 500 ? 0.8 : window.innerHeight < 650 ? 1 : 1.3;
const endPoint = 200;
const endScale = 2.8;
const opacityTransLength = 140;
const opacityTransMark = endPoint - opacityTransLength;

cover.style.transform = `scale(${startScale})`;

function updateCover() {
    const scrollPos = window.scrollY;

    // cover scale 
    if (scrollPos <= endPoint) {
        console.log('cover in view');
        const scale = startScale + (endScale - startScale) * scrollPos / endPoint;
        cover.style.transform = `scale(${scale})`;
    }

    // moved from outside 'if' to inside back outside... try back inside tho
    const coverOpacity = scrollPos > opacityTransMark && scrollPos <= endPoint ? 1 - ((scrollPos - opacityTransMark) / 100) : scrollPos > endPoint ? 0 : 1;
    cover.style.opacity = coverOpacity;

    // content opacity and scale
    if (scrollPos > opacityTransMark && scrollPos <= endPoint) {
        content.style.opacity = 1 - coverOpacity;
        const childScale = 0.6 + (1 - 0.6) * (scrollPos - opacityTransMark) / opacityTransLength;
        content.children[0].style.transform = `scale(${childScale})`;
    } else if (scrollPos > endPoint) {
        content.style.opacity = 1;
        content.children[0].style.transform = 'scale(1)';
    } else {
        content.style.opacity = 0;
        content.children[0].style.transform = 'scale(0.6)';
    }

    if (window.innerWidth >= 768) {
        cover.style.pointerEvents = scrollPos > 2 ? 'none' : 'auto';
        content.classList.toggle('flow', scrollPos >= endPoint);
    }
}

function handleWindowResize() {
    if (window.innerWidth >= 768) {
        content.classList.add("pinned");
        if (window.pageYOffset === 0) {
            content.style.opacity = "0";
        }
        window.addEventListener("scroll", updateCover);
    } else {
        content.style.opacity = "";
        content.classList.remove("pinned");
        window.removeEventListener('scroll', updateCover);
        // clear updateCover styling
        cover.style.transform = "";
        cover.style.opacity = "";
        cover.style.pointerEvents = "";
        content.style.opacity = "";
        content.classList.remove("pinned", "flow");
        content.children[0].style.transform = "";
    }
}

// fixed corner divs transition
function fixedCoverScroll() {
    const container = document.querySelector('.fixed');
    const containerTop = 1.6;
    const containerBottom = 2;
    const maxScroll = 60;
    const topChange = -6;
    const bottomChange = -6;
    const maxScrollMobile = 40;

    window.addEventListener("scroll", () => {

        if (document.documentElement.scrollTop < maxScroll) { // eh i do not like this!
            const scrollY = window.scrollY;
            if (window.innerWidth >= 768) {

                if (scrollY > maxScroll) {
                    container.style.display = 'none';
                } else {
                    container.style.display = 'block';
                    let topValue = containerTop + (scrollY / maxScroll * (containerTop + topChange));
                    let bottomValue = containerBottom + (scrollY / maxScroll * (containerBottom + bottomChange));

                    if (topValue < topChange) {
                        topValue = topChange;
                    }

                    if (bottomValue < bottomChange) {
                        bottomValue = bottomChange;
                    }

                    container.style.top = `${topValue}em`;
                    container.style.bottom = `${bottomValue}em`;
                }

            } else {
                if (scrollY > maxScrollMobile) {
                    container.style.opacity = 0;
                } else {
                    const opacity = 1 - (scrollY / maxScrollMobile);
                    container.style.opacity = opacity;
                }
            }
        }
    });
}

const items = document.querySelectorAll('.nav-item');
const bubbleOneOffset = parseInt(getComputedStyle(document.querySelector('.nav-btn')).width, 10); // px
const bubbles = document.querySelectorAll('.nav-bubble');
const labels = document.querySelectorAll('.nav-item-label');
let functionDisabled = false;
let navState = 0; // default: open

function navCollapse() {

    if (!functionDisabled) {

        items.forEach((item, i) => {
            let offsetToParent = (-1 * item.offsetLeft); // px
            let stackOffset = (0.5 * [i + 1]); // rem
            item.style.transition = "left 0.3s ease-out, width 0.3s ease-out, box-shadow 0.15s ease-out";
            item.style.left = offsetToParent + "px";
            item.style.width = "calc(" + bubbleOneOffset + "px + " + stackOffset + "rem)";
            item.style.zIndex = getComputedStyle(item).zIndex - i;
        });

        labels.forEach(label => {
            label.style.transitionDuration = '0.18s';
            label.style.opacity = "0";
        });

        navState++;
    }
}

function navExpand() {

    document.querySelector('.nav').style.pointerEvents = 'none';

    items.forEach(item => {
        item.style.transition = "left 0.6s cubic-bezier(.32,0,.15,1), width 0.6s cubic-bezier(.32,0,.15,1), box-shadow 0.15s ease-out";
        item.style.width = "auto";
        item.style.left = "0";
    });

    let transitionSpeed = parseFloat(getComputedStyle(document.querySelector('.nav-item')).transitionDuration) * 1000;

    setTimeout(function () {
        labels.forEach(label => {
            label.style.transitionDuration = '0.8s';
            label.style.opacity = "1";
        });
    }, (0.4 * transitionSpeed));

    setTimeout(function () {
        document.querySelector('.nav').style.pointerEvents = 'auto';
    }, transitionSpeed);

    navState++;

}

// Campus Interactive
const wrap = document.querySelector('.campus-interact');
const three = document.querySelector('.campus-three');
const wrapTop = wrap.offsetTop;
const wrapHeight = wrap.offsetHeight;
const meta = document.querySelector('.campus-interact-meta');
const minMetaBtn = document.getElementById('minMetaBtn');

function campusAnimCheck() {

    if (window.innerWidth >= 768) {
        three.style.transform = "";
        window.addEventListener("scroll", campusScrollAnim);
    } else {
        window.removeEventListener("scroll", campusScrollAnim);
        three.style = "";
        meta.style = "";
        minMetaBtn.style.display = 'none';
        if (window.innerWidth < 600) {
            three.style.transform = 'scale(0.4)';
        } else {
            three.style.transform = 'scale(0.7)';
        }
    }
}

function campusScrollAnim() {

    if (three.getBoundingClientRect().bottom > 0 && three.getBoundingClientRect().top < window.innerHeight) {

        console.log('campusScrollAnim fired');

        const scrollPosition = window.pageYOffset;
        const transformPointOne = wrapTop + (wrapHeight * (1 / 20));
        const transformPointTwo = wrapTop + (wrapHeight * (3 / 8));
        const opacityPoint = wrapTop + (wrapHeight * (1 / 5));

        const buttonCount = 0;

        if ((buttonCount === 0) && (window.pageYOffset > wrapTop) && (scrollPosition > wrapTop && scrollPosition < transformPointTwo)) {
            let progress = (scrollPosition - transformPointOne) / (transformPointTwo - transformPointOne);
            let transformLeft = progress * 250;
            three.style.transform = "translateX(" + transformLeft + "px)";
        }

        if (scrollPosition > opacityPoint) {
            meta.style.opacity = '1';
        } else {
            meta.style.opacity = '0';
        }
    }
}
