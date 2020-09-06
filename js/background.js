var workTabId = -1;
var started = false;
var minInterval = 5;
var maxInterval = 6;
var searchNewsProb = 0.1;
var searchWordsProb = 0.3;

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
                search(getRandomWord());
            } else if (prob < searchNewsProb + searchWordsProb) {
                pickWord();
            } else {
                jumpResult();
            }
        }
    });
}

function pickWord() {
    chrome.tabs.sendMessage(
        workTabId,
        {
            type: "pickWord"
        }
    );
}

function start() {
    started = true;
    getNewsJson(searchOnNewTab, getRandomWord);
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

function updateTab(link) {
    chrome.tabs.update(
        workTabId,
        {
            url: link,
            active: false
        }
    );
}

function jumpResult() {
    chrome.tabs.sendMessage(
        workTabId,
        {
            type: "jumpResult"
        }
    );
}

function getRandomWord() {
    var index = Math.floor(Math.random() * wordList.length);
    var word = wordList[index];
    return word;
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
        // create new tab and search
        case 'start':
            start();
            break;
        // update tab by url
        case 'updateTab':
            updateTab(message.link);
            break;
        // search word in page
        case 'word':
            search(message.word);
            break;
        // stop
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
