import * as THREE from 'three';

export default class Ball{
    
    // fungsi buat ngbikin ballnya
    ballFactory(color, SPHERE_RADIUS){
        const obj_geometry = new THREE.SphereGeometry(SPHERE_RADIUS);
        const obj_material = new THREE.MeshLambertMaterial({color: color});
        
        const wireframe_geometry = new THREE.WireframeGeometry(obj_geometry);
        const wireframe_material = new THREE.LineBasicMaterial( { color: 0xffffff } );
    
        let obj = {}
        obj.solid = new THREE.Mesh(obj_geometry, obj_material);
        obj.wireframe = new THREE.LineSegments(wireframe_geometry, wireframe_material);
    
        return obj;
    }
    
    addBall(a, b, DISTANCE, SPHERE_RADIUS, CLICKABLE_OBJ, scene){
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
        let obj = this.ballFactory(color, SPHERE_RADIUS);
        obj.solid.position.set(position[0], position[1], position[2]);
        obj.wireframe.position.set(position[0], position[1], position[2]);
        
        CLICKABLE_OBJ.push({
            item: obj,
            color: color
        });
    
        scene.add(obj.solid);
        return obj;
    }
}