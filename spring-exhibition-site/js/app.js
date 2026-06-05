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
    title: '微笑む木漏れ日',
    filename: 'DSC05224.JPG',
    date: '2026/05/16 12:12',
    camera: 'SONY ILCE-7M4',
    lens: 'FE 200-600mm F5.6-6.3 G OSS',
    focal: '205 mm',
    aperture: 'f/5.6',
    shutter: '1/1000 秒',
    iso: 'ISO 250',
    desc: '朝露が消えかかる午前11時。木々の隙間から差し込む光が、一枚の花弁をステンドグラスのように透き通らせた。まるで、長い冬の眠りから覚めた花が、春の陽光に向かって優しく微笑みかけているような、温かな光の対話の物語。'
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
  // --- Header Scroll Effect ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

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
        
        // Tilt parameters (max 12deg rotation)
        const tiltX = (0.5 - py) * 16;
        const tiltY = (px - 0.5) * 16;
        
        // Apply transform
        wrap.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        
        // Specular highlight shift
        if (sheen) {
          const glossX = px * 100;
          const glossY = py * 100;
          sheen.style.background = `linear-gradient(${135 + (tiltY * 2)}deg, rgba(255, 255, 255, ${0.15 + (py * 0.05)}) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.05) 100%)`;
        }
      });
      
      wrap.addEventListener('mouseleave', () => {
        wrap.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
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
  
  // DOM EXIF fields
  const exifDate = lightbox.querySelector('#exif-date');
  const exifCamera = lightbox.querySelector('#exif-camera');
  const exifLens = lightbox.querySelector('#exif-lens');
  const exifFocal = lightbox.querySelector('#exif-focal');
  const exifAperture = lightbox.querySelector('#exif-aperture');
  const exifShutter = lightbox.querySelector('#exif-shutter');
  const exifIso = lightbox.querySelector('#exif-iso');
  const exifFilename = lightbox.querySelector('#exif-filename');

  const openLightbox = (photoId, imgSrc) => {
    const data = photoData[photoId];
    if (!data) return;

    // Reset lightbox active state first to restart animations cleanly
    lightbox.classList.remove('active');

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

    // Populate SONY a7IV EVF HUD parameters dynamically
    const evfShutter = lightbox.querySelector('#evf-shutter-val');
    const evfAperture = lightbox.querySelector('#evf-aperture-val');
    const evfIso = lightbox.querySelector('#evf-iso-val');
    
    if (evfShutter) {
      // Extract fraction part of shutter speed, e.g. "1/1000 秒" -> "1/1000"
      evfShutter.textContent = data.shutter.split(' ')[0];
    }
    if (evfAperture) {
      // Reformat aperture, e.g. "f/5.6" -> "F5.6"
      evfAperture.textContent = data.aperture.toUpperCase().replace('/', '');
    }
    if (evfIso) {
      // Map ISO value, e.g. "ISO 250"
      evfIso.textContent = data.iso;
    }

    // Gate lightbox activation on image loading to prevent animation playing on black screen
    const activateLightbox = () => {
      if (!lightbox.classList.contains('active')) {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scrolling
      }
    };

    lightboxImg.onload = activateLightbox;
    lightboxImg.src = imgSrc;
    
    // Fallback if image is already cached
    if (lightboxImg.complete) {
      activateLightbox();
    }
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Clear URL hash quietly without jumping the page if it matches a photo ID
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      if (photoData[hash]) {
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
      }
    }

    // Clear src after fadeout to prevent flash next time
    setTimeout(() => {
      lightboxImg.src = '';
    }, 500);
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
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
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

  // --- Intro Overlay Fadeout ---
  const introOverlay = document.getElementById('intro-overlay');
  if (introOverlay) {
    setTimeout(() => {
      introOverlay.classList.add('fade-out');
    }, 2200);
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
        setTimeout(() => {
          openLightbox(hash, img.src);
        }, 1500);
      }
    }
  };

  // Run on page load and watch for hash changes
  window.addEventListener('load', handleHashRouting);
  window.addEventListener('hashchange', handleHashRouting);
});
