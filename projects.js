    const recentImgWidths = [];

    window.addEventListener('load', function () {

        // get initial widths and set to 0
        const recentProjects = document.querySelectorAll('.recent-project');
        for (let i = 0; i < recentProjects.length; i++) {
            let project = recentProjects[i];
            let recentImgWidth = project.querySelector('.recent-p-img').getBoundingClientRect().width;
            recentImgWidths.push(recentImgWidth);
            project.querySelector('.recent-p-img-wrap').style.width = '0';
        }

        // test
        console.log(recentImgWidths);

        // Filter counts
        document.getElementById('allCount').innerHTML = document.querySelector('[fs-cmsfilter-element="items-count"]').innerHTML;

        const filterCounts = {
            'Web': -1,
            'Video': -1,
            'Product': -1,
            'Photo': -1,
            'Space': -1,
            'Paper': -1,
            'Essay': -1
        };

        const filterFields = document.querySelector('.projects').querySelectorAll('[fs-cmsfilter-field="area"]');
        filterFields.forEach((field) => {
            const count = filterCounts[field.innerHTML];
            if (count !== undefined) {
                filterCounts[field.innerHTML]++;
            }
        });

        for (const [fieldName, count] of Object.entries(filterCounts)) {
            const countElement = document.getElementById(`${fieldName.toLowerCase()}Count`);
            countElement.innerHTML = count.toString().padStart(2, '0');
        }

        recentHoverAnim();
        projectHoverAnim();

    });

    window.addEventListener('resize', function () {
        recentHoverAnim();
        projectHoverAnim();
    });

    // Filter-label click events
    const areaFields = document.querySelector('.project-filter-list').querySelectorAll('[fs-cmsfilter-field="area"]');
    areaFields.forEach(function (areaField) {
        areaField.addEventListener('click', function (event) {
            document.querySelector('.is-open').style.display = 'inline-block';
            document.querySelector('.is-closed').style.display = 'none';
        });
    });

    // filter-reset click mirrors
    document.getElementById('isOpen').addEventListener('click', function () {
        document.querySelector('[fs-cmsfilter-element="reset"]').click();
        document.querySelector('.is-closed').style.display = 'inline-block';
        document.querySelector('.is-open').style.display = 'none';
    });
    // anotha click-mirra
    document.querySelector('.noresultsreset').addEventListener('click', function () {
        document.querySelector('[fs-cmsfilter-element="reset"]').click();
    });

    // visual carats: sorting states
    let carats = document.querySelectorAll('.filter-carat');
    let labels = document.querySelectorAll("[fs-cmssort-element='trigger']");
    carats.forEach(function (carat) { carat.style.visibility = 'hidden'; })

    labels.forEach((label, i) => {
        label.addEventListener('click', () => {

            carats.forEach(function (carat) { carat.style.visibility = "hidden"; });

            // flip
            if (label.getAttribute('aria-sort') === 'ascending') {
                carats[i].style.transform = 'rotate(135deg)';
            } else {
                carats[i].style.removeProperty('transform');
            }

            carats[i].style.visibility = 'visible';
        });
    });

    function recentHoverAnim() {

        const recentProjects = document.querySelectorAll('.recent-project');
        for (let i = 0; i < recentProjects.length; i++) {

            let project = recentProjects[i];

            project.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    wordShuffle(project, 65);
                    project.querySelector('.recent-p-img-wrap').style.width = recentImgWidths[i] + 'px';
                }
            });

            project.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    project.querySelector('.recent-p-img-wrap').style.width = '0';
                }
            });
        };
    }

    function projectHoverAnim() {
        const projects = document.querySelectorAll('.project');
        projects.forEach(project => {

            let img = project.querySelector('.project-img-wrap');
            let imgTrans = window.getComputedStyle(img).transitionDuration;
            let link = project.querySelector('.project-line');

            project.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    img.style.display = 'block';
                    img.style.opacity = '1';
                    link.style.borderBottomColor = 'black';
                    wordShuffle(project, 60);
                    dePixelate(project);
                }
            });

            project.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    img.style.opacity = '0';
                    setTimeout(function () { img.style = ''; }.bind(this), parseFloat(imgTrans) * 1000);
                    link.style = '';
                }
            });
        });
    }

    function wordShuffle(parent, defineTimeout) {
        const timeoutLength = defineTimeout;

        let linesToShuffle = parent.querySelectorAll(
            'div:not(:empty):not(:has(*))'
        );

        let timeouts = [];

        let originalTexts = [];

        linesToShuffle.forEach((line) => {
            const originalText = line.textContent;

            originalTexts.push(originalText);

            const words = originalText.split(" ");

            const flippedWords = words.map((word) =>
                word.split("").reverse().join("")
            );

            line.textContent = flippedWords.join(" ");

            const timeout1 = setTimeout(() => {
                const shuffledWords = flippedWords.map((word) =>
                    word.split("").sort(() => Math.random() - 0.5).join("")
                );

                line.textContent = shuffledWords.join(" ");

                const timeout2 = setTimeout(() => {
                    const shuffledWordsAgain = shuffledWords.map((word) =>
                        word.split("").sort(() => Math.random() - 0.5).join("")
                    );

                    line.textContent = shuffledWordsAgain.join("");

                    const timeout3 = setTimeout(() => {
                        line.textContent = words.join(" ");
                    }, timeoutLength);

                    timeouts.push(timeout3);
                }, timeoutLength);

                timeouts.push(timeout2);
            }, timeoutLength);

            timeouts.push(timeout1);
        });

        parent.addEventListener("mouseleave", () => {
            timeouts.forEach((timeout) => clearTimeout(timeout));
            linesToShuffle.forEach((line, index) => {
                line.textContent = originalTexts[index];
            });
        });
    }

    function dePixelate(element) {

        const origImage = element.querySelector('img');

        // canvas: create and place
        const canvas = document.createElement('canvas');
        origImage.parentNode.insertBefore(canvas, origImage);
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.transform = 'translate(0px, -50%)';
        canvas.style.zIndex = '999';
        canvas.width = origImage.width;
        canvas.height = origImage.height;
        const ctx = canvas.getContext('2d');

        // turn off image smoothing
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        // load image onto canvas
        let img = new Image();
        img.src = origImage.getAttribute('src');

        img.onload = function () {

            function pixelate(pixelSize) {
                let size = pixelSize * 0.01,
                    w = canvas.width * size,
                    h = canvas.height * size;

                // Scale down: compress
                ctx.drawImage(img, 0, 0, w, h);

                // Scale up: pixelate
                ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

            }

            pixelate(4);

            setTimeout(function () {
                pixelate(8);
            }, 100);

            setTimeout(function () {
                pixelate(14);
            }, 180);

            setTimeout(function () {
                pixelate(24);
            }, 260);

            setTimeout(function () {
                canvas.parentNode.removeChild(canvas);
            }, 300);

        }

    }
