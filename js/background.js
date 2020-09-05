// open a google search tab
function search(query) { 
    window.open(
      "http://google.com/search?q=" + query,
      "_blank"  
    );
}

function main() {
  search(456);
}