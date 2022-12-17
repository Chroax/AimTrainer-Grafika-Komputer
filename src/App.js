import * as THREE from 'three';
import Camera from './lib/Camera';
import Utility from './lib/Utility';
import Light from './lib/Light';
import Arena from './lib/Arena';

let GAME_STATE = "IDLE";
let MAX_TIME = prompt("MAX_TIME (s)");
let START_TIME = null;
let HIGH_SCORE = localStorage.getItem("highscore") ? localStorage.getItem("highscore") : 0;

function animate() {
    let THIS_ACTIVE = true;
    let CLICKABLE_OBJ = [];
    let SPHERE_RADIUS = 5;
    let MAX_TARGET = 3;
    let score = 0;

    
    //Setup utility
    const utility = new Utility();

    // Setup the camera
    const initCamera = new Camera('#canvas');
    initCamera.initialize(90, 0.1, 1000);
    const camera = initCamera.camera;
    const renderer = initCamera.renderer;

    // SET RAYCASTER
    const raycaster = new THREE.Raycaster();


    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x21252d);

    document.body.addEventListener('mousemove', (event) => {
        if (document.pointerLockElement === document.body) {
            camera.rotation.y -= event.movementX / 500;
            camera.rotation.x -= event.movementY / 500;
        }

    });

    // Setup the lighting
    const light = new Light(scene);
    light.initialize();
    //DirectionalLight, HemisphereLight, AmbientLight, PointLight, SpotLight
    light.setLight('PointLight', true);

    // Setup the arena
    const arena = new Arena(scene);
    arena.initialize();


    function ballFactory(color) {
        const obj_geometry = new THREE.SphereGeometry(SPHERE_RADIUS);
        const obj_material = new THREE.MeshPhongMaterial({ color: color, shininess: 150 });

        const wireframe_geometry = new THREE.WireframeGeometry(obj_geometry);
        const wireframe_material = new THREE.LineBasicMaterial({ color: 0xffffff });

        let obj = {}
        obj.solid = new THREE.Mesh(obj_geometry, obj_material);
        obj.wireframe = new THREE.LineSegments(wireframe_geometry, wireframe_material);

        return obj;
    }

    function addBall() {
        let color = 0xff2222;

        let new_position = null;

        while (true) {
            new_position = [utility.getRndInteger(boundary.x.min, boundary.x.max), utility.getRndInteger(boundary.y.min, boundary.y.max), 0];
            let isOK = true;
            for (let i = 0; i < CLICKABLE_OBJ.length; i++) {
                if (
                    Math.abs(CLICKABLE_OBJ[i].item.solid.position.x - new_position[0]) <= SPHERE_RADIUS
                    ||
                    Math.abs(CLICKABLE_OBJ[i].item.solid.position.y - new_position[1]) <= SPHERE_RADIUS
                ) {
                    isOK = false;
                    break;
                }
            }
            if (isOK) {
                break;
            }
        }

        let position = new_position;
        let obj = ballFactory(color);
        obj.solid.position.set(position[0], position[1], position[2]);
        obj.wireframe.position.set(position[0], position[1], position[2]);

        CLICKABLE_OBJ.push({
            item: obj,
            color: color
        });

        scene.add(obj.solid);
        return obj;
    }

    let boundary = {
        x: { min: -20, max: 20 },
        y: { min: -20, max: 20 },
        z: { min: -100, max: -8 },
    }

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
        addBall();
    }

    function selectObject(object) {
        let new_position = null;
        while (true) {
            new_position = [utility.getRndInteger(boundary.x.min, boundary.x.max), utility.getRndInteger(boundary.y.min, boundary.y.max), 0];
            let isOK = true;
            for (let i = 0; i < CLICKABLE_OBJ.length; i++) {
                if (CLICKABLE_OBJ[i] == object) continue;

                if (
                    Math.abs(CLICKABLE_OBJ[i].item.solid.position.x - new_position[0]) <= SPHERE_RADIUS
                    ||
                    Math.abs(CLICKABLE_OBJ[i].item.solid.position.y - new_position[1]) <= SPHERE_RADIUS
                ) {
                    isOK = false;
                    break;
                }
            }
            if (isOK) {
                break;
            }
        }
        let position = new_position;

        object.item.solid.position.set(position[0], position[1], position[2]);
        score += 100;
        document.querySelector('#score').innerHTML = score;
    }

    document.body.addEventListener("click", (event) => {
        if (!THIS_ACTIVE) return;
        if (event.which == 3) {
            selected_object.forEach((item) => {
                scene.remove(item.item.wireframe);
            });
        }
        document.body.requestPointerLock()

        let middle_point = new THREE.Vector2(0, 0);
        raycaster.setFromCamera(middle_point, camera);
        var intersects = raycaster.intersectObjects(scene.children); //array

        let objectTerklik = false;
        intersects.forEach((obj) => {
            CLICKABLE_OBJ.forEach((C_OBJ) => {
                if (C_OBJ.item.solid == obj.object) {
                    selectObject(C_OBJ);
                    objectTerklik = true;
                    const audio_click = new Audio('src/assets/roblox_death.mp3');
                    audio_click.play();
                }
            })
        });
        if (!objectTerklik) {
            score -= 10;
            document.querySelector('#score').innerHTML = score;
            const audio_wiff = new Audio('src/assets/bruh.mp3');
            audio_wiff.play();
        }
    }, true);

    function render() {
        let currentTime = new Date();
        var timeDiff = currentTime - START_TIME; //in ms
        // strip the ms
        timeDiff /= 1000;

        // get seconds 
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

// animate();