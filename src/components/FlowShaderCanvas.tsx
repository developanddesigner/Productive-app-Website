import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FlowShaderCanvasProps {
  className?: string;
  speedMultiplier?: number;
  interactive?: boolean;
}

export default function FlowShaderCanvas({
  className = '',
  speedMultiplier = 0.4,
  interactive = true,
}: FlowShaderCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const scene = new THREE.Scene();

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Custom Shaders for Cadence Flow Wave with smooth continuous curvature
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uTime;
      uniform vec2 uMouse;

      void main() {
        vUv = uv;
        vNormal = normal;
        
        vec3 pos = position;
        
        // Gentle, slowed tempo
        float tempo = uTime * 0.45;
        
        // Silky, low-frequency continuous harmonic waves without harsh creases
        float wave1 = sin(pos.x * 0.95 + tempo) * cos(pos.y * 0.85 + tempo * 0.65) * 0.32;
        float wave2 = sin(pos.y * 1.25 - tempo * 0.75) * cos(pos.x * 0.75 + tempo * 0.45) * 0.18;
        float wave3 = sin((pos.x * 0.6 + pos.y * 0.7) + tempo * 0.35) * 0.15;
        
        // Very soft, gradual mouse wave disturbance
        float distToMouse = distance(pos.xy, uMouse * 1.8);
        float mouseWave = sin(distToMouse * 3.2 - uTime * 0.9) * exp(-distToMouse * 1.1) * 0.12;
        
        pos.z += wave1 + wave2 + wave3 + mouseWave;
        vPosition = pos;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uTime;
      uniform vec2 uMouse;

      void main() {
        // Deep obsidian base
        vec3 colorBase = vec3(0.035, 0.051, 0.086);       // #090D16
        // Aerospace slate periwinkle
        vec3 colorPeriwinkle = vec3(0.478, 0.608, 0.800); // #7A9BCC
        // Cadence deep emerald
        vec3 colorEmerald = vec3(0.137, 0.494, 0.333);    // #237E55
        // Subtle champagne brass
        vec3 colorGold = vec3(0.784, 0.675, 0.475);       // #C8AC79

        // Calculate smooth lighting based on gentle height elevation
        float elevation = smoothstep(-0.45, 0.45, vPosition.z);
        
        // Very slow, soothing color breathing
        float pulse = sin(uTime * 0.45) * 0.5 + 0.5;
        
        vec3 mixedColor = mix(colorBase, colorPeriwinkle * 0.38, elevation * 0.7);
        mixedColor = mix(mixedColor, colorEmerald * 0.55, pow(elevation, 1.8) * (0.35 + 0.25 * pulse));
        mixedColor = mix(mixedColor, colorGold * 0.45, pow(elevation, 2.8) * 0.45);

        // Softened Fresnel edge glow
        float fresnel = pow(1.0 - abs(dot(normalize(-vPosition), vec3(0.0, 0.0, 1.0))), 2.2);
        mixedColor += colorPeriwinkle * fresnel * 0.35;

        // Ultra-smooth border feathering to blend all wave edges seamlessly
        float edgeX = smoothstep(0.0, 0.24, vUv.x) * smoothstep(1.0, 0.76, vUv.x);
        float edgeY = smoothstep(0.0, 0.24, vUv.y) * smoothstep(1.0, 0.76, vUv.y);
        float borderFeather = edgeX * edgeY;

        // Radial falloff towards canvas borders
        float d = distance(vUv, vec2(0.5));
        float radialVignette = smoothstep(0.75, 0.15, d);

        float alpha = borderFeather * radialVignette * 0.85;

        gl_FragColor = vec4(mixedColor, alpha);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };

    const geometry = new THREE.PlaneGeometry(8, 5.5, 128, 128);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      wireframe: false,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI * 0.15;
    scene.add(mesh);

    // Floating 3D ambient particles
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      scales[i] = Math.random() * 2.5 + 0.8;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#7A9BCC'),
      size: 0.04,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Mouse Interaction
    const targetMouse = new THREE.Vector2(0, 0);
    const currentMouse = new THREE.Vector2(0, 0);

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouse.set(x, y);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime() * speedMultiplier;

      // Smooth mouse interpolation
      currentMouse.lerp(targetMouse, 0.03);
      uniforms.uTime.value = elapsedTime;
      uniforms.uMouse.value.copy(currentMouse);

      // Gentle parallax camera rotation
      camera.position.x = currentMouse.x * 0.25;
      camera.position.y = currentMouse.y * 0.2;
      camera.lookAt(0, 0, 0);

      // Meditative, slow rotation of particle field
      particleSystem.rotation.y = elapsedTime * 0.015;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.01) * 0.025;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [speedMultiplier, interactive]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
