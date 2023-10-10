// Note: I followed some functional programming practices for fun. These include: recursively filtering, currying, and closures.
// I'm not a functional programmer and haven't quite grasped how to make it reasonable / clean / organized. I'm sure there are better ways to do this.

const getGif = () => {
  const staringGifs = ['stare1.webp', 'stare2.webp', 'stare3.webp', 'stare4.webp', 'stare5.webp', 'stare6.webp', 'stare7.webp', 'stare8.webp', 'stare9.webp', 'stare10.webp'];
  const staticGifs = ['static1.webp', 'static2.webp', 'static3.webp'];

  const gifs = {
    staring: staringGifs,
    static: staticGifs
  }

  const checkAvailability = (type) => {
    return gifs[type].length > 0;
  }
  
  const getRandomGif = (type) => {
    if (!checkAvailability(type)) {
      gifs[type] = type === 'static' ? staticGifs : staringGifs
    }
    const randomIndex = getRandomIndex(gifs[type]);
    const currentGif = gifs[type][randomIndex];
  
    removeUsedGif(type)(currentGif);
    return currentGif;
  }
  
  const removeUsedGif = (type) => (currentGif) => {
    gifs[type] = recursivelyFilter(gif => gif !== currentGif)(gifs[type]);
  }

  const getRandomIndex = (array) => {
    return Math.floor(Math.random() * array.length);
  }

  return getRandomGif;
}

const recursivelyFilter = (callback) => (array) => {
  if (array.length === 0) return [];
  const firstItem = array[0];
  const filteredFirst = callback(firstItem) ? [firstItem] : [];
  return filteredFirst.concat(recursivelyFilter(callback, array.slice(1)));
}

const body = document.querySelector('body');

function changeBackground(type) {
  body.style.backgroundImage = `url(./gifs/${getGif()(type)}`;
  body.style.backgroundSize = 'cover';
}

function play() {
  setTimeout(() => changeBackground('static'), 5000);
  setTimeout(() => changeBackground('staring'), 500);
}

function initialize() {
  play();
  setInterval(play, 5500);
}

initialize();

