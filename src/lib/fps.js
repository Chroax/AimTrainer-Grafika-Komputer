export default class stats{
    addRawFps(){
        currentTime_for_fps = performance.now();
        elapsedTime_for_fps = currentTime_for_fps - previousTime_for_fps;
        previousTime_for_fps = currentTime_for_fps;
        raw_fps++;
    }
    updateFPS(){
        use_fps = (raw_fps*1000)/(currentTime_for_fps - lastupdateTime_for_fps);
        console.log(use_fps);
        raw_fps = 0;
        lastupdateTime_for_fps = performance.now();
    }
}