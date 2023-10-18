const sliderContainers = document.querySelectorAll<HTMLElement>('.slider-container');
const sliderContainer = document.querySelector('.slider-container') as HTMLElement;
const slidesContainer = document.querySelector('.slides-container') as HTMLElement;
const navigationBar = document.getElementById('navigation-bar') as HTMLElement;

const slideElements = Array.from(slidesContainer.children) as HTMLElement[];
const numSlides = slideElements.length;

slideElements.forEach((slide, index) => {
  slide.addEventListener('click', () => {
    const scrollPosition = slide.clientWidth * index;
    sliderContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  });
  
  const navigationItem = document.createElement('div');
  navigationItem.classList.add('navigation-item');
  navigationItem.addEventListener('click', () => {
    const scrollPosition = (slide.clientWidth * index)- (slide.clientWidth / 2);
    sliderContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  });
  navigationBar.appendChild(navigationItem);
  
  const updateNavigation = () => {
    const scrollPosition = sliderContainer.scrollLeft;
    const currentIndex = Math.floor((scrollPosition + (slide.clientWidth / 2)) / slide.clientWidth);
    if (index === currentIndex) {
      navigationItem.classList.add('active');
    } else {
      navigationItem.classList.remove('active');
    }
    
    /* Navigation Bar Totally Scrolled */ 
    const isTotallyScrolled =
    Math.abs(sliderContainer.scrollWidth - sliderContainer.clientWidth - sliderContainer.scrollLeft) < 1;
    
    if (isTotallyScrolled) {
      if(index +1 == numSlides){
        navigationItem.classList.add('active');
        
      }else{
        navigationItem.classList.remove('active');
      }
    }
    /* Navigation Bar Totally Scrolled --> */
    
  };
  
  sliderContainer.addEventListener('scroll', updateNavigation);
  updateNavigation();
});






sliderContainers.forEach(slider => {
  let isDown = false;
  let startX;
  let scrollLeft;
  
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  
  slider.addEventListener('mouseleave', () => {
    isDown = false;
  });
  
  slider.addEventListener('mouseup', () => {
    isDown = false;
  });
  
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; // You can adjust the scroll speed here
    slider.scrollLeft = scrollLeft - walk;
  });
  
  // Touch Events for Mobile
  slider.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].clientX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  
  slider.addEventListener('touchend', () => {
    isDown = false;
  });
  
  slider.addEventListener('touchcancel', () => {
    isDown = false;
  });
  
  slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].clientX - slider.offsetLeft;
    const walk = (x - startX) * 3; // You can adjust the scroll speed here
    slider.scrollLeft = scrollLeft - walk;
  });
  
});



if (sliderContainer.scrollWidth <= sliderContainer.clientWidth) {
  const navigationBar = document.getElementById('navigation-bar');
  navigationBar.style.display = 'none';
}