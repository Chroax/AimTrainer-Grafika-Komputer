import * as THREE from 'three';
import BallTexture  from './BallTexture';
export default class Ball{
    constructor(scene){
        this.scene = scene;
        this.ballTexture = new BallTexture();
    
    }
    // fungsi buat ngbikin ballnya
    ballFactory(model, SPHERE_RADIUS){
        const obj_geometry = new THREE.SphereGeometry(SPHERE_RADIUS);
        const texture = new THREE.TextureLoader().load(model.texture);
        texture.wrapS = THREE.RepeatWrapping; 
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(model.repeat, model.repeat);
        const obj_material = new THREE.MeshPhongMaterial({ map : texture, color: model.color, shininess: 150 });
        
        const wireframe_geometry = new THREE.WireframeGeometry(obj_geometry);
        const wireframe_material = new THREE.LineBasicMaterial( { color: 0xffffff } );
    
        let obj = {}
        obj.solid = new THREE.Mesh(obj_geometry, obj_material);
        obj.wireframe = new THREE.LineSegments(wireframe_geometry, wireframe_material);
    
        return obj;
    }
    
    add(a, b, DISTANCE, SPHERE_RADIUS, CLICKABLE_OBJ, index){
        //index buat pilihan texture, lihat BallTexture.js untuk list pilihannya
        let color = 0xff2222;
    
        let new_position = null;
        
        // buat ngpastiin posisi barunya ga berdempetan sama ball yg udah ada
        while(true){
            new_position = [a, b, -DISTANCE];
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
        let obj = this.ballFactory(this.ballTexture.getTexture(index), SPHERE_RADIUS); //ini user input buat texture bola
        obj.solid.position.set(position[0], position[1], position[2]);
        obj.wireframe.position.set(position[0], position[1], position[2]);
        
        CLICKABLE_OBJ.push({
            item: obj,
            color: color
        });
    
        this.scene.add(obj.solid);
        return obj;
    }
}