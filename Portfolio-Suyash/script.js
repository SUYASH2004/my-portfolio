const startBtn = document.getElementById("start-btn");
const startScreen = document.querySelector(".start-screen");
const mainMenu = document.querySelector(".main-menu");
const menuItems = document.querySelectorAll(".main-menu li[data-screen]");
const screens = document.querySelectorAll(".screen");
const backButtons = document.querySelectorAll(".back");
const backToStart = document.getElementById("back-to-start");

// Narration box (for ORV-style messages)
const narration = document.createElement("div");
narration.className = "narration";
document.body.appendChild(narration);

function show(element) {
  element.classList.remove("hidden");
  element.classList.add("show");
}

function hide(element) {
  element.classList.remove("show");
  element.classList.add("hidden");
}

function narrate(message, callback) {
  narration.textContent = message;
  narration.classList.add("active");

  setTimeout(() => {
    narration.classList.remove("active");
    if (callback) callback();
  }, 2000); // message shows for 2s before transition
}

startBtn.addEventListener("click", () => {
  hide(startScreen);
  narrate("The First Scenario begins…", () => {
    show(mainMenu);
  });
});

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    const screenId = item.getAttribute("data-screen");
    hide(mainMenu);
    narrate(`You have chosen the path: ${screenId}`, () => {
      show(document.getElementById(screenId));
    });
  });
});

backButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    screens.forEach(screen => hide(screen)); // hide all
    narrate("Returning to the Main Menu…", () => {
      show(mainMenu);
    });
  });
});

backToStart.addEventListener("click", () => {
  hide(mainMenu);
  narrate("Exiting the Scenario…", () => {
    show(startScreen);
  });
});
