
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
    console.log('links: ' + JSON.stringify(links));
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

// when receiving jumpResult from pupup window, jump to result
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'jumpResult') {
        goToSearchResults();
    }
});


function testContent() {
    goToSearchResults()
}