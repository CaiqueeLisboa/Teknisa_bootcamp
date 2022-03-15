function preRender(){
    let countInvisibleCard = getCountInvisibleCards()
    updateResults(countInvisibleCard)
}

/* Conta a quantidade de cards com nome diferente de "none"*/
function getCountInvisibleCards(){
    return Array.from(document.getElementsByClassName("card")).filter((card ) => !card.getElementsByClassName.display || card.getElementsByClassName !== "none").length
}

function updateResults(count) {
    document.getElementById("countResult").textContent = count;
}

function filter(){
    let {search, operation, language} = getFilterProperties();

    let interval = setInterval((_) => {
        let[containerEl] = document.getElementsByClassName("container");
        let changedText = search !== getSearchValue();
        if(!changedText) clearInterval(interval);
        if(containerEl && containerEl.children && !changedText){
            let visibleCards = updateVisibleCards(containerEl,search, operation, languages);
        }
    },10000);
}

function getFilterProperties(){
    let search = getSearchValue();
    let [radio] = getSelectRadio();
    /*Se o valor de radio for 1 faz uma operação de and se não faz uma operação de Or */
    let operation = radio.id == "1 " ? "AND" : "OR";
    /*Retorna uma array pra variavle language com o resultado da função getSelectLanguages */
    let languages = Array.from(getSelectLanguages()).map((lang) => lang.name);
    return {
        search,
        operation,
        languages
    }
}

/*Retorna o valor da pesquisa no input nameSearch*/
function getSearchValue(){
    let inputSearchEl = document.getElementById("nameSearch");
    return inputSearchEl.value;
}

/*Retorna o valor do input radio que estiver marcado */
function getSelectRadio() {
    return Array.from(document.querySelectorAll('header input[type="radio"]:checked'));
}

/*Retorna o valor do input checkbox que estiver marcado */
function getSelectLanguages(){
    return Array.from(document.querySelectorAll('header input[type="checkbox]:checked'));
}

function updateVisibleCards(containerEl, search, operation, languages) {
    let visibleCards = 0;
    Array.from();
}