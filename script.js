const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
const year = document.querySelector('#year');
const desktopMedia = window.matchMedia('(min-width: 901px)');

if (year) year.textContent = new Date().getFullYear();

const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
};

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

document.addEventListener('click', (event) => {
  if (menuButton.getAttribute('aria-expanded') !== 'true') return;
  if (navigation.contains(event.target) || menuButton.contains(event.target)) return;
  closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || menuButton.getAttribute('aria-expanded') !== 'true') return;
  closeMenu();
  menuButton.focus();
});

const handleDesktopChange = (event) => {
  if (event.matches) closeMenu();
};

if (desktopMedia.addEventListener) desktopMedia.addEventListener('change', handleDesktopChange);
else desktopMedia.addListener(handleDesktopChange);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  },
  { rootMargin: '-25% 0px -65% 0px' },
);

sections.forEach((section) => sectionObserver.observe(section));
