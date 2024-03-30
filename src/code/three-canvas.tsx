import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { setupScene } from './scene-setup';
import { setupMouseInteractions } from './cube-interactions/mouse-interactions';
import { setupCubeLoader } from './cube-loader/cube-loader';
import * as THREE from 'three';
import { AUTO_ROTATE, START_ROTATE } from './constants';

const ThreeCanvas = () => {
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const manager = new THREE.LoadingManager();
        manager.onLoad = () => {
            setLoading(false);
        }

        const { scene, camera, renderer, composer, controls } = setupScene(containerRef);
        setupCubeLoader(scene, manager);
        setupMouseInteractions(camera, scene, renderer, controls, containerRef);

        let speed = .12;
        let angle = 0;

        let currentDistance = camera.position.distanceTo(scene.position);
        const minDistance = 10;
        const zoomSpeed = 1;
        const autoRotateDelay = 2000;

        let isUserInteracting = false;
        let lastInteractionTime = Date.now();

        controls.addEventListener('start', () => {
            isUserInteracting = true;
            controls.autoRotate = false;
        });

        controls.addEventListener('end', () => {
            isUserInteracting = false;
            lastInteractionTime = Date.now();
        });

        const onWindowResize = () => {
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        }
        window.addEventListener('resize', onWindowResize, false);

        const animate = () => {
            requestAnimationFrame(animate);

            if (speed > 0 && START_ROTATE) {
                angle -= speed;
                if (currentDistance > minDistance) {
                    currentDistance -= zoomSpeed;
                }
                const x = Math.sin(angle) * currentDistance;
                const z = Math.cos(angle) * currentDistance;
                camera.position.x = x;
                camera.position.z = z;
                camera.position.y = 7.5;

                speed -= 0.001;
                camera.lookAt(scene.position);
            } else {
                const timeSinceLastInteraction = Date.now() - lastInteractionTime;
                if (!isUserInteracting && timeSinceLastInteraction > autoRotateDelay) {
                    controls.autoRotate = AUTO_ROTATE;
                }
            }


            controls.update();
            composer.render(scene, camera);
        };

        animate();

        // Cleanup function
        return () => {
            containerRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            {loading && <p>Loading....</p>}
            <div ref={containerRef} style={{ width: '100%', height: '100%', top: '-50px', position: 'absolute' }} />
        </div>
    );
};

export default ThreeCanvas;