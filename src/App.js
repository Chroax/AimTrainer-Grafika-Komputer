import * as THREE from 'three';
import Camera from './lib/Camera';
import Utility from './lib/Utility';
import Light from './lib/Light';
import Arena from './lib/Arena';
import Ball from './lib/Ball';
import EventListener from './lib/EventListener';
import Stats from './lib/Stats';

function animate() {
    // Setup the statistic
    const Stat = new Stats();

    // Setup the utility
    const utility = new Utility();
    // Setup the event listener
    const eventListener = new EventListener();

    // Setup the camera
    const initCamera = new Camera('#canvas');
    initCamera.initialize(40, 10, 250);
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
    //DirectionalLight, HemisphereLight, AmbientLight, PointLight, Spotlights
    light.setLight('PointLight', true);
    light.setLight('HemisphereLight', true);

    // Setup the arena
    const arena = new Arena(scene);
    arena.initialize();

    // Setup the ball
    const ball = new Ball(scene);


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

    let index = 2; //pilihan texture bola
    let DISTANCE = 0;
    for (let i = 0; i < MAX_TARGET; i++) {
        ball.addBall(scene);
    }

    eventListener.addMouseClickListener(camera, scene, raycaster)

    setInterval(Stat.updateFPS, 1000);

    function render() {
        let currentTime = new Date();
        var timeDiff = currentTime - START_TIME;

        timeDiff /= 1000;

        Stat.addRawFps();

        var seconds = Math.round(timeDiff);
        if (seconds >= MAX_TIME) {
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

export function startGame() {
    MAX_TIME = document.getElementById("time-form").value;

    document.querySelector("#time-button").addEventListener("click", function () {
        document.querySelector(".popup").style.display = "none";
    });

    if (MAX_TIME > 0) {
        document.querySelector('#time-button').addEventListener('click', (event) => {
            document.querySelector('#mainmenu').style.display = 'none';
            document.querySelector('#crosshair').style.display = 'flex';
            document.querySelector('#score-container').style.display = 'flex';
            document.querySelector('#time-container').style.display = 'flex';
            document.querySelector('#accuracy-container').style.display = 'flex';
            document.querySelector('#background').style.display = 'none';
            document.body.requestPointerLock();
            GAME_STATE = "PLAY";
            START_TIME = new Date();
            document.querySelector('#score').innerHTML = 0;
            currentRunningProgram = animate();
        });
    }
}