'use strict';

// Boş bırakıldığında örnek veya uydurma bir adrese yönlendirme yapılmaz.
const siteSettings = {
  email: 'aykocmustafakaan@outlook.com',
  name: 'Mustafa Kaan Aykoç'
};

const select = (selector, root = document) => root.querySelector(selector);
const selectAll = (selector, root = document) => [...root.querySelectorAll(selector)];

// 1. Açık/koyu tema; tercih sadece bu tarayıcıda saklanır.
const themeButton = select('.theme-toggle');
const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)');
let savedTheme;
try { savedTheme = localStorage.getItem('mka-theme'); } catch (_) { /* Yerel dosyalarda depolama kapalı olabilir. */ }

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  themeButton.setAttribute('aria-pressed', String(isDark));
  themeButton.setAttribute('aria-label', isDark ? 'Açık temaya geç' : 'Koyu temaya geç');
  select('meta[name="theme-color"]').content = isDark ? '#101e25' : '#f6f7f3';
}
setTheme(savedTheme || (preferredTheme.matches ? 'dark' : 'light'));
themeButton.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  savedTheme = nextTheme;
  try { localStorage.setItem('mka-theme', nextTheme); } catch (_) { /* Tema yine de değişir. */ }
});
preferredTheme.addEventListener('change', event => { if (!savedTheme) setTheme(event.matches ? 'dark' : 'light'); });

// 2. Mobil menü; bağlantı seçimi ve Escape tuşu menüyü kapatır.
const menuButton = select('.menu-toggle');
const navigation = select('.main-nav');
function closeMenu(returnFocus = false) {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Menüyü aç');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
});
selectAll('a', navigation).forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('click', event => { if (!select('.site-header').contains(event.target)) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
window.matchMedia('(min-width: 961px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

// 3. Konuma göre menü vurgusu, okuma ilerlemesi ve başa dön düğmesi.
const navLinks = selectAll('a[href^="#"]', navigation);
const navSections = navLinks.map(link => select(link.getAttribute('href'))).filter(Boolean);
const progressBar = select('.reading-progress');
const backToTop = select('.back-to-top');
let scrollQueued = false;
function updateScrollState() {
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${pageHeight > 0 ? Math.min(window.scrollY / pageHeight * 100, 100) : 0}%`;
  backToTop.classList.toggle('is-visible', window.scrollY > 550);
  const marker = window.scrollY + select('.site-header').offsetHeight + 125;
  let activeId = '';
  navSections.forEach(section => { if (section.offsetTop <= marker) activeId = section.id; });
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 35) activeId = 'iletisim';
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
  scrollQueued = false;
}
function queueScrollUpdate() { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScrollState); } }
window.addEventListener('scroll', queueScrollUpdate, { passive: true });
window.addEventListener('resize', queueScrollUpdate);
window.addEventListener('load', updateScrollState);
updateScrollState();

// 4. İlgi alanlarını filtreleme. Her şey istemci tarafında çalışır.
const filterButtons = selectAll('.filter-button');
const interestCards = selectAll('.interest-card');
const interestGrid = select('.interests-grid');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  let visibleCount = 0;
  interestCards.forEach(card => {
    const isVisible = filter === 'all' || card.dataset.category === filter;
    card.hidden = !isVisible;
    if (isVisible) { visibleCount++; card.classList.add('is-revealed'); }
  });
  interestGrid.classList.toggle('is-filtered', filter !== 'all');
  select('#filter-status').textContent = `${visibleCount} ilgi alanı gösteriliyor.`;
  queueScrollUpdate();
}));

// 5. Üç fotoğraflı albüm: yön tuşları, Escape ve dokunma desteği.
const photos = [
  { src: 'assets/portre-renkli.jpg', alt: 'Mustafa Kaan Aykoç, renkli portre', caption: 'Bir an, bir bakış. — Renkli portre' },
  { src: 'assets/portre-siyah-beyaz.jpg', alt: 'Mustafa Kaan Aykoç, siyah beyaz portre', caption: 'Sade bir çerçeve. — Siyah & beyaz' },
  { src: 'assets/portre-dis-mekan.jpg', alt: 'Mustafa Kaan Aykoç, dış mekân portresi', caption: 'Hayatın içinden. — Dışarıda' }
];
const photoDialog = select('#photo-dialog');
let currentPhoto = 0;
let photoTrigger = null;
function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  const photo = photos[currentPhoto];
  select('#lightbox-image').src = photo.src;
  select('#lightbox-image').alt = photo.alt;
  select('#photo-caption').textContent = photo.caption;
  select('#photo-counter').textContent = `${String(currentPhoto + 1).padStart(2, '0')} / 03`;
}
selectAll('.gallery-item').forEach(button => button.addEventListener('click', () => {
  photoTrigger = button;
  showPhoto(Number(button.dataset.photo));
  if (typeof photoDialog.showModal === 'function') {
    photoDialog.showModal();
    document.body.classList.add('modal-open');
  } else { window.open(photos[currentPhoto].src, '_blank', 'noopener'); }
}));
select('#close-photo').addEventListener('click', () => photoDialog.close());
select('#previous-photo').addEventListener('click', () => showPhoto(currentPhoto - 1));
select('#next-photo').addEventListener('click', () => showPhoto(currentPhoto + 1));
photoDialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  if (photoTrigger) photoTrigger.focus({ preventScroll: true });
});
photoDialog.addEventListener('click', event => { if (event.target === photoDialog) {
  const bounds = photoDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) photoDialog.close();
} });
photoDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(currentPhoto - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(currentPhoto + 1); }
});
let touchStartX = null;
select('.lightbox-image-wrap').addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
select('.lightbox-image-wrap').addEventListener('touchend', event => {
  if (touchStartX !== null) {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 50) showPhoto(currentPhoto + (distance > 0 ? -1 : 1));
  }
  touchStartX = null;
}, { passive: true });

// 6. Mesaj taslağı: kişisel bilgiler sunucuya gönderilmez ve saklanmaz.
let messageDraft = '';
const form = select('#contact-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const fields = new FormData(form);
  const senderName = String(fields.get('name')).trim();
  const email = String(fields.get('email')).trim();
  const message = String(fields.get('message')).trim();
  if (!senderName || message.length < 10) {
    select('#form-status').textContent = 'Lütfen adınızı ve en az 10 karakterlik bir mesaj yazın.';
    return;
  }
  messageDraft = `Kime: ${siteSettings.name}\nGönderen: ${senderName}\nE-posta: ${email}\nKonu: ${fields.get('subject')}\n\n${message}`;
  select('#draft-text').textContent = messageDraft;
  select('#draft-result').hidden = false;
  select('#form-status').textContent = 'Taslak hazır. Metni kopyalayabilir veya TXT dosyası olarak indirebilirsiniz. Mesaj gönderilmedi.';
});
select('#copy-draft').addEventListener('click', async () => {
  let copied = false;
  try { await navigator.clipboard.writeText(messageDraft); copied = true; } catch (_) {
    const textArea = document.createElement('textarea');
    textArea.value = messageDraft;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
    textArea.remove();
    select('#copy-draft').focus();
  }
  select('#form-status').textContent = copied ? 'Mesaj taslağı kopyalandı.' : 'Kopyalama kullanılamıyor. TXT olarak indirebilir veya taslak metnini seçerek kopyalayabilirsiniz.';
});
select('#download-draft').addEventListener('click', () => {
  if (!messageDraft) return;
  const fileUrl = URL.createObjectURL(new Blob(['\uFEFF' + messageDraft], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = 'mustafa-kaan-aykoc-mesaj-taslagi.txt';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
  select('#form-status').textContent = 'Mesaj taslağı indirmeye hazırlandı.';
});
if (siteSettings.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteSettings.email)) {
  const emailLink = select('#direct-email');
  emailLink.href = `mailto:${siteSettings.email}`;
  emailLink.hidden = false;
}
select('#current-year').textContent = new Date().getFullYear();

// 7. Hafif kaydırma animasyonu; azaltılmış hareket tercihi korunur.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  selectAll('.about-grid, .principles, .university-card, .skill-card, .interest-card, .gallery-item, .contact-copy').forEach(element => {
    element.classList.add('reveal-ready');
    revealObserver.observe(element);
  });
}
