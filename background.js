chrome.action.setBadgeBackgroundColor(
    { color: [0, 255, 0, 0] }
);

// chrome.action.setBadgeText({text: 'new'});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${JSON.stringify(oldValue)}", new value is "${JSON.stringify(newValue)}".`
        );
    }
});


chrome.bookmarks.getTree(function (bookmarkArray) {
    //console.log(JSON.stringify(bookmarkArray));
});

chrome.contextMenus.create({
    id: 'foo',
    title: 'first',
    contexts: ['selection']
})

function contextClick(info, tab) {
    const { menuItemId } = info

    if (menuItemId === 'foo') {
        // do something
        console.log("foo click ")
    }
}

chrome.contextMenus.onClicked.addListener(contextClick)