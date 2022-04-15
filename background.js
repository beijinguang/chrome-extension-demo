// const tabs = ["https://www.baidu.com", "https://www.jd.com"];

// const storageCache = {};
// // Asynchronously retrieve data from storage.sync, then cache it.
// const initStorageCache = getAllStorageSyncData().then(items => {
//   // Copy the data retrieved from storage into storageCache.
//   console.log(''+JSON.stringify(items))
//   Object.assign(storageCache, items);
// });
// function getAllStorageSyncData() {
//     // Immediately return a promise and start asynchronous work
//     return new Promise((resolve, reject) => {
//       // Asynchronously fetch all data from storage.sync.
//       chrome.storage.sync.get(null, (items) => {
//         // Pass any observed errors down the promise chain.
//         if (chrome.runtime.lastError) {
//           return reject(chrome.runtime.lastError);
//         }
//         // Pass the data retrieved from storage down the promise chain.
//         resolve(items);
//       });
//     });
//   }

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