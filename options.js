var rootData = []
var currentAddId = null

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
  // var data = [];
  // chrome.storage.sync.get(["list"], function(result) {
  //   data = result.list!= null ? JSON.parse(result.list) : [];
  //   console.log('Value currently is ' + result.list);
  //   console.log('data is ' + JSON.stringify(data));

  // });
  // console.log('data----> is ' + JSON.stringify(data));
  // return data;

  // var data = localStorage.getItem(localKey)
  // return data != null ? JSON.parse(data) : []
}

// 保存本地存储数据
function saveData(data) {
  //localStorage.setItem(localKey, JSON.stringify(data))
  chrome.storage.sync.set({ "list": JSON.stringify(data) }, function () {
    console.log('Value is set to ' + JSON.stringify(data));
  });
}

//将数组转换成json格式,封装
function serializeJSON(id) {
  var paramJson = {}
  var paramArr = $(id).serializeArray()
  $(paramArr).each(function (index, obj) {
    paramJson[obj.name] = obj.value
  })
  return paramJson
}

function renderData() {
  getData().then(data => {
    rootData = data != null ? JSON.parse(data) : []
    var tmpArr = []
    rootData.forEach((it) => {
      tmpArr.push(
        `<tr>
        <td>${it.position == 1 ? '底部' : '桌面'}</td>
        <td>${it.type == 1 ? 'folder' : 'App'}</td>
        <td>${it.name}</td>
        <td>${it.url}</td>
        <td>
          <button class="btn btn-warning delete_data" data-id="${it.id}">删除</button>
          ${it.type == 1 ? '<button class="btn btn-primary add_data"  data-id="' + it.id + '">添加App</button>' : ''}
        </td>
      </tr>`
      )
      if (it.children) {
        it.children.forEach((item) => {
          tmpArr.push(
            `<tr>
        <td>-</td>
        <td>App</td>
        <td>${item.name}</td>
        <td>${item.url}</td>
        <td>
          <button class="btn btn-warning delete_data" data-id="${item.id}" data-parent="${it.id}">删除</button>
        </td>
      </tr>`
          )
        })
      }
    })
    $('#tBody').html(tmpArr.join(''))
  });

}

function bindEvent() {
  $('#submit').on('click', function () {
    var row = serializeJSON('#form')
    row.id = +new Date()
    if (row.type == 1) row.children = []
    if (currentAddId) {
      var obj = rootData.find((it) => it.id == currentAddId)
      if (!obj.children) {
        obj.children = []
      }

      obj.children.push(row)
    } else {
      rootData.push(row)
    }

    saveData(rootData)
    renderData()
    $('.bs-modal').modal('hide')
  })

  $('body').on('click', '.delete_data', function () {
    var id = $(this).attr('data-id')
    var parentId = $(this).attr('data-parent')
    var data = []
    if (parentId) {
      var obj = rootData.find((it) => it.id == parentId)
      obj.children = obj.children.filter((it) => it.id != id)
      data = rootData
    } else {
      data = rootData.filter((it) => it.id != id)
    }

    saveData(data)
    renderData()

  })
  $('body').on('click', '.add_data', function () {
    $("#resetInfo").trigger("click");
    var $this = $(this)
    var id = $this.attr('data-id')
    if (id) {
      currentAddId = id
      $('#block').hide()
    } else {
      currentAddId = null
      $('#block').show()
    }

    $('.bs-modal').modal('show')
  })
}

function init() {
  renderData()

  bindEvent()
}
init()