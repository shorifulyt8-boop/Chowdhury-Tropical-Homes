import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function BuildingModel() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={group}>
      {/* Main Tower - Tier 1 */}
      <mesh castShadow position={[0, 1.5, 0]}>
        <boxGeometry args={[2.5, 3, 2.5]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Main Tower - Tier 2 */}
      <mesh castShadow position={[0, 4, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Glass Facades */}
      <mesh position={[0, 2.75, 1.26]}>
        <boxGeometry args={[1.8, 4.5, 0.05]} />
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.4} metalness={1} roughness={0} />
      </mesh>
      <mesh position={[0, 2.75, -1.26]}>
        <boxGeometry args={[1.8, 4.5, 0.05]} />
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.4} metalness={1} roughness={0} />
      </mesh>

      {/* Balconies */}
      {[1, 2, 3, 4].map((i) => (
        <group key={i} position={[1.3, i * 0.8 + 0.5, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.4, 0.05, 1.5]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
          <mesh position={[0.15, 0.15, 0]}>
            <boxGeometry args={[0.02, 0.3, 1.5]} />
            <meshStandardMaterial color="#94a3b8" transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {/* Windows/Lights */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-1.26, i * 0.5 + 0.5, Math.sin(i) * 0.5]}>
          <boxGeometry args={[0.05, 0.3, 0.4]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            emissive="#fbbf24" 
            emissiveIntensity={1.5} 
          />
        </mesh>
      ))}

      {/* Roof Garden/Top Detail */}
      <mesh position={[0, 5.1, 0]}>
        <boxGeometry args={[1.5, 0.1, 1.5]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      
      {/* Spire */}
      <mesh position={[0.5, 5.5, 0.5]}>
        <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>

      {/* Base Podium */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[4, 0.2, 4]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </group>
  );
}

export default function Building3D() {
  return (
    <div className="w-full h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[12, 6, 12]} fov={40} />
        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
            <group scale={0.8} position={[0, -2, 0]}>
              <BuildingModel />
            </group>
          </Float>
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={15} 
            blur={2.5} 
            far={10} 
          />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          minPolarAngle={Math.PI / 6} 
          maxPolarAngle={Math.PI / 1.5} 
          makeDefault 
        />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 15, 10]} intensity={1.5} castShadow />
      </Canvas>
    </div>
  );
}
