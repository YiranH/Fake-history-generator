chrome.runtime.onInstalled.addListener(function () {
    console.log("Hello World!");
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message.type);
    if (message.type === 'updateTab') {
        chrome.tabs.update(
            sender.tab.id,
            {
                url: message.link,
                active: false
            }
        );
    }
});
