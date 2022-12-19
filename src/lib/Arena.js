import * as THREE from 'three';
import Utility from './Utility';
export default class Light {
    constructor(scene) {
        this.scene = scene;
        this.utility = new Utility();
        this.sphere_radius = 10;
        this.size = (CAMERA_Z + DISTANCE) << 1;
        this.mid = (CAMERA_Z - DISTANCE) >> 1;
        this.objects = {
            floor: {
                name : 'floor',
                texture: './src/assets/images/floor.png',
                repeat: 10,
                color: 0xffffff,
                rotation: {
                    x: true,
                    y: false
                },
                width: this.size,
                height: this.size,
                x: 0,
                y: -50,
                z: this.mid
            },
            roof: {
                name : 'roof',
                texture: './src/assets/images/roof.png',
                repeat: 10,
                color: 0xffffff,
                rotation: {
                    x: true,
                    y: false
                },
                width: this.size,
                height: this.size,
                x: 0,
                y: 100,
                z: this.mid
            },
            wall_front: {
                name : 'wall',
                texture: './src/assets/images/wall.png',
                repeat: 10,
                color: 0xff00ff,
                rotation: {
                    x: false,
                    y: false
                },
                x: 0,
                y: 0,
                z: this.mid - this.size >> 1,
                width: this.size,
                height: this.size
            },
            wall_back: {
                name : 'wall',
                texture: undefined,
                repeat: 10,
                color: 0x000000,
                rotation: {
                    x: false,
                    y: false
                },
                width: this.size,
                height: this.size,
                x: 0,
                y: 0,
                z: this.mid + this.size >> 1
            },
            wall_left: {
                name : 'wall',
                texture: './src/assets/images/wall.png',
                repeat: 10,
                color: 0xffff00,
                rotation: {
                    x: false,
                    y: true
                },
                width: this.size,
                height: this.size,
                x: -50,
                y: 50,
                z: this.mid
            },
            wall_right: {
                name : 'wall',
                texture: './src/assets/images/wall.png',
                repeat: 10,
                color: 0xff0000,
                rotation: {
                    x: false,
                    y: true
                },
                width: this.size,
                height: this.size,
                x: 50,
                y: 50,
                z: this.mid
            }
        };

        //end of constructor
    }

    //floor, roof, walls
    wallFactory(object) {
        const texture = object.texture;
        const color = object.color;
        let obj_texture = undefined;
        let obj_material = undefined;

        const obj_geometry = new THREE.PlaneGeometry(object.width, object.height);
        if (texture != undefined) {
            obj_texture = new THREE.TextureLoader().load(object.texture);
            obj_texture.wrapS = THREE.RepeatWrapping;
            obj_texture.wrapT = THREE.RepeatWrapping;
            obj_texture.repeat.set(object.repeat, object.repeat);

            obj_material = new THREE.MeshStandardMaterial({ map: obj_texture });
        }
        else {
            obj_material = new THREE.MeshStandardMaterial({ color: color });
        };
        obj_material.side = THREE.DoubleSide;
        let wall = new THREE.Mesh(obj_geometry, obj_material);
        wall.receiveShadow = true;
        wall.castShadow = false;
        return wall;
    }
    addWall(object) {
        var wall = this.wallFactory(object);
        if (object.rotation.x) {
            wall.rotation.x += -0.5 * Math.PI;
        }
        if (object.rotation.y) {
            wall.rotation.y += -0.5 * Math.PI;
        }
        wall.position.set(object.x, object.y, object.z);
        this.scene.add(wall);
    }

    initialize() {
        this.addWall(this.objects.floor);
        this.addWall(this.objects.roof);
        this.addWall(this.objects.wall_front);
        this.addWall(this.objects.wall_back);
        this.addWall(this.objects.wall_left);
        this.addWall(this.objects.wall_right);
    }
}