import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import usePrefersReducedMotion from "../../utils/usePrefersReducedMotion.js";

// An Irish tower-style stone spiral staircase: a central stone newel post
// with wedge treads winding around it, rotating on its vertical axis as the
// user scrolls.
const HEIGHT = 11;
const STAIR_TURNS = 5;
const STEP_COUNT = 84;
const NEWEL_RADIUS = 0.24;
const STEP_OUTER_RADIUS = 1.55;
const STEP_THICKNESS = 0.11;
const STEP_TANGENTIAL_WIDTH = 0.56;

// Procedural mottled grey-limestone texture (with faint mortar joints) so the
// staircase reads as carved stone blocks rather than flat plastic color.
function createStoneTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#9c9488";
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 2 + Math.random() * 10;
    const shade = 110 + Math.random() * 95;
    ctx.fillStyle = `rgba(${shade}, ${shade - 6}, ${shade - 16}, ${0.1 + Math.random() * 0.2})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = "rgba(35, 32, 28, 0.35)";
  ctx.lineWidth = 2;
  const divisions = 6;
  for (let i = 0; i <= divisions; i++) {
    const p = (i / divisions) * size;
    ctx.beginPath();
    ctx.moveTo(0, p);
    ctx.lineTo(size, p);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, size);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.needsUpdate = true;
  return texture;
}

function buildStepMatrices() {
  const dummy = new THREE.Object3D();
  const matrices = [];
  for (let i = 0; i < STEP_COUNT; i++) {
    const t = i / STEP_COUNT;
    const angle = t * STAIR_TURNS * Math.PI * 2;
    const y = (t - 0.5) * HEIGHT;
    const midRadius = (NEWEL_RADIUS + STEP_OUTER_RADIUS) / 2;
    dummy.position.set(Math.cos(angle) * midRadius, y, Math.sin(angle) * midRadius);
    dummy.rotation.set(0, -angle, 0);
    dummy.updateMatrix();
    matrices.push(dummy.matrix.clone());
  }
  return matrices;
}

function StepInstances({ matrices, material }) {
  const meshRef = useRef();

  useEffect(() => {
    if (!meshRef.current) return;
    matrices.forEach((matrix, i) => meshRef.current.setMatrixAt(i, matrix));
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [matrices]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, matrices.length]} material={material}>
      <boxGeometry args={[STEP_OUTER_RADIUS - NEWEL_RADIUS, STEP_THICKNESS, STEP_TANGENTIAL_WIDTH]} />
    </instancedMesh>
  );
}

function StaircaseMesh({ progressRef, reducedMotion, totalRotation, material }) {
  const groupRef = useRef();
  const currentRotation = useRef(0);
  const stepMatrices = useMemo(buildStepMatrices, []);

  useFrame(() => {
    if (!groupRef.current) return;
    // Spins about its own vertical (Y) axis, like climbing and turning up the tower, as the user scrolls.
    const target = reducedMotion ? 0 : progressRef.current * totalRotation;
    currentRotation.current += (target - currentRotation.current) * 0.08;
    groupRef.current.rotation.y = currentRotation.current;
  });

  return (
    <group ref={groupRef}>
      <mesh material={material}>
        <cylinderGeometry args={[NEWEL_RADIUS, NEWEL_RADIUS, HEIGHT, 24]} />
      </mesh>
      <StepInstances matrices={stepMatrices} material={material} />
    </group>
  );
}

export default function SpiralScene({ progressRef, totalRotation = Math.PI * 6 }) {
  const reducedMotion = usePrefersReducedMotion();
  const stoneMaterial = useMemo(() => {
    const texture = createStoneTexture();
    return new THREE.MeshStandardMaterial({ map: texture, color: "#e4dcc8", roughness: 0.9, metalness: 0.02 });
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 9.5], fov: 50 }} dpr={reducedMotion ? 1 : [1, 1.5]}>
        <ambientLight intensity={1.1} />
        <pointLight position={[0, 2, 10]} intensity={2.2} color="#fff6e6" />
        <pointLight position={[6, 4, 6]} intensity={1.3} color="#fff4dd" />
        <pointLight position={[-6, -4, -4]} intensity={0.7} color="#ffe9c2" />
        <hemisphereLight args={["#fff6e6", "#3a3126", 0.6]} />
        <StaircaseMesh progressRef={progressRef} reducedMotion={reducedMotion} totalRotation={totalRotation} material={stoneMaterial} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-white/15" />
    </div>
  );
}
