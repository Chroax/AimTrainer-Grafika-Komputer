// Tolong taruin di bagian atas yaa ntii, buat ngatur difficultynya ------------------

let DIFFICULTY = prompt("DIFFICULTY (E/M/H");
let SPHERE_RADIUS = 0;
let MAX_TARGET = 0;
let BOUNDARIES = 0;
let DISTANCE = 0;
let CLICKABLE_OBJ = [];

if(DIFFICULTY.toLowerCase === "h"){
    SPHERE_RADIUS = 3;
    MAX_TARGET = 3;
    BOUNDARIES = 25;
    DISTANCE = 25;
}
else if(DIFFICULTY.toLowerCase === "m"){
    SPHERE_RADIUS = 4;
    MAX_TARGET = 4;
    BOUNDARIES = 20;
    DISTANCE = 17;
}
else{
    SPHERE_RADIUS = 5;
    MAX_TARGET = 5;
    BOUNDARIES = 15;
    DISTANCE = 10;
}

let boundary = {
    x:{min:-BOUNDARIES, max:BOUNDARIES},
    y:{min:-BOUNDARIES, max:BOUNDARIES},
}
// -----------------------------------------------------------------------------------

import * as THREE from 'three';

// fungsi buat ngbikin ballnya
function ballFactory(color, SPHERE_RADIUS){
    const obj_geometry = new THREE.SphereGeometry(SPHERE_RADIUS);
    const obj_material = new THREE.MeshLambertMaterial({color: color});
    
    const wireframe_geometry = new THREE.WireframeGeometry(obj_geometry);
    const wireframe_material = new THREE.LineBasicMaterial( { color: 0xffffff } );

    let obj = {}
    obj.solid = new THREE.Mesh(obj_geometry, obj_material);
    obj.wireframe = new THREE.LineSegments(wireframe_geometry, wireframe_material);

    return obj;
}

function addBall(boundary, DISTANCE, SPHERE_RADIUS, CLICKABLE_OBJ){
    let color = 0xff2222;

    let new_position = null;
    
    // buat ngpastiin posisi barunya ga berdempetan sama ball yg udah ada
    while(true){
        new_position = [getRndInteger(boundary.x.min, boundary.x.max), getRndInteger(boundary.y.min, boundary.y.max), -DISTANCE];
        let isOK = true;
        for(let i=0; i<CLICKABLE_OBJ.length; i++){
            if(
                Math.abs(CLICKABLE_OBJ[i].item.solid.position.x - new_position[0]) <= SPHERE_RADIUS
                ||
                Math.abs(CLICKABLE_OBJ[i].item.solid.position.y - new_position[1]) <= SPHERE_RADIUS
            ){
                isOK = false;
                break;
            }
        }
        if(isOK){
            break;
        }
    }

    // ng init obj ball baru tsb, di add ke list dan ke scene
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