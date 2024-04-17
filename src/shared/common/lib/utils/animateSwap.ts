export default function animateSwap(el0: any, el1: any, e1Display: string, time = 600) {
  if (el0.classList?.contains('opacityAppear')) {
    clearTimeout(el0.timeout);
    el0.classList.remove("opacityAppear");
    el0.style.animationSpeed = time / 2;
    el0.classList.add("opacityDisappear");
  }

  if (el1.classList?.contains('opacityDisappear')) {
    clearTimeout(el1.timeout);
    el1.classList.remove("opacityDisappear");
    el1.style.animationSpeed = time / 2;
    el1.classList.add("opacityAppear");
  }

  if (el1.classList?.contains('opacityAppear')) {
    return;
  }
  
  el0.style.animationSpeed = time / 2;
  el0.classList.add("opacityDisappear");
  el0.timeout = setTimeout(() => {
    el0.classList.remove("opacityDisappear");
    el0.style.display = 'none';

    el1.style.display = e1Display;
    el1.style.animationSpeed = time / 2;
    el1.classList.add("opacityAppear");
    el1.timeout = setTimeout(() => el1.classList.remove("opacityAppear"), time / 2);
  }, time / 2);
}
