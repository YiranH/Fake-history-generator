
// go to on google search results
function pickLink() {
    var links = [];
    var linksElement = document.links;
    for (var i = 0; i < linksElement.length; i++) {
        var link = linksElement[i].href;

        // check if it is a search result
        if (isValidLink(link)) {
            // push into links
            links.push(link);
        }
    }

    var index = Math.floor(Math.random() * links.length);
    chrome.runtime.sendMessage({
        type: 'updateTab',
        link: links[index]
    });
}

// check if it is a search result
function isValidLink(link) {
    return link.startsWith('http') && !link.includes('google');
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
        case 'pickLink':
            pickLink();
            break;
        // pick a word from webpage
        case 'pickWord':
            pickWord();
    }
});


function testContent() {
    goToSearchResults()
}