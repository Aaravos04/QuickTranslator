"use strict";
const selectTag = document.querySelectorAll("select");
const textArea = document.querySelectorAll("textarea");
const fromInput = textArea[0];
const toOutput = textArea[1];

selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected  = false;
        if (id == 0 && country_code === "en-GB" ||
            id == 1 && country_code === "hi-IN")
            selected = true;

        let option = `<option value="${country_code}"${selected ? " selected" : ""}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

fromInput.addEventListener("input", () => {
    let content = fromInput.value;
    let fromLang = selectTag[0].value;
    let toLang = selectTag[1].value;
    
    let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${content}`;
    fetch(url)
    .then(res => res.json())
    .then(data => toOutput.value = data[0][0][0])
    .catch(err => toOutput.value = "");
});
