/**
 * ISHAN MADUSHANKA - 3D PARTICLE AVATAR ENGINE
 * Three.js Large Commanding Portrait, Dual Neon Torus Rings (Chest/Waist),
 * Parallax Tracking for Extracted 3D Icons, and Full-Viewport Scroll Scatter.
 */

import * as THREE from '../vendor/three.module.js';

class Hero3DAvatar {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) return;

    this.isMobile = window.innerWidth <= 768;
    this.particleCount = this.isMobile ? 16000 : 40000;
    this.tileResolution = this.isMobile ? 18 : 28;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.gyro = { alpha: 0, beta: 0, gamma: 0, active: false };
    this.clock = new THREE.Clock();

    this.isDisintegrated = false;
    this.reformTimeout = null;
    this.scrollProgress = 0;

    this.init();
  }

  async init() {
    // 1. Check WebGL support
    if (!this.checkWebGL()) {
      this.initFallback();
      return;
    }

    // 2. Setup Three.js Scene, Camera, Renderer
    this.setupScene();

    // 3. Setup Lighting
    this.setupLights();

    // 4. Setup Dual Glowing Neon Rings (Positioned around chest/waist matching Screenshot 3)
    this.setupNeonRings();

    // 5. Load Textures & Build Large 3D Avatar (Point Cloud + Photographic Mesh)
    await this.loadAvatar();

    // 6. Setup Interaction Listeners (Mouse, Touch, Gyro, Scroll)
    this.setupInteractions();

    // 7. Setup Orbiting 3D Technical Icons (media_1794041007747_a8a1d112.jpg)
    this.setupOrbitingIcons();

    // 8. Start Render Loop
    this.animate();
  }

  checkWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  initFallback() {
    this.container.innerHTML = `
      <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; padding:10px;">
        <img src="assets/images/me-portrait.png" alt="Ishan Madushanka" style="max-height:95%; border-radius:28px; box-shadow:0 25px 60px rgba(78,203,141,0.3);">
      </div>
    `;
  }

  setupScene() {
    const width = this.container.clientWidth || window.innerWidth * 0.52;
    const height = this.container.clientHeight || 700;

    this.scene = new THREE.Scene();

    // Camera framed so Ishan's full hairstyle has headroom at top and shirt fades at bottom
    const isMob = (this.container.clientWidth || window.innerWidth) <= 768;
    this.camera = new THREE.PerspectiveCamera(isMob ? 44 : 38, width / height, 0.1, 100);
    this.camera.position.set(0, isMob ? 0.02 : 0.04, isMob ? 4.2 : 3.8);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);
    this.renderer.domElement.id = 'hero-canvas';

    this.avatarGroup = new THREE.Group();
    this.scene.add(this.avatarGroup);

    window.addEventListener('resize', this.onResize.bind(this));
    document.addEventListener('visibilitychange', () => {
      this.isPaused = document.hidden;
    });
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.6);
    this.scene.add(ambientLight);

    // Mint rim light
    const mintLight = new THREE.DirectionalLight(0x4ECB8D, 2.8);
    mintLight.position.set(-4, 3, 3);
    this.scene.add(mintLight);

    // Violet fill light
    const violetLight = new THREE.DirectionalLight(0x8B7BFF, 2.2);
    violetLight.position.set(4, -2, 2);
    this.scene.add(violetLight);

    // Key facial spotlight
    const keyLight = new THREE.PointLight(0xFFFFFF, 1.4, 25);
    keyLight.position.set(0, 1.3, 4.5);
    this.scene.add(keyLight);
  }

  setupNeonRings() {
    this.ringsGroup = new THREE.Group();
    this.scene.add(this.ringsGroup);

    // 1. MINT-CYAN NEON RING ('kolayi') - Positioned lower around waist (Screenshot media_1794058409759_890e4d9a.jpg)
    const mintGeom = new THREE.TorusGeometry(1.68, 0.046, 32, 180);
    const mintMat = new THREE.MeshStandardMaterial({
      color: 0x4ECB8D,
      emissive: 0x4ECB8D,
      emissiveIntensity: 1.6,
      roughness: 0.12,
      metalness: 0.85
    });
    this.ringMint = new THREE.Mesh(mintGeom, mintMat);
    // Lowered to Y = -1.06 so it curves cleanly around lower waist/hips below crossed arms
    this.ringMint.position.set(0, -1.06, 0.02);
    this.ringMint.rotation.x = Math.PI * 0.40;
    this.ringMint.rotation.y = 0.12;
    this.ringsGroup.add(this.ringMint);

    // 2. VIOLET-MAGENTA NEON RING ('damuyi') - Wrapping right below the mint ring in harmonious tilt
    const violetGeom = new THREE.TorusGeometry(1.88, 0.038, 32, 180);
    const violetMat = new THREE.MeshStandardMaterial({
      color: 0x8B7BFF,
      emissive: 0x8B7BFF,
      emissiveIntensity: 1.3,
      roughness: 0.18,
      metalness: 0.75
    });
    this.ringViolet = new THREE.Mesh(violetGeom, violetMat);
    this.ringViolet.position.set(0, -1.24, -0.08);
    this.ringViolet.rotation.x = -Math.PI * 0.38;
    this.ringViolet.rotation.y = -0.14;
    this.ringsGroup.add(this.ringViolet);
  }

  async loadAvatar() {
    const cutoutUrl = 'assets/images/me-cutout.png';
    const depthUrl = 'assets/images/me-depth.png';

    const imgCutout = await this.loadImage(cutoutUrl);
    let imgDepth;
    try {
      imgDepth = await this.loadImage(depthUrl);
    } catch (e) {
      imgDepth = this.generateFallbackDepth(imgCutout);
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const res = 256;
    canvas.width = res;
    canvas.height = res;

    ctx.drawImage(imgCutout, 0, 0, res, res);
    const cutoutData = ctx.getImageData(0, 0, res, res).data;

    ctx.clearRect(0, 0, res, res);
    ctx.drawImage(imgDepth, 0, 0, res, res);
    const depthData = ctx.getImageData(0, 0, res, res).data;

    // Commanding scale tuned to fill the hero card (media_1794058409759_890e4d9a.jpg)
    const aspect = imgCutout.width / imgCutout.height;
    const planeW = 3.60 * aspect;
    const planeH = 3.60;

    const pointsGeom = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const homePositions = [];
    const randomPositions = [];

    const validIndices = [];
    for (let i = 0; i < cutoutData.length; i += 4) {
      if (cutoutData[i + 3] > 40) {
        validIndices.push(i);
      }
    }

    const step = Math.max(1, Math.floor(validIndices.length / this.particleCount));
    for (let k = 0; k < validIndices.length; k += step) {
      const idx = validIndices[k];
      const pixelIndex = idx / 4;
      const px = pixelIndex % res;
      const py = Math.floor(pixelIndex / res);

      const u = px / res;
      const v = 1.0 - (py / res);

      // Subtle stochastic jitter to eliminate any artificial square lattice / grid lines
      const jitterX = (Math.random() - 0.5) * (planeW / res) * 1.5;
      const jitterY = (Math.random() - 0.5) * (planeH / res) * 1.5;

      const x = (u - 0.5) * planeW + jitterX;
      const y = (v - 0.5) * planeH - 0.06 + jitterY; // Centered
      const depthVal = depthData[idx] / 255.0;
      const z = (depthVal - 0.2) * 0.35;

      const r = cutoutData[idx] / 255.0;
      const g = cutoutData[idx + 1] / 255.0;
      const b = cutoutData[idx + 2] / 255.0;

      // Broad initial particle cloud
      const randX = (Math.random() - 0.5) * 10;
      const randY = (Math.random() - 0.5) * 10;
      const randZ = (Math.random() - 0.5) * 6;

      positions.push(randX, randY, randZ);
      homePositions.push(x, y, z);
      randomPositions.push(randX, randY, randZ);
      colors.push(r, g, b);
    }

    pointsGeom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    pointsGeom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: this.isMobile ? 0.022 : 0.018,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.NormalBlending
    });

    this.particleSystem = new THREE.Points(pointsGeom, pointsMat);
    this.particlePositions = positions;
    this.homePositions = homePositions;
    this.randomPositions = randomPositions;
    this.avatarGroup.add(this.particleSystem);

    // High-fidelity photographic portrait texture loaded directly and synchronously from in-memory image
    const colorTexture = new THREE.CanvasTexture(imgCutout);
    colorTexture.colorSpace = THREE.SRGBColorSpace;
    colorTexture.generateMipmaps = true;
    colorTexture.minFilter = THREE.LinearMipmapLinearFilter;
    colorTexture.magFilter = THREE.LinearFilter;
    colorTexture.needsUpdate = true;

    // Use MeshBasicMaterial with DoubleSide and alphaTest so the face is ALWAYS 100% visible, razor-sharp,
    // and transparent pixels discard depth so they never cut off the neon rings or background elements
    const planeGeom = new THREE.PlaneGeometry(planeW, planeH);
    const meshMat = new THREE.MeshBasicMaterial({
      map: colorTexture,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      alphaTest: 0.15,
      depthWrite: true
    });

    this.solidMesh = new THREE.Mesh(planeGeom, meshMat);
    this.solidMesh.position.set(0, -0.06, 0.02);
    this.solidMesh.renderOrder = 3;
    this.avatarGroup.add(this.solidMesh);

    // InstancedMesh tiles for full-viewport scroll scatter
    this.setupScrollTiles(colorTexture, planeW, planeH);

    // Intro particle assembly
    this.runIntroAnimation();
  }

  setupScrollTiles(texture, planeW, planeH) {
    const cols = this.tileResolution;
    const rows = this.tileResolution;
    const count = cols * rows;
    const tileW = planeW / cols;
    const tileH = planeH / rows;

    const tileGeom = new THREE.PlaneGeometry(tileW * 0.94, tileH * 0.94);
    const tileMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    this.tilesInstanced = new THREE.InstancedMesh(tileGeom, tileMat, count);
    this.tilesInstanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.tilesInstanced.visible = false;
    this.tilesInstanced.renderOrder = 4;

    this.tileData = [];
    const matrix = new THREE.Matrix4();
    let idx = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c / cols - 0.5) * planeW + tileW * 0.5;
        const y = ((rows - 1 - r) / rows - 0.5) * planeH - 0.06 + tileH * 0.5;
        const z = 0.04;

        matrix.setPosition(x, y, z);
        this.tilesInstanced.setMatrixAt(idx, matrix);

        // Wide full-screen scatter trajectory
        const scatterAngle = Math.random() * Math.PI * 2;
        const scatterDist = 4.5 + Math.random() * 8.5; // Expands across entire viewport
        this.tileData.push({
          homePos: new THREE.Vector3(x, y, z),
          scatterPos: new THREE.Vector3(
            x + Math.cos(scatterAngle) * scatterDist,
            y + Math.sin(scatterAngle) * scatterDist,
            z + (Math.random() - 0.5) * 6.5
          ),
          rotAxis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
          rotSpeed: (Math.random() - 0.5) * 12
        });
        idx++;
      }
    }

    this.tilesInstanced.instanceMatrix.needsUpdate = true;
    this.avatarGroup.add(this.tilesInstanced);
  }

  runIntroAnimation() {
    const posAttr = this.particleSystem.geometry.attributes.position;
    const current = posAttr.array;
    const duration = 2.4;
    const startTime = performance.now();

    const animateIntro = (now) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1.0);
      const ease = 1.0 - Math.pow(1.0 - progress, 3);

      for (let i = 0; i < current.length; i += 3) {
        current[i] = THREE.MathUtils.lerp(this.randomPositions[i], this.homePositions[i], ease);
        current[i + 1] = THREE.MathUtils.lerp(this.randomPositions[i + 1], this.homePositions[i + 1], ease);
        current[i + 2] = THREE.MathUtils.lerp(this.randomPositions[i + 2], this.homePositions[i + 2], ease);
      }
      posAttr.needsUpdate = true;

      if (progress < 1.0) {
        requestAnimationFrame(animateIntro);
      } else {
        this.crossfadeToSolid();
      }
    };
    requestAnimationFrame(animateIntro);
  }

  crossfadeToSolid() {
    const fadeDuration = 0.9;
    const startTime = performance.now();

    const fadeStep = (now) => {
      const elapsed = (now - startTime) / 1000;
      const p = Math.min(elapsed / fadeDuration, 1.0);

      if (this.solidMesh) {
        this.solidMesh.material.opacity = p;
      }
      if (this.particleSystem) {
        this.particleSystem.material.opacity = Math.max(0.0, 1.0 - p);
      }

      if (p < 1.0) {
        requestAnimationFrame(fadeStep);
      } else {
        if (this.solidMesh) {
          this.solidMesh.material.opacity = 1.0;
          this.solidMesh.visible = true;
        }
        if (this.particleSystem) {
          this.particleSystem.visible = false; // Hide completely to prevent any grid overlay
        }
      }
    };
    requestAnimationFrame(fadeStep);
  }

  loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  generateFallbackDepth(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const cx = canvas.width * 0.5;
    const cy = canvas.height * 0.4;
    const maxR = canvas.width * 0.4;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const dist = Math.hypot(x - cx, y - cy);
        const falloff = Math.max(0, 1 - dist / maxR);
        const depth = Math.min(255, falloff * 180 + lum * 0.3);
        data[i] = depth;
        data[i + 1] = depth;
        data[i + 2] = depth;
      }
    }
    ctx.putImageData(imgData, 0, 0);
    return canvas;
  }

  setupInteractions() {
    window.addEventListener('mousemove', (e) => {
      const tx = (e.clientX / window.innerWidth) * 2 - 1;
      const ty = -(e.clientY / window.innerHeight) * 2 + 1;
      this.mouse.targetX = Math.min(Math.max(tx, -1.0), 1.0);
      this.mouse.targetY = Math.min(Math.max(ty, -1.0), 1.0);
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.targetX = 0;
      this.mouse.targetY = 0;
    });

    if (window.DeviceOrientationEvent) {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        this.createGyroPermissionBtn();
      } else {
        window.addEventListener('deviceorientation', this.handleOrientation.bind(this));
      }
    }

    let touchStartX = 0, touchStartY = 0;
    this.container.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    this.container.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        this.mouse.targetX = Math.min(Math.max(dx / 150, -1), 1);
        this.mouse.targetY = Math.min(Math.max(-dy / 150, -1), 1);
      }
    }, { passive: true });

    this.container.addEventListener('click', () => this.triggerDisintegration());

    let scrollTicking = false;
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = window.innerHeight * 0.95;
          const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
          if (Math.abs(progress - (this.lastScrollProgress || 0)) > 0.003 || progress === 0 || progress === 1) {
            this.scrollProgress = progress;
            this.lastScrollProgress = progress;
            this.handleScrollDisintegration(progress);
          }
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });
  }

  createGyroPermissionBtn() {
    const btn = document.createElement('button');
    btn.className = 'btn-cv-pill';
    btn.style.cssText = 'position:absolute; bottom:16px; right:16px; z-index:20; font-size:0.78rem; padding:6px 14px;';
    btn.textContent = 'Enable 3D Tilt';
    btn.onclick = () => {
      DeviceOrientationEvent.requestPermission().then(res => {
        if (res === 'granted') {
          window.addEventListener('deviceorientation', this.handleOrientation.bind(this));
          btn.remove();
        }
      });
    };
    this.container.appendChild(btn);
  }

  handleOrientation(e) {
    if (e.gamma !== null && e.beta !== null) {
      this.gyro.active = true;
      this.mouse.targetX = Math.min(Math.max(e.gamma / 30, -1), 1);
      this.mouse.targetY = Math.min(Math.max((e.beta - 45) / 30, -1), 1);
    }
  }

  triggerDisintegration() {
    if (this.isDisintegrated || !this.particleSystem) return;
    this.isDisintegrated = true;

    if (this.solidMesh) {
      this.solidMesh.material.opacity = 0.0;
    }
    this.particleSystem.visible = true;
    this.particleSystem.material.opacity = 1.0;

    const pos = this.particleSystem.geometry.attributes.position.array;
    const count = pos.length;
    const dispersion = [];

    for (let i = 0; i < count; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const mag = 1.6 + Math.random() * 3.4;
      dispersion.push({
        dx: Math.cos(angle) * mag,
        dy: Math.sin(angle) * mag,
        dz: (Math.random() - 0.5) * 3.0
      });
    }

    const start = performance.now();
    const duration = 0.7;

    const animateBurst = (now) => {
      const elapsed = (now - start) / 1000;
      const p = Math.min(elapsed / duration, 1.0);
      const ease = Math.sin(p * Math.PI * 0.5);

      for (let i = 0; i < count; i += 3) {
        const d = dispersion[i / 3];
        pos[i] = this.homePositions[i] + d.dx * ease;
        pos[i + 1] = this.homePositions[i + 1] + d.dy * ease;
        pos[i + 2] = this.homePositions[i + 2] + d.dz * ease;
      }
      this.particleSystem.geometry.attributes.position.needsUpdate = true;

      if (p < 1.0) {
        requestAnimationFrame(animateBurst);
      } else {
        this.reformTimeout = setTimeout(() => this.reformAvatar(), 1400);
      }
    };
    requestAnimationFrame(animateBurst);
  }

  reformAvatar() {
    if (!this.particleSystem) return;
    const pos = this.particleSystem.geometry.attributes.position.array;
    const count = pos.length;
    const current = [...pos];
    const start = performance.now();
    const duration = 0.9;

    const animateReform = (now) => {
      const elapsed = (now - start) / 1000;
      const p = Math.min(elapsed / duration, 1.0);
      const ease = 1.0 - Math.pow(1.0 - p, 3);

      for (let i = 0; i < count; i += 3) {
        pos[i] = THREE.MathUtils.lerp(current[i], this.homePositions[i], ease);
        pos[i + 1] = THREE.MathUtils.lerp(current[i + 1], this.homePositions[i + 1], ease);
        pos[i + 2] = THREE.MathUtils.lerp(current[i + 2], this.homePositions[i + 2], ease);
      }
      this.particleSystem.geometry.attributes.position.needsUpdate = true;

      if (this.solidMesh) {
        this.solidMesh.material.opacity = ease;
      }
      if (this.particleSystem) {
        this.particleSystem.material.opacity = Math.max(0.0, 1.0 - ease);
      }

      if (p < 1.0) {
        requestAnimationFrame(animateReform);
      } else {
        this.isDisintegrated = false;
        if (this.solidMesh) {
          this.solidMesh.material.opacity = 1.0;
          this.solidMesh.visible = true;
        }
        if (this.particleSystem) {
          this.particleSystem.visible = false;
        }
      }
    };
    requestAnimationFrame(animateReform);
  }

  handleScrollDisintegration(progress) {
    if (!this.tilesInstanced || !this.tileData) return;

    if (progress <= 0.02) {
      if (this.hasFullyRested) return;
      this.hasFullyRested = true;
      this.hasFullyScattered = false;
      if (this.solidMesh) {
        this.solidMesh.material.opacity = 1.0;
        this.solidMesh.visible = true;
      }
      if (this.particleSystem) {
        this.particleSystem.visible = false;
      }
      this.tilesInstanced.material.opacity = 0.0;
      this.tilesInstanced.visible = false;
      return;
    }
    this.hasFullyRested = false;

    if (progress >= 0.98) {
      if (this.hasFullyScattered) return;
      this.hasFullyScattered = true;
      if (this.solidMesh) {
        this.solidMesh.material.opacity = 0.0;
        this.solidMesh.visible = false;
      }
      if (this.particleSystem) {
        this.particleSystem.material.opacity = 0.0;
      }
      this.tilesInstanced.material.opacity = 0.0;
      this.tilesInstanced.visible = false;
      return;
    }
    this.hasFullyScattered = false;

    this.tilesInstanced.visible = true;

    const matrix = new THREE.Matrix4();
    const pos = new THREE.Vector3();
    const rot = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    if (this.solidMesh) {
      this.solidMesh.visible = true;
      this.solidMesh.material.opacity = Math.max(0, 1.0 - progress * 2.5);
    }
    if (this.particleSystem) {
      this.particleSystem.visible = true;
      this.particleSystem.material.opacity = Math.max(0, 1.0 - progress * 1.8);
    }

    this.tilesInstanced.material.opacity = progress > 0.05 ? Math.min(1.0, (1.0 - progress) * 1.5) : 0.0;

    for (let i = 0; i < this.tileData.length; i++) {
      const data = this.tileData[i];
      pos.lerpVectors(data.homePos, data.scatterPos, progress);
      rot.setFromAxisAngle(data.rotAxis, progress * data.rotSpeed);
      const s = Math.max(0.01, 1.0 - progress * 0.82);
      scale.set(s, s, s);

      matrix.compose(pos, rot, scale);
      this.tilesInstanced.setMatrixAt(i, matrix);
    }
    this.tilesInstanced.instanceMatrix.needsUpdate = true;

    // Scatter the DOM 3D icons as well (cached)
    if (!this.domFloatingIcons) {
      this.domFloatingIcons = document.querySelectorAll('.hero-3d-floating-icon');
    }
    this.domFloatingIcons.forEach((el, idx) => {
      const scatterFactor = 1.0 + (idx % 3) * 0.5;
      const opacity = Math.max(0.15, 1.0 - progress * 1.2);
      el.style.opacity = opacity;
    });
  }

  setupOrbitingIcons() {
    this.orbitIcons = Array.from(document.querySelectorAll('.hero-3d-floating-icon'));
    this.isOrbitHovered = false;
    this.orbitTime = 0;

    this.orbitIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => { 
        this.isOrbitHovered = true;
        icon.style.zIndex = '6'; // Bring forward on hover for clear inspection
      });
      icon.addEventListener('mouseleave', () => { 
        this.isOrbitHovered = false;
        icon.style.zIndex = '2'; // Return to background behind Ishan
      });
    });
  }

  updateOrbitingIcons(elapsedTime) {
    if (!this.orbitIcons || !this.orbitIcons.length || !this.container) return;

    const width = this.container.clientWidth || 500;
    const height = this.container.clientHeight || 700;
    const isMobile = window.innerWidth <= 768;

    // Orbit center positioned at Ishan\'s upper torso / neck level in the background
    const cx = width * 0.50;
    const cy = height * (isMobile ? 0.40 : 0.44);

    // Radii of the background orbit
    const rx = isMobile ? width * 0.36 : Math.min(width * 0.38, 230);
    const ry = isMobile ? height * 0.20 : Math.min(height * 0.20, 120);

    // Tilted ellipse angle: -18 degrees (~ -0.314 rad)
    const tiltAngle = -0.314;
    const cosA = Math.cos(tiltAngle);
    const sinA = Math.sin(tiltAngle);

    // Slow-motion angular increment (~38 seconds per full revolution)
    if (!this.isOrbitHovered) {
      this.orbitTime += 0.0032;
    }

    const count = this.orbitIcons.length;
    const angleStep = (Math.PI * 2) / count;
    const scrollFade = Math.max(0.12, 1.0 - (this.scrollProgress || 0) * 1.4);

    this.orbitIcons.forEach((icon, i) => {
      const theta = this.orbitTime + i * angleStep;

      // Coordinates on untilted ellipse
      const u = rx * Math.cos(theta);
      const v = ry * Math.sin(theta);

      // Rotated into the tilted orbit plane
      const rotX = u * cosA - v * sinA;
      const rotY = u * sinA + v * cosA;

      // Gentle interactive mouse parallax
      const parallaxX = this.mouse.x * 12;
      const parallaxY = -this.mouse.y * 12;

      const rawX = cx + rotX + parallaxX;
      const y = cy + rotY + parallaxY;

      // Clamping: strictly enforce that the icon stays inside container boundaries
      // Prevents any horizontal overflow or shaking on mobile screens
      const iconW = icon.offsetWidth || (isMobile ? 50 : 70);
      const clampedX = Math.max(iconW * 0.5 + 8, Math.min(width - iconW * 0.5 - 8, rawX));

      // Depth modulation for 3D scale and gentle opacity
      const zDepth = Math.sin(theta);
      const baseScale = isMobile ? 0.74 : 0.94;
      const scale = baseScale * (0.94 + zDepth * 0.12);
      const opacity = (0.82 + zDepth * 0.18) * scrollFade;

      // Layering: ALWAYS layered behind Ishan (z-index: 2) unless actively hovered
      if (!this.isOrbitHovered) {
        icon.style.zIndex = '2';
      }
      icon.style.transform = 'translate3d(' + clampedX.toFixed(1) + 'px, ' + y.toFixed(1) + 'px, 0) translate(-50%, -50%) scale(' + scale.toFixed(3) + ')';
      icon.style.opacity = opacity.toFixed(2);
    });
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    const isMob = width <= 768;
    this.camera.fov = isMob ? 44 : 38;
    this.camera.position.z = isMob ? 4.2 : 3.8;
    this.camera.position.y = isMob ? 0.02 : 0.04;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    if (this.isPaused) return;

    const elapsedTime = this.clock.getElapsedTime();

    // 1. Smooth Head Tracking (responsive mouse tilt)
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    const maxRotY = 0.18;
    const maxRotX = 0.14;

    this.avatarGroup.rotation.y = this.mouse.x * maxRotY;
    this.avatarGroup.rotation.x = -this.mouse.y * maxRotX;

    // Safety lock: Ensure solidMesh stays 100% visible and opaque in normal view state
    if (!this.isDisintegrated && this.scrollProgress <= 0.02 && this.solidMesh) {
      this.solidMesh.visible = true;
      if (this.solidMesh.material.opacity < 1.0) {
        this.solidMesh.material.opacity = 1.0;
      }
    }

    // Subtle breathing
    const breathing = Math.sin(elapsedTime * 1.6) * 0.022;
    const bobbing = Math.cos(elapsedTime * 0.9) * 0.012;
    this.avatarGroup.position.y = breathing + bobbing;

    // 2. Dual Neon Torus Rings Rotation (Waist/Chest) - Lowered as requested (Screenshot media_1794058409759_890e4d9a.jpg)
    if (this.ringMint) {
      this.ringMint.rotation.z += 0.005;
      this.ringMint.position.y = -1.06 + Math.sin(elapsedTime * 1.2) * 0.025;
    }
    if (this.ringViolet) {
      this.ringViolet.rotation.z -= 0.004;
      this.ringViolet.position.y = -1.24 + Math.cos(elapsedTime * 1.0) * 0.025;
    }

    // 3. Continuous Slow-Motion Orbiting 3D Technical Icons (media_1794041007747_a8a1d112.jpg)
    this.updateOrbitingIcons(elapsedTime);

    this.renderer.render(this.scene, this.camera);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('hero-canvas-container')) {
    window.heroAvatar = new Hero3DAvatar('hero-canvas-container');
  }
});

export { Hero3DAvatar };
