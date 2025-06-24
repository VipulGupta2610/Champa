
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Speak function
function speak(text) {
  window.speechSynthesis.cancel();
  let voices = window.speechSynthesis.getVoices();
  let speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-GB";
  speech.voice = voices.find(v => v.lang === "en-GB") || voices[0];
  window.speechSynthesis.speak(speech);
}

// Greeting based on time
function wishMe() {
  let hour = new Date().getHours();
  if (hour >= 0 && hour < 12) {
    speak("Good morning sir");
  } else if (hour >= 12 && hour < 16) {
    speak("Good afternoon sir");
  } else {
    speak("Good evening sir");
  }
}

// Command handler
function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";
  message = message.toLowerCase();
  if (message.includes("hello")) {
    speak("Hello sir, what can I help you with?");
  } else if (message.includes("how are you")) {
    speak("I am fine sir, thank you!");
  } else if (message.includes("what time is it")) {
    let time = new Date().toLocaleTimeString();
    speak("The time is " + time);
  } else if (message.includes("open youtube")) {
    speak("opening youtube..")
    window.open("https://www.youtube.com")
  }
 else if (message.includes("who are you")) {
    speak("i am champa , a virtual assistant , created by vipul sir")
  }
  // else if (){
  //   speak("Sorry, I didn't understand that.");

  // }
  else  {
    if( window.open(`https://www.google.com/search?q=${message}`)){
    speak(`this is what i have found on internet regarding ${message}`);
    window.open(`https://www.google.com/search?q=${message}`);
    } else{ 
         speak("Sorry, I didn't understand that.");
    }
  }
}

// Check browser support
if ('webkitSpeechRecognition' in window) {
  let recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-GB";

  recognition.onstart = () => {
    content.innerText = "Listening...";
  };

  recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript;
    content.innerText = "You said: " + transcript;
    takeCommand(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    if (event.error === 'not-allowed') {
      content.innerText = "Microphone access is denied. Please allow it in your browser settings.";
    } else if (event.error === 'audio-capture') {
      content.innerText = "No microphone detected or in use by another application.";
    } else {
      content.innerText = "Error occurred: " + event.error;
    }
  };

  recognition.onend = () => {
    content.innerText += "\nClick the button to speak again.";
  };

  btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
  });

  // Greet on page load
  window.addEventListener("load", () => {
    setTimeout(wishMe(), 100)
  });

} else {
  btn.disabled = true;
  content.innerText = "Your browser does not support Speech Recognition.";
}