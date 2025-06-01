const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Speak function
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

// Greeting based on time
function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

// On page load
window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

// Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

// Command Handler
function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How may I help you?");
    }

    else if (message.includes("open google")) {
        speakAndRedirect("Opening Google...", "https://www.google.com");
    }

    else if (message.includes("open youtube")) {
        speakAndRedirect("Opening YouTube...", "https://www.youtube.com");
    }

    else if (message.includes("open facebook")) {
        speakAndRedirect("Opening Facebook...", "https://www.facebook.com");
    }

    else if (message.includes("what is") || message.includes("who is") || message.includes("what are")) {
        const url = `https://www.google.com/search?q=${message.replace(/ /g, "+")}`;
        window.open(url, "_blank");
        speak("This is what I found on the internet regarding " + message);
    }

    else if (message.includes("wikipedia")) {
        const query = message.replace("wikipedia", "").trim().replace(/ /g, "_");
        const url = `https://en.wikipedia.org/wiki/${query}`;
        window.open(url, "_blank");
        speak("This is what I found on Wikipedia regarding " + message);
    }

    else if (message.includes("time")) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const finalText = "The current time is " + time;
        speak(finalText);
        content.textContent = finalText;
    }

    else if (message.includes("date")) {
        const date = new Date().toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        const finalText = "Today's date is " + date;
        speak(finalText);
        content.textContent = finalText;
    }

    else {
        const url = `https://www.google.com/search?q=${message.replace(/ /g, "+")}`;
        window.open(url, "_blank");
        speak("I found some information for " + message + " on Google.");
    }
}

// Helper function to speak then redirect
function speakAndRedirect(text, url) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
        window.location.href = url;
    };
    window.speechSynthesis.speak(utterance);
}
