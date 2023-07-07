document.addEventListener('DOMContentLoaded', youAre__setFolderPosition);
window.addEventListener('resize', youAre__setFolderPosition);

window.addEventListener("scroll", youAre__toggleScroll);

const youAreContainer = document.querySelector(".folder-container");
const youAreFolder = document.querySelectorAll(".folder");
const youAreP = document.querySelectorAll('.folder-p');

function youAre__setFolderPosition() {

    if (window.innerWidth >= 768) {
        let folderRowHeight = document.querySelector('.folder-row').offsetHeight;
        let paddingValue = (window.innerHeight - folderRowHeight) + 'px';
        // youAreContainer.style.paddingTop = paddingValue;

        youAreP.forEach(p => {
            p.style.opacity = '0';
        });

    } else {
        youAreContainer.removeAttribute('style');
        youAreP.forEach(p => {
            p.removeAttribute('style');
        });
    }
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function youAre__handleScroll() {
    youAreFolder.forEach((folder) => {

        if (isInViewport(folder)) {
            folder.querySelector('.folder-p').style.opacity = 1;
        } else {
            folder.querySelector('.folder-p').style.opacity = 0;
        }
    });
}

function youAre__toggleScroll() {
    if (!isInViewport(youAreContainer)) {
        window.addEventListener("scroll", youAre__handleScroll);
    } else {
        window.removeEventListener("scroll", youAre__handleScroll);
    }
}

/*
// Dark popout div: radial-gradient cursor
const darkDivs = document.querySelectorAll('.bits');
darkDivs.forEach(div => {
  const radialGradient = document.createElement('div');
  radialGradient.className = 'radial-gradient';
  div.appendChild(radialGradient);

  div.addEventListener('mousemove', e => {
    const parentRect = div.getBoundingClientRect();
    const x = e.clientX - parentRect.left;
    const y = e.clientY - parentRect.top;

    const gradient = div.querySelector('.radial-gradient');
    gradient.style.left = `${x - 160}px`;
    gradient.style.top = `${y - 160}px`;

    gradient.style.opacity = 1;
  });

  div.addEventListener('mouseout', () => {
    const gradient = div.querySelector('.radial-gradient');
    gradient.style.opacity = 0;
  });
});

*/