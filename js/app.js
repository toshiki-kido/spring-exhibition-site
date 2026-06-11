// --- Web Audio API Camera Sound Synthesizer ---
let audioCtx = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

const playShutterSound = () => {
  try {
    initAudio();
    if (!audioCtx) return;
    
    const bufferSize = audioCtx.sampleRate * 0.12;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1100;
    filter.Q.value = 2.5;
    
    const gain = audioCtx.createGain();
    const now = audioCtx.currentTime;
    
    // Softer click envelopes for a damp, premium shutter curtain feel
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.035);
    
    gain.gain.setValueAtTime(0.005, now + 0.045);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.047);
    gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.1);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    
    noise.start(now);
    noise.stop(now + 0.12);
  } catch (e) {
    console.warn("Failed to play shutter sound:", e);
  }
};

const playFocusBeep = () => {
  try {
    initAudio();
    if (!audioCtx) return;
    
    const now = audioCtx.currentTime;
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    const gain2 = audioCtx.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(2380, now);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(2380, now + 0.09);
    
    // Softer, delicate focus lock chime volume
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.035, now + 0.004);
    gain1.gain.setValueAtTime(0.035, now + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);
    
    gain2.gain.setValueAtTime(0, now + 0.09);
    gain2.gain.linearRampToValueAtTime(0.035, now + 0.094);
    gain2.gain.setValueAtTime(0.035, now + 0.14);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.145);
    
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    
    osc1.start(now);
    osc1.stop(now + 0.06);
    osc2.start(now + 0.09);
    osc2.stop(now + 0.15);
  } catch (e) {
    console.warn("Failed to play focus beep:", e);
  }
};

// --- Photo Metadata (EXIF Data Store with Narrative Stories) ---
const photoData = {
  'hero': {
    title: '風にほどける春',
    filename: 'DSC05229.JPG',
    date: '2026/05/16 12:14',
    camera: 'SONY ILCE-7M4',
    lens: 'FE 200-600mm F5.6-6.3 G OSS',
    focal: '236 mm',
    aperture: 'f/5.6',
    shutter: '1/1000 秒',
    iso: 'ISO 250',
    desc: '広大な湧別の空の下、そよ風が吹き抜けた瞬間、重なり合う花びらがまるでドレスの裾をほどくように揺れ動いた。超望遠レンズの狭い視野の中で見つけた、二対のチューリップがひそやかに語り合うような一瞬。都会の喧騒を離れ、280kmを旅した果てに出会った、春の息吹そのものを捉えた作品。'
  },
  'gallery1': {
    title: '陽だまりのアンサンブル',
    filename: 'DSC05224.JPG',
    date: '2026/05/16 12:12',
    camera: 'SONY ILCE-7M4',
    lens: 'FE 200-600mm F5.6-6.3 G OSS',
    focal: '205 mm',
    aperture: 'f/5.6',
    shutter: '1/1000 秒',
    iso: 'ISO 250',
    desc: '地表に近いローアングルから見上げるように捉えた、明るく色鮮やかなチューリップたち。超望遠レンズがもたらす圧縮効果を活かし、離れた場所に咲く花々を一つの絵画のように密に引き寄せ、温かなまとまり感を表現しました。陽だまりの中で寄り添い合い、互いの色彩を響かせ合う花たちの、華やかで優しい協奏曲（アンサンブル）を描き出しています。'
  },
  'gallery2': {
    title: '花海をゆく轍（わだち）',
    filename: 'DSC05262.JPG',
    date: '2026/05/16 12:19',
    camera: 'SONY ILCE-7M4',
    lens: 'FE 200-600mm F5.6-6.3 G OSS',
    focal: '234 mm',
    aperture: 'f/5.6',
    shutter: '1/1000 秒',
    iso: 'ISO 250',
    desc: '赤、黄、ピンク。どこまでも続く色彩の絨毯をゆっくりと横切る緑のバス「チューピット号」。乗客たちの歓声と、踏みしめられる大地の匂い。花海を行くバスの轍は、この公園が刻んできた歴史と、訪れる人々の春の思い出を繋ぐ一本の糸のようだった。'
  },
  'gallery3': {
    title: '大地のキャンバス',
    filename: 'DSC05316.JPG',
    date: '2026/05/16 12:31',
    camera: 'SONY ILCE-7M4',
    lens: 'SIGMA 24-70mm F2.8 DG DN | Art 019',
    focal: '70 mm',
    aperture: 'f/6.3',
    shutter: '1/500 秒',
    iso: 'ISO 250',
    desc: 'オランダ風車から見下ろした、幾何学的な色彩のライン。それは自然が描いた絵画であり、何世代にもわたりこの地を開拓し、チューリップを育ててきた湧別の人々の情熱のキャンバスそのもの。人の手と大地が織りなす共同制作の物語。'
  },
  'gallery4': {
    title: '光の幕間、淡黄のロンド',
    filename: 'DSC05360.JPG',
    date: '2026/05/16 12:47',
    camera: 'SONY ILCE-7M4',
    lens: 'FE 200-600mm F5.6-6.3 G OSS',
    focal: '200 mm',
    aperture: 'f/5.6',
    shutter: '1/1000 秒',
    iso: 'ISO 250',
    desc: '風がふと止んだ午後。木漏れ日のスポットライトが、ひっそりと咲く淡黄色の花に当たった。前後の色彩が優しく溶け合う境界の中で、彼らはまるで春の輪舞曲（ロンド）を踊っているかのよう。主役たちの密やかな舞台裏を覗き見したような心地。'
  },
  'gallery5': {
    title: '陽光の交響曲',
    filename: 'DSC05397.JPG',
    date: '2026/05/16 13:13',
    camera: 'SONY ILCE-7M4',
    lens: 'FE 200-600mm F5.6-6.3 G OSS',
    focal: '200 mm',
    aperture: 'f/10',
    shutter: '1/640 秒',
    iso: 'ISO 200',
    desc: '強烈な午後の陽光が、チューリップの葉や茎を鋭く貫く。逆光の中で輝く無数の光線は、まるで春の到来を告げるファンファーレ。光と影の強烈なコントラストが、静かな花畑をダイナミックな交響曲の舞台へと変貌させた瞬間。'
  },
  'gallery6': {
    title: '風の通り道',
    filename: 'DSC05384.JPG',
    date: '2026/05/16 12:57',
    camera: 'SONY ILCE-7M4',
    lens: 'SIGMA 24-70mm F2.8 DG DN | Art 019',
    focal: '70 mm',
    aperture: 'f/10',
    shutter: '1/640 秒',
    iso: 'ISO 200',
    desc: 'オホーツク海から吹き付ける、少し冷たくて心地よい汐風。風が通り抜けるたびに、等間隔に並んだチューリップたちが一斉に波打つ。目には見えないはずの「風の道」が、揺れる色彩のストライプによって一瞬だけその姿を現した奇跡。'
  },
  'contrast_f28': {
    title: '静寂のしずく',
    filename: 'DSC05378.JPG',
    date: '2026/05/16 12:54',
    camera: 'SONY ILCE-7M4',
    lens: 'SIGMA 24-70mm F2.8 DG DN | Art 019',
    focal: '58 mm',
    aperture: 'f/2.8',
    shutter: '1/2500 秒',
    iso: 'ISO 200',
    desc: '雨上がりの澄んだ空気の中、一輪のチューリップの蕾に留まった一滴のしずく。F2.8の絞りが背景のすべてを柔らかな色彩の夢へと溶かし去り、しずくのなかに閉じ込められた小さな宇宙だけが、静かに息づいている。'
  },
  'contrast_f10': {
    title: '凛と咲く',
    filename: 'DSC05400.JPG',
    date: '2026/05/16 13:13',
    camera: 'SONY ILCE-7M4',
    lens: 'FE 200-600mm F5.6-6.3 G OSS',
    focal: '600 mm',
    aperture: 'f/10',
    shutter: '1/640 秒',
    iso: 'ISO 200',
    desc: '600mmの超望遠が引き寄せた、圧縮された花々の世界。F10まで絞り込んだレンズは、群生する一つひとつの命を、妥協なくシャープに描き出す。互いに支え合いながらオホーツクの風に立ち向かう、凛とした命の群像劇。'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // --- Concrete Wall Dynamic Spotlight ---
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty('--mouse-x', `${x}%`);
    document.body.style.setProperty('--mouse-y', `${y}%`);
  });

  // --- Header Scroll Effect ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Hamburger Menu ---
  const hamburger = document.getElementById('nav-hamburger');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a nav link is tapped
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // --- 3D Tilt & Specular Reflection Effect for Metal Prints ---
  const initTiltEffect = (elementWrapSelector, sheenSelector) => {
    const wraps = document.querySelectorAll(elementWrapSelector);
    
    wraps.forEach(wrap => {
      const sheen = wrap.querySelector(sheenSelector);
      
      wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate percentages
        const px = x / rect.width;
        const py = y / rect.height;
        
        // Tilt parameters (max 16deg rotation)
        const tiltX = (0.5 - py) * 16;
        const tiltY = (px - 0.5) * 16;
        
        // Apply transform
        wrap.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        
        // 3D parallax translation on the image inside
        const img = wrap.querySelector('img');
        if (img) {
          img.style.transform = `scale(1.06) translate(${-tiltY * 0.6}px, ${tiltX * 0.6}px)`;
        }
        
        // Specular highlight shift
        if (sheen) {
          sheen.style.background = `linear-gradient(${135 + (tiltY * 2)}deg, rgba(255, 255, 255, ${0.15 + (py * 0.05)}) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.05) 100%)`;
        }
      });
      
      wrap.addEventListener('mouseleave', () => {
        wrap.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        const img = wrap.querySelector('img');
        if (img) {
          img.style.transform = 'scale(1) translate(0px, 0px)';
        }
        if (sheen) {
          sheen.style.background = `linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 45%, rgba(255, 255, 255, 0.05) 100%)`;
        }
      });
    });
  };
  
  // Initialize on the main hero photo wrapper and contrast panels
  initTiltEffect('.metal-print-wrap', '.metal-print-sheen');
  initTiltEffect('.contrast-metal-wrap', '.contrast-sheen');

  // --- Lightbox Modal Logic ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox-image-wrap img');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxDesc = lightbox.querySelector('.lightbox-desc');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  
  let currentActivePhotoId = null;
  
  // DOM EXIF fields
  const exifDate = lightbox.querySelector('#exif-date');
  const exifCamera = lightbox.querySelector('#exif-camera');
  const exifLens = lightbox.querySelector('#exif-lens');
  const exifFocal = lightbox.querySelector('#exif-focal');
  const exifAperture = lightbox.querySelector('#exif-aperture');
  const exifShutter = lightbox.querySelector('#exif-shutter');
  const exifIso = lightbox.querySelector('#exif-iso');
  const exifFilename = lightbox.querySelector('#exif-filename');

  // Exposure display dial shuffle (staggered elegant fade-in)
  const shuffleExposureValues = (data) => {
    const evfShutter = lightbox.querySelector('#evf-shutter-val');
    const evfAperture = lightbox.querySelector('#evf-aperture-val');
    const evfIso = lightbox.querySelector('#evf-iso-val');
    
    if (evfShutter) {
      evfShutter.classList.remove('loaded');
      evfShutter.textContent = data.shutter.split(' ')[0];
    }
    if (evfAperture) {
      evfAperture.classList.remove('loaded');
      evfAperture.textContent = data.aperture.toUpperCase().replace('/', '');
    }
    if (evfIso) {
      evfIso.classList.remove('loaded');
      evfIso.textContent = data.iso;
    }
    
    // Staggered premium fade-in instead of chaotic shuffling
    setTimeout(() => { if (evfIso) evfIso.classList.add('loaded'); }, 150);
    setTimeout(() => { if (evfAperture) evfAperture.classList.add('loaded'); }, 300);
    setTimeout(() => { if (evfShutter) evfShutter.classList.add('loaded'); }, 450);
  };

  // Helper to spawn gorgeous floating gold particles around the focus center
  const spawnGoldParticles = (container, center) => {
    const particleCount = 22;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'af-sparkle';
      
      // Randomize particle sizes (3px to 8px)
      const size = Math.random() * 5 + 3;
      p.style.setProperty('--size', `${size}px`);
      
      // Set starting point (focus center)
      p.style.left = `${center.x}%`;
      p.style.top = `${center.y}%`;
      
      // Compute radial explosion coordinates
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 70 + 20; // 20px to 90px radial spread
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - (Math.random() * 15); // float upwards slightly
      
      p.style.setProperty('--tx', `${tx}px`);
      p.style.setProperty('--ty', `${ty}px`);
      
      // Stagger animations slightly
      p.style.animationDelay = `${Math.random() * 0.08}s`;
      
      container.appendChild(p);
      p.classList.add('burst');
      
      // Auto-remove particles after animation completes
      setTimeout(() => { p.remove(); }, 1300);
    }
  };

  // Dynamic SONY Real-time Tracking AF point animations (simplified premium reticle)
  const triggerAFTrackingAnimation = (photoId) => {
    const brackets = lightbox.querySelector('.evf-focus-brackets');
    if (!brackets) return;
    
    brackets.innerHTML = ''; // Clear previous focus points
    
    // Create a single elegant focus reticle (viewfinder frame)
    const frame = document.createElement('div');
    frame.className = 'focus-frame';
    
    // Position focus centers dynamically based on photo composition
    let focusCenter = { x: 50, y: 50 };
    if (photoId === 'hero') { focusCenter = { x: 48, y: 46 }; }
    else if (photoId === 'gallery1') { focusCenter = { x: 50, y: 44 }; }
    else if (photoId === 'gallery4') { focusCenter = { x: 52, y: 52 }; }
    else if (photoId === 'contrast_f28') { focusCenter = { x: 46, y: 42 }; }
    
    frame.style.left = `${focusCenter.x}%`;
    frame.style.top = `${focusCenter.y}%`;
    brackets.appendChild(frame);
    
    // 1. Activate frame (scales down smoothly and turns white-grey)
    setTimeout(() => {
      frame.classList.add('active');
    }, 100);
    
    // 2. Lock Focus (turns green, pulses, and chimes)
    setTimeout(() => {
      playFocusBeep();
      frame.classList.add('lock');
    }, 800);
    
    // 3. Clear focus reticle (as HUD fades out)
    setTimeout(() => {
      frame.style.opacity = '0';
    }, 1700);
  };

  // --- Spring Petals Canvas Animation (風にほどける春 exclusive) ---
  const petalCanvas = document.getElementById('spring-petals');
  let petalCtx = null;
  let petalAnimFrame = null;
  let petals = [];
  const PETAL_COUNT = 28;

  // Petal color palette — soft spring tulip tones
  const PETAL_COLORS = [
    'rgba(255, 210, 220, ',  // soft pink
    'rgba(255, 230, 240, ',  // blush white
    'rgba(240, 200, 210, ',  // dusty rose
    'rgba(255, 245, 200, ',  // pale cream
    'rgba(220, 190, 210, ',  // mauve lilac
    'rgba(255, 220, 190, ',  // warm peach
  ];

  const initPetalCanvas = () => {
    if (!petalCanvas) return;
    petalCtx = petalCanvas.getContext('2d');
    resizePetalCanvas();
  };

  const resizePetalCanvas = () => {
    if (!petalCanvas || !petalCtx) return;
    const stage = petalCanvas.parentElement;
    petalCanvas.width = stage.offsetWidth;
    petalCanvas.height = stage.offsetHeight;
  };

  const createPetal = (immediate = false) => {
    const w = petalCanvas ? petalCanvas.width : window.innerWidth;
    const h = petalCanvas ? petalCanvas.height : window.innerHeight;
    const size = Math.random() * 14 + 8; // 8–22px
    return {
      x: Math.random() * (w + 100) - 50,
      y: immediate ? (Math.random() * h) : (-size - Math.random() * 200),
      size,
      speedY: Math.random() * 0.6 + 0.3,   // gentle fall
      speedX: (Math.random() - 0.5) * 0.4,  // slight horizontal drift
      swayFreq: Math.random() * 0.015 + 0.008,
      swayAmp: Math.random() * 30 + 15,
      swayOffset: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.025,
      opacity: Math.random() * 0.45 + 0.25,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      time: Math.random() * 100,
    };
  };

  // Draw an organic teardrop petal shape
  const drawPetal = (ctx, petal) => {
    ctx.save();
    ctx.translate(petal.x, petal.y);
    ctx.rotate(petal.rotation);
    ctx.globalAlpha = petal.opacity;

    const s = petal.size;
    ctx.beginPath();
    // Teardrop shape using bezier curves
    ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s * 0.6, -s * 0.6, s * 0.6, s * 0.4, 0, s * 0.6);
    ctx.bezierCurveTo(-s * 0.6, s * 0.4, -s * 0.6, -s * 0.6, 0, -s);
    ctx.closePath();

    // Fill with radial gradient for depth
    const grad = ctx.createRadialGradient(0, -s * 0.2, 0, 0, 0, s * 0.9);
    grad.addColorStop(0, petal.color + '0.9)');
    grad.addColorStop(0.5, petal.color + '0.6)');
    grad.addColorStop(1, petal.color + '0.0)');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.restore();
  };

  const animatePetals = () => {
    if (!petalCtx || !petalCanvas) return;
    const w = petalCanvas.width;
    const h = petalCanvas.height;

    petalCtx.clearRect(0, 0, w, h);

    petals.forEach(p => {
      // Update position
      p.time += 1;
      p.x += p.speedX + Math.sin(p.time * p.swayFreq + p.swayOffset) * 0.5;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      // Recycle when out of bounds
      if (p.y > h + p.size * 2 || p.x < -100 || p.x > w + 100) {
        Object.assign(p, createPetal(false));
        p.y = -p.size - Math.random() * 60;
      }

      drawPetal(petalCtx, p);
    });

    petalAnimFrame = requestAnimationFrame(animatePetals);
  };

  const startPetals = () => {
    if (!petalCanvas) return;
    initPetalCanvas();
    petals = Array.from({ length: PETAL_COUNT }, () => createPetal(true));
    if (petalAnimFrame) cancelAnimationFrame(petalAnimFrame);
    animatePetals();
  };

  const stopPetals = () => {
    if (petalAnimFrame) {
      cancelAnimationFrame(petalAnimFrame);
      petalAnimFrame = null;
    }
    if (petalCtx && petalCanvas) {
      petalCtx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
    }
    petals = [];
  };

  const openLightbox = (photoId, imgSrc, shouldPushState = true) => {
    const data = photoData[photoId];
    if (!data) return;

    if (lightbox.classList.contains('active') && currentActivePhotoId === photoId) {
      return; // Already open for this photo
    }
    currentActivePhotoId = photoId;

    if (shouldPushState) {
      history.pushState({ lightboxOpen: true, photoId: photoId, isPushed: true }, document.title, '#' + photoId);
    } else {
      history.replaceState({ lightboxOpen: true, photoId: photoId, isPushed: false }, document.title, '#' + photoId);
    }

    // Trigger fullscreen on image click to ensure fully immersive viewer
    const docEl = document.documentElement;
    const requestFS = docEl.requestFullscreen || 
                      docEl.webkitRequestFullscreen || 
                      docEl.mozRequestFullScreen || 
                      docEl.msRequestFullscreen;
    if (requestFS && !document.fullscreenElement) {
      requestFS.call(docEl).catch(err => {
        console.warn("Fullscreen request on photo click denied:", err);
      });
    }

    // Reset details sidebar scroll position immediately to prevent starting at bottom on mobile
    const sidebar = lightbox.querySelector('.lightbox-sidebar');
    if (sidebar) {
      sidebar.scrollTop = 0;
    }

    // Reset lightbox active state first to restart animations cleanly
    lightbox.classList.remove('active');
    lightbox.classList.remove('show-details');
    lightbox.classList.remove('show-evf');
    lightbox.classList.remove('hero-photo');
    stopPetals();

    // Hide title card active state initially
    const titleCard = lightbox.querySelector('.lightbox-title-card');
    const titleCardTitle = lightbox.querySelector('.title-card-title');
    if (titleCard && titleCardTitle) {
      titleCardTitle.textContent = data.title;
      titleCard.classList.remove('active');
    }

    // Populate sidebar technical specs
    lightboxTitle.textContent = data.title;
    lightboxDesc.textContent = data.desc;
    
    exifDate.textContent = data.date;
    exifCamera.textContent = data.camera;
    exifLens.textContent = data.lens;
    exifFocal.textContent = data.focal;
    exifAperture.textContent = data.aperture;
    exifShutter.textContent = data.shutter;
    exifIso.textContent = data.iso;
    exifFilename.textContent = data.filename;

    // Show Lightbox modal background overlay immediately
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock scrolling
    
    // Trigger Title Card intro animation
    if (titleCard) {
      titleCard.classList.add('active');
    }

    let imageLoaded = false;
    let titleCardTimePassed = false;

    // Helper to start the viewfinder and camera animation sequence
    const startViewfinderSequence = () => {
      // 1. Fade out the title card
      if (titleCard) {
        titleCard.classList.remove('active');
      }
      
      // 2. Delay slightly for title card fadeout, then reveal EVF and play shutter sound
      setTimeout(() => {
        // Trigger EVF reveal and shutter flash animations in CSS
        lightbox.classList.add('show-evf');

        // Play camera shutter click
        playShutterSound();
        
        // Trigger exposure value dial shuffle
        shuffleExposureValues(data);
        
        // Trigger autofocus tracking square and beep
        triggerAFTrackingAnimation(photoId);
        
        // Smoothly transition layout (move image left/up, slide in details sidebar)
        setTimeout(() => {
          lightbox.classList.add('show-details');
          // Start spring petals for hero photo after details reveal
          if (photoId === 'hero') {
            lightbox.classList.add('hero-photo');
            setTimeout(() => { startPetals(); }, 800); // slight delay for canvas fade-in
          }
        }, 1200);
      }, 500); // matching CSS transition of title card
    };

    const handleImageLoad = () => {
      imageLoaded = true;
      if (titleCardTimePassed) {
        startViewfinderSequence();
      }
    };

    lightboxImg.onload = handleImageLoad;
    lightboxImg.src = imgSrc;
    
    // Fallback if image is cached
    if (lightboxImg.complete) {
      imageLoaded = true;
    }

    // Force title card to display for at least 1.4 seconds before showing the viewfinder
    setTimeout(() => {
      titleCardTimePassed = true;
      if (imageLoaded) {
        startViewfinderSequence();
      }
    }, 1400);
  };

  const performCloseLightbox = () => {
    lightbox.classList.remove('active');
    lightbox.classList.remove('show-details');
    lightbox.classList.remove('show-evf');
    lightbox.classList.remove('hero-photo');
    stopPetals();
    document.body.style.overflow = ''; // Restore scrolling
    currentActivePhotoId = null;

    // Reset details sidebar scroll position to top
    const sidebar = lightbox.querySelector('.lightbox-sidebar');
    if (sidebar) {
      sidebar.scrollTop = 0;
    }
    
    // Reset title card opacity immediately on close so it doesn't flash next time
    const titleCard = lightbox.querySelector('.lightbox-title-card');
    if (titleCard) {
      titleCard.classList.remove('active');
    }
    
    // Clear URL hash quietly without jumping the page if it matches a photo ID
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      if (photoData[hash]) {
        history.replaceState({ lightboxOpen: false }, document.title, window.location.pathname + window.location.search);
      }
    }

    // Clear src after fadeout to prevent flash next time
    setTimeout(() => {
      lightboxImg.src = '';
    }, 500);
  };

  const closeLightbox = () => {
    if (history.state && history.state.lightboxOpen && history.state.isPushed) {
      history.back();
    } else {
      history.replaceState({ lightboxOpen: false }, document.title, window.location.pathname + window.location.search);
      performCloseLightbox();
    }
  };

  // Attach click to hero image
  const heroClickable = document.querySelector('.hero-visual .metal-print-wrap');
  if (heroClickable) {
    heroClickable.addEventListener('click', () => {
      const img = heroClickable.querySelector('img');
      openLightbox('hero', img.src);
    });
  }

  // Attach clicks to gallery cards
  const galleryCards = document.querySelectorAll('.gallery-card');
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const photoId = card.getAttribute('data-photo-id');
      const img = card.querySelector('img');
      openLightbox(photoId, img.src);
    });
  });

  // Attach clicks to contrast panels
  const contrastPanels = document.querySelectorAll('.contrast-metal-wrap');
  contrastPanels.forEach(panel => {
    panel.addEventListener('click', () => {
      const photoId = panel.getAttribute('data-photo-id');
      const img = panel.querySelector('img');
      openLightbox(photoId, img.src);
    });
  });

  // Close triggers
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-main') || e.target.classList.contains('lightbox-container')) {
      closeLightbox();
    }
  });

  // ESC key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (adminModal && adminModal.classList.contains('active')) {
        closeAdminModal();
      } else if (lightbox && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    }
  });

  // --- Intersection Observer for Scroll Animations ---
  const sections = document.querySelectorAll('.fade-in-section');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        // Trigger the SVG car animation when the map block scrolls into view
        if (entry.target.classList.contains('journey-map-block')) {
          const carAnim = document.getElementById('car-animation');
          if (carAnim) {
            carAnim.beginElement();
          }
        }
        
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // --- Intro Overlay Click to Enter & Fullscreen ---
  const introOverlay = document.getElementById('intro-overlay');
  if (introOverlay) {
    // Click to enter fullscreen and unlock audio context
    introOverlay.addEventListener('click', () => {
      // 1. Request fullscreen with cross-browser support
      const docEl = document.documentElement;
      const requestFS = docEl.requestFullscreen || 
                        docEl.webkitRequestFullscreen || 
                        docEl.mozRequestFullScreen || 
                        docEl.msRequestFullscreen;
      
      if (requestFS) {
        requestFS.call(docEl).catch(err => {
          console.warn("Fullscreen request denied or not supported:", err);
        });
      }

      // 2. Resume audio context immediately (vital for mobile browsers)
      initAudio();

      // 3. Trigger fade-out transition
      introOverlay.classList.add('fade-out');
      
      // 4. Cleanup overlay element after transition finishes
      setTimeout(() => {
        introOverlay.style.display = 'none';
      }, 1200);
    });
  }

  // --- Custom Luxury Cursor ---
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  if (cursor && cursorDot) {
    document.addEventListener('mousemove', (e) => {
      // Outer ring follows with easing animate
      cursor.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
      }, { duration: 150, fill: 'forwards' });

      // Inner dot moves instantly
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
    });

    // Hover scale effect using event delegation
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, .gallery-card, .metal-print-wrap, .lightbox-close')) {
        cursor.classList.add('hover');
      } else {
        cursor.classList.remove('hover');
      }
    });
  }

  // --- Auto-open Lightbox from URL Hash (NFC Linkage) ---
  const handleHashRouting = () => {
    const hash = window.location.hash.substring(1); // remove '#'
    if (hash && photoData[hash]) {
      let img = null;
      if (hash === 'hero') {
        const heroWrap = document.querySelector('.hero-visual .metal-print-wrap');
        if (heroWrap) img = heroWrap.querySelector('img');
      } else {
        const targetElement = document.querySelector(`[data-photo-id="${hash}"]`);
        if (targetElement) img = targetElement.querySelector('img');
      }
      
      if (img) {
        // Wait for the splash screen / intro overlay to start fading out before opening
        const isIntroActive = introOverlay && introOverlay.style.display !== 'none';
        const delay = isIntroActive ? 1500 : 0;
        setTimeout(() => {
          openLightbox(hash, img.src, false); // Do not push state when routing from hash/URL directly
        }, delay);
      }
    }
  };

  // --- Guestbook / Message Board Feature ---
  const guestbookForm = document.getElementById('guestbook-form');
  const guestbookMessages = document.getElementById('guestbook-messages');
  const STORAGE_KEY = 'hus_guestbook_messages';
  const MY_POSTS_KEY = 'hus_my_message_ids';
  const ADMIN_PASS_HASH = 'aHVzcGhvdG8yMDI2'; // Base64 for 'husphoto2026'

  // --- Web3Forms Email Notification Config ---
  // 設定されたアクセスキーを使用して、新着コメントを自動転送します。
  const WEB3FORMS_ACCESS_KEY = '0522a69a-4ed8-4b82-b842-a11f0a6f86ca';

  // --- Google Apps Script (GAS) API Config ---
  // 設定されたGASウェブアプリURLを使用して、コメントデータをGoogleスプレッドシートと同期します。
  const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbz-OOwnh5Smq1qlfWCMW5kDMQHUpkJmsfr2tFOXZsp5LmGJuLRfAFSiK9lkyVh5GD2u/exec';

  // Helper to send email notification on new comment (Asynchronous Web3Forms POST)
  const sendEmailNotification = async (name, message) => {
    if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY' || !WEB3FORMS_ACCESS_KEY.trim()) {
      console.log("Email notification skipped: Web3Forms Access Key is not configured.");
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: '【風にほどける春】芳名帳に新しい感想が投稿されました',
          from_name: '風にほどける春 特設サイト',
          to_email: '3243005@stu.hus.ac.jp',
          name: name,
          message: message,
          timestamp: new Date().toLocaleString('ja-JP')
        })
      });

      const result = await response.json();
      if (result.success) {
        console.log("Email notification sent successfully.");
      } else {
        console.warn("Web3Forms failed to send email:", result.message);
      }
    } catch (err) {
      console.warn("Failed to send email notification:", err);
    }
  };

  // Admin Mode state variables
  const adminModeToggle = document.getElementById('admin-mode-toggle');
  const adminToggleText = document.getElementById('admin-toggle-text');
  let isAdminMode = sessionStorage.getItem('hus_is_admin') === 'true';

  const updateAdminToggleUI = () => {
    if (!adminModeToggle) return;
    if (isAdminMode) {
      adminModeToggle.classList.add('active');
      if (adminToggleText) adminToggleText.textContent = '解除 (管理者)';
    } else {
      adminModeToggle.classList.remove('active');
      if (adminToggleText) adminToggleText.textContent = '管理者ログイン';
    }
  };

  // Helper to load my posted comment IDs
  const getMyPostedIds = () => {
    try {
      const stored = localStorage.getItem(MY_POSTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn("Failed to load my posted IDs:", e);
      return [];
    }
  };

  // Helper to save a new posted comment ID
  const addMyPostedId = (id) => {
    try {
      const ids = getMyPostedIds();
      ids.push(id);
      localStorage.setItem(MY_POSTS_KEY, JSON.stringify(ids));
    } catch (e) {
      console.warn("Failed to save my posted ID:", e);
    }
  };

  // Helper to fetch/sync guestbook messages from GAS (Google Sheets Database)
  const syncGuestbookMessages = async () => {
    if (!GAS_API_URL || GAS_API_URL.trim() === 'YOUR_GAS_API_URL') {
      return;
    }

    try {
      const response = await fetch(GAS_API_URL);
      const result = await response.json();
      if (result.success && result.messages) {
        // Reverse array so new messages are first
        const messages = result.messages.reverse();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        // Update display silently in background
        renderGuestbookHTML(messages);
      }
    } catch (e) {
      console.warn("Failed to sync guestbook messages with GAS:", e);
    }
  };

  // Helper to post a new message to GAS asynchronously (CORS-safe simple request)
  const postMessageToGAS = async (newMsg) => {
    if (!GAS_API_URL || GAS_API_URL.trim() === 'YOUR_GAS_API_URL') return;

    try {
      await fetch(GAS_API_URL, {
        method: 'POST',
        mode: 'no-cors', // Force no-cors to bypass redirect CORS blocks
        headers: {
          'Content-Type': 'text/plain' // Bypass CORS preflight precheck
        },
        body: JSON.stringify({
          action: 'add',
          id: newMsg.id,
          name: newMsg.name,
          message: newMsg.message,
          date: newMsg.date
        })
      });
      syncGuestbookMessages(); // Trigger update to pull clean state
    } catch (e) {
      console.warn("Failed to post message to GAS:", e);
    }
  };

  // Helper to delete a message from GAS asynchronously (CORS-safe simple request)
  const deleteMessageFromGAS = async (id) => {
    if (!GAS_API_URL || GAS_API_URL.trim() === 'YOUR_GAS_API_URL') return;

    try {
      await fetch(GAS_API_URL, {
        method: 'POST',
        mode: 'no-cors', // Force no-cors
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify({
          action: 'delete',
          id: id
        })
      });
      syncGuestbookMessages();
    } catch (e) {
      console.warn("Failed to delete message from GAS:", e);
    }
  };

  // Helper to edit/update a message in GAS (CORS-safe simple request)
  const updateMessageInGAS = async (msgId, newText) => {
    if (!GAS_API_URL || GAS_API_URL.trim() === 'YOUR_GAS_API_URL') return;

    try {
      await fetch(GAS_API_URL, {
        method: 'POST',
        mode: 'no-cors', // Force no-cors
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify({
          action: 'edit',
          id: msgId,
          message: newText
        })
      });
      syncGuestbookMessages();
    } catch (e) {
      console.warn("Failed to update message in GAS:", e);
    }
  };

  // Load and display messages
  const loadGuestbookMessages = () => {
    let messages = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        messages = JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Failed to load guestbook messages:", e);
    }

    // Immediately render local cache for instant UI response
    renderGuestbookHTML(messages);

    // Fetch latest shared database in background
    syncGuestbookMessages();
  };

  // Separate HTML renderer for reusable background updates
  const renderGuestbookHTML = (messages) => {
    if (messages.length === 0) {
      guestbookMessages.innerHTML = `
        <div class="no-messages">
          <p>まだ感想がありません。最初の感想を書き込んでみませんか？</p>
        </div>
      `;
      return;
    }

    const myPostedIds = getMyPostedIds();

    // Render cards
    guestbookMessages.innerHTML = '';
    messages.forEach(msg => {
      const card = document.createElement('div');
      card.className = 'guestbook-card';
      card.setAttribute('data-id', msg.id);

      // Get initial for avatar
      const initial = (msg.name && msg.name.trim()) ? msg.name.trim().charAt(0).toUpperCase() : 'Guest';
      
      const isMyMessage = myPostedIds.includes(msg.id);

      // Create Actions HTML (only show actions if it's my message or admin mode is active)
      let actionsHTML = '';
      if (isMyMessage || isAdminMode) {
        actionsHTML = `<div class="card-actions">`;
        if (isMyMessage) {
          // Edit button (Pencil SVG)
          actionsHTML += `
            <button class="card-action-btn edit-btn" aria-label="この感想を編集">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          `;
        }
        // Delete button (Trash SVG)
        actionsHTML += `
          <button class="card-action-btn delete-btn" aria-label="この感想を削除">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        `;
        actionsHTML += `</div>`;
      }

      card.innerHTML = `
        <div class="visitor-avatar">${initial}</div>
        <div class="visitor-content">
          <div class="visitor-meta">
            <span class="visitor-meta-name">${escapeHTML(msg.name)}</span>
            <span class="visitor-meta-date">${msg.date}</span>
          </div>
          <p class="visitor-msg-text">${escapeHTML(msg.message)}</p>
        </div>
        ${actionsHTML}
      `;

      // Attach actions events
      if (isMyMessage) {
        const editBtn = card.querySelector('.edit-btn');
        if (editBtn) {
          editBtn.addEventListener('click', () => {
            enterEditMode(card, msg);
          });
        }
      }

      const deleteBtn = card.querySelector('.delete-btn');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
          handleDeleteMessage(msg.id, isMyMessage);
        });
      }

      guestbookMessages.appendChild(card);
    });
  };

  // Inline comment editing logic
  const enterEditMode = (card, msg) => {
    // If already editing, ignore
    if (card.classList.contains('editing')) return;

    card.classList.add('editing');
    const contentArea = card.querySelector('.visitor-content');
    const msgTextElement = card.querySelector(`.visitor-msg-text`);
    const originalText = msg.message;

    // Temporarily hide actions panel
    const actionsPanel = card.querySelector('.card-actions');
    if (actionsPanel) actionsPanel.style.display = 'none';

    // Replace message text with textarea and save/cancel buttons
    const editContainer = document.createElement('div');
    editContainer.className = 'inline-edit-container';
    editContainer.innerHTML = `
      <textarea class="edit-textarea" maxlength="500">${escapeHTML(originalText)}</textarea>
      <div class="edit-actions">
        <button class="edit-btn-cancel">キャンセル</button>
        <button class="edit-btn-save">保存</button>
      </div>
    `;

    msgTextElement.style.display = 'none';
    contentArea.appendChild(editContainer);

    const textarea = editContainer.querySelector('.edit-textarea');
    textarea.focus();
    // Move cursor to the end of text
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);

    const cancelBtn = editContainer.querySelector('.edit-btn-cancel');
    const saveBtn = editContainer.querySelector('.edit-btn-save');

    const exitEditMode = () => {
      editContainer.remove();
      msgTextElement.style.display = '';
      card.classList.remove('editing');
      if (actionsPanel) actionsPanel.style.display = '';
    };

    cancelBtn.addEventListener('click', exitEditMode);
    
    saveBtn.addEventListener('click', () => {
      const newText = textarea.value.trim();
      if (!newText) {
        alert("感想を入力してください。");
        textarea.focus();
        return;
      }

      if (newText === originalText) {
        exitEditMode();
        return;
      }

      // Update locally first for instant feedback
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const messages = JSON.parse(stored);
          const index = messages.findIndex(m => m.id === msg.id);
          if (index !== -1) {
            messages[index].message = newText;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
            renderGuestbookHTML(messages);
          }
        }
        
        // Push update asynchronously to GAS
        updateMessageInGAS(msg.id, newText);
        exitEditMode();

      } catch (e) {
        console.error("Failed to update message:", e);
        alert("メッセージの更新に失敗しました。");
      }
    });

    // Handle ESC and Ctrl+Enter inside textarea
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        exitEditMode();
      } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        saveBtn.click();
      }
    });
  };

  // Handle deletion (asks confirmation if owner, direct delete if admin)
  const handleDeleteMessage = (id, isOwner) => {
    if (isOwner) {
      if (!confirm("本当にこの感想を削除しますか？")) return;
    } else if (!isAdminMode) {
      return;
    }

    try {
      // 1. Delete locally first for instant UI response
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        let messages = JSON.parse(stored);
        messages = messages.filter(msg => msg.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        
        let myPostedIds = getMyPostedIds();
        myPostedIds = myPostedIds.filter(myId => myId !== id);
        localStorage.setItem(MY_POSTS_KEY, JSON.stringify(myPostedIds));

        renderGuestbookHTML(messages);
      }

      // 2. Sync delete request asynchronously with GAS database
      deleteMessageFromGAS(id);

    } catch (e) {
      console.error("Failed to delete message:", e);
      alert("削除中にエラーが発生しました。");
    }
  };

  // Helper to escape HTML tags to prevent XSS injection
  const escapeHTML = (str) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // Handle message post
  if (guestbookForm) {
    guestbookForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('visitor-name');
      const messageInput = document.getElementById('visitor-message');

      const name = nameInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !message) {
        alert("お名前とメッセージを入力してください。");
        return;
      }

      // Format current date: YYYY/MM/DD HH:MM
      const now = new Date();
      const pad = (n) => n.toString().padStart(2, '0');
      const dateString = `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

      const newMsg = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        name: name,
        message: message,
        date: dateString
      };

      // Save locally first for instant UI responsiveness
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const messages = stored ? JSON.parse(stored) : [];
        messages.unshift(newMsg); // Add to the top
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        
        // Add to my posted IDs
        addMyPostedId(newMsg.id);

        // Reset inputs and reload UI
        nameInput.value = '';
        messageInput.value = '';
        
        renderGuestbookHTML(messages);

        // Staggered smooth scroll to guestbook timeline
        setTimeout(() => {
          guestbookMessages.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);

        // Trigger Google Sheets & Email notifications in background
        postMessageToGAS(newMsg);
        sendEmailNotification(name, message);

      } catch (err) {
        console.error("Failed to save guestbook message:", err);
        alert("感想の送信に失敗しました。");
      }
    });
  }

  // --- Admin Password Modal Logic ---
  const adminModal = document.getElementById('admin-modal');
  const adminOverlay = document.getElementById('admin-modal-overlay');
  const adminClose = document.getElementById('admin-modal-close');
  const adminPassInput = document.getElementById('admin-password-input');
  const adminSubmitBtn = document.getElementById('admin-submit-btn');
  const adminError = document.getElementById('admin-modal-error');

  const openAdminModal = () => {
    if (adminModal) {
      adminModal.classList.add('active');
      adminModal.setAttribute('aria-hidden', 'false');
    }
    if (adminPassInput) {
      adminPassInput.value = '';
    }
    if (adminError) {
      adminError.classList.remove('visible');
    }
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    
    // Focus input after CSS transition starts
    setTimeout(() => {
      if (adminPassInput) adminPassInput.focus();
    }, 150);
  };

  const closeAdminModal = () => {
    if (adminModal) {
      adminModal.classList.remove('active');
      adminModal.setAttribute('aria-hidden', 'true');
    }
    if (adminPassInput) {
      adminPassInput.value = '';
    }
    if (adminError) {
      adminError.classList.remove('visible');
    }
    // Restore scrolling only if Lightbox isn't open
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  };

  const handleAdminVerify = () => {
    if (!adminPassInput) return;
    const inputPass = adminPassInput.value.trim();
    if (!inputPass) {
      showAdminError("パスワードを入力してください");
      return;
    }

    const decodedPass = atob(ADMIN_PASS_HASH);

    if (inputPass === decodedPass) {
      try {
        sessionStorage.setItem('hus_is_admin', 'true');
        isAdminMode = true;
        updateAdminToggleUI();
        loadGuestbookMessages();
        closeAdminModal();
      } catch (e) {
        console.error("Failed to enter admin mode:", e);
        showAdminError("エラーが発生しました");
      }
    } else {
      showAdminError("パスワードが正しくありません");
    }
  };

  const showAdminError = (msg) => {
    if (!adminError) return;
    adminError.textContent = msg;
    adminError.classList.add('visible');
    
    // Reset shaking animation
    adminError.style.animation = 'none';
    // Trigger reflow
    void adminError.offsetWidth;
    adminError.style.animation = '';
    
    if (adminPassInput) adminPassInput.focus();
  };

  // Admin Toggle Button Events
  if (adminModeToggle) {
    adminModeToggle.addEventListener('click', () => {
      if (isAdminMode) {
        // Logout admin
        sessionStorage.removeItem('hus_is_admin');
        isAdminMode = false;
        updateAdminToggleUI();
        loadGuestbookMessages();
      } else {
        openAdminModal();
      }
    });
  }

  if (adminClose) adminClose.addEventListener('click', closeAdminModal);
  if (adminOverlay) adminOverlay.addEventListener('click', closeAdminModal);
  if (adminSubmitBtn) adminSubmitBtn.addEventListener('click', handleAdminVerify);
  if (adminPassInput) {
    adminPassInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleAdminVerify();
      } else if (e.key === 'Escape') {
        closeAdminModal();
      }
    });
  }

  // Initial UI Setup
  updateAdminToggleUI();
  loadGuestbookMessages();

  // Initialize history state on load
  if (!history.state) {
    history.replaceState({ lightboxOpen: false }, document.title, window.location.pathname + window.location.search);
  }

  // Handle browser back/forward buttons
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.lightboxOpen) {
      const photoId = e.state.photoId;
      let img = null;
      if (photoId === 'hero') {
        const heroWrap = document.querySelector('.hero-visual .metal-print-wrap');
        if (heroWrap) img = heroWrap.querySelector('img');
      } else {
        const targetElement = document.querySelector(`[data-photo-id="${photoId}"]`);
        if (targetElement) img = targetElement.querySelector('img');
      }
      if (img) {
        openLightbox(photoId, img.src, false);
      }
    } else {
      performCloseLightbox();
    }
  });

  // Run on page load and watch for hash changes
  window.addEventListener('load', handleHashRouting);
  window.addEventListener('hashchange', handleHashRouting);
});
