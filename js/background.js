var tabId = -1;
var started = false;
var min = 2;
var max = 5;

// open a google search tab
function search(query) {
    chrome.tabs.create(
        {
            url: "http://google.com/search?q=" + query,
            active: false
        },
        function (tab) {
            tabId = tab.id;
        }
    );
}

function run() {
    if (!started) {
        return;
    }

    jumpResult();
    console.log('jump result');
    var interval = Math.floor(Math.random() * (max - min + 1) + min);
    setTimeout(run, interval * 1000);
}

function jumpResult() {
    chrome.tabs.sendMessage(
        tabId, 
        {
            type:"jumpResult"
        }
    );
}

chrome.runtime.onInstalled.addListener(function () {
    console.log("Hello World!");
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message.type);
    switch(message.type) {
        // create new tab and search
        case 'start':
            started = true;
            search('123456');
            var interval = Math.floor(Math.random() * (max - min + 1) + min);
            setTimeout(run, interval * 1000);
            break;
        // jump to search result
        case 'jumpResult':
            jumpResult();
            break;
        // update tab by url
        case 'updateTab':
            chrome.tabs.update(
                tabId,
                {
                    url: message.link,
                    active: false
                }
            );
            break;
        case 'stop':
            started = false;
    }
});

