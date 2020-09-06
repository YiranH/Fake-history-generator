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
    chrome.tabs.get(workTabId, function (tab) {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
            stop();
        } else {
            var prob = Math.random();
            if (prob < searchNewsProb) {
                search('123456');
            } else {
                jumpResult();
            }
        }
    });
}

function start() {
    started = true;
    searchOnNewTab('random');
}

function stop() {
    started = false;
    chrome.tabs.get(workTabId, function (tab) {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
        } else {
            chrome.tabs.remove(workTabId);
        }
    });
}

function jumpResult() {
    chrome.tabs.sendMessage(
        workTabId,
        {
            type: "jumpResult"
        }
    );
}

function searchNews() {
    var word = getRandomWord();
    search(word);
}

function getRandomWord() {
    getNewsJson();
    console.log(wordList);
    var index = Math.floor(Math.random() * wordList.length);
    // var index = 0;
    var word = wordList[index];
    return word;
}

chrome.runtime.onInstalled.addListener(function () {
    console.log("Hello World!");
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message.type);
    switch (message.type) {
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
            stop();
    }
});

// search or jump every certain amount of time
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tabId === workTabId && started) {
        var interval = Math.floor(Math.random() * (maxInterval - minInterval + 1) + minInterval);
        setTimeout(run, interval * 1000);
    }
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    if (tabId === workTabId) {
        started = false;
    }
})
