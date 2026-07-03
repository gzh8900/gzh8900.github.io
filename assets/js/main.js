/* ===== Particle Canvas Background ===== */
const canvas = document.getElementById('hero-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null, radius: 120 };
  let animationId = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 80);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += dx / dist * force * 3;
          p.y += dy / dist * force * 3;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    animationId = requestAnimationFrame(draw);
  }

  canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  resize();
  draw();
  window.addEventListener('resize', resize);
}

/* ===== Scroll Reveal Animations ===== */
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach((el) => observer.observe(el));

/* ===== Mobile Nav Toggle ===== */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const navOverlay = document.getElementById('nav-overlay');

function toggleNav(open) {
  if (navToggle) navToggle.classList.toggle('active', open);
  if (navLinks) navLinks.classList.toggle('open', open);
  if (navOverlay) navOverlay.classList.toggle('show', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    toggleNav(!isOpen);
  });
}
if (navOverlay) {
  navOverlay.addEventListener('click', () => toggleNav(false));
}

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => toggleNav(false));
});

/* ===== Navbar Scroll Effect ===== */
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = scrollY;
});

/* ===== Contact Form ===== */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    const submitBtn = contactForm.querySelector('.form-submit');
    const successMsg = document.getElementById('form-success');
    const formFields = contactForm.querySelector('.form-fields');

    submitBtn.disabled = true;
    submitBtn.textContent = '发送中...';

    setTimeout(() => {
      submitBtn.style.display = 'none';
      formFields.style.display = 'none';
      successMsg.classList.add('show');
    }, 1200);
  });
}
/* ===== Back to Top ===== */
const backTop = document.getElementById('backTop');
if (backTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backTop.classList.add('visible');
    } else {
      backTop.classList.remove('visible');
    }
  });
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== Reading Progress Bar ===== */
const progressBar = document.getElementById('readingProgress');
if (progressBar) {
  const fill = progressBar.querySelector('.rp-fill');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    fill.style.width = progress + '%';
  });
}
