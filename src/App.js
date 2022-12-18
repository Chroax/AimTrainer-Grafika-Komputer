import * as THREE from 'three';
import Camera from './lib/Camera';

import EventListener from './lib/EventListener';
import Light from './lib/Light';
import Ball from './lib/Ball';
import Utility from './lib/Utility';
import stats from './lib/fps';

function animate() {
    // Setup the utility
    const utility = new Utility();
    // Setup the event listener
    const eventListener = new EventListener();

    // Setup the camera
    const initCamera = new Camera('#canvas');
    initCamera.initialize(90, 0.1, 1000);
    const camera = initCamera.camera;
    const renderer = initCamera.renderer;

    // SET RAYCASTER
    const raycaster = new THREE.Raycaster();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x21252d);

    eventListener.addMouseMove(camera);

    // Setup the lighting
    const light = new Light(scene);
    light.initialize();
    //DirectionalLight, HemisphereLight, AmbientLight, PointLight, SpotLight
    light.setLight('PointLight', true);

    const axesHelper = new THREE.AxesHelper(40);
    scene.add(axesHelper);

    const ball = new Ball();

    let max_color = 10;

    let color_list = [];
    for (let i = 0; i < max_color; i++) {
        color_list.push({ color: utility.generateRandomColor(), displayed: 0 });
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    for (let i = 0; i < MAX_TARGET; i++) {
        ball.addBall(scene);
    }

    eventListener.addMouseClickListener(camera, scene, raycaster)
    const Stat = new stats();
    setInterval(Stat.updateFPS,1000);
    function render() {
        let currentTime = new Date();
        var timeDiff = currentTime - START_TIME; //in ms
        // strip the ms
        timeDiff /= 1000;
        //fps
        Stat.addRawFps();
        // if(currentTime_for_fps - lastupdateTime_for_fps < 1000){
        // fps += 1 / elapsedTime_for_fps;
        // }
        ///end of fps

        var seconds = Math.round(timeDiff);
        if (seconds >= MAX_TIME) {
            // alert(score);
            if (score > HIGH_SCORE) {
                HIGH_SCORE = score;
            }
            GAME_STATE = "IDLE";
            document.querySelector('#mainmenu').style.display = 'flex';
            document.querySelector('#crosshair').style.display = 'none';
            document.querySelector('#score-container').style.display = 'none';
            document.querySelector('#time-container').style.display = 'none';
            document.exitPointerLock();
            scene.clear();
            THIS_ACTIVE = false;
            // Game Ended, Then Show Score
            localStorage.setItem("highscore", HIGH_SCORE);
            document.querySelector('#highscore').innerHTML = localStorage.getItem("highscore");
            return;
        }

        document.querySelector('#time').innerHTML = MAX_TIME - seconds;

        if (resizeRendererToDisplaySize(renderer)) {
            console.log("RESIZED")
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);
        if (GAME_STATE != "IDLE") {
            requestAnimationFrame(render);
        }
    }
    Stat.updateFPS();
    render();

};

let currentRunningProgram = null;

document.querySelector('#start-button').addEventListener('click', (event) => {
    document.querySelector('#mainmenu').style.display = 'none';
    document.querySelector('#crosshair').style.display = 'flex';
    document.querySelector('#score-container').style.display = 'flex';
    document.querySelector('#time-container').style.display = 'flex';
    document.body.requestPointerLock();
    GAME_STATE = "PLAY";
    START_TIME = new Date();
    document.querySelector('#score').innerHTML = 0;
    currentRunningProgram = animate();
})
