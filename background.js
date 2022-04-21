

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

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({ text: 'on' });
    chrome.action.setBadgeBackgroundColor(
        { color: [0, 255, 0, 0] }
    );


    chrome.contextMenus.create({
        id: 'baidu',
        title: '使用百度搜索',
        contexts: ['selection']
    })

    

    chrome.contextMenus.create({
        id: 'translate',
        title: '翻译',
        contexts: ['selection']
    })
});





function contextClick(info, tab) {
    const { menuItemId } = info;
    const { selectionText } = info;
    // console.log("info:"+JSON.stringify(info))
    // console.log("tab:"+JSON.stringify(tab))

    if (menuItemId === 'baidu') {
        // do something http://www.baidu.com/s?wd=关键字 
        chrome.tabs.create({ url: "https://www.baidu.com/s?wd=" + selectionText });
    }  else if (menuItemId === 'translate') {
        chrome.tabs.create({ url: "http://translate.google.com.hk/#auto/zh-CN/" + selectionText });
    }
}

//创建一个通知面板
chrome.notifications.create(
    Math.random() + '',  // id
    {
        type: 'list',
        iconUrl: 'img2.jpg',
        appIconMaskUrl: 'img.jpg',
        title: '通知主标题',
        message: '通知副标题',
        contextMessage: '好开心呀，终于会使用谷歌扩展里面的API了！',
        buttons: [{ title: '按钮1的标题', iconUrl: 'icon3.png' }, { title: '按钮2的标题', iconUrl: 'icon4.png' }],
        items: [{ title: '消息1', message: '今天天气真好！' }, { title: '消息2', message: '明天天气估计也不错！' }],
        eventTime: Date.now() + 2000
    },
    (id) => {
        console.log(id);
    }
);

chrome.contextMenus.onClicked.addListener(contextClick)

chrome.notifications.onClicked.addListener(() => {

    console.log('点击面板内除按钮的其他地方!');

});

chrome.notifications.onClosed.addListener(function () {

    console.log('点击了关闭按钮!');

});

//点击自定义的按钮

chrome.notifications.onButtonClicked.addListener((notificationId, index) => {

    console.log(notificationId, index); //当前通知的ID和当前点击按钮的index

});


chrome.notifications.getPermissionLevel((level) => {

    console.log(level); //granted ( 批注：默认 granted )

});

