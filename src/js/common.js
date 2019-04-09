import MySlider from './MySlider.js';

window.onload = function () {

  new MySlider(slider1, [
    './asserts/img/1.jpg',
    './asserts/img/2.jpg',
    './asserts/img/3.jpg',
    './asserts/img/4.jpg'],
    {
      width: '100%',
      height: '450px',
      auto: true,
    });

  new MySlider(slider2, [
    './asserts/img/1.jpg',
    './asserts/img/2.jpg',
    './asserts/img/3.jpg',
    './asserts/img/4.jpg'],
    {
      width: '850px',
      height: '400px',
      auto: false,
    });
}
