const containerMouses = document.getElementById("containerMouses");
const containerKeyboards = document.getElementById("containerKeyboards");
const containerMicrophones = document.getElementById("containerMicrophones");
const containerGraphicCards = document.getElementById("containerGraphicCards");
const containerHeadphones = document.getElementById("containerHeadphones");

async function fetchData(link) {
  const res = await fetch(link);
  return res.json();
}

async function handleGraphicCardsData() {
  const graphicCards = await fetchData(
    "../json-integration/graphic-cards.json"
  );
  graphicCards.forEach((graphicCard) => {
    containerGraphicCards.innerHTML += `
        <div>
          <p>${graphicCard.name}</p>
          <img src="${graphicCard.img}" width="150" />
        </div>`;
  });
}

async function handleHeadphonesData() {
  const headphones = await fetchData("../json-integration/headphones.json");
  headphones.forEach((headphone) => {
    containerHeadphones.innerHTML += `
        <div>
          <p>${headphone.name}</p>
          <img src="${headphone.img}" width="150" />
        </div>`;
  });
}

async function handleKeyboardsData() {
  const keyboards = await fetchData("../json-integration/keyboards.json");
  keyboards.forEach((keyboard) => {
    containerKeyboards.innerHTML += `
          <div>
            <p>${keyboard.name}</p>
            <img src="${keyboard.img}" width="150" />
          </div>`;
  });
}

async function handleMousesData() {
  const mouses = await fetchData("../json-integration/mouses.json");
  mouses.forEach((mouse) => {
    containerMouses.innerHTML += `
            <div>
              <p>${mouse.name}</p>
              <img src="${mouse.img}" width="150" />
            </div>`;
  });
}

async function handleMicrophonesData() {
  const microphones = await fetchData("../json-integration/microphones.json");
  microphones.forEach((microphone) => {
    containerMicrophones.innerHTML += `
        <div>
          <p>${microphone.name}</p>
          <img src="${microphone.img}" width="150" />
        </div>`;
  });
}

handleGraphicCardsData();
handleHeadphonesData();
handleKeyboardsData();
handleMousesData();
handleMicrophonesData();
