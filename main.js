// Navigation scroll effect
const nav = document.querySelector('.main-nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const mainMenu = document.querySelector('.main-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mainMenu.classList.toggle('active');
    
    // Toggle hamburger animation
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// Close mobile menu when clicking on a link
const menuLinks = document.querySelectorAll('.main-menu a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mainMenu.classList.contains('active')) {
      hamburger.click();
    }
  });
});

// Popup functionality
function openPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'flex';
  
  // Small delay before adding the active class for animation
  setTimeout(() => {
    popup.classList.add('active');
  }, 10);
  
  document.body.style.overflow = 'hidden';
}

function closePopup(id) {
  const popup = document.getElementById(id);
  popup.classList.remove('active');
  
  setTimeout(() => {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 300);
}

// Close popup when clicking outside content
window.addEventListener('click', function(event) {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target.id);
  }
});

// ESC key to close popups
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const activePopups = document.querySelectorAll('.popup.active');
    activePopups.forEach(popup => {
      closePopup(popup.id);
    });
  }
});

// Make sure all popups are hidden on load
document.addEventListener("DOMContentLoaded", function() {
  // Hide all popups
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.style.display = "none";
  });
  
  // Marquee hover functionality
  const marqueeImages = document.querySelector('.marquee-images');
  if (marqueeImages) {
    const images = document.querySelectorAll('.marquee-images img');
    
    images.forEach((img) => {
      img.addEventListener('mouseenter', () => {
        marqueeImages.style.animationPlayState = 'paused';
      });
      
      img.addEventListener('mouseleave', () => {
        marqueeImages.style.animationPlayState = 'running';
      });
    });
  }
  
  // Quantity buttons for mint section
  const quantityBtns = document.querySelectorAll('.quantity-btn');
  const quantityDisplay = document.querySelector('.quantity');
  
  if (quantityBtns.length > 0 && quantityDisplay) {
    let quantity = 1;
    
    quantityBtns[0].addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
      }
    });
    
    quantityBtns[1].addEventListener('click', () => {
      if (quantity < 10) {
        quantity++;
        quantityDisplay.textContent = quantity;
      }
    });
  }
  
  // Connect wallet button
  const mintButton = document.querySelector('.mint-button');
  if (mintButton) {
    mintButton.addEventListener('click', async () => {
      try {
        // Check if ethereum is available (MetaMask)
        if (window.ethereum) {
          mintButton.textContent = 'Connecting...';
          
          // Request account access
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const account = accounts[0];
          
          // Show connected address
          const shortAddress = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
          mintButton.textContent = `Connected: ${shortAddress}`;
          
          // Here you would typically connect to your smart contract for minting
          // For now, just change the button state
          setTimeout(() => {
            mintButton.textContent = 'Mint Now';
          }, 2000);
        } else {
          alert('Please install MetaMask to connect your wallet!');
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
        mintButton.textContent = 'Connect Wallet';
      }
    });
  }
  
  // Animation for elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-section, .project, .mint-section');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if(elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for scroll animation
  document.querySelectorAll('.about-section, .project, .mint-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Run on load and scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
});

 document.addEventListener('DOMContentLoaded', function() {
      const slider = document.querySelector('.slider');
      const slides = document.querySelectorAll('.slide');
      const prevButton = document.querySelector('.prev-button');
      const nextButton = document.querySelector('.next-button');
      const dotsContainer = document.querySelector('.slider-dots');
      
      let currentIndex = 0;
      const slideCount = slides.length;
      
      // Create dots
      for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
      
      const dots = document.querySelectorAll('.slider-dot');
      
      // Update slider position
      function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
      }
      
      // Go to specific slide
      function goToSlide(index) {
        currentIndex = index;
        updateSlider();
      }
      
      // Next slide
      function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
      }
      
      // Previous slide
      function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider();
      }
      
      // Event listeners
      nextButton.addEventListener('click', nextSlide);
      prevButton.addEventListener('click', prevSlide);
      
      // Auto slide (optional)
      let slideInterval = setInterval(nextSlide, 5000);
      
      // Pause auto slide on hover
      const sliderContainer = document.querySelector('.slider-container');
      sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
      });
      
      sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
      });
      
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
      });
      
      // Add touch support for mobile
      let touchStartX = 0;
      let touchEndX = 0;
      
      sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      
      sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
      
      function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
          nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
          prevSlide();
        }
      }
    });