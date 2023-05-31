import * as THREE from "./libs/three.module.js";
import { TWEEN } from "./libs/tween.module.min.js";
import { TrackballControls } from "./libs/TrackballControls.js";
import { CSS3DRenderer, CSS3DObject } from "./libs/CSS3dRenderer.js";

let camera, scene, renderer, objects, vector, original_rotation;
let controls;

const duration = 400;

const targets = { sphere: [], helix: [], grid: [], table: [] };

function init(images) {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 5000;
    camera.position.y = 1600;
    original_rotation = camera.rotation;
    vector = new THREE.Vector3();

    // Create images and possible transformations
    objects = initImgObjects(scene, images)
    defineSphereTransform(objects, vector);
    defineHelixTransform(objects, vector);
    defineGridTransform(objects);
    defineTableTransform(objects);

    // Render 3D images and user controls
    renderer = initRenderer();
    controls = initControls(renderer);

    // THESE MANIPULATE CAMERA POSITIONS
    // Bind 3D transformations to respective buttons
    const buttonSphere = createTransformationButton('sphere', duration, targets.sphere, -199, 185, 1200, .7, .7, .7);
    const buttonHelix = createTransformationButton('helix', duration, targets.helix, 55, 300, 6000, .5, .5, .5);
    const buttonGrid = createTransformationButton('grid', duration, targets.grid, 297, 560, 6000);
    const buttonTable = createTransformationButton('table', duration, targets.table, -199, 185, 6000)
    
    // init
    transform(targets.helix, 1000, 0.5, 0.5, 0.5);
    
    window.addEventListener('resize', onWindowResize);
}

function initControls(renderer) {
    let controls = new TrackballControls(camera, renderer.domElement);
    controls.minDistance = 5000;
    controls.maxDistance = 5000;
    controls.noPan = true;
    controls.dynamicDampingFactor = .1;
    controls.addEventListener('change', render);
    return controls
}

function initRenderer() {
    let renderer = new CSS3DRenderer();
    let main = document.querySelector('.campus-three');
    renderer.setSize(main.clientWidth, main.clientHeight);
    main.appendChild(renderer.domElement);
    main.style.overflow = '';
    return renderer
}

function defineGridTransform(objects) {
    for (let i = 0; i < objects.length; i++) {
        const object = new THREE.Object3D();

        object.position.x = ((i % 5) * 600) - 800;
        object.position.y = (- (Math.floor(i / 5) % 5) * 400) + 800;
        object.position.z = (Math.floor(i / 25)) * 1300 - 2000;

        targets.grid.push(object);
    }
}

function defineHelixTransform(objects, vector) {
    for (let i = 0; i < objects.length; i++) {
        const theta = i * 0.175 + Math.PI;
        const y = - (i * 8) + 450;
        
        let distance;
        if (window.innerWidth > 768) {
            distance = 2000;
        } else {
            distance = 1800; // mobile
        }

        const object = new THREE.Object3D();
        object.position.setFromCylindricalCoords(distance, theta, y);

        vector.x = object.position.x * 2;
        vector.y = object.position.y;
        vector.z = object.position.z * 2;

        object.lookAt(vector);

        targets.helix.push(object);
    }
}

function defineSphereTransform(objects, vector) {
    for (let i = 0; i < objects.length; i++) {
        let l = objects.length;
        const phi = Math.acos(- 1 + (2 * i) / l);
        const theta = Math.sqrt(l * Math.PI) * phi;

        const object = new THREE.Object3D();
        object.position.setFromSphericalCoords(1200, phi, theta);

        vector.copy(object.position).multiplyScalar(2);

        object.lookAt(vector);

        targets.sphere.push(object);
    }
}

function defineTableTransform(objects) {
    for (let i = 0; i < objects.length; i++) {
        const object = new THREE.Object3D();

        object.position.x = ((i % 15) * 600) - 4000;
        object.position.y = (- (Math.floor(i / 15)) * 500) + 1600;
        object.position.z = -1000;

        targets.table.push(object);
    }
}

function createTransformationButton(id, duration, target, x, y, z, x_scale=1, y_scale=1, z_scale=1) {
    return document.getElementById(id).addEventListener('click', function () {
        transform(target, duration, x_scale, y_scale, z_scale);
        moveCameraPosition(x, y, z);
    });
}

function initImgObjects(scene, images) {
    /* Create 3D rendered img tags from a dynamically served array
    of img src's and add them to the scene */
    var objects = [];
    for (let i = 0; i < images.length; i += 1) {
        const img = document.createElement('img');

        img.src = images[i];

        // Hack: Android Chromium browsers don't render properly if the <img>
        // is embedded in an <a> or if the <img> has certain CSS (border-radius, hover
        // effect, etc.)
        if (getOS() === "Android") {
            img.classList.add("render--android");
        } else {
            img.classList.add("render");
        }

        // Touch screen compatibility for image clicking
        // Do i need this? -O
        let isSwiping = false;
        img.addEventListener("touchstart", function() {
            isSwiping = false;
        });
        img.addEventListener("touchmove", function() {
            isSwiping = true;
        });

        const objectCSS = new CSS3DObject(img);
        objectCSS.position.x = Math.random() * 4000 - 2000;
        objectCSS.position.y = Math.random() * 4000 - 2000;
        objectCSS.position.z = Math.random() * 4000 - 2000;

        scene.add(objectCSS)
        objects.push(objectCSS)
    }
    return objects
}

function transform(targets, duration, x_scale=1, y_scale=1, z_scale=1) {
    TWEEN.removeAll();

    for (let i = 0; i < objects.length; i++) {

        const object = objects[i];
        const target = targets[i];

        new TWEEN.Tween(object.position)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
        new TWEEN.Tween(object.scale)
            .to({ x: x_scale, y: y_scale, z: z_scale })
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
    }

    new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(render)
        .start();
}

function moveCameraPosition(x, y, z) {
    new TWEEN.Tween(camera.position)
        .to({x: x, y: y, z: z})
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
    new TWEEN.Tween(controls.object.up)
        .to(controls.up0)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    controls.update();
}

function render() {
    renderer.render(scene, camera);
    document.querySelector('.campus-three').querySelector('div:nth-of-type(2)').style.overflow = '';
}

function toggleIcon(icon, removeClass, addClass) {
    icon.classList.remove(removeClass);
    icon.classList.add(addClass);
}

function getOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }

    return os;
}

export { init, animate, controls };
