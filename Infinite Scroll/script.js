const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Helper to set attributes
const setAttribute = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};
//Check if all images were loaded
const onLoadImages = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

//Create Elements for Links and Photos
const displayPhotos = () => {
  //set imagesLoade back to zero
  imagesLoaded = 0;
  //Run function for each object
  photosArray.forEach((photo) => {
    //creat <a> to link to Unplash
    const item = document.createElement("a");
    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //create <img> for photo
    const img = document.createElement("img");
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //eventlisterner on image
    img.addEventListener("load", onLoadImages);
    //put the <img> inside the <a>, then put both inside of img container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

const updateAPIURLWithNewCount = (newCount) => {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${newCount}`;
};

//Unplash API
let isInitalLoad = true;
const initialCount = 5; //initial load, we only load 5 photos to increase UX
const apiKey = "QCtUBn6fqR47g5v97xgXPLAlN7z-tMfGNNJrIhHxUZU";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

//Get photos from Unplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    totalImages = photosArray.length;
    if (isInitalLoad) {
      updateAPIURLWithNewCount(30);
      isInitalLoad = false;
    }
  } catch (error) {
    //catch error here
    console.log(error);
  }
};

//check to see if scrolling near bottom of the page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    console.log("load more");
    ready = false;
  }
});

//On Load
getPhotos();
