import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { ambientSound } from '../utils/audio';

export type FrequencyMode = 'alpha' | 'theta' | 'gamma';

export interface ModeConfig {
  name: string;
  hz: string;
  bpm: number;
  label: string;
  color: string;
  secondaryColor: string;
  speed: number;
  pulseSpeed: number;
  description: string;
  coherence: number;
}

export const BIO_MODES: Record<FrequencyMode, ModeConfig> = {
  alpha: {
    name: 'Alpha Flow',
    hz: '10.5 Hz',
    bpm: 76,
    label: 'Deep sustained focus',
    color: '#38BDF8', // Apple Sky Blue
    secondaryColor: '#6366F1',
    speed: 0.65,
    pulseSpeed: 1.266, // 76 BPM
    description: 'Calibrated to resting cardiovascular rhythm for calm, single-threaded productivity.',
    coherence: 96,
  },
  theta: {
    name: 'Theta Synthesis',
    hz: '6.2 Hz',
    bpm: 60,
    label: 'Creative & systemic insight',
    color: '#FBBF24', // Apple Warm Amber / Titanium
    secondaryColor: '#F97316',
    speed: 0.45,
    pulseSpeed: 1.0, // 60 BPM
    description: 'Subconscious synthesis state for system design, deep writing, and novel problem solving.',
    coherence: 93,
  },
  gamma: {
    name: 'Gamma Sprint',
    hz: '40.0 Hz',
    bpm: 110,
    label: 'High-velocity execution',
    color: '#34D399', // Apple Mint
    secondaryColor: '#059669',
    speed: 1.1,
    pulseSpeed: 1.833, // 110 BPM
    description: 'Peak cognitive synchronization for time-sensitive debugging and high-intensity coding bursts.',
    coherence: 98,
  },
};

interface FocusOrbVisualizerProps {
  onModeChange?: (mode: FrequencyMode) => void;
}

export default function FocusOrbVisualizer({ onModeChange }: FocusOrbVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentMode, setCurrentMode] = useState<FrequencyMode>('alpha');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const configRef = useRef(BIO_MODES.alpha);
  configRef.current = BIO_MODES[currentMode];

  const resetTriggerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    const scene = new THREE.Scene();

    const w = container.clientWidth;
    const h = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Master Gyro Group
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    // 1. Apple Vision-style Frosted Crystal Core
    const coreGeo = new THREE.IcosahedronGeometry(1.08, 3);
    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(BIO_MODES.alpha.color),
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      roughness: 0.1,
      metalness: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    orbGroup.add(coreMesh);

    // Inner Glowing Core (Warm Apple breathing sphere)
    const innerGeo = new THREE.SphereGeometry(0.72, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(BIO_MODES.alpha.secondaryColor),
      transparent: true,
      opacity: 0.28,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    orbGroup.add(innerMesh);

    // 2. Micro-thin Concentric Titanium Gimbals
    const rings: THREE.Mesh[] = [];
    const ringConfigs = [
      { radius: 1.55, tube: 0.012, rotX: Math.PI / 3.8, rotY: 0 },
      { radius: 1.88, tube: 0.010, rotX: -Math.PI / 3.2, rotY: Math.PI / 5 },
      { radius: 2.22, tube: 0.008, rotX: Math.PI / 2.2, rotY: -Math.PI / 4 },
    ];

    ringConfigs.forEach((rc) => {
      const ringGeo = new THREE.TorusGeometry(rc.radius, rc.tube, 16, 128);
      const ringMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(BIO_MODES.alpha.color),
        metalness: 0.95,
        roughness: 0.12,
        transparent: true,
        opacity: 0.75,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.set(rc.rotX, rc.rotY, 0);
      orbGroup.add(ringMesh);
      rings.push(ringMesh);
    });

    // 3. Ethereal Pulse Waves (expanding breathing ripples)
    const pulseCount = 2;
    const pulseRings: { mesh: THREE.Mesh; phase: number }[] = [];
    const pulseGeo = new THREE.RingGeometry(0.2, 0.22, 64);

    for (let i = 0; i < pulseCount; i++) {
      const pulseMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(BIO_MODES.alpha.color),
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.rotation.x = Math.PI / 2;
      orbGroup.add(pulseMesh);
      pulseRings.push({ mesh: pulseMesh, phase: i * 0.5 });
    }

    // 4. Subtle Ambient Floating Stardust (Apple VisionOS depth cues)
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const r = 1.4 + Math.random() * 1.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(BIO_MODES.alpha.color),
      size: 0.038,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    orbGroup.add(particleCloud);

    // Subtle studio lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(2, 4, 4);
    scene.add(keyLight);

    const fillPointLight = new THREE.PointLight(BIO_MODES.alpha.color, 2.0, 8);
    fillPointLight.position.set(-2, -2, 2);
    scene.add(fillPointLight);

    // Smooth inertial drag interaction
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };

    const onPointerDown = (clientX: number, clientY: number) => {
      isDragging = true;
      prevMouse = { x: clientX, y: clientY };
      velocity.x = 0;
      velocity.y = 0;
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      if (!isDragging) return;
      const dx = clientX - prevMouse.x;
      const dy = clientY - prevMouse.y;

      velocity.y = dx * 0.006;
      velocity.x = dy * 0.006;

      orbGroup.rotation.y += velocity.y;
      orbGroup.rotation.x += velocity.x;

      prevMouse = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const canvasElem = renderer.domElement;
    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleMouseUp = () => onPointerUp();

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTouchEnd = () => onPointerUp();

    canvasElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvasElem.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    resetTriggerRef.current = () => {
      velocity.x = 0;
      velocity.y = 0;
      orbGroup.rotation.set(0, 0, 0);
    };

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const cfg = configRef.current;

      const targetColor = new THREE.Color(cfg.color);
      const targetSecColor = new THREE.Color(cfg.secondaryColor);

      // Smooth color transitions
      coreMat.color.lerp(targetColor, 0.04);
      innerMat.color.lerp(targetSecColor, 0.04);
      fillPointLight.color.lerp(targetColor, 0.04);
      particleMat.color.lerp(targetColor, 0.04);

      rings.forEach((ring) => {
        (ring.material as THREE.MeshStandardMaterial).color.lerp(targetColor, 0.04);
      });

      // Calm organic breathing pulse
      const pulseCycle = elapsedTime * (cfg.pulseSpeed * Math.PI * 2);
      const pulseScale = 1.0 + Math.sin(pulseCycle) * 0.045;
      coreMesh.scale.set(pulseScale, pulseScale, pulseScale);
      innerMesh.scale.set(pulseScale * 1.03, pulseScale * 1.03, pulseScale * 1.03);

      // Gentle expanding ripple
      pulseRings.forEach((pr) => {
        pr.phase = (pr.phase + 0.012 * cfg.pulseSpeed) % 1.0;
        const ringScale = 0.5 + pr.phase * 4.6;
        pr.mesh.scale.set(ringScale, ringScale, 1);
        const mat = pr.mesh.material as THREE.MeshBasicMaterial;
        mat.color.lerp(targetColor, 0.04);
        mat.opacity = Math.sin(pr.phase * Math.PI) * 0.32;
      });

      // Smooth counter rotations
      rings[0].rotation.z += 0.007 * cfg.speed;
      rings[1].rotation.x += 0.009 * cfg.speed;
      rings[2].rotation.y += 0.005 * cfg.speed;
      particleCloud.rotation.y += 0.002 * cfg.speed;

      // Inertial damping
      if (!isDragging) {
        orbGroup.rotation.y += velocity.y;
        orbGroup.rotation.x += velocity.x;
        velocity.x *= 0.94;
        velocity.y *= 0.94;

        orbGroup.rotation.y += 0.002 * cfg.speed;
        orbGroup.rotation.x += 0.0008 * cfg.speed;
      }

      // Gentle vertical float
      orbGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      canvasElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvasElem.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      pulseGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      rings.forEach((r) => {
        r.geometry.dispose();
        (r.material as THREE.Material).dispose();
      });
      pulseRings.forEach((pr) => {
        (pr.mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  const handleModeChange = (mode: FrequencyMode) => {
    setCurrentMode(mode);
    onModeChange?.(mode);
    ambientSound.playChime();
  };

  const toggleSoundscape = () => {
    if (isPlayingAudio) {
      ambientSound.stop();
      setIsPlayingAudio(false);
    } else {
      ambientSound.play(currentMode === 'theta' ? 'binaural' : currentMode === 'gamma' ? 'pink' : 'brown');
      setIsPlayingAudio(true);
    }
  };

  const activeCfg = BIO_MODES[currentMode];

  return (
    <div className="relative rounded-[28px] sm:rounded-[32px] bg-neutral-900/50 border border-white/[0.08] p-6 sm:p-7 backdrop-blur-2xl shadow-2xl transition-all overflow-hidden flex flex-col justify-between">
      
      {/* Apple-style soft blurred ambient radial glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 opacity-20"
        style={{ backgroundColor: activeCfg.color }}
      />

      {/* Minimal Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] relative z-10">
        <div className="flex items-center gap-2.5">
          <span 
            className="w-2 h-2 rounded-full transition-colors duration-500"
            style={{ backgroundColor: activeCfg.color }}
          />
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium text-white tracking-tight">
              {activeCfg.name}
            </span>
            <span className="text-xs text-neutral-400 font-normal">
              {activeCfg.hz}
            </span>
          </div>
        </div>

        {/* Minimal Apple Health-style metric */}
        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <span>{activeCfg.coherence}% Coherence</span>
          <span className="w-1 h-1 rounded-full bg-neutral-700" />
          <span className="text-neutral-300 font-medium">{activeCfg.bpm} BPM</span>
        </div>
      </div>

      {/* 3D Visualizer Canvas Stage */}
      <div className="relative w-full h-[280px] sm:h-[310px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none my-2">
        <div ref={containerRef} className="w-full h-full" />
        
        {/* Subtle center frequency label */}
        <div className="absolute pointer-events-none text-center">
          <span 
            className="text-2xl font-light tracking-tight transition-colors duration-500 block"
            style={{ color: activeCfg.color }}
          >
            {activeCfg.hz}
          </span>
          <span className="text-[11px] text-neutral-400 tracking-wide">
            {activeCfg.label}
          </span>
        </div>

        {/* Discreet Reset Button */}
        <button
          onClick={() => resetTriggerRef.current?.()}
          className="absolute bottom-2 right-2 p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-400 hover:text-white transition-colors"
          title="Center view"
          aria-label="Center view"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Apple-style Segmented Control & Action Bar */}
      <div className="pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
        
        {/* Segmented Control Pill */}
        <div className="w-full sm:w-auto p-1 bg-white/[0.04] border border-white/[0.06] rounded-full flex items-center gap-1 backdrop-blur-md">
          {(['alpha', 'theta', 'gamma'] as FrequencyMode[]).map((mode) => {
            const m = BIO_MODES[mode];
            const isActive = currentMode === mode;
            return (
              <button
                key={mode}
                onClick={() => handleModeChange(mode)}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 capitalize font-medium ${
                  isActive
                    ? 'bg-white/[0.14] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <span>{mode}</span>
                <span className="text-[10px] text-neutral-400 ml-1.5 font-normal">
                  {m.hz}
                </span>
              </button>
            );
          })}
        </div>

        {/* Minimal Audio Soundscape Pill Button */}
        <button
          onClick={toggleSoundscape}
          className={`w-full sm:w-auto px-4 py-1.5 rounded-full text-xs font-medium flex items-center justify-center gap-2 transition-all duration-200 border ${
            isPlayingAudio
              ? 'bg-white text-neutral-900 border-white shadow-sm'
              : 'bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 border-white/[0.06]'
          }`}
        >
          {isPlayingAudio ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause Soundscape</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Audio Rhythm</span>
            </>
          )}
        </button>

      </div>

    </div>
  );
}
