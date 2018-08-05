export default function Parallax(){
  var moon = document.querySelector('#moon'),
    man = document.querySelector('#man');

  window.addEventListener('mousemove', function(e) {
    var pageX = e.clientX,
      pageY = e.clientY;
    moon.style.webkitTransform = 'translateX(' + pageX / 1000 + '%) translateY(' + pageY / 1000 + '%)';
    moon.style.transform = 'translateX(' + pageX / 1000 + '%) translateY(' + pageY / 1000 + '%)';
    man.style.webkitTransform = 'translateX(' + pageX / 150 + '%) translateY(' + pageY / 250 + '%)';
    man.style.transform = 'translateX(' + pageX / 150 + '%) translateY(' + pageY / 250 + '%)';
  });
}