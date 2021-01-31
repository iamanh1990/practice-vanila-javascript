const button = document.querySelector("#button");
const audioElement = document.querySelector("#audio");
const apiKey = "c0c1c12762374919bab0ca402940524a";

//Get jokes from Joke Api
const getJokes = async () => {
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  let joke = "";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup}...${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //Text-to-speech
    tellMe(joke);
    //Disabled button
    toggleButton();
  } catch (error) {
    //Catch Errors Here
    console.log("whoops: ", error);
  }
};

//from joke to speech
const speakJoke = (joke) => {
  VoiceRSS.speech({
    key: apiKey,
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

//Disable Enable Button
const toggleButton = () => {
  button.disabled = !button.disabled;
};

//Passing the joke to VoiceCSS API
const tellMe = (joke) => {
  speakJoke(joke);
};

//Add eventlistener
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
