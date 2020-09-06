function start() {
    chrome.runtime.sendMessage({
        type: 'start'
    });
    // search("random");
};

// jump to result
function jumpResult() {
    chrome.runtime.sendMessage({
        type: 'jumpResult'
    });
    
}

document.getElementById('start').addEventListener('click', start);
document.getElementById('jumpResult').addEventListener('click', jumpResult);

function testPopup() {
    search('123456');
}