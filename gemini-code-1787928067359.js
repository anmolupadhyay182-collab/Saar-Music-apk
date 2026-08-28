/* ==========================================================================
   SAAR MUSIC - INTERACTIVE SCRIPT
   Author: Anmol Upadhyay
   Features: Mobile Drawer, Smooth Scroll, Sticky Header, Accordion
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Element References
  const navbarHeader = document.querySelector('.navbar-header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const faqQuestions = document.querySelectorAll('.faq-question');

  /* --------------------------------------------------------------------------
     1. Sticky Navbar Glassmorphism Effect on Scroll
     -------------------------------------------------------------------------- */
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbarHeader.classList.add('scrolled');
    } else {
      navbarHeader.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check on load

  /* --------------------------------------------------------------------------
     2. Mobile Hamburger Menu Toggle
     -------------------------------------------------------------------------- */
  const toggleMobileMenu = () => {
    const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  };

  const closeMobileMenu = () => {
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.classList.remove('active');
    navMenu.classList.remove('active');
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  /* --------------------------------------------------------------------------
     3. Smooth Scroll & Close Menu on Link Click
     -------------------------------------------------------------------------- */
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          closeMobileMenu();

          const navHeight = 72;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  /* --------------------------------------------------------------------------
     4. FAQ Accordion Toggle
     -------------------------------------------------------------------------- */
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isOpen = faqItem.classList.contains('active');

      // Close all other open FAQ accordion items
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
          const btn = item.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current FAQ item
      if (isOpen) {
        faqItem.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
      } else {
        faqItem.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
});