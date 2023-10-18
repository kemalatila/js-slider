var sliderContainers = document.querySelectorAll('.slider-container');
var sliderContainer = document.querySelector('.slider-container');
var slidesContainer = document.querySelector('.slides-container');
var navigationBar = document.getElementById('navigation-bar');
var slideElements = Array.from(slidesContainer.children);
var numSlides = slideElements.length;
slideElements.forEach(function (slide, index) {
    slide.addEventListener('click', function () {
        var scrollPosition = slide.clientWidth * index;
        sliderContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });
    var navigationItem = document.createElement('div');
    navigationItem.classList.add('navigation-item');
    navigationItem.addEventListener('click', function () {
        var scrollPosition = (slide.clientWidth * index) - (slide.clientWidth / 2);
        sliderContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });
    navigationBar.appendChild(navigationItem);
    var updateNavigation = function () {
        var scrollPosition = sliderContainer.scrollLeft;
        var currentIndex = Math.floor((scrollPosition + (slide.clientWidth / 2)) / slide.clientWidth);
        if (index === currentIndex) {
            navigationItem.classList.add('active');
        }
        else {
            navigationItem.classList.remove('active');
        }
        /* Navigation Bar Totally Scrolled */
        var isTotallyScrolled = Math.abs(sliderContainer.scrollWidth - sliderContainer.clientWidth - sliderContainer.scrollLeft) < 1;
        if (isTotallyScrolled) {
            if (index + 1 == numSlides) {
                navigationItem.classList.add('active');
            }
            else {
                navigationItem.classList.remove('active');
            }
        }
        /* Navigation Bar Totally Scrolled --> */
    };
    sliderContainer.addEventListener('scroll', updateNavigation);
    updateNavigation();
});
sliderContainers.forEach(function (slider) {
    var isDown = false;
    var startX;
    var scrollLeft;
    slider.addEventListener('mousedown', function (e) {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', function () {
        isDown = false;
    });
    slider.addEventListener('mouseup', function () {
        isDown = false;
    });
    slider.addEventListener('mousemove', function (e) {
        if (!isDown)
            return;
        e.preventDefault();
        var x = e.pageX - slider.offsetLeft;
        var walk = (x - startX) * 3; // You can adjust the scroll speed here
        slider.scrollLeft = scrollLeft - walk;
    });
    // Touch Events for Mobile
    slider.addEventListener('touchstart', function (e) {
        isDown = true;
        startX = e.touches[0].clientX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('touchend', function () {
        isDown = false;
    });
    slider.addEventListener('touchcancel', function () {
        isDown = false;
    });
    slider.addEventListener('touchmove', function (e) {
        if (!isDown)
            return;
        e.preventDefault();
        var x = e.touches[0].clientX - slider.offsetLeft;
        var walk = (x - startX) * 3; // You can adjust the scroll speed here
        slider.scrollLeft = scrollLeft - walk;
    });
});
if (sliderContainer.scrollWidth <= sliderContainer.clientWidth) {
    var navigationBar_1 = document.getElementById('navigation-bar');
    navigationBar_1.style.display = 'none';
}
