const apiKey = "ogb1lIh5fdk0AgzY2YbNJdzZyaCE0W6o";
const url = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=' + apiKey;
var wordList = [];

function getNewsJson(searchOnNewTab, getRandomWord) {
    $.get(url, function (data, status) {
        if (status === 'success') {
            wordList = parseWords(data);
            var word = getRandomWord();
            searchOnNewTab(word);
        } else {
            console.log(data);
        }
    });
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
