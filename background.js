
// const tabs = ["https://www.baidu.com", "https://www.jd.com"];

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${JSON.stringify(oldValue)}", new value is "${JSON.stringify(newValue)}".`
        );
    }
});

// chrome.storage.onChanged.addListener((changes, namespace) => {

//     for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//         console.log(
//             `Storage key "${key}" in namespace "${namespace}" changed.`,
//             `Old value was "${oldValue}", new value is "${newValue}".`
//         );
//     }
//     if (namespace === 'sync' && changes.options?.newValue) {
//         const debugMode = Boolean(changes.options.newValue.debug);
//         console.log('enable debug mode?', debugMode);
//         // setDebugMode(debugMode);
//     }
// });