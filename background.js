

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${JSON.stringify(oldValue)}", new value is "${JSON.stringify(newValue)}".`
        );
    }
});


chrome.bookmarks.getTree(function (bookmarkArray) {
    console.log(JSON.stringify(bookmarkArray));
});