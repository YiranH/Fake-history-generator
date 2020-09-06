function start() {
    chrome.runtime.sendMessage({
        type: 'start'
    });
};

// stop
function stop() {
    chrome.runtime.sendMessage({
        type: 'stop'
    });
}

document.getElementById('start').addEventListener('click', start);
document.getElementById('stop').addEventListener('click', stop);

function testPopup() {
    search('123456');
}