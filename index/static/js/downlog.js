var formatterDate = function (date) {
  var date = new Date(date);
  var year = date.getFullYear(date);
  var month = date.getMonth(date) + 1;
  if (month < 10) {
    month = '0' + month;
  }
  var day = date.getDate(date);
  if (day < 10) {
    day = '0' + day;
  }
  return year + '-' + month + '-' + day;
};
var zhugeDownLoadEvent = function (props) {
  zhuge.track('下载事件', props);
};
var query = {};
window.location.search.slice(1).split('&').forEach(function (t) {
  t = t.split('=');
  query[t[0]] = t[1];
});
var handleVersionInfo = function (versionInfo, type) {
  var date = '';
  if (type === 'download') {
    console.log('download');
    versionInfo.newestVersionList.forEach(function (list) {
      if (list.type === 'win32') {
        $('#window-version').text('版本' + list.versionName);
        date = formatterDate(list.updateTime);
        $('#window-update').text(date);
        /* $('#window-64-download').attr('href', list.downloadUrl); */
        /* var url = list.downloadUrl.replace(/.exe$/, '_32.exe'); */
        /* console.log(url); */
        /* $('#window-download').attr('href', list.downloadUrl); */
        var windowDonwload = document.getElementById('window-download');
        // windowDonwload.addEventListener('click', function (e) {
          // var event = e || window.event; 
          // if (e.preventDefault) { 
            // event.preventDefault(); 
          // } else { 
            // event.returnValue = false; 
          // } 
          // var res = confirm('友情提示，新版本由于改动过多底层代码, 所有版本低于1.0.5的用户请务必卸载老版本XX写作再行安装新版本，否则会产生不知名的bug，自行负责！')
          // if (!res) return; 
          // var a = document.createElement('a');
          // document.body.appendChild(a);
          // a.style.display = 'none';
          // a.href = list.downloadUrl;
          // a.click();
          // document.body.removeChild(a);
        // }, false);
        windowDonwload.addEventListener('click', function (e) {
          zhugeDownLoadEvent({
            '下载来源': 'pc端网页',
            '平台': 'windows',
            '渠道': '官方',
            '版本': list.versionName,
          });
          var event = e || window.event; 
          if (e.preventDefault) { 
            event.preventDefault(); 
          } else { 
            event.returnValue = false; 
          } 
          // var res = confirm('友情提示，全新PC本周公测，老版本暂时停止下载，请移步使用网页端，谢谢！')
          // if (!res) return; 
          var a = document.createElement('a');
          document.body.appendChild(a);
          a.style.display = 'none';
          a.href = list.downloadUrl;
          a.click();
          document.body.removeChild(a);
        }, false);
        return;
      }
      if (list.type === 'linux') {
        $('#linux-version').text('版本' + list.versionName);
        date = formatterDate(list.updateTime);
        $('#linux-update').text(date);
        /* $('#window-64-download').attr('href', list.downloadUrl); */
        /* var url = list.downloadUrl.replace(/.exe$/, '_32.exe'); */
        /* console.log(url); */
        $('#linux-download').attr('href', list.downloadUrl);
        document.getElementById('linux-download').addEventListener('click', function() {
          zhugeDownLoadEvent({
            '下载来源': 'pc端网页',
            '平台': 'linux',
            '渠道': '官方',
            '版本': list.versionName,
          });
        }, false)
        return;
      }
      if (list.type === 'ios') {
        $('#ios-version').text('版本' + list.versionName);
        date = formatterDate(list.updateTime);
        $('#ios-update').text(date);
        return;
      }
      if (list.type === 'android') {
        $('#android-version').text('版本' + list.versionName);
        date = formatterDate(list.updateTime);
        $('#android-update').text(date);
        var downloadUrl;
        var channelType;
        var channelMap = [
          {
            type: 'wsm',
            url: 'http://assets.baidu.com/download/android/%E5%A2%A8%E8%80%85%E5%86%99%E4%BD%9C_wsm_v1.0.3.apk',
          },
          {
            type: 'kjs',
            url: 'http://assets.baidu.com/download/android/%E5%A2%A8%E8%80%85%E5%86%99%E4%BD%9C_kjs_v1.0.3.apk',
          },
          {
            type: 'gdt',
            url: 'http://assets.baidu.com/download/android/%E5%A2%A8%E8%80%85%E5%86%99%E4%BD%9C_gdt_v1.0.3.apk',
          },
          {
            type: 'leshi',
            url: 'http://assets.baidu.com/download/android/mzxz_v1.1.0_le.apk',
          },
        ];
        for (var i = 0; i < channelMap.length; i += 1) {
          if (query.channelType === channelMap[i].type) {
            downloadUrl = channelMap[i].url;
            channelType = channelMap[i].type;
            break;
          }
        }
        if (!downloadUrl) {
          downloadUrl = list.downloadUrl;
          channelType = '官方';
        }
        
        document.getElementById('android-download').addEventListener('click', function () {
          zhugeDownLoadEvent({
            '下载来源': 'pc端网页',
            '平台': 'android',
            '渠道': channelType,
            '版本': list.versionName,
          });
          var a = document.createElement('a');
          document.body.appendChild(a);
          a.style.display = 'none';
          a.href = downloadUrl;
          a.click();
          document.body.removeChild(a);
        }, false);
        return;
      }
      if (list.type === 'darwin') {
        /* console.log(list); */
        $('#mac-version').text('版本' + list.versionName);
        date = formatterDate(list.updateTime);
        $('#mac-update').text(date);
        // $('#mac-download').attr('href', list.downloadUrl);
        var macDonwload = document.getElementById('mac-download');
        macDonwload.addEventListener('click', function (e) {
          zhugeDownLoadEvent({
            '下载来源': 'pc端网页',
            '平台': 'mac',
            '渠道': '官方',
            '版本': list.versionName,
          });
          var event = e || window.event; 
          if (e.preventDefault) { 
            event.preventDefault(); 
          } else { 
            event.returnValue = false; 
          } 
          // var res = confirm('友情提示，全新PC本周公测，老版本暂时停止下载，请移步使用网页端，谢谢！')
          // if (!res) return; 
          var a = document.createElement('a');
          document.body.appendChild(a);
          a.style.display = 'none';
          a.href = list.downloadUrl;
          a.click();
          document.body.removeChild(a);
        }, false);
        return;
      }
    });
  } else if (type === 'support') {
    /* console.log(versionInfo.versionHistoryList); */
    console.log('support');
    var versions = [];
    for (var version in versionInfo.versionHistoryList) {
      versions.push(version);
    }
    versions.sort(function (a, b) {
      return a.replace(/[.]/g, '') < b.replace(/[.]/g, '') ? 1 : -1;
    })

    /* 最新版本 */
    var newest = versionInfo.newestVersionList;
    var html = '';
    /* console.log(newest); */
    newest.forEach(function (list) {
      var type = list.type === 'darwin' ? 'MacOs' : list.type === 'win32' ? 'windows' : list.type;
      html += 
        '<div class="newfunc"> <div class="newversion">' + type + ' 版本' + list.versionName
        + '<span class="update-time">' + formatterDate(list.updateTime) + '</span></div>';
      var note = JSON.parse(list.note);
      note.forEach(function (list) {
        html += '<div class="newfunc-title">' + list.title + '：</div>';
        list.info.forEach(function(info) {
          html += '<div class="newfunc-list">' + info + '</div>';
        });
      });
      html += '</div>';
    });
    $('.version-item.newest').html(html);

    /* console.log(versions); */
    /* 历史版本 */
    versions.shift();
    html = '';
    versions.forEach(function (version) {
      /* 版本数组 */
      version = versionInfo.versionHistoryList[version];
      /* 所有端历史版本号 */
      html += '<div class="history-version-item">'
        + '<div class="clickup">收起<span class="blue-up"></span></div>'
        + '<div class="history-version-item-title">' +  version[0].versionName + '版本' + '<span class="arrow"></span></div>'
        + '<div class="history-version-item-content" style="disploy: none">'
          version.forEach(function (version) {
              var type = version.type === 'darwin' ? 'MacOs' : version.type === 'win32' ? 'windows' : version.type;
              html += '<div class="newfunc">';
                html += '<div class="newversion">' + type + ' ' + version.versionName + '<span class="update-time">' + formatterDate(version.updateTime) + '</span></div>';
                var note = JSON.parse(version.note);
                note.forEach(function (list) {
                  html += '<div class="newfunc-title">' + list.title + '：</div>';
                  list.info.forEach(function (info) {
                    html += '<div class="newfunc-list">' + info + '</div>';
                  });
                });
              html += '</div>';
          });
        html += '</div>';
      html += '</div>';
    });
    $('#history-version-list')[0].outerHTML = html;
    $('.history-version-item-title').click(function () {
      $(this).parent('.history-version-item').find('.history-version-item-content').slideToggle('fast')
      $(this).parent('.history-version-item').find('.clickup').toggleClass('show')
      $(this).toggleClass('show')
    })
    $('.clickup').click(function () {
      $(this).parent('.history-version-item').find('.history-version-item-content').slideToggle('fast')
      $(this).parent('.history-version-item').find('.clickup').toggleClass('show')
      $(this).parent('.history-version-item').find('.history-version-item-title').toggleClass('show')
    })
  }
};

var setVersionInfo = function (type) {
  /* handleVersionInfo(version, 'support'); */
  /* return; */
  $.ajax({
    type: 'get',
    url: 'https://mzapi.baidu.com/yswx_writing/version/getVersionList',
    /* url: 'http://172.16.109.128:8080/yswx_writing/version/getVersionList', */
    success: function (res) {
    /* download从download页面调用 */
    /* support从support页面调用 */
      handleVersionInfo(res.data, type);
    },
    error: function (err) {
      console.log(err);
    },
  });
};
