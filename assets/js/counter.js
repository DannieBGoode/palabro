window.onload = function() {

  function updateCounts() {
    // Get the value of the text from the textarea
    var text = document.getElementById('message').value;
  
    // Normalize the text:
    // - Replace carriage returns and new lines with spaces
    // - Replace extra spaces with a single space
    // - Trim leading and trailing spaces
    text = text.replace(/(\r\n|\n|\r)/gm, ' ').replace(/\s+/g, ' ').trim();
  
    // Calculate Words by splitting the text by spaces. Filter words to remove any empty strings
    var words = text.split(' ').filter(word => word !== "");
    var wordCount = text.length > 0 ? words.length : 0;
  
    // Calculate Characters
    var characterCount = text.length;
  
    // Calculate Sentences by splitting the text by dots, question marks, and exclamation marks
    var sentenceCount = text.split(/[.!?]+/g).length - 1;
  
    // Calculate Paragraphs by splitting the text by double new lines
    var paragraphCount = document.getElementById('message').value.split(/\n\s*\n/g).length;
  
    // Reading Time (average reading speed is 275 words per minute)
    var readingTime = wordCount / 275;
    var readingMins = Math.floor(readingTime);
    var readingSecs = Math.floor((readingTime - readingMins) * 60);
    var readingTimeString = (readingMins > 0 ? readingMins + ' min ' : '') + readingSecs + ' secs';
  
    // Speaking Time (average speaking speed is 180 words per minute)
    var speakingTime = wordCount / 180;
    var speakingMins = Math.floor(speakingTime);
    var speakingSecs = Math.floor((speakingTime - speakingMins) * 60);
    var speakingTimeString = (speakingMins > 0 ? speakingMins + ' min ' : '') + speakingSecs + ' secs';

    // Update counts on the page
    document.querySelector('.result-words').innerHTML = wordCount;
    document.querySelector('.result-characters').innerHTML = characterCount;
    document.querySelector('.result-sentences').innerHTML = sentenceCount;
    document.querySelector('.result-paragraphs').innerHTML = paragraphCount;
    document.querySelector('.result-reading-time').innerHTML = readingTimeString;
    document.querySelector('.result-speaking-time').innerHTML = speakingTimeString;
  
    // Calculate the most commonly used words
    var wordFrequencies = {};
    words.forEach(function(word) {
      if (!wordFrequencies[word]) {
        wordFrequencies[word] = 0;
      }
      wordFrequencies[word]++;
    });
  
    // Convert wordFrequencies object into an array and sort it by the count of words
    var sortedWordFrequencies = [];
    for (var word in wordFrequencies) {
      sortedWordFrequencies.push([word, wordFrequencies[word]]);
    }
    sortedWordFrequencies.sort(function(first, second) {
      return second[1] - first[1];
    });
  
    // Take the top 10 most common words
    var top10Words = sortedWordFrequencies.slice(0, 10);
  
    // Remove existing keyword list items if they exist
    var keywordListItems = document.querySelectorAll('li.keyword');
    keywordListItems.forEach(function(item) {
        item.parentNode.removeChild(item);
    });
  
    // Create and append new keyword list items
    var resultList = document.getElementById('result-list');
    top10Words.forEach(function(word) {
      var listItem = document.createElement('li');
      listItem.classList.add('keyword', 'my-3', 'flex', 'justify-between');
      listItem.style.cssText = "border-bottom:solid 1px rgba(0, 0, 0, 0.0941176471);padding: 8px 12px;";
      listItem.innerHTML = '<span>' + word[0] + '</span><span class="result-Keyword p-1 px-3 mr-1 mb-1 inline-block text-xs font-mono rounded bg-green-200 text-green-800 hover:bg-blue-200 hover:text-blue-800 transition duration-300 ease-in-out jkl">' + word[1] + '</span>';
      resultList.appendChild(listItem);
    });  
  }
  
  // Update counts whenever the user types or pastes text
  var textArea = document.getElementById('message');
  textArea.oninput = updateCounts;
  
  // Update counts immediately on page load
  updateCounts();
};