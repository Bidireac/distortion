const auth = '563492ad6f91700001000001aeb2fbbcd1af4ee68c7efbe3c6e9e751';
const pictureContainer = document.querySelector('.picture-container');
const randomizeBtn = document.getElementById('randomizeBtn');
const randomizeIcon = document.getElementById('randomizeIcon');
const zoom = document.getElementById('zoom');
const zoomIcon = document.getElementById('zoomIcon');
const distortion = document.querySelector('.distortion');

let page = 0;
let step = 0;
let hEff;
let counter = 0;
let arrEff = [];

async function getRandomPhoto() {
  page++;
  const dataFetch = await fetch(
    `https://api.pexels.com/v1/curated?per_page=2&page=${page}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: auth,
      },
    }
  );
  const data = await dataFetch.json();
  photo1 = data.photos[0].src.large;
  photo2 = data.photos[1].src.large;

  if (distortion.childNodes[1]) {
    distortion.childNodes[0].remove();
  }

  hEff = new hoverEffect({
    parent: distortion,
    indensity: 0.2,
    image1: photo1,
    image2: photo2,
    hover: false,
    displacementImage: './stripe1.png',
  });

  arrEff.push(hEff);
}

randomizeBtn.addEventListener('click', (e) => {
  e.preventDefault;
  randomizeIcon.classList.remove('randomize');
  void randomizeIcon.offsetWidth;
  randomizeIcon.classList.add('randomize');
  step++;
  if (step > 1) {
    distortion.classList.add('fadedImg');
    arrEff[counter] = null;
    step = 0;
    counter++;
    getRandomPhoto();
  } else {
    distortion.classList.remove('fadedImg');
    arrEff[counter].next();
  }
});

getRandomPhoto();

let zoomActivated = false;

zoom.addEventListener('click', () => {
  zoomActivated = !zoomActivated;
  if (zoomIcon.classList.contains('fa-search-plus')) {
    zoomIcon.classList.remove('fa-search-plus');
    zoomIcon.classList.add('fa-search-minus');
    distortion.style.cursor = 'zoom-out';
  } else {
    zoomIcon.classList.remove('fa-search-minus');
    zoomIcon.classList.add('fa-search-plus');
    distortion.style.cursor = 'zoom-in';
  }
});

pictureContainer.addEventListener('click', () => {
  zoomActivated = !zoomActivated;
  if (zoomActivated === true) {
    distortion.style.cursor = 'zoom-out';
  } else {
    distortion.style.cursor = 'zoom-in';
  }
});

distortion.addEventListener('mousemove', (e) => {
  const { clientX: x, clientY: y } = e;
  if (zoomActivated) {
    pictureContainer.style.transform = 'scale(3)';
    pictureContainer.style.transformOrigin = `${x - 500}px ${y - 100}px`;
  } else {
    pictureContainer.style.transform = 'none';
  }
});
