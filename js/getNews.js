// function addScript() {
//     document.write("<script type='text/javascript' src='/js/stopWords.js'></script>");
// }

// const proxyUrl = "https://cors-anywhere.herokuapp.com/"
const apiKey = "ogb1lIh5fdk0AgzY2YbNJdzZyaCE0W6o";
const url = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=' + apiKey;
var wordList = [];


// var myHeaders = new Headers();
// const request = new Request(url, {
//     method: 'GET',
//     headers: myHeaders,
//     mode: 'cors',
//     cache: 'default'
// });

function getNewsJson(searchOnNewTab, getRandomWord) {
    $.get(url, function (data, status) {
        if (status === 'success') {
            //         wordSet = parseWords(data);
            //     } else {
            //         console.log(request);
            //     }
            wordList = parseWords(data);
            var word = getRandomWord();
            searchOnNewTab(word);
        } else {
            console.log(data);
        }
    });
    // var request = new XMLHttpRequest()
    // request.open('GET', url, false);
    // request.onload = function () {
    //     // Begin accessing JSON data here
    //     var data = JSON.parse(this.response)

    //     if (request.status >= 200 && request.status < 400) {
    //         wordSet = parseWords(data);
    //     } else {
    //         console.log(request);
    //     }
    // }
    // request.send()

    // fetch(request)
    //     .then(response => response.json())
    //     .then((news) => {
    //         wordSet = parseWords(news);
    //         console.log(wordSet);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
}

function parseWords(news) {
    var words = new Set();
    var stopWordSet = getStopWords();
    for (const item of news['results']) {
        const abstract = item['abstract'].slice(0, -1);
        for (var word of abstract.split(' ')) {
            if (!stopWordSet.has(word)) {
                word = word.toLowerCase()
                words.add(word);
            }
        }
        const title = item['title'].slice(0, -1);
        for (var word of title.split(' ')) {
            if (!stopWordSet.has(word)) {
                word = word.toLowerCase()
                words.add(word);
            }
        }
    }
    return Array.from(words);
}

function testGetNews() {
    getNewsJson();
}
