const music = document.getElementById("backgroundMusic");
const button = document.getElementById("musicButton");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);

    return `${min}:${String(sec).padStart(2, "0")}`;
}

// PLAY AND PAUSE

button.addEventListener("click", async () => {

    if (music.paused) {

        try {
            await music.play();

            button.textContent = "Ⅱ";
            button.setAttribute("aria-label", "Jeda musik");

        } catch (error) {

            alert("Periksa file musik kamu.");

        }

    } else {

        music.pause();

        button.textContent = "▶";
        button.setAttribute("aria-label", "Putar musik");

    }

});

// LOAD SONG DURATION

music.addEventListener("loadedmetadata", () => {

    duration.textContent = formatTime(music.duration);

});

// UPDATE PROGRESS

music.addEventListener("timeupdate", () => {

    currentTime.textContent = formatTime(music.currentTime);

    if (Number.isFinite(music.duration) && music.duration > 0) {

        progress.value =
            (music.currentTime / music.duration) * 100;

    }

});

// SEEK SONG

progress.addEventListener("input", () => {

    if (Number.isFinite(music.duration)) {

        music.currentTime =
            (progress.value / 100) * music.duration;

    }

});

// RESET BUTTON WHEN SONG ENDS

music.addEventListener("ended", () => {

    button.textContent = "▶";
    button.setAttribute("aria-label", "Putar musik");

});