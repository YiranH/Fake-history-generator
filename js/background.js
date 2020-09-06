var tabId = -1;

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

chrome.runtime.onInstalled.addListener(function () {
    console.log("Hello World!");
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message.type);
    switch(message.type) {
        // create new tab and search
        case 'start':
            search('123456');
            break;
        // jump to search result
        case 'jumpResult':
            chrome.tabs.sendMessage(
                tabId, 
                {
                    type:"jumpResult"
                }
            );
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
    }
    console.log('tabId' + tabId);
});

