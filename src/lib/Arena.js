import * as THREE from 'three';
import Utility from './Utility';
export default class Light {
    constructor(scene) {
        this.scene = scene;
        this.utility = new Utility();
        this.sphere_radius = 10;
        this.size = 100;
        this.objects = {
            floor: {
                texture: './src/assets/images/floor.png',
                repeat: 5,
                color: 0xffffff,
                rotation: {
                    x: true,
                    y: false
                },
                width: this.size,
                height: this.size,
                x: 0,
                y: -50,
                z: this.size >> 1
            },
            roof: {
                texture: './src/assets/images/roof.png',
                repeat: 5,
                color: 0xffffff,
                rotation: {
                    x: true,
                    y: false
                },
                width: this.size,
                height: this.size,
                x: 0,
                y: 50,
                z: this.size >> 1
            },
            wall_front: {
                texture: './src/assets/images/wall.png',
                repeat: 5,
                color: 0xff00ff,
                rotation: {
                    x: false,
                    y: false
                },
                x: 0,
                y: 0,
                z: 0,
                width: 100,
                height: 100
            },
            wall_back: {
                texture: undefined,
                repeat: 5,
                color: 0x000000,
                rotation: {
                    x: false,
                    y: false
                },
                width: this.size,
                height: this.size,
                x: 0,
                y: 0,
                z: this.size
            },
            wall_left: {
                texture: './src/assets/images/wall.png',
                repeat: 5,
                color: 0xffff00,
                rotation: {
                    x: false,
                    y: true
                },
                width: this.size,
                height: this.size,
                x: -this.size >> 1,
                y: 0,
                z: this.size >> 1
            },
            wall_right: {
                texture: './src/assets/images/wall.png',
                repeat: 5,
                color: 0xff0000,
                rotation: {
                    x: false,
                    y: true
                },
                width: this.size,
                height: this.size,
                x: this.size >> 1,
                y: 0,
                z: this.size >> 1
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

            obj_material = new THREE.MeshBasicMaterial({ map: obj_texture });
        }
        else {
            obj_material = new THREE.MeshBasicMaterial({ color: color });
        };
        obj_material.side = THREE.DoubleSide;
        let wall = new THREE.Mesh(obj_geometry, obj_material);

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