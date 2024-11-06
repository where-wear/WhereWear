export function enableHorizontalScroll(element) {
  let isDown = false;
  let startX;
  let scrollLeft;

  element.addEventListener('mousedown', (e) => {
    isDown = true;
    element.classList.add('active');
    startX = e.pageX - element.offsetLeft;
    scrollLeft = element.scrollLeft;
  });

  element.addEventListener('mouseleave', () => {
    isDown = false;
    element.classList.remove('active');
  });

  element.addEventListener('mouseup', () => {
    isDown = false;
    element.classList.remove('active');
  });

  element.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - element.offsetLeft;
    const walk = (x - startX) * 2; //스크롤 속도 조절
    element.scrollLeft = scrollLeft - walk;
  });

  element.addEventListener('wheel', (e) => {
    e.preventDefault(); // 기본 세로 스크롤 방지
    element.scrollLeft += e.deltaY * 2; // 스크롤 속도를 조절하고 가로로 이동
  });
}
