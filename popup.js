
$(document).ready(function() {
  $("body").on("click",".app",function() {
      console.log("段落被点击了。");
      window.open($(this).attr("weburl"), "_blank");
  })
});

// 读取本地存储的数据
function getData() {
  return new Promise((resolve, reject) => {
    // Asynchronously fetch all data from storage.sync.
    chrome.storage.sync.get(["list"], (result) => {
      // Pass any observed errors down the promise chain.
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }

      // Pass the data retrieved from storage down the promise chain.
      resolve(result.list);
    });
  });

  // var data = localStorage.getItem('list')
  // return data != null ? JSON.parse(data) : []
}

function arrTrans(num, arr) {
  // 一维数组转换为二维数组
  const iconsArr = [] // 声明数组
  arr.forEach((item, index) => {
    const page = Math.floor(index / num) // 计算该元素为第几个素组内
    if (!iconsArr[page]) {
      // 判断是否存在
      iconsArr[page] = []
    }
    iconsArr[page].push(item)
  })
  return iconsArr
}
function renderDesktop(data) {
  var d = arrTrans(20, data)
  var tmpArr = []
  var pagetionArr = []
  var inputArr = []
  d.map((pageItem, index) => {
    inputArr.push(`<input type="radio" id="_p${index}" name="pg" ${index == 0 ? 'checked="checked"' : ''} />`)
    pagetionArr.push(`<label for="_p${index}"><span></span></label>`)
    tmpArr.push('<div class="page">')

    pageItem.map((it) => {
      if (it.type == 1) {
        tmpArr.push(
          `<div class="folder">
              <div class="folder-apps" tabindex="0">
              `
        )
        if (it.children) {
          it.children.map((item) => {
            tmpArr.push(
              `
              <div class="app" weburl="${item.url}" >
                <div class="app-icon"></div>
                <div class="app-name">${item.name}</div>
              </div>
              `
            )
          })
        }
        tmpArr.push(`
          </div>
          <div class="bg-blur"></div>
          <div class="folder-name">${it.name}</div>
        </div>`)
      } else {
        tmpArr.push(
          `
          <div class="app" weburl="${it.url}">
            <div class="app-icon"></div>
            <div class="app-name">${it.name}</div>
          </div>
          `
        )
      }
    })

    tmpArr.push('</div>')
  })

  $('#pages').html(tmpArr.join(''))
  $('.pagination').html(pagetionArr.join(''))
  $('.status').before(inputArr.join(''))
}

function renderFooter(data) {
  var tmpArr = []
  data.map((it) => {
    if (it.type == 1) {
      tmpArr.push(
        `<div class="folder">
          <div class="folder-apps" tabindex="0">
          `
      )
      if (it.children) {
        it.children.map((item) => {
          tmpArr.push(
            `
              <div class="app" weburl="${item.url}">
                <div class="app-icon"></div>
                <div class="app-name">${item.name}</div>
              </div>
              `
          )
        })
      }
      tmpArr.push(`
          </div>
          <div class="bg-blur"></div>
          <div class="folder-name">${it.name}</div>
        </div>`)
    } else {
      tmpArr.push(
        `
          <div class="app" >
            <div class="app-icon"></div>
          </div>
          `
      )
    }
  })
  $('.bottom-bar').html(tmpArr.join(''))
}
function init() {
  // var data = getData()
  // var footData = data.filter((it) => it.position == 1)
  // var deskTopData = data.filter((it) => it.position == 2)
  // renderFooter(footData)
  // renderDesktop(deskTopData)

  getData().then(result => {
    var data = result != null ? JSON.parse(result) : []
    var footData = data.filter((it) => it.position == 1)
    var deskTopData = data.filter((it) => it.position == 2)
    renderFooter(footData)
    renderDesktop(deskTopData)
  });

}

init()
