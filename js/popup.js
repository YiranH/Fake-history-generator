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

document.getElementById('start').addEventListener('click', start);

function testPopup() {
    search('123456');
}