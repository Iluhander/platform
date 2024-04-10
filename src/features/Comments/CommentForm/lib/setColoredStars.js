// Function for coloring stars.
export default function setColoredStars(rating) {
  const starsElem = document.getElementById('commentStars');
  for (let i = 0; i < 5; i += 1) {
    if (i < rating) {
      starsElem.children[i].style = 'filter: grayscale(0)';
    } else {
      starsElem.children[i].style = 'filter: grayscale(1)';
    }
  }
}
