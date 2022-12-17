import * as THREE from 'three';
import Utility from './Utility';
export default class Light {

    constructor(scene) {
        this.scene = scene;
        this.utility = new Utility();
        this.objects = {
            DirectionalLight: {
                active: false,
                members: []
            },
            HemisphereLight: {
                active: false,
                members: []
            },
            AmbientLight: {
                active: false,
                members: []
            },
            PointLight: {
                active: false,
                members: []
            },
            Spotlights: {
                active: false,
                members: []
            }
        };
    }

    setLight(type, active) {
        if (active) {
            this.objects[type].members.forEach(light => this.scene.add(light));
        }
        else {
            this.objects[type].members.forEach(light => this.scene.remove(light));
            this.objects[type].active = false;
        }
    }

    // Directional Light
    DirectionalFactory(color, intensity, position) {
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(position[0], position[1], position[2]);
        return light;
    };

    DirectionalLight() {
        this.objects.DirectionalLight.members.push(this.DirectionalFactory(0xFFFFFF, 0.3, [-25, 50, 25]));
        this.objects.DirectionalLight.members.push(this.DirectionalFactory(0xFFFFFF, 0.3, [25, 50, 25]));
        this.objects.DirectionalLight.members.push(this.DirectionalFactory(0xFFFFFF, 0.3, [-25, 50, -25]));
        this.objects.DirectionalLight.members.push(this.DirectionalFactory(0xFFFFFF, 0.3, [25, 50, -25]));

        this.objects.DirectionalLight.members.push(this.DirectionalFactory(0xFFFFFF, 0.3, [-30, 0, 30]));
        this.objects.DirectionalLight.members.push(this.DirectionalFactory(0xFFFFFF, 0.3, [30, 0, 30]));
        this.objects.DirectionalLight.members.push(this.DirectionalFactory(0xFFFFFF, 0.3, [-30, 0, -30]));
        this.objects.DirectionalLight.members.push(this.DirectionalFactory(0xFFFFFF, 0.3, [30, 0, -30]));
    }

    // HemisphereLight
    HemisphereLight() {
        const skyColor = this.utility.generateRandomColor();
        const groundColor = this.utility.generateRandomColor();
        const intensity = 1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);

        this.objects.HemisphereLight.members.push(light);
    }

    // AmbientLight
    AmbientLight() {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.AmbientLight(color, intensity);
        this.objects.AmbientLight.members.push(light);
    }
    // PointLight
    PointLightFactory(color, intensity, position) {
        const light = new THREE.PointLight(color, intensity);
        light.position.set(position[0], position[1], position[2]);
        return light;
    }

    PointLight() {
        this.objects.PointLight.members.push(this.PointLightFactory(0xffffff, 1, [-25, 50, 25]));
        this.objects.PointLight.members.push(this.PointLightFactory(0xffffff, 1, [25, 50, 25]));
        this.objects.PointLight.members.push(this.PointLightFactory(0xffffff, 1, [-25, 50, -25]));
        this.objects.PointLight.members.push(this.PointLightFactory(0xffffff, 1, [25, 50, -25]));

        this.objects.PointLight.members.push(this.PointLightFactory(this.utility.generateRandomColor(), 1, [-30, 0, 30]));
        this.objects.PointLight.members.push(this.PointLightFactory(this.utility.generateRandomColor(), 1, [30, 0, 30]));
        this.objects.PointLight.members.push(this.PointLightFactory(this.utility.generateRandomColor(), 1, [-30, 0, -30]));
        this.objects.PointLight.members.push(this.PointLightFactory(this.utility.generateRandomColor(), 1, [30, 0, -30]));
    }

    // Spotlights   
    SpotLightFactory(color, intensity, position, target_pos) {
        const light = new THREE.SpotLight(color, intensity);
        light.position.set(position[0], position[1], position[2]);
        light.target.position.set(position[0], position[1], position[2]);
        return light;
    }

    SpotLight() {
        this.objects.Spotlights.members.push(this.SpotLightFactory(this.utility.generateRandomColor(), 1, [-25, 50, 25], [0, 0, 0]));
        this.objects.Spotlights.members.push(this.SpotLightFactory(this.utility.generateRandomColor(), 1, [25, 50, 25], [0, 0, 0]));
    }

    initialize() {
        this.DirectionalLight();
        this.HemisphereLight();
        this.AmbientLight();
        this.PointLight();
        this.SpotLight();
    }
}