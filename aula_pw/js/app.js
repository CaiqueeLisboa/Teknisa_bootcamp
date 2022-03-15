/* função que inicia o body com o resultado de pesquisa dos cards*/
function preRender(){
    let countVisibleCards = getCountVisibleCards();
    updateResults(countVisibleCards);
}

/* faz a contagem de quantos cards são visiveis */
function getCountVisibleCards(){
    return Array.from(document.getElementsByClassName("card")).filter((card) => !card.getElementsByClassName.display || card.getElementsByClassName.display !=="none").length;
}

/* Atualiza o resultado dos cards */
function updateResults(count) {
    document.getElementById("countResult").textContent = count;
}

/* Função que faz a pesquisa no container */
function filter() {
    let {search, operation, languages} = getFilterProperties();
    let interval = setInterval((_) => {
        let[containerEl] = document.getElementsByClassName("container");
        let changedText = search !== getSearchValue();
        if(!changedText) clearInterval(interval);
        if(containerEl && containerEl.children && !changedText) {
            let visibleCards = updateVisibleCards(containerEl,search,operation, languages);
            updateResults(visibleCards);
        }
    }, 1000);
}

/* Função que armazena o que foi feito nos campos de pesquisa */
function getFilterProperties() {
    let search = getSearchValue();
    let[radio] = getSelectedRadio();
    let operation = radio.id == "1" ? "AND" : "OR";
    let languages = Array.from(getSelectedLanguages()).map((lang) => lang.name);
    return {
        search,
        operation,
        languages,
    }
}

/* Função que armazena oq foi digitado no campo de busca por nome */
function getSearchValue(){
    let inputSearchEl = document.getElementById("nameSearch");
    return inputSearchEl.value;
}

function getSelectedRadio(){
    return Array.from(document.querySelectorAll('header input[type="radio"]:checked'));
}

/* Função que armazena oq foi selecionado no campo por linguagem */
function getSelectedLanguages(){
    return Array.from(document.querySelectorAll('header input[type="checkbox"]:checked'));
}

/* Função que faz a validação dos cards baseado nas pesquisas */
function updateVisibleCards(containerEl, search, operation, selectedLanguages){
    let visibleCards = 0;
    /* percorre o container */
    Array.from(containerEl.children).forEach((cardEl) => {
        /* recebe o nome do titulo do card */
        let [titleEl] = cardEl.getElementsByClassName("card-title");
        /* recebe as linguagens do card */
        let cardLanguages = Array.from(cardEl.getElementsByClassName("iconLanguage")).map((image) => image.name);
        /* Se existir um tilte no card ele começa as validações */
        if(titleEl) {
            let isMatchName = isMatchByName(titleEl.textContent, search);
            if(!isMatchName && operation == "AND"){
                hideCard(cardEl);
            } else if(isMatchName && operation == "OR") {
                showCard(cardEl);
                visibleCards++;
            } else if(isMatchName && operation == "AND"){
                let isMatchLanguage = isMatchByLanguage(cardLanguages, selectedLanguages);
                if(isMatchLanguage) {
                    showCard(cardEl);
                    visibleCards++;
                } else{
                    hideCard(cardEl);
                }
            } else if (!isMatchName && operation == "OR") {
                let isMatchLanguage = isMatchByLanguage(cardLanguages, selectedLanguages);
                if(isMatchLanguage){
                    showCard(cardEl);
                    visibleCards++;
                } else {
                    hideCard(cardEl);
                }
            }
        }
    });
    return visibleCards;
}

/* função que recebe oq foi digitado para a validação */
function isMatchByName(textCard, textInput) {
    return textCard.toLowerCase().includes(textInput.toLowerCase());
}

/* função que recebe oq foi selecionado para a validação */
function isMatchByLanguage(cardLanguages, selectedLanguages){
    return cardLanguages.some(cardLang => selectedLanguages.includes(cardLang));
}

/* função que esconde o card */
function hideCard(card) {
    card.style.display = "none";
};

/* função que mostra o card */
function showCard(card) {
    card.style.display = "flex";
}