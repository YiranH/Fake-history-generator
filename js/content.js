
// go to on google search results
function goToSearchResults() {
    var links = [];
    var linksElement = document.links;
    for (var i = 0; i < linksElement.length; i++) {
        var link = linksElement[i].href;
        console.log('link: ' + link);

        // check if it is a search result
        if (isSearchResult(link)) {
            // push into links
            links.push(link);
        }
    }
    randomJump(links);
}

// check if it is a search result
function isSearchResult(link) {
    return link.startsWith('http') && !link.includes('google');
}

// random jump to a link in a list of links
function randomJump(links) {
    var index = Math.floor(Math.random() * links.length);
    var link = links[index];
    chrome.runtime.sendMessage({
        type: 'updateTab',
        link: link
    });
}

function pickWord() {
    var text = document.body.innerText;
    var words = text.split(' ');
    var wordsSet = new Set();
    var stopWords = getStopWords();
    for (var word of words) {
        if (!stopWords.has(word)) {
            word = word.toLowerCase();
            wordsSet.add(word);
        }
    }
    var wordsForQuery = Array.from(wordsSet);
    var index = Math.floor(Math.random() * wordsForQuery.length);
    chrome.runtime.sendMessage({
        type: 'word',
        word: wordsForQuery[index]
    });

}


// return link or word to background
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
        // jump to a link
        case 'jumpResult':
            goToSearchResults();
            break;
        // pick a word from webpage
        case 'pickWord':
            pickWord();
    }
});


function testContent() {
    goToSearchResults()
}