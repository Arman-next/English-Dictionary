const main = document.querySelector("main");
const input = document.querySelector(".inputword input");
const inputPara = document.querySelector(".inputword p");
const answer = document.querySelector(".answer");
const item1 = document.querySelector(".item1");
const item1P = document.querySelector(".item1 span");
const item2P = document.querySelector(".item2 span");
const item4P = document.querySelector(".item4 span");

const getTheApi = async function (Inputword) {
  try {
    inputPara.innerHTML = `<p>Searching for the word : <span>"${Inputword}"</span></p>`;
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${Inputword}`
    );
    const data = await res.json();
    console.log(data);

    answer.classList.remove("hide");
    const phonetics = `<span>${data[0].meanings[0].partOfSpeech} ${
      data[0].phonetics[0].text ? data[0].phonetics[0].text : ""
    }</span>`;
    item1.innerText = data[0].word;
    item1.insertAdjacentHTML("beforeend", phonetics);
    item2P.innerText = `${data[0].meanings[0].definitions[0].definition}`;

    item4P.innerText = "";
    for (let i = 0; i < 5; i++) {
      const synonym = `${
        data[0].meanings[0].synonyms[i] ? data[0].meanings[0].synonyms[i] : ""
      }  `;
      item4P.insertAdjacentHTML("beforeend", synonym);
    }
  } catch (err) {
    console.log(err);
  }
};

input.addEventListener("keyup", function (e) {
  if (e.key === "Enter" && e.target.value) {
    getTheApi(e.target.value);
    // answer.classList.remove(".hide");
  }
});
