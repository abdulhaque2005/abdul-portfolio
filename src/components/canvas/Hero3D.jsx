import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Float, Text, Torus, MeshDistortMaterial } from '@react-three/drei';
import { TextureLoader } from 'three';

const Hero3D = () => {
    const mainRef = useRef();
    const torusRef = useRef();
    const texture = useLoader(TextureLoader, '/profile.jpg');

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (mainRef.current) {
            mainRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
            mainRef.current.position.y = Math.sin(t * 0.5) * 0.1;
        }

        if (torusRef.current) {
            torusRef.current.rotation.z = t * 0.1;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <group ref={mainRef} position={[0, 0, 0]}>
                    <mesh position={[0, 0, 0.1]}>
                        <planeGeometry args={[3, 3.5]} />
                        <meshBasicMaterial map={texture} />
                    </mesh>

                    <mesh position={[0, 0, 0]} scale={[3.1, 3.6, 1]}>
                        <planeGeometry args={[1, 1]} />
                        <meshStandardMaterial color="#0ea5e9" roughness={0.2} metalness={0.8} />
                    </mesh>

                    <group ref={torusRef}>
                        <Torus args={[2.8, 0.05, 16, 100]} rotation={[0, 0, 0]}>
                            <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.5} />
                        </Torus>
                    </group>
                </group>
            </Float>

            <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
                <mesh position={[-4, 2, -2]} scale={0.8}>
                    <icosahedronGeometry args={[1, 0]} />
                    <MeshDistortMaterial color="#0ea5e9" distort={0.4} speed={2} wireframe />
                </mesh>
                <mesh position={[4, -2, -3]} scale={0.6}>
                    <octahedronGeometry args={[1, 0]} />
                    <MeshDistortMaterial color="#a855f7" distort={0.3} speed={2} wireframe />
                </mesh>
            </Float>

            <group position={[0, -2.5, 1]}>
                <Text
                    position={[0, 0.3, 0]}
                    fontSize={1.2}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC0C4G-FiA.woff"
                    fontWeight="800"
                >
                    ABDUL HAQUE
                </Text>
                <Text
                    position={[0, -0.4, 0]}
                    fontSize={0.5}
                    color="#38bdf8"
                    anchorX="center"
                    anchorY="middle"
                    font="https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4Ko21nuJ.woff"
                    letterSpacing={0.1}
                >
                    FULL STACK DEVELOPER
                </Text>
            </group>
        </group>
    );
};

export default Hero3D;
