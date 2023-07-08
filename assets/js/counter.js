window.onload = function() {

  function updateCounts() {
    // Get the value of the text from the textarea
    var text = document.getElementById('message').value;
  
    // Normalize the text:
    // - Replace carriage returns and new lines with spaces
    // - Replace extra spaces with a single space
    // - Trim leading and trailing spaces
    text = text.replace(/(\r\n|\n|\r)/gm, ' ').replace(/\s+/g, ' ').trim();
  
    // Calculate Words by splitting the text by spaces
    var words = text.split(' ');
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
    document.querySelector('.result-Words').innerHTML = wordCount;
    document.querySelector('.result-Characters').innerHTML = characterCount;
    document.querySelector('.result-Sentences').innerHTML = sentenceCount;
    document.querySelector('.result-Paragraphs').innerHTML = paragraphCount;
    document.querySelector('.result-Reading-Time').innerHTML = readingTimeString;
    document.querySelector('.result-Speaking-Time').innerHTML = speakingTimeString;
  }
  
  // Update counts whenever the user types or pastes text
  var textArea = document.getElementById('message');
  textArea.oninput = updateCounts;
  
  // Update counts immediately on page load
  updateCounts();
};
