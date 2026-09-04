/* ============================================================
   SCOUT WEBSITE — script.js
   ============================================================ */

/* ── 1. Load Google Fonts dynamically ── */
(function loadFonts() {
  var link = document.createElement('link');
  link.rel  = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap';
  document.head.appendChild(link);
})();


/* ── 2. Ripple effect on card click ── */
(function initRipple() {
  var cards = document.querySelectorAll('.card');

  cards.forEach(function(card) {
    card.addEventListener('click', function(e) {
      /* Create ripple element */
      var ripple = document.createElement('span');
      ripple.style.cssText = [
        'position:absolute',
        'border-radius:50%',
        'width:12px',
        'height:12px',
        'background:rgba(110,211,163,0.4)',
        'left:50%',
        'top:50%',
        'transform:translate(-50%,-50%) scale(0)',
        'animation:rippleAnim 0.6s ease-out forwards',
        'pointer-events:none',
        'z-index:30'
      ].join(';');

      var inner = card.querySelector('.card-inner');
      if (inner) {
        inner.appendChild(ripple);
        setTimeout(function() { ripple.remove(); }, 700);
      }
    });
  });

  /* Inject ripple keyframe into <head> once */
  var style = document.createElement('style');
  style.textContent = '@keyframes rippleAnim { to { transform: translate(-50%,-50%) scale(32); opacity:0; } }';
  document.head.appendChild(style);
})();


/* ── 3. Floating particles (home page only) ── */
(function initParticles() {
  if (!document.body.classList.contains('home-page')) return;

  var container = document.createElement('div');
  container.setAttribute('aria-hidden', 'true');
  container.style.cssText = [
    'position:fixed',
    'inset:0',
    'pointer-events:none',
    'z-index:0',
    'overflow:hidden'
  ].join(';');
  document.body.insertBefore(container, document.body.firstChild);

  /* Inject particle keyframe */
  var style = document.createElement('style');
  style.textContent = [
    '@keyframes floatUp {',
    '  0%   { transform:translateY(100vh) scale(0); opacity:0; }',
    '  10%  { opacity:1; }',
    '  90%  { opacity:1; }',
    '  100% { transform:translateY(-8vh) scale(1); opacity:0; }',
    '}'
  ].join('');
  document.head.appendChild(style);

  for (var i = 0; i < 20; i++) {
    (function(index) {
      var p   = document.createElement('div');
      var size = Math.random() * 5 + 2;
      p.style.cssText = [
        'position:absolute',
        'border-radius:50%',
        'background:rgba(110,211,163,0.18)',
        'width:'  + size + 'px',
        'height:' + size + 'px',
        'left:'   + (Math.random() * 100) + '%',
        'animation:floatUp ' + (Math.random() * 14 + 7) + 's linear ' + (Math.random() * 12) + 's infinite'
      ].join(';');
      container.appendChild(p);
    })(i);
  }
})();


/* ── 4. Scroll-reveal for inner page sections ── */
(function initScrollReveal() {
  if (!document.body.classList.contains('inner-page')) return;
  if (!window.IntersectionObserver) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  var items = document.querySelectorAll('.knot-card, .law-item');
  items.forEach(function(el, i) {
    /* Start hidden — reveal on scroll */
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(18px)';
    el.style.transition = 'opacity 0.5s ease ' + (i * 0.06) + 's, transform 0.5s ease ' + (i * 0.06) + 's';
    observer.observe(el);
  });
})();


/* ── 5. Active state helper for touch devices ── */
(function initTouchActive() {
  var cards = document.querySelectorAll('.card');
  cards.forEach(function(card) {
    card.addEventListener('touchstart', function() {
      card.style.transform = 'scale(0.96)';
    }, { passive: true });
    card.addEventListener('touchend', function() {
      card.style.transform = '';
    });
  });
})();

