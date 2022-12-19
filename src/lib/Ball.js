import * as THREE from 'three';
import Utility from './Utility';
import BallTexture  from './BallTexture';
export default class Ball{
    constructor(scene){
        this.scene = scene;
        this.ballTexture = new BallTexture();
        this.utility = new Utility();
    
    }

    ballFactory(model){
        const obj_geometry = new THREE.SphereGeometry(SPHERE_RADIUS);
        const wire_geometry = new THREE.SphereGeometry(SPHERE_RADIUS + 0.75);
        let texture = undefined;
        let obj_material = undefined;
        if(model.texture != undefined){
            texture = new THREE.TextureLoader().load(model.texture);
            texture.wrapS = THREE.RepeatWrapping; 
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(model.repeat, model.repeat);
            obj_material = new THREE.MeshPhongMaterial({map : texture, shininess: 25 });
        }
        else if(model.color != undefined){
            obj_material = new THREE.MeshPhongMaterial({color : model.color, shininess: 25 });
        }
        const wire_material = new THREE.MeshBasicMaterial( );
    
        let obj = {}
        obj.solid = new THREE.Mesh(obj_geometry, obj_material);
        obj.wireframe = new THREE.Mesh(wire_geometry, wire_material);
        obj.solid.castShadow = true;
        obj.solid.receiveShadow = false;
        return obj;
    }

    addBall(scene){
        let position = [0, 0, FIRST_BALL_Z];
        let obj = this.ballFactory(this.ballTexture.getTexture(BALL_TEXTURE));
        obj.solid.position.set(position[0], position[1], position[2]);
        obj.wireframe.position.set(position[0], position[1], position[2]);
        obj.wireframe.visible = false; //hitbox
        
        CLICKABLE_OBJ.push({
            item: obj,
            color: 0xFFFF00
        });
    
        scene.add(obj.solid);
        scene.add(obj.wireframe);
        return obj;
    }
}