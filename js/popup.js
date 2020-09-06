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

// stop
function stop() {
    chrome.runtime.sendMessage({
        type: 'stop'
    });
}

document.getElementById('start').addEventListener('click', start);
document.getElementById('jumpResult').addEventListener('click', jumpResult);
document.getElementById('stop').addEventListener('click', stop);

function testPopup() {
    search('123456');
}