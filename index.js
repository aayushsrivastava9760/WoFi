const searchBtn = document.getElementById("searchBtn");
const inputWord = document.getElementById("word");

const wordBlock = document.getElementById("wordBlock");
const messageBlock = document.getElementById("messageBlock");

const wordTitle = document.getElementById("wordTitle");
const wordPhonetic = document.getElementById("wordPhonetic");
const wordMeaning = document.getElementById("wordMeaning");
const message = document.getElementById("message")

const searchedWordTemplate = {
    word : "",
    phonetic : "",
    meaning : "",
    example : ""
}

const getWord = () => {
    return inputWord.value;
}

const getPhonetic = (data) => {
    return data[0].phonetic;
}

const getMeaning = (data) => {
    return data[0].meanings[0].definitions[0].definition;
}

const updateSearchedWordTemplate = (data) => {
    searchedWordTemplate.word = getWord();
    searchedWordTemplate.phonetic = getPhonetic(data);
    searchedWordTemplate.meaning = getMeaning(data);
}

const updateWordMeaning = () => {
    wordMeaning.innerText = searchedWordTemplate.meaning;
}

const updateWordTitle = () => {
    wordTitle.innerText = searchedWordTemplate.word;
}

const updateWordPhonetic = () => {
    wordPhonetic.innerText = searchedWordTemplate.phonetic;
}

const displayData = (data) => {
    updateSearchedWordTemplate(data);
        
    updateWordTitle();
    updateWordPhonetic();
    updateWordMeaning();

    wordBlock.style.display = "block";
}

const updateErrorMessage = (data) => {
    message.innerText = data.message;
    messageBlock.style.display = "block";
}

const displayErrorMessage = (data) => {
    updateErrorMessage(data);
}

const isWordFound = (data) => {
    return !(data.message);
}

const resetBlocks = () => {
    wordBlock.style.display = "none";
    messageBlock.style.display = "none";
}

const searchWord = async () => {

    resetBlocks();

    try {
        const word = getWord();
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await res.json();

        if(isWordFound(data)){
            displayData(data);
        }else{
            displayErrorMessage(data);
        }

    } catch (error) {
        throw new Error("Something went wrong ...");
    }
}

searchBtn.addEventListener('click', () => {
    console.log("click event")
    searchWord();
});