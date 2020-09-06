var tabId = -1;
var started = false;
var min = 2;
var max = 5;

function searchOnNewTab(query) {
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
    jumpResult();
}

function start() {
    started = true;
    searchOnNewTab('random');
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
            // search('123456');
            start();
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

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.id === tabId && started) {
        var interval = Math.floor(Math.random() * (max - min + 1) + min);
        setTimeout(run, interval * 1000);
    }
});

