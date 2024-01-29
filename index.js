const searchBtn = document.getElementById("searchBtn");
const inputWord = document.getElementById("word");

const wordTitle = document.getElementById("wordTitle");
const wordPhonetic = document.getElementById("wordPhonetic");
const wordMeaning = document.getElementById("wordMeaning");
const wordExample = document.getElementById("wordExample");

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

const getExample = (data) => {
    return data[0].meanings[0].definitions[0].example;
}

const updateSearchedWordTemplate = (data) => {
    searchedWordTemplate.word = getWord();
    searchedWordTemplate.phonetic = getPhonetic(data);
    searchedWordTemplate.meaning = getMeaning(data);
    searchedWordTemplate.example = getExample(data);
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

const updateWordExample = () => {
    wordExample.innerText = searchedWordTemplate.example;
}

const searchWord = async () => {
    try {
        const word = getWord();
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await res.json();

        updateSearchedWordTemplate(data);
        
        updateWordTitle();
        updateWordPhonetic();
        updateWordMeaning();
        updateWordExample();
    } catch (error) {
        throw new Error("Something went wrong ...");
    }
}

searchBtn.addEventListener('click', () => {
    console.log("click event")
    searchWord();
});