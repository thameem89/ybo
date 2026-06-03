document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     STICKY HEADER & SCROLL EFFECTS
     ========================================== */
  const header = document.getElementById('main-header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initially


  /* ==========================================
     MOBILE NAVIGATION MENU
     ========================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const toggleMenu = () => {
    navMenu.classList.toggle('open');
    const icon = mobileToggle.querySelector('i');
    if (navMenu.classList.contains('open')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  };

  mobileToggle.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });


  /* ==========================================
     ACTIVE NAVIGATION LINK HIGHLIGHTING
     ========================================== */
  const sections = document.querySelectorAll('section');
  
  const activeLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px' // Trigger active state when section is centered
  });

  sections.forEach(section => {
    activeLinkObserver.observe(section);
  });


  /* ==========================================
     MENU FILTER LOGIC (WITH TRANSITIONS)
     ========================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active button state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      menuCards.forEach(card => {
        // Prepare fade out transition
        card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.92) translateY(8px)';

        setTimeout(() => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            // Reflow trigger for transition
            card.offsetHeight;
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          } else {
            card.style.display = 'none';
          }
        }, 250);
      });
    });
  });


  /* ==========================================
     INQUIRY FORM SUBMISSION & MODAL POPUP
     ========================================== */
  const inquiryForm = document.getElementById('inquiry-form');
  const popupModal = document.getElementById('popup-modal');
  const closeModalBtn = document.getElementById('close-modal');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect data (for simulation)
      const data = {
        name: document.getElementById('form-name').value,
        email: document.getElementById('form-email').value,
        phone: document.getElementById('form-phone').value,
        subject: document.getElementById('form-subject').value,
        message: document.getElementById('form-message').value
      };

      console.log('Form Inquiry Data Submitted:', data);

      // Show success modal popup
      popupModal.classList.add('show');

      // Reset form
      inquiryForm.reset();
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      popupModal.classList.remove('show');
    });
  }

  // Close modal when clicking outside content
  popupModal.addEventListener('click', (e) => {
    if (e.target === popupModal) {
      popupModal.classList.remove('show');
    }
  });


  /* ==========================================
     SCROLL REVEAL FALLBACK FOR OLDER BROWSERS
     ========================================== */
  // Feature detect Scroll-Driven Animations support
  if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    console.log('Scroll-driven timelines are not natively supported. Applying JS IntersectionObserver fallback.');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          // Once animated, stop observing
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px' // Reveal slightly before crossing viewport
    });

    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    scrollRevealElements.forEach(el => {
      // Set initial styles for fallback
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      revealObserver.observe(el);
    });
  }

});
