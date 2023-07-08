document.addEventListener("DOMContentLoaded", function() {
    const textArea = document.getElementById('message');
    const wordsResult = document.querySelector('.result-words');
    const charactersResult = document.querySelector('.result-characters');
    const sentencesResult = document.querySelector('.result-sentences');
    const paragraphsResult = document.querySelector('.result-paragraphs');
    const readingTimeResult = document.querySelector('.result-readingtime');
    const speakingTimeResult = document.querySelector('.result-speakingtime');
    const resultList = document.getElementById('result-list');

    function updateCounts() {
        let text = textArea.value.replace(/\s+/g, ' ').trim();
        let words = text.split(' ').filter(word => word !== "");
        let wordFrequencies = words.reduce((acc, word) => (acc[word] = (acc[word] || 0) + 1, acc), {});

        wordsResult.textContent = words.length;
        charactersResult.textContent = text.length;
        let sentences = text.split(/[.!?]+\s/g).filter(Boolean);
        sentencesResult.textContent = sentences.length;

        let paragraphs = textArea.value.split(/\n{2,}/g).filter(paragraph => paragraph.trim() !== "");
        paragraphsResult.textContent = paragraphs.length;

        updateTime(words.length, 275, readingTimeResult);
        updateTime(words.length, 180, speakingTimeResult);
        updateKeywords(wordFrequencies);
    }

    function updateTime(wordCount, wordsPerMinute, resultElement) {
        let time = wordCount / wordsPerMinute;
        let minutes = Math.floor(time);
        let seconds = Math.floor((time - minutes) * 60);
        resultElement.textContent = (minutes > 0 ? minutes + ' min ' : '') + seconds + ' sec';
    }

    function updateKeywords(wordFrequencies) {
        // remove existing keywords
        document.querySelectorAll('li.keyword').forEach(item => item.remove());

        // get top 10 keywords and generate list items
        Object.entries(wordFrequencies).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([keyword, count]) => {
            let keywordItem = document.createElement('li');
            keywordItem.classList.add('keyword', 'my-3', 'flex', 'justify-between');
            keywordItem.style.cssText = "border-bottom:solid 1px rgba(0, 0, 0, 0.0941176471);padding: 8px 12px;";
            keywordItem.innerHTML = `<span>${keyword}</span><span class="result-keyword p-1 px-3 mr-1 mb-1 inline-block text-xs font-mono rounded bg-green-200 text-green-800 hover:bg-blue-200 hover:text-blue-800 transition duration-300 ease-in-out">${count}</span>`;
            resultList.appendChild(keywordItem);
        });
    }
    
    textArea.oninput = updateCounts;
    updateCounts();
});