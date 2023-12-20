const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuote = [];

//Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote

function newQuote() {
  loading();
  // Pick a random quote from apiQuote array
  const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
  // Check if Author field is "type.fit" then what
  if (quote.author === "type.fit") {
    authorText.textContent = "Unknown";
  } else {
    let authorFixed = quote.author.replace(", type.fit", "");
    authorText.textContent = authorFixed;
  }
  //   Set Quote , Hide Loader
  quoteText.textContent = quote.text;
  complete();
}
//
// Get Quote From API
async function getQuote() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuote = await response.json();
    // console.log(apiQuote[12]);
    newQuote();
  } catch (error) {
    // Catch Error here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterurl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterurl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
// On Load

getQuote();
