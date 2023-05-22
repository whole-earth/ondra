const recentImgWidths = [];

window.addEventListener('load', function() {

    // get initial widths and set to 0
    const recentProjects = document.querySelectorAll('.recent-project');
    for (let i = 0; i < recentProjects.length; i++) {
        let project = recentProjects[i];
        let recentImgWidth = project.querySelector('.recent-p-img').getBoundingClientRect().width;
        recentImgWidths.push(recentImgWidth);
        project.querySelector('.recent-p-img-wrap').style.width = '0';
    }

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

    const filterFields = document.querySelector('.work').querySelectorAll('[fs-cmsfilter-field="area"]');
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

window.addEventListener('resize', function() {
    recentHoverAnim();
    projectHoverAnim();
});

// Filter-label click events
const areaFields = document.querySelector('.project-filter-list').querySelectorAll('[fs-cmsfilter-field="area"]');
areaFields.forEach(function(areaField) {
    areaField.addEventListener('click', function(event) {
        document.querySelector('.is-open').style.display = 'inline-block';
        document.querySelector('.is-closed').style.display = 'none';
    });
});

// filter-reset click mirrors
document.getElementById('isOpen').addEventListener('click', function() {
    document.querySelector('[fs-cmsfilter-element="reset"]').click();
    document.querySelector('.is-closed').style.display = 'inline-block';
    document.querySelector('.is-open').style.display = 'none';
});
// anotha click-mirra
document.querySelector('.noresultsreset').addEventListener('click', function() {
    document.querySelector('[fs-cmsfilter-element="reset"]').click();
});

// visual carats: sorting states
let carats = document.querySelectorAll('.filter-carat');
let labels = document.querySelectorAll("[fs-cmssort-element='trigger']");
carats.forEach(function(carat) {
    carat.style.visibility = 'hidden';
})

labels.forEach((label, i) => {
    label.addEventListener('click', () => {

        carats.forEach(function(carat) {
            carat.style.visibility = "hidden";
        });

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
                setTimeout(function() {
                    img.style = '';
                }.bind(this), parseFloat(imgTrans) * 1000);
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

    img.onload = function() {

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

        setTimeout(function() {
            pixelate(8);
        }, 100);

        setTimeout(function() {
            pixelate(14);
        }, 180);

        setTimeout(function() {
            pixelate(24);
        }, 260);

        setTimeout(function() {
            canvas.parentNode.removeChild(canvas);
        }, 300);

    }

}

// hero section

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
if ((window.innerWidth <= 600) && (isMobileDevice())) {
    setTimeout(function() {
        document.getElementById("toggleBtn").classList.remove("invisible")
    }, 3000);
}

let replacementCopy;

let n;

function chooseDirection() {
    let probability = Math.random();
    n = Math.floor(Math.random() * 8);

    if (probability < 0.5) {
        n = 7
    } else if (probability < 0.65) {
        n = 4
    } else if (probability < 0.8) {
        n = 5
    }


    if (n == 5) {
        document.querySelector(".hero").classList.add("upsideDown")
    } else {
        document.querySelector(".hero").classList.remove("upsideDown")
    }
    if (n == 5 || n == 7 || n == 6) {
        document.querySelector(".hero").classList.add("transition")
    } else {
        document.querySelector(".hero").classList.remove("transition")
    }
}

function reset() {
    // document.querySelector(".hero").innerHTML = replacementCopy;
    for (let i of letters.listAll()) {
        i.classList.remove("n7");
        i.classList.remove("on");
        i.classList.remove("animated");
        i.classList.remove("upsideDown");
        i.removeAttribute('style');
    }
    for (let c of document.querySelectorAll(".clone")) {
        c.remove();
    }
}

document.querySelector(".hero").addEventListener("mousedown", function() {
    document.getElementById("toggleBtn").classList.add("invisible");
    reset();
    // chooseDirection();
    SWITCH(Math.floor(Math.random() * 8));
})

// this is for direction 2
let headerBounds = document.querySelector(".hero h1").getBoundingClientRect();
window.addEventListener("resize", function() {
    headerBounds = document.querySelector(".hero h1").getBoundingClientRect();
})

// init letterize
var letters = new Letterize({
    targets: "h1",
    wrapper: "i"
});

let expandBtns = document.querySelectorAll("#info button");

for (let btn of expandBtns) {
    btn.onclick = function() {
        this.classList.toggle("view-more");
    }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

for (br of document.querySelectorAll("br.dt")) {
    let spacer = document.createElement("i");
    spacer.innerHTML = " ";
    insertAfter(spacer, br)
}

for (let i of letters.listAll()) {
    i.innerHTML = i.innerHTML.replace(/&nbsp;/g, " ");
    replacementCopy = document.querySelector(".hero").innerHTML;
    if (n == 5) {
        i.style.transition = 'transform 200ms';
    } else {
        i.style.transition = 'none'
    }
    if (n == 7) {
        i.classList.add("n7");
    } else {
        i.classList.remove("n7");
    }
    i.addEventListener("mouseenter", function() {
        // console.log(i.parentElement);
        if (n == 1) {
            i.classList.add("on")
        }
        if (n == 3) {
            let cln = i.cloneNode(true);
            cln.classList.add("clone");
            insertAfter(cln, i);
        }
        if (n == 5) {
            // i.style.transform = "scaleY(-1)";
            i.classList.add('upsideDown');
            setTimeout(function() {
                i.classList.remove('upsideDown')
                // i.style.transform = "scaleY(1)";
            }, 1000)
        }
        if (n == 7) {
            i.style.left = -30 + Math.random() * 60 + "px";
            i.style.top = -30 + Math.random() * 60 + "px";
            i.style.color = palette2[Math.floor(Math.random() * palette2.length)];
            setTimeout(function() {
                i.removeAttribute('style')
            }, 1000)
        }
    })
}

// let palette = ["#4fff8a", "#1476ff", "#ff9214", "#ff3030"];
let palette = ["#4251D6", "#FFD37D", "#FF4E4E", "#62D282"];
let palette2 = ["#FF9900", "#FF4E4E", "#FF7DBC", "#7DA2FF", "#FFD37D", "#62D282", "#4251D6"];
let h = document.querySelector("h1");

hHover = true;
for (let container of document.querySelectorAll(".d3container")) {
    container.addEventListener("mousemove", function(e) {
        container.classList.add("mouseover")
    })
    container.addEventListener("mouseout", function(e) {
        container.classList.remove("mouseover")
    })
}

let spanArray = [];

lettersInView();

document.addEventListener("scroll", function() {
    lettersInView();
})

let boundsArr = [];

for (let i = 0; i < spanArray.length; i++) {
    let s = spanArray[i];
    boundsArr.push(s.getBoundingClientRect());
}

document.addEventListener("mousemove", function(e) {

    for (let i = 0; i < spanArray.length; i++) {
        let s = spanArray[i];
        let bounds = boundsArr[i];
        // let bounds = s.getBoundingClientRect();
        let dist = distance(e.clientX, e.clientY, bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
        let ancestor = findAncestor(s, "d3container");
        // if(n==0 || ancestor.classList.contains("mouseover")){
        if (dist < 300) {
            if (n == 4) {
                s.style.display = 'inline-block';
                s.style.transform = `scaleX(${map(dist, 0, 300, -1, 1)})`
            }
            if (dist < 200) {
                if (n == 0) {
                    s.style.top = map(dist, 0, 200, -2, 0) + "em";
                }
                if (n == 2) {
                    if (e.clientX < headerBounds.right) {
                        s.style.color = palette[Math.floor(Math.random() * palette.length)];
                    } else {
                        s.style.color = 'white';
                    }
                }
            } else {
                if (n == 0) {
                    s.style.top = "0px";
                }
                if (n == 2) {
                    if (e.clientX < headerBounds.right) {
                        s.style.color = 'black';
                    } else {
                        s.style.color = 'white';
                    }
                }
            }
        } else {
            if (n == 0) {
                s.style.top = "0px";
            }
            if (n == 2) {
                if (e.clientX < headerBounds.right) {
                    s.style.color = 'black';
                } else {
                    s.style.color = 'white';
                }
            }

            if (n == 4) {
                s.style.display = 'inline';
                s.style.transform = 'scaleX(1)';
            }
        }
        // } else {
        //     if (n == 2){
        //         s.removeAttribute("style")
        //     }
        // }
        if (n == 6) {
            if (bounds.x <= e.clientX) {
                s.classList.add("animated")
            } else {
                s.classList.remove("animated")
            }
        }
    }
})

// for (let i=0;i<spanArray.length;i++){
//     console.log(spanArray[i], findAncestor(spanArray[i], "d3container"));
// }

function lettersInView() {
    if (n == 0) {
        spanArray = [];
        for (let i of letters.listAll()) {
            if (isScrolledIntoView(i)) {
                spanArray.push(i);
            }
        }
    } else {
        spanArray = letters.listAll()
    }
}

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    // var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}

function SWITCH(x) {
    n = x;
    // document.querySelector(".btnFixed.active").classList.remove("active");
    // btns.item(n).classList.add("active");
    hHover = false;
    for (i of letters.listAll()) {
        i.classList.remove("on");
        i.removeAttribute('style');
    }
    if (x == 0 || x == 1) {
        for (c of document.querySelectorAll(".clone")) {
            c.remove();
        }
    }
    if (n == 5 || n == 7 || n == 6) {
        document.querySelector(".hero").classList.add("transition")
    } else {
        document.querySelector(".hero").classList.remove("transition")
    }
}

function findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

function scrollUpDown() {
    window.scrollTo(0, window.innerHeight - 30);
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
