export default class BallTexture{
    constructor(){
        this.a = 0;
        this.textures = [
            {
                texture : './src/assets/images/floor.png',
                repeat : 1,
                color : 0xFFFFFF
            },
            {
                texture : './src/assets/images/roof.png',
                repeat : 1,
                color : 0xFFFFFF
            },
            {
                texture : './src/assets/images/wall.png',
                repeat : 2,
                color : 0xFFFFFF
            }
        ]
    };
    getTexture(index){
        return this.textures[index];
    }
}