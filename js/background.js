var workTabId = -1;
var started = false;
var minInterval = 5;
var maxInterval = 6;
var searchNewsProb = 0.1;
var jumpProb = 0.5;

function searchOnNewTab(query) {
    chrome.tabs.create(
        {
            url: "http://google.com/search?q=" + query,
            active: false
        },
        function (tab) {
            workTabId = tab.id;
        }
    );
}

function search(query) {
    chrome.tabs.update(
        workTabId,
        {
            url: "http://google.com/search?q=" + query,
            active: false
        }
    );
}

function run() {
    var prob = Math.random();
    if (prob < searchNewsProb) {
        search('123456');
    } else {
        jumpResult();
    }
}

function start() {
    started = true;
    searchOnNewTab('random');
}

function jumpResult() {
    chrome.tabs.sendMessage(
        workTabId, 
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
            start();
            break;
        // jump to search result
        case 'jumpResult':
            jumpResult();
            break;
        // update tab by url
        case 'updateTab':
            chrome.tabs.update(
                workTabId,
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

// search or jump every certain amount of time
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tabId === workTabId && started) {
        var interval = Math.floor(Math.random() * (maxInterval - minInterval + 1) + minInterval);
        setTimeout(run, interval * 1000);
    }
});

