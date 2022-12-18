export default class stats{
    updateFPS(){
        use_fps = (raw_fps*1000)/(currentTime_for_fps - lastupdateTime_for_fps);
        console.log(use_fps);
        raw_fps = 0;
        lastupdateTime_for_fps = performance.now();
    }
}