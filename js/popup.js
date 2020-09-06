// open a google search tab
function search(query) {
    chrome.tabs.create({
        url: "http://google.com/search?q=" + query,
        active: false
    });
}

function start() {
    search("random");
};

// tell content to jump to result
function jumpResult() {
    chrome.tabs.query(
        {active: true, currentWindow: true}, 
        function(tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id, 
                {
                    type:"jumpResult"
                }
        );
    });
}

document.getElementById('start').addEventListener('click', start);
document.getElementById('jumpResult').addEventListener('click', jumpResult);

function testPopup() {
    search('123456');
}