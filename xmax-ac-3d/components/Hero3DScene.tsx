"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const count = 150;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const lightMesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -20 + Math.random() * 40;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      // alternate between ice blue and fire red
      const isCold = Math.random() > 0.5;
      const color = isCold ? new THREE.Color("#00B4FF") : new THREE.Color("#FF3C00");
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0, color });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorArray = useMemo(() => {
    const colors = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      p.color.toArray(colors, i * 3);
    });
    return colors;
  }, [particles]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} position={[0, 0, -10]}>
      <sphereGeometry args={[0.1, 16, 16]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </sphereGeometry>
      <meshStandardMaterial vertexColors toneMapped={false} emissiveIntensity={2} transparent opacity={0.8} />
    </instancedMesh>
  );
}

function MinisplitProxy() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <PresentationControls global rotation={[0.1, -0.2, 0]} polar={[-0.2, 0.2]} azimuth={[-0.5, 0.5]} config={{ mass: 2, tension: 400 }}>
          {/* Main Body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4, 1.2, 0.8]} />
            <meshStandardMaterial color="#E5E5E5" metalness={0.8} roughness={0.2} envMapIntensity={1} />
          </mesh>
          
          {/* Front Panel details */}
          <mesh position={[0, 0.1, 0.41]}>
            <boxGeometry args={[3.8, 0.8, 0.05]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
          </mesh>
          
          {/* Display Glow */}
          <mesh position={[1.2, 0.1, 0.44]}>
            <planeGeometry args={[0.4, 0.15]} />
            <meshBasicMaterial color="#00B4FF" toneMapped={false} />
          </mesh>

          {/* Air Vent */}
          <mesh position={[0, -0.4, 0.35]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[3.6, 0.15, 0.2]} />
            <meshStandardMaterial color="#0A0A0A" metalness={0.5} roughness={0.8} />
          </mesh>
        </PresentationControls>
      </Float>
    </group>
  );
}

export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={['#0A0A0A']} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00B4FF" />
        <pointLight position={[10, -10, -10]} intensity={0.5} color="#FF3C00" />
        
        <Particles />
        <MinisplitProxy />
        
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
