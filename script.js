/* ==========================================================================
   20/10 SPECIAL CELEBRATION JAVASCRIPT
   - Native Audio Player ("Người Gieo Mầm Xanh" - audio/nguoi_gieo_mam_xanh.mp4)
   - 12A35 Non-Jumping Swipeable Navigation Bar & ScrollSpy
   - WebGL (OpenGL) Shimmering Aura Shader Engine
   - Intro Curtain Opening Trigger (Màn Mở Đầu 20/10)
   - Falling Petals Canvas Engine (Cánh Hoa Rơi)
   - Fireworks System (Pháo Hoa)
   - Floating Hearts Burst
   - Envelope Interaction
   - 3D Card Tilt
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       0. MUSIC PLAYBACK CONTROLLER (100% RELIABLE PLAY / PAUSE)
       ========================================== */
    const musicBtn = document.getElementById('musicPlayerBtn');
    const musicDisc = document.getElementById('musicDisc');
    const bgAudio = document.getElementById('bgAudio');

    function playAudioTrack() {
        if (bgAudio) {
            bgAudio.play().then(() => {
                if (musicDisc) musicDisc.classList.add('playing');
                if (musicBtn) musicBtn.classList.add('playing');
            }).catch((err) => {
                console.log("Playback blocked or waiting for user interaction:", err);
            });
        }
    }

    function pauseAudioTrack() {
        if (bgAudio) {
            bgAudio.pause();
            if (musicDisc) musicDisc.classList.remove('playing');
            if (musicBtn) musicBtn.classList.remove('playing');
        }
    }

    function toggleAudio() {
        if (bgAudio) {
            if (bgAudio.paused) {
                playAudioTrack();
            } else {
                pauseAudioTrack();
            }
        }
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleAudio();
        });
    }

    // Update play state if audio naturally plays/pauses
    if (bgAudio) {
        bgAudio.addEventListener('play', () => {
            if (musicDisc) musicDisc.classList.add('playing');
            if (musicBtn) musicBtn.classList.add('playing');
        });
        bgAudio.addEventListener('pause', () => {
            if (musicDisc) musicDisc.classList.remove('playing');
            if (musicBtn) musicBtn.classList.remove('playing');
        });
    }

    /* ==========================================
       1. INTRO CURTAIN OPENING (MÀN CHÀO MỪNG)
       ========================================== */
    const introCurtain = document.getElementById('introCurtain');
    const openCurtainBtn = document.getElementById('openCurtainBtn');

    function openCurtain() {
        if (!introCurtain || introCurtain.classList.contains('opened')) return;
        introCurtain.classList.add('opened');

        // Play exact song: Người Gieo Mầm Xanh
        playAudioTrack();

        // Trigger welcome fireworks burst & flower hearts
        setTimeout(() => {
            triggerFireworksBurst();
            createHeartBurst();
        }, 500);
    }

    if (openCurtainBtn) {
        openCurtainBtn.addEventListener('click', openCurtain);
    }

    /* ==========================================
       2. SWIPEABLE NAVIGATION PILLS (MƯỢT MÀ - KHÔNG GIẬT)
       ========================================== */
    const navScroll = document.getElementById('navPillsScroll');
    const navPills = document.querySelectorAll('.nav-pill');

    // Drag-to-scroll on desktop mouse
    if (navScroll) {
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        navScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            navScroll.style.cursor = 'grabbing';
            startX = e.pageX - navScroll.offsetLeft;
            scrollLeft = navScroll.scrollLeft;
        });

        navScroll.addEventListener('mouseleave', () => {
            isDown = false;
            navScroll.style.cursor = 'grab';
        });

        navScroll.addEventListener('mouseup', () => {
            isDown = false;
            navScroll.style.cursor = 'grab';
        });

        navScroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            const x = e.pageX - navScroll.offsetLeft;
            const walk = (x - startX) * 1.5;
            navScroll.scrollLeft = scrollLeft - walk;
        });
    }

    // Smooth Click Scroll for nav pills (Dừng đúng vị trí chuẩn nhờ scroll-margin-top)
    navPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = pill.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });

                navPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                // Cuộn horizontal bên trong thanh menu mà KHÔNG đụng tới window scroll
                if (navScroll) {
                    const pillOffset = pill.offsetLeft - (navScroll.clientWidth / 2) + (pill.clientWidth / 2);
                    navScroll.scrollTo({ left: pillOffset, behavior: 'smooth' });
                }
            }
        });
    });

    // ScrollSpy to highlight active nav pill (KHÔNG làm giật hay kéo trang lên đỉnh)
    const sections = [
        { id: '#heroSection', el: document.getElementById('heroSection') },
        { id: '#meaningSection', el: document.getElementById('meaningSection') },
        { id: '#gallerySection', el: document.getElementById('gallerySection') },
        { id: '#feature1', el: document.getElementById('feature1') },
        { id: '#poemsSection', el: document.getElementById('poemsSection') },
        { id: '#wishesSection', el: document.getElementById('wishesSection') },
        { id: '#emotionsSection', el: document.getElementById('emotionsSection') },
        { id: '#envelopeSection', el: document.getElementById('envelopeSection') },
        { id: '#finaleSection', el: document.getElementById('finaleSection') },
        { id: '#footerSection', el: document.getElementById('footerSection') }
    ];

    let isScrollingTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(isScrollingTimeout);
        isScrollingTimeout = setTimeout(() => {
            let currentSectionId = '';
            const scrollPos = window.pageYOffset + 240;

            sections.forEach(sec => {
                if (sec.el && sec.el.offsetTop <= scrollPos) {
                    currentSectionId = sec.id;
                }
            });

            if (currentSectionId) {
                navPills.forEach(pill => {
                    if (pill.getAttribute('href') === currentSectionId) {
                        if (!pill.classList.contains('active')) {
                            navPills.forEach(p => p.classList.remove('active'));
                            pill.classList.add('active');

                            // Chỉ cuộn menu ngang nhẹ nhàng
                            if (navScroll) {
                                const pillOffset = pill.offsetLeft - (navScroll.clientWidth / 2) + (pill.clientWidth / 2);
                                navScroll.scrollTo({ left: pillOffset, behavior: 'smooth' });
                            }
                        }
                    }
                });
            }
        }, 90);
    });

    /* ==========================================
       3. WEBGL (OPENGL) SHADER AURA ENGINE
       ========================================== */
    const webglCanvas = document.getElementById('webglCanvas');
    if (webglCanvas) {
        const gl = webglCanvas.getContext('webgl') || webglCanvas.getContext('experimental-webgl');
        if (gl) {
            function resizeWebGL() {
                webglCanvas.width = window.innerWidth;
                webglCanvas.height = window.innerHeight;
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            }
            window.addEventListener('resize', resizeWebGL);
            resizeWebGL();

            const vsSource = `
                attribute vec2 position;
                void main() {
                    gl_Position = vec4(position, 0.0, 1.0);
                }
            `;

            const fsSource = `
                precision mediump float;
                uniform vec2 u_resolution;
                uniform float u_time;
                uniform vec2 u_mouse;

                void main() {
                    vec2 st = gl_FragCoord.xy / u_resolution.xy;
                    st.x *= u_resolution.x / u_resolution.y;

                    vec2 mouse = u_mouse / u_resolution;
                    float dist = distance(st, mouse);

                    float wave1 = sin(st.x * 3.0 + u_time * 0.8) * 0.5 + 0.5;
                    float wave2 = cos(st.y * 3.5 - u_time * 0.6) * 0.5 + 0.5;
                    float combined = sin(wave1 + wave2 + u_time * 0.5);

                    vec3 color1 = vec3(1.0, 0.75, 0.85);
                    vec3 color2 = vec3(0.95, 0.45, 0.65);
                    vec3 color3 = vec3(1.0, 0.85, 0.55);

                    vec3 finalColor = mix(color1, color2, combined * 0.5);
                    finalColor += color3 * (0.15 / (dist + 0.6));

                    gl_FragColor = vec4(finalColor, 0.35);
                }
            `;

            function createShader(gl, type, source) {
                const shader = gl.createShader(type);
                gl.shaderSource(shader, source);
                gl.compileShader(shader);
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    gl.deleteShader(shader);
                    return null;
                }
                return shader;
            }

            const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
            const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

            if (vertexShader && fragmentShader) {
                const program = gl.createProgram();
                gl.attachShader(program, vertexShader);
                gl.attachShader(program, fragmentShader);
                gl.linkProgram(program);

                if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
                    gl.useProgram(program);

                    const positionBuffer = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                        -1.0, -1.0,
                         1.0, -1.0,
                        -1.0,  1.0,
                        -1.0,  1.0,
                         1.0, -1.0,
                         1.0,  1.0
                    ]), gl.STATIC_DRAW);

                    const positionLocation = gl.getAttribLocation(program, 'position');
                    gl.enableVertexAttribArray(positionLocation);
                    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

                    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
                    const timeLocation = gl.getUniformLocation(program, 'u_time');
                    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

                    let mouseX = window.innerWidth / 2;
                    let mouseY = window.innerHeight / 2;

                    window.addEventListener('mousemove', (e) => {
                        mouseX = e.clientX;
                        mouseY = window.innerHeight - e.clientY;
                    });

                    let startTime = performance.now();
                    function renderWebGL() {
                        const currentTime = (performance.now() - startTime) * 0.001;
                        gl.uniform2f(resolutionLocation, webglCanvas.width, webglCanvas.height);
                        gl.uniform1f(timeLocation, currentTime);
                        gl.uniform2f(mouseLocation, mouseX, mouseY);

                        gl.drawArrays(gl.TRIANGLES, 0, 6);
                        requestAnimationFrame(renderWebGL);
                    }
                    renderWebGL();
                }
            }
        }
    }

    /* ==========================================
       4. PETALS CANVAS ENGINE (HOA RƠI)
       ========================================== */
    const petalsCanvas = document.getElementById('petalsCanvas');
    const petalsCtx = petalsCanvas.getContext('2d');

    let width = petalsCanvas.width = window.innerWidth;
    let height = petalsCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = petalsCanvas.width = window.innerWidth;
        height = petalsCanvas.height = window.innerHeight;
    });

    const petalColors = [
        { r: 232, g: 67, b: 147, a: 0.85 },
        { r: 214, g: 48, b: 49, a: 0.85 },
        { r: 255, g: 117, b: 140, a: 0.9 },
        { r: 212, g: 175, b: 55, a: 0.8 },
        { r: 183, g: 21, b: 64, a: 0.85 }
    ];

    class Petal {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = -20 - Math.random() * 100;
            this.size = 9 + Math.random() * 12;
            this.speedY = 1.2 + Math.random() * 2.2;
            this.speedX = -1 + Math.random() * 2;
            this.angle = Math.random() * Math.PI * 2;
            this.angularSpeed = (Math.random() - 0.5) * 0.03;
            this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
            this.oscillationSpeed = 0.02 + Math.random() * 0.03;
            this.oscillationDistance = 20 + Math.random() * 40;
            this.initialX = this.x;
            this.step = Math.random() * 100;
        }

        update() {
            this.step += this.oscillationSpeed;
            this.x = this.initialX + Math.sin(this.step) * this.oscillationDistance;
            this.y += this.speedY;
            this.angle += this.angularSpeed;

            if (this.y > height + 20) {
                this.reset();
            }
        }

        draw() {
            petalsCtx.save();
            petalsCtx.translate(this.x, this.y);
            petalsCtx.rotate(this.angle);

            petalsCtx.beginPath();
            petalsCtx.moveTo(0, -this.size / 2);
            petalsCtx.bezierCurveTo(
                this.size / 2, -this.size,
                this.size, this.size / 3,
                0, this.size
            );
            petalsCtx.bezierCurveTo(
                -this.size, this.size / 3,
                -this.size / 2, -this.size,
                0, -this.size / 2
            );

            petalsCtx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`;
            petalsCtx.fill();
            petalsCtx.restore();
        }
    }

    const petals = [];
    const petalCount = Math.min(Math.floor(window.innerWidth / 15), 65);
    for (let i = 0; i < petalCount; i++) {
        petals.push(new Petal());
    }

    function animatePetals() {
        petalsCtx.clearRect(0, 0, width, height);
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });
        requestAnimationFrame(animatePetals);
    }
    animatePetals();

    /* ==========================================
       5. FIREWORKS CANVAS ENGINE
       ========================================== */
    const fwCanvas = document.getElementById('fireworksCanvas');
    const fwCtx = fwCanvas.getContext('2d');
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        fwCanvas.width = window.innerWidth;
        fwCanvas.height = window.innerHeight;
    });

    let fireworks = [];
    let particles = [];

    class Firework {
        constructor(sx, sy, tx, ty) {
            this.x = sx;
            this.y = sy;
            this.sx = sx;
            this.sy = sy;
            this.tx = tx;
            this.ty = ty;
            this.distanceToTarget = Math.hypot(tx - sx, ty - sy);
            this.distanceTraveled = 0;
            this.coordinates = [];
            this.coordinateCount = 3;
            while (this.coordinateCount--) {
                this.coordinates.push([this.x, this.y]);
            }
            this.angle = Math.atan2(ty - sy, tx - sx);
            this.speed = 3;
            this.acceleration = 1.04;
            this.brightness = Math.random() * 40 + 50;
        }

        update(index) {
            this.coordinates.pop();
            this.coordinates.unshift([this.x, this.y]);
            this.speed *= this.acceleration;
            const vx = Math.cos(this.angle) * this.speed;
            const vy = Math.sin(this.angle) * this.speed;
            this.distanceTraveled = Math.hypot(this.x - this.sx, this.y - this.sy);

            if (this.distanceTraveled >= this.distanceToTarget) {
                createParticles(this.tx, this.ty);
                fireworks.splice(index, 1);
            } else {
                this.x += vx;
                this.y += vy;
            }
        }

        draw() {
            fwCtx.beginPath();
            fwCtx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
            fwCtx.lineTo(this.x, this.y);
            fwCtx.strokeStyle = 'hsl(' + Math.random() * 360 + ', 100%, ' + this.brightness + '%)';
            fwCtx.lineWidth = 2.5;
            fwCtx.stroke();
        }
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.coordinates = [];
            this.coordinateCount = 5;
            while (this.coordinateCount--) {
                this.coordinates.push([this.x, this.y]);
            }
            this.angle = Math.random() * Math.PI * 2;
            this.speed = Math.random() * 10 + 1;
            this.friction = 0.95;
            this.gravity = 1;
            this.hue = Math.random() * 360;
            this.brightness = Math.random() * 60 + 30;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.01;
        }

        update(index) {
            this.coordinates.pop();
            this.coordinates.unshift([this.x, this.y]);
            this.speed *= this.friction;
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed + this.gravity;
            this.alpha -= this.decay;

            if (this.alpha <= this.decay) {
                particles.splice(index, 1);
            }
        }

        draw() {
            fwCtx.beginPath();
            fwCtx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
            fwCtx.lineTo(this.x, this.y);
            fwCtx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
            fwCtx.lineWidth = 2.5;
            fwCtx.stroke();
        }
    }

    function createParticles(x, y) {
        let particleCount = 65;
        while (particleCount--) {
            particles.push(new Particle(x, y));
        }
    }

    function animateFireworks() {
        fwCtx.globalCompositeOperation = 'destination-out';
        fwCtx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        fwCtx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);
        fwCtx.globalCompositeOperation = 'source-over';

        let i = fireworks.length;
        while (i--) {
            fireworks[i].draw();
            fireworks[i].update(i);
        }

        let j = particles.length;
        while (j--) {
            particles[j].draw();
            particles[j].update(j);
        }

        requestAnimationFrame(animateFireworks);
    }
    animateFireworks();

    function triggerFireworksBurst() {
        const count = 5;
        for (let k = 0; k < count; k++) {
            setTimeout(() => {
                const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 400;
                const targetX = Math.random() * window.innerWidth;
                const targetY = Math.random() * (window.innerHeight * 0.5);
                fireworks.push(new Firework(startX, window.innerHeight, targetX, targetY));
            }, k * 300);
        }
    }

    const fireworksBtn = document.getElementById('fireworksBtn');
    if (fireworksBtn) {
        fireworksBtn.addEventListener('click', triggerFireworksBurst);
    }

    /* ==========================================
       6. FLOATING HEARTS BURST SYSTEM
       ========================================== */
    function createHeartBurst() {
        const heartIcons = ['💖', '🌸', '🌹', '✨', '💐', '❤️'];
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.bottom = '-30px';
            heart.style.fontSize = (1.3 + Math.random() * 1.5) + 'rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.transition = `transform ${2.5 + Math.random() * 2}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 3s ease`;
            
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.style.transform = `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
                heart.style.opacity = '0';
            }, 50);

            setTimeout(() => {
                heart.remove();
            }, 4500);
        }
    }

    const heartsBurstBtn = document.getElementById('heartsBurstBtn');
    if (heartsBurstBtn) {
        heartsBurstBtn.addEventListener('click', createHeartBurst);
    }

    /* ==========================================
       7. INTERACTIVE SECRET ENVELOPE
       ========================================== */
    const envelope = document.getElementById('envelopeWrapper')?.querySelector('.envelope');
    if (envelope) {
        envelope.addEventListener('click', () => {
            envelope.classList.toggle('open');
            if (envelope.classList.contains('open')) {
                createHeartBurst();
            }
        });
    }

    /* ==========================================
       8. 3D TILT EFFECT ON CARDS
       ========================================== */
    const tiltCards = document.querySelectorAll('.photo-frame, .grand-photo-frame');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 16;
            const rotateY = (centerX - x) / 16;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    /* ==========================================
       9. SMOOTH SCROLL BUTTON
       ========================================== */
    const scrollDownBtn = document.getElementById('scrollDownBtn');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            const targetSection = document.getElementById('meaningSection');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    /* ==========================================
       10. INTERACTIVE IMAGE LIGHTBOX MODAL (XEM ẢNH PHÓNG TO)
       ========================================== */
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCaption = document.getElementById('modalCaption');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalBackdrop = document.getElementById('modalBackdrop');

    function openImageModal(imgSrc, title, caption) {
        if (!imageModal || !modalImage) return;
        modalImage.src = imgSrc;
        modalTitle.textContent = title || "Hình ảnh kỷ niệm 20/10";
        modalCaption.textContent = caption || "";
        imageModal.classList.add('active');
        imageModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Ngăn cuộn nền khi xem ảnh
    }

    function closeImageModal() {
        if (!imageModal) return;
        imageModal.classList.remove('active');
        imageModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeImageModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeImageModal);
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageModal && imageModal.classList.contains('active')) {
            closeImageModal();
        }
    });

    // Bắt sự kiện nhấn các nút xem ảnh trong mục "Tri ân & Cảm xúc từ Q.Hoàng"
    const photoViewBtns = document.querySelectorAll('.btn-view-photo');
    photoViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const imgSrc = btn.getAttribute('data-img');
            const title = btn.getAttribute('data-title');
            const caption = btn.getAttribute('data-caption');
            openImageModal(imgSrc, title, caption);
        });
    });

    // Bắt sự kiện nhấn vào các thẻ ảnh trong Bộ Sưu Tập 4 Ảnh
    const galleryWrappers = document.querySelectorAll('.gallery-img-wrapper');
    galleryWrappers.forEach(wrap => {
        wrap.addEventListener('click', () => {
            const imgSrc = wrap.getAttribute('data-img');
            const title = wrap.getAttribute('data-title');
            const caption = wrap.getAttribute('data-caption');
            openImageModal(imgSrc, title, caption);
        });
    });

    // Cho phép nhấn trực tiếp vào ảnh các Cô giáo áo dài trên trang để phóng to
    const featureImg = document.querySelector('.feature-img');
    if (featureImg) {
        featureImg.addEventListener('click', () => {
            openImageModal(
                'images/giao_vien_ao_dai.jpg',
                'Tập Thể Quý Cô Giáo Áo Dài Vàng',
                'Nét đẹp duyên dáng, dịu dàng và rạng ngời tri thức của các Cô giáo – Ngày 20/10'
            );
        });
    }

    // Cho phép nhấn trực tiếp vào ảnh tập thể nhà trường trên trang để phóng to
    const grandImg = document.querySelector('.grand-img');
    if (grandImg) {
        grandImg.addEventListener('click', () => {
            openImageModal(
                'images/tap_the_truong.jpg',
                'Tập Thể Trung Tâm GDNN - GDTX Quận 12',
                'Lễ Khai Giảng & Kỷ Niệm Năm Học Mới Cùng Ngày Phụ Nữ Việt Nam 20/10'
            );
        });
    }

});
