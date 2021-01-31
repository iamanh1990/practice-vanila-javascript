const videoElement = document.querySelector("#video");
const button = document.querySelector("#button");

//Prompt to select media stream, pass to video element, then play
const selectMediaStream = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.log("errors: ", error);
  }
};

button.addEventListener("click", async () => {
  //Disable button
  button.disabled = true;
  //start picture in picture
  await videoElement.requestPictureInPicture();
  //Reset button
  button.disabled = false;
});

//onload
selectMediaStream();
