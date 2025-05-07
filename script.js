




  
  const nav = document.querySelector('.main-nav');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });



  function openPopup(index) {
    const popup = document.getElementById("popup");
    const overlay = document.querySelector(".popup-overlay");
    const data = projects[index];
    document.getElementById("popup-title").textContent = data.title;
    document.getElementById("popup-img").src = data.img;
    document.getElementById("popup-description").textContent = data.desc;

    popup.style.display = "block";
    overlay.style.display = "block";
  }

  function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.querySelector(".popup-overlay").style.display = "none";
  }
  
  


