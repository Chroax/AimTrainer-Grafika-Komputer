import * as THREE from 'three';

export default class BallTexture{
    constructor(){
        this.a = 0;
        this.textures = [
            {
                texture : './src/assets/images/floor.png',
                repeat : 1,
                color : undefined
            },
            {
                texture : './src/assets/images/roof.png',
                repeat : 1,
                color : undefined
            },
            {
                texture : './src/assets/images/wall.png',
                repeat : 1,
                color : undefined
            }
        ]
    };
    getTexture(index){
        return this.textures[index];
    }

}