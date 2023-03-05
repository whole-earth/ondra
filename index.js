window.addEventListener('load', async () => {

        // place grid
        let gridContainer = document.querySelector(".head-dev-grid");

        let gridContainerWidth = gridContainer.offsetWidth + 24;
        let gridContainerHeight = gridContainer.offsetHeight + 16;
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

        // cover pageload animations
        await delay(1000);
        researchAnimate();
        await waitUntil(() => !researchIsAnimating);

        await delay(400);
        designAnimate();
        await waitUntil(() => !designIsAnimating);

        await delay(400);
        devAnimate();
    });

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

    let researchIsAnimating = false;
    let designIsAnimating = false;
    let devIsAnimating = false;

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
            arrow.style.top = '0';
            arrow.style.left = '0';
            arrow.style.width = '0';
            arrow.style.height = '0';
            arrow.style.border = 'solid black';
            arrow.style.borderWidth = '0 2px 2px 0';
            arrow.style.padding = '5px';
            arrow.style.transform = 'rotate(-45deg)';
            arrow.style.transition = 'opacity 0.3s ease-out';
            devDesign.appendChild(arrow);

            let line = document.createElement('div');
            line.setAttribute("id", "line");
            line.style.position = 'absolute';
            line.style.top = '4px';
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

    document.querySelector('.head-research').addEventListener('mouseenter', researchAnimate);
    document.querySelector('.head-design').addEventListener('mouseenter', designAnimate);
    document.querySelector('.head-dev').addEventListener('mouseenter', devAnimate);

    const cover = document.querySelector('.intro-wrap');
    const content = document.querySelector('.content');
    const endPoint = 180;
    const startScale = 1.3;
    const endScale = 6;
    const opacityTransLength = 120;
    const opacityTransMark = endPoint - opacityTransLength;

    content.style.opacity = 0;

    function updateCover() {
        const scrollPos = window.scrollY;

        // cover scale
        if (scrollPos <= endPoint) {
            const scale = startScale + (endScale - startScale) * scrollPos / endPoint;
            cover.style.transform = `scale(${scale})`;
        }

        // cover opacity
        coverOpacity = scrollPos > opacityTransMark && scrollPos <= endPoint ? 1 - ((scrollPos - opacityTransMark) / 100) : scrollPos > endPoint ? 0 : 1;
        cover.style.opacity = coverOpacity;

        // content opacity and scale
        if (scrollPos > opacityTransMark && scrollPos <= endPoint) {
            contentOpacity = 1 - coverOpacity;
            content.style.opacity = contentOpacity;

            const childScale = 0.6 + (1 - 0.6) * (scrollPos - opacityTransMark) / opacityTransLength;
            content.children[0].style.transform = `scale(${childScale})`;
        } else if (scrollPos > endPoint) {
            content.style.opacity = 1;
            content.children[0].style.transform = 'scale(1)';
        } else {
            content.style.opacity = 0;
            content.children[0].style.transform = 'scale(0.6)';
        }

        // cover pointerEvents
        cover.style.pointerEvents = scrollPos > 5 ? 'none' : '';

        // content position pinning
        content.classList.toggle('flow', window.scrollY >= endPoint);
    }

    window.addEventListener('scroll', () => requestAnimationFrame(updateCover));
