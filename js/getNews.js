const proxyUrl = "https://cors-anywhere.herokuapp.com/"
const apiKey = "ogb1lIh5fdk0AgzY2YbNJdzZyaCE0W6o";
const url = `${proxyUrl}https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`;
const request = new Request(url);

function getNewsJson() {
    fetch(request)
        .then(response => response.json())
        .then((news) => {
            // console.log(news);
            // console.log(news['results']['1']['abstract'].split(' '));
            // console.log(news['results']['1']['title'].split(' '));
            const wordSet = parseWords(news)
            // parseWords(news);
            console.log(wordSet);
        })
        .catch(error => {
            console.log(error);
        });
}

function parseWords(news) {
    const words = []
    for (const item of news['results']) {
        const abstract = item['abstract'].slice(0, -1);
        for (const word of abstract.split(' ')) {
            words.push(word.toLowerCase());
        }
        title = item['title'].slice(0, -1);
        for (const word of title.split(' ')) {
            words.push(word.toLowerCase());
        }
    }
    const wordSet = new Set(words);
    return wordSet;
}

function testGetNews() {
    getNewsJson();
}
