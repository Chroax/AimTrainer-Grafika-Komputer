import * as THREE from 'three';
import Camera from './lib/Camera';
import Utility from './lib/Utility';
import Light from './lib/Light';
import Arena from './lib/Arena';
import Ball from './lib/Ball';
import EventListener from './lib/EventListener';
import Stats from './lib/Stats';

function animate() {

    const stat = new Stats();
    const utility = new Utility();
    const eventListener = new EventListener();

    const initCamera = new Camera('#canvas');
    initCamera.initialize(40, 10, 250);
    const camera = initCamera.camera;
    const renderer = initCamera.renderer;

    const raycaster = new THREE.Raycaster();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x21252d);

    eventListener.addMouseMove(camera);

    const light = new Light(scene);
    light.initialize();
    light.setLight('PointLight', true);

    const arena = new Arena(scene);
    arena.initialize();
    const ball = new Ball(scene);

    for (let i = 0; i < MAX_TARGET; i++) {
        ball.addBall(scene);
    }

    eventListener.addMouseClickListener(camera, scene, raycaster)

    setInterval(stat.updateFPS, 1000);

    function render() {
        let currentTime = new Date();
        var timeDiff = currentTime - START_TIME;
        timeDiff /= 1000;

        stat.addRawFps();

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

        if (utility.resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        console.log(BALL_TEXTURE);
        renderer.render(scene, camera);
        if (GAME_STATE != "IDLE") {
            requestAnimationFrame(render);
        }
    }

    stat.updateFPS();
    render();
};

let currentRunningProgram = null;

export function startGame() {
    MAX_TIME = document.getElementById("time-form").value;
    THIS_ACTIVE = true;
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