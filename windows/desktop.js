document.addEventListener("DOMContentLoaded", function() {

    const favicon32 = document.head.querySelector('link[rel="shortcut icon"]');
    const favicon256 = document.head.querySelector('link[rel="apple-touch-icon"]');

    if (favicon32) {
        favicon32.href = 'https://uploads-ssl.webflow.com/61cbb439e6b4856c4aea9529/6475569a90745d54a119a184_win-favicon-32.png';
    }

    if (favicon256) {
        favicon256.href = 'https://uploads-ssl.webflow.com/61cbb439e6b4856c4aea9529/647553e954d0e02cef92e400_win-favicon-256.png';
    }

    GetTime();

    iconDrag();

    document.querySelectorAll('.i-header, .i-gui').forEach(el => el.addEventListener('click', function() {

        if (document.getElementById('iNav').style.display !== 'none') {
            document.getElementById('iButton').click();
        }

        document.getElementById('conxm').style.display = 'none';
    }));

    window.addEventListener('resize', function() {
        const windowsToClose = document.querySelectorAll('#iNav, #conxm, .i-window');
        for (let i = 0; i < windowsToClose.length; i++) {
            windowsToClose[i].style.display = 'none';
        }
        iconDrag();
    });

    window.addEventListener('contextmenu', wallpaperMenu);

    document.getElementById('wallpapersForm').addEventListener('change', changeWallpaper, true);

    document.getElementById('musicBtn').addEventListener('click', function() {
        document.querySelector('.napster-window').style.display = 'flex';
    });

    document.getElementById('terminal').addEventListener('click', function() {
        var termynal = new Termynal('#i-terminal');
    });

    document.getElementById('email-copy').addEventListener('click', function() {
        navigator.clipboard.writeText(("access2tools@gmail.com").replace(/['"]+/g, ''));
        document.querySelector('.email-copy-prompt').innerHTML = "Copied!";
        document.getElementById('email-copy').addEventListener('mouseleave', function() {
            document.querySelector('.email-copy-prompt').innerHTML = "Copy to clipboard";
        });
    });

    window.addEventListener('mousemove', function(e) {

        if (window.matchMedia("(max-width: 768px)").matches) {
            return;
        }

        const refMeta = document.querySelector('.ref-point-hover');
        const refIcon = document.getElementById('refpointsbtn');
        let x = (e.clientX + 8) + 'px',
            y = (e.clientY + 8) + 'px';
        refMeta.style.top = y;
        refMeta.style.left = x;

        refIcon.addEventListener('mouseover', function() {
            refMeta.style.display = 'block';
        });

        refIcon.addEventListener('mouseout', function() {
            refMeta.style.display = 'none';
        });

    });

    let closeButton = document.getElementById("close-wintro");
    closeButton.addEventListener("click", function() {
        const parentWindow = closeButton.closest(".i-window");
        if (parentWindow) {
            parentWindow.style.display = "none";
        }
    });

});

function changeWallpaper() {

    const canvas = document.querySelector('.i-module');
    const logo = document.querySelector('.ondra-os-logo');
    let radioButtons = document.querySelector('[name="wallpaper"]:checked').value;

    switch (radioButtons) {
        case 'default':
            logo.style.opacity = 1;
            logo.style.pointerEvents = "auto";
            canvas.setAttribute('id', 'default-wallpaper');
            break;
        case 'skyline':
            logo.style.opacity = 0;
            logo.style.pointerEvents = "none";
            canvas.setAttribute('id', 'skyline-wallpaper');
            break;
        case 'dawn':
            logo.style.opacity = 0;
            logo.style.pointerEvents = "none";
            canvas.setAttribute('id', 'dawn-wallpaper');
            break;
        case 'hakone':
            logo.style.opacity = 0;
            logo.style.pointerEvents = "none";
            canvas.setAttribute('id', 'hakone-wallpaper');
            break;
        case 'elCap':
            logo.style.opacity = 0;
            logo.style.pointerEvents = "none";
            canvas.setAttribute('id', 'elCap-wallpaper');
            break;
    }
}

function wallpaperMenu(e) {
    var reh = e.clientY;
    var rey = e.clientX;
    var cnx = conxm.clientHeight;
    var cxm = conxm.clientWidth;
    var gig = window.innerHeight;
    var fgi = window.innerWidth;
    if ((reh + cnx) >= gig && (rey + cxm) <= fgi) {
        conxm.style.top = ((gig - cnx) - 10) + "px";
        conxm.style.left = rey + "px";
    } else if ((reh + cnx) <= gig && (rey + cxm) >= fgi) {
        conxm.style.top = reh + "px";
        conxm.style.left = ((fgi - cxm) - 10) + "px";
    } else if ((reh + cnx) >= gig && (rey + cxm) >= fgi) {
        conxm.style.top = ((gig - cnx) - 10) + "px";
        conxm.style.left = ((fgi - cxm) - 10) + "px";
    } else {
        conxm.style.top = reh + "px";
        conxm.style.left = rey + "px";
    }
    conxm.style.display = "block";
    e.preventDefault();
}

function iconDrag() {

    const draggableElems = document.querySelectorAll('.gui-icon, .i-window');
    let draggies = []
    for (let i = 0, len = draggableElems.length; i < len; i++) {
        let draggableElem = draggableElems[i];
        let draggie = new Draggabilly(draggableElem, {
            containment: true,
            grid: [8, 8],
            handle: '.handle',
        });
        draggies.push(draggie);
    }

    for (let i = 0, len = draggies.length; i < len; i++) {
        let draggie = draggies[i];
        if (draggie.element.tagName.toLowerCase() == 'a') {
            draggie.on('staticClick', function() {
                window.location.href = draggie.element.href;
            });
        } else {
            draggie.on('staticClick', function(e) {
                const period = ".";
                let target = period.concat(e.target.id, "-window")
                document.querySelector(target).style.display = 'flex';
            });
        }
    }

    // destroy draggies
    window.addEventListener('resize', function() {
        for (let i = 0, len = draggies.length; i < len; i++) {
            let draggie = draggies[i];
            draggie.destroy();
        }
    });
}

function GetTime() {
    let CurrentTime = new Date()
    let hour = CurrentTime.getHours()
    let minute = CurrentTime.getMinutes()
    let suffix = (hour >= 12) ? 'PM' : 'AM';
    hour = (hour > 12) ? hour - 12 : hour;
    hour = (hour == '00') ? 12 : hour;
    if (minute < 10) {
        minute = "0" + minute
    }
    let GetCurrentTime = hour + ':' + minute + ' ' + suffix;

    document.getElementById('time').innerHTML = GetCurrentTime;
    setTimeout(GetTime, 1000)
}
