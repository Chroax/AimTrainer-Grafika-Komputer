export default class BallTexture{
    constructor(){
        this.a = 0;
        this.textures = [
            {
                texture : undefined,
                repeat : 1,
                color : 0xFF0000
            },
            {
                texture : './src/assets/images/american-football.jpg',
                repeat : 1,
                color : undefined
            },
            {
                texture : './src/assets/images/football.jpg',
                repeat : 1,
                color : undefined
            },
            {
                texture : './src/assets/images/basketball.png',
                repeat : 1,
                color : undefined
            },
            {
                texture : './src/assets/images/Metal_006_roughness.jpg',
                repeat : 1,
                color : undefined
            },
            {
                texture : './src/assets/images/Metal_006_ambientOcclusion.jpg',
                repeat : 1,
                color : undefined
            }
        ]
    };
    getTexture(index){
        return this.textures[index];
    }
}