import '../scss/MySlider.scss';
import EventObserver from './EventObserver';
import crtEl from './createElement';

class MySlider {
  constructor(parent, slides = [], options = {}) {
    this.root = parent;
    this.slidesEl = [];
    this.slides = slides;
    
    this.curSlideIndex = 0;
    this.length = this.slides.length;

    this.width = options.width || '100%';
    this.height = options.height || '550px';

    this.auto = options.auto || false;
    this.speed = options.speed || 2500;
    this.forward  = true;

    this.sliderEndObserver = new EventObserver;

    this.init();    
  }

  init() {

    // set dimentions of the main slider window
    this.root.style.width = this.width;
    this.root.style.height = this.height;

    // create DOM element for each slide 
    this.slides.forEach((slide, index) => {
      this.slidesEl.push(crtEl({
        element: 'div',
        classNames: `move-right slide slide${index + 1}`,
        // textContent: slide,
        parent: this.root
      }));
    });

    this.slidesEl[0].classList.remove('move-right');

    // setup images as a background of each slide
    this.slidesEl.forEach((slideEl, index) => slideEl.style.backgroundImage = `url(${this.slides[index]})`);

    // checking if slider is set in auto-rotate mode
    if(this.auto) { this.autoRotate()} 
    else {

     const btnLeftEl = crtEl({
        element: 'div',
        classNames: 'btn-left',
        parent: this.root
      });

     const btnRightEl = crtEl({
        element: 'div',
        classNames: 'btn-right',
        parent: this.root
      });

      btnLeftEl.addEventListener('click', () => { this.previousSlide() });
      btnRightEl.addEventListener('click', () => { this.nextSlide() });
    } 

  }

  previousSlide() {

    if (this.curSlideIndex > 0) {
      const curSlide = this.slidesEl[this.curSlideIndex];
      const prvSlide = this.slidesEl[this.curSlideIndex - 1];

      this.curSlideIndex--;
      curSlide.classList.add('move-right');
      prvSlide.classList.remove('move-left');
    }
  }

  nextSlide() {

    if (this.curSlideIndex < this.length - 1) {
      const curSlide = this.slidesEl[this.curSlideIndex];
      const nextSlide = this.slidesEl[this.curSlideIndex + 1];

      this.curSlideIndex++;
      curSlide.classList.add('move-left');
      nextSlide.classList.remove('move-right');

      if(this.curSlideIndex === this.length - 1)
      this.sliderEndObserver.broadcast(this.curSlideIndex);

    }    
  }

  autoRotate() {
    setInterval(() => {

      if(this.curSlideIndex === 0)
        this.forward = true;

      if(this.curSlideIndex === this.length - 1) 
        this.forward = false;
      
      if(this.forward) 
        this.nextSlide();
      else  
        this.previousSlide();    

    }, this.speed);
  }
}

export default MySlider;