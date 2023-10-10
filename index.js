// Note: I followed some functional programming practices for fun. These include: recursively filtering, currying, and closures.
// I'm not a functional programmer and haven't quite grasped how to make it reasonable / clean / organized. I'm sure there are better ways to do this.

const getGif = () => {
  const staringGifs = ['stare1.mp4', 'stare2.mp4', 'stare3.mp4', 'stare4.mp4', 'stare5.mp4', 'stare6.mp4', 'stare7.mp4', 'stare8.mp4', 'stare9.mp4', 'stare10.mp4'];
  const staticGifs = ['static1.mp4', 'static2.mp4', 'static3.mp4', 'static4.mp4'];

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
    console.log(currentGif)
    return currentGif;
  }
  
  const removeUsedGif = (type) => (currentGif) => {
    gifs[type] = recursivelyFilter(gif => gif !== currentGif)(gifs[type]);
    console.log(gifs[type])
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
  return filteredFirst.concat(recursivelyFilter(callback)(array.slice(1)));
}

const body = document.querySelector('body');
const video = document.querySelector('video');

function changeVideo(type) {
  video.setAttribute('src', `./gifs/${getGif()(type)}`);
}

function play() {
  setTimeout(() => changeVideo('static'), 5000);
  setTimeout(() => changeVideo('staring'), 500);
}

function initialize() {
  play();
  setInterval(play, 5500);
}

initialize();

