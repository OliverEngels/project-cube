import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AUTO_ROTATE } from './constants';

export function setupScene(containerRef) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x000000, 0);

    containerRef.current?.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 8.5);

    controls.minDistance = 8.5;
    controls.maxDistance = 12;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.enablePan = false;
    controls.autoRotate = AUTO_ROTATE;
    controls.autoRotateSpeed = 1;

    // Ligthing
    const ambientLight = new THREE.AmbientLight(0xffffff, 5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(1, 1, 1);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Composer
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const ssaoPass = new SSAOPass(scene, camera, containerRef.current.clientWidth, containerRef.current.clientHeight);
    ssaoPass.scale = .9;
    ssaoPass.kernelRadius = 8;
    ssaoPass.minDistance = 0.0005;
    ssaoPass.maxDistance = .1;
    ssaoPass.intensity = 1;
    composer.addPass(ssaoPass);

    composer.render();

    return {
        scene,
        camera,
        renderer,
        composer,
        controls,
    };
}