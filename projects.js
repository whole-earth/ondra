// ondra was here
// js exercises, feb 2023

// Project hover-states

    // Filters: window.load()
    let resetBtn = document.getElementById('filterReset');
    resetBtn.parentElement.classList.add("is-active"); // add is-active to this elems parent

    // Filters: remove "is-active" class from resetBtn on filter activity
    document.querySelector('.project-filters').addEventListener('click', function () {
        if (!resetBtn.parentElement.contains(event.target)) {
            resetBtn.parentElement.classList.remove("is-active");
        }
        else if (resetBtn.parentElement.contains(event.target)) {
            resetBtn.parentElement.classList.add("is-active");
        }
    });

    // Filters: change color of filter items when client hovers 'All'
    let filters = document.querySelectorAll('.project-filter-wrap');
    resetBtn.addEventListener('mouseover', function () {
        filters.forEach(function (filter) {
            filter.style.color = "#a0a0a0";
        })
        resetBtn.style.color = "#222"; // preserve
    });
    // ...and remove effect on mouseleave
    resetBtn.addEventListener('mouseleave', function () {
        filters.forEach(function (filter) {
            filter.removeAttribute('style');
        })
        resetBtn.removeAttribute('style'); // preserve
    });

    // Project hover
    let projects = document.querySelectorAll('.project-line');
    // remove column-label row from projects list.
    projects = Array.from(projects).filter(function (element) {
        return !element.classList.contains('cols');
    });

    projects.forEach(function (project) {

        project.addEventListener('mousemove', function (event) {
            if (window.innerWidth >= 768) {
                this.querySelector('.project-highlight').style.opacity = "1";
                this.querySelectorAll('.project-p').forEach(span => span.style.zIndex = "999");
                let image = this.querySelector('.project-img');
                image.style.display = "block";

                if ((image.offsetHeight) > (window.innerHeight - event.clientY)) {
                    // cases where image would bleed off the page
                    image.style.bottom = (window.innerHeight - event.clientY) + "px";
                    image.style.left = (event.clientX + 2) + "px";
                } else {
                    image.style.top = (event.clientY + 2) + "px";
                    image.style.left = (event.clientX + 2) + "px";
                }

                image.style.opacity = "1";
            }
        });


        project.addEventListener('mouseleave', function () {
            if (window.innerWidth >= 768) {
                this.querySelector('.project-highlight').removeAttribute('style');
                this.querySelector('.desc').removeAttribute('style');
                this.querySelectorAll('.project-p').forEach(span => span.removeAttribute('style'));
                let image = this.querySelector('.project-img');
                image.style.opacity = "0";
                let transitionDuration = window.getComputedStyle(image).transitionDuration;
                setTimeout(function () { image.style.display = "none"; }.bind(this), parseFloat(transitionDuration) * 1000);
            }
        });

        project.addEventListener('click', function () {
            let projectHighlight = project.querySelector('.project-highlight');
            projectHighlight.style.backgroundColor = 'black';
        });

    });

// Visual carats: sorting states

    let labels = document.querySelectorAll("[fs-cmssort-element='trigger']"); // goated line. based on finsweet attribute
    let carats = document.querySelectorAll('.filter-carat');

    // set initial state: hide carats
    carats.forEach(function (carat) {
        carat.style.visibility = 'hidden';
    }) // except for default, 'year' column
    carats[2].style.visibility = 'visible';
    carats[2].style.transform = 'rotate(135deg)';

    // carat click events
    labels.forEach((label, i) => {
        label.addEventListener('click', () => {
            carats.forEach(function (carat) { carat.style.visibility = "hidden"; }) // hide all

            //flip carat on sort direction
            if (label.getAttribute('aria-sort') === 'ascending') {
                carats[i].style.transform = 'rotate(135deg)';
            } else {
                carats[i].style.removeProperty('transform');
            }

            carats[i].style.visibility = 'visible'; // sets corresponding carat to visible
        });
    });




// Recent Projects expand

    let recentBtn = document.querySelector('.recent-btn');
    let recentX = document.querySelector('.recent-x');

    let container = document.querySelector('.recent');
    let inner = document.querySelector('.recent-container');

    let containerTransitionDuration = window.getComputedStyle(container).transitionDuration;
    let innerTransitionDuration = window.getComputedStyle(inner).transitionDuration;

    // default
    container.style.height = 0;
    inner.style.opacity = 0;

    recentX.addEventListener('click', function () { recentBtn.click(); });

    let recentCounter = 1;
    recentBtn.addEventListener('click', function () {
        recentCounter++;

        if (recentCounter % 2 === 0) { // open
            let autoHeight = Array.from(container.children).map(el => el.clientHeight).reduce((a, b) => a + b, 0);
            container.style.height = autoHeight + 'px';
            setTimeout(function () { inner.style.opacity = '1'; }.bind(this), parseFloat(containerTransitionDuration) * 1000);
        } else {  // close
            inner.style.opacity = '0';
            setTimeout(function () { container.style.height = '0'; }.bind(this), parseFloat(innerTransitionDuration) * 1000);
        }

    });






// Mobile project meta expand

    let meta = document.querySelectorAll('.project-mobile-meta');
    let moreTransDur = window.getComputedStyle(document.querySelector('.project-mobile-meta')).transitionDuration;

    // default states
    meta.forEach(element => {
        element.style.height = '0';
        element.style.display = 'none';
    });

    function mobileExpand(element) {
        element.style.display = "block";
        let autoHeight = Array.from(element.children).map(el => el.clientHeight).reduce((a, b) => a + b, 0);
        element.style.height = autoHeight + 'px';
        setTimeout(function () { element.style.opacity = '1'; }.bind(this), parseFloat(moreTransDur) * 1000);
    }

    function mobileCollapse(element) {
        element.style.opacity = "0";
        setTimeout(function () {
            element.style.height = '0';
            setTimeout(function () { // Nested Timeouts Like Dat!
                element.style.display = 'none';
            }.bind(this), parseFloat(moreTransDur) * 1000);
        }.bind(this), parseFloat(moreTransDur) * 1000);
    }

    let expandBtn = document.querySelectorAll('.project-mobile-expand');
    expandBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            if (meta[i].offsetHeight === 0) {
                mobileExpand(meta[i]);
                btn.querySelector('.project-mobile-expand-x').style.transform = "rotate(45deg)";
            } else {
                mobileCollapse(meta[i]);
                btn.querySelector('.project-mobile-expand-x').style.transform = "rotate(0)";
            }
        });
    });

    window.addEventListener("resize", function () {
        meta.forEach(function (element) {
            mobileCollapse(element);
        });
    });

// Mobile filter menu toggle -->

    document.addEventListener("DOMContentLoaded", mobileFilterInit);
    window.addEventListener("resize", mobileFilterInit);

    let filterBtn = document.querySelector('.mobile-filter-btn');
    let header = document.querySelector('.head');
    let filterWrap = document.querySelector('.project-filters');
    let filterList = document.querySelector('.project-filter-list');
    let outerTrans = window.getComputedStyle(filterWrap).transitionDuration;
    let innerTrans = window.getComputedStyle(filterList).transitionDuration;


    function mobileFilterInit() {

        if (window.innerWidth < 768) {

            // initial state
            filterWrap.style.height = '0';
            filterList.style.opacity = '0';
            header.style.paddingBottom = '2rem';
            let filterCounter = 1;

            filterBtn.addEventListener('click', function () {
                filterCounter++;

                // auto sync transitionDurations
                header.style.transition = "padding-bottom " + outerTrans;

                if (filterCounter % 2 === 0) {
                    let autoHeight = Array.from(filterWrap.children).map(el => el.clientHeight).reduce((a, b) => a + b, 0);
                    filterWrap.style.height = autoHeight + 'px';
                    header.style.paddingBottom = '13rem';
                    setTimeout(function () { filterList.style.opacity = '1'; }.bind(this), parseFloat(outerTrans) * 1000);
                } else {
                    filterList.style.opacity = '0';
                    header.style.paddingBottom = '2rem';
                    setTimeout(function () { filterWrap.style.height = '0'; }.bind(this), parseFloat(innerTrans) * 1000);
                }

            });

            // on scroll, collapse
            window.addEventListener("scroll", function () {
                filterList.style.opacity = '0';
                header.style.paddingBottom = '2rem';
                setTimeout(function () { filterWrap.style.height = '0'; }.bind(this), parseFloat(innerTrans) * 1000);
            });

        } else { // if > 768, clear all manipulations
            filterWrap.style = "";
            filterList.style = "";
            header.style = "";
        }
    }