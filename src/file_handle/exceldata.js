var xlsx = require('xlsx');
var fs = require('fs');

function start(callback) {
  var xls = xlsx.readFile('C:/Users/Administrator/Desktop/订单指派统计.xlsx');
  var xls_s1 = xls.Sheets.Sheet1;
  var head_reg = /^[a-zA-Z]{1}1$/;
  var xls_header = [];
  var xls_content = [];
  var xls_length = xls_s1['!ref'].replace(/[a-zA-Z]/g, '').split(':')[1];
  var xls_end_char = xls_s1['!ref'].replace(/[0-9]/g, '').split(':')[1];
  for (k in xls_s1) {
    if (head_reg.test(k)) {
      xls_header.push(xls_s1[k].v);
    }
  }

  for (let i = 2; i <= xls_length; i++) {
    xls_content.push([]);
    for (let j = 65; j <= xls_end_char.charCodeAt(); j++) {
      xls_content[i - 2].push(xls_s1[String.fromCharCode(j) + i].v);
    }
  }

  var result = {
    'jiadianqingxi': {
      orderTotal: 0,
      assigned: 0,
      canceled: 0,
      waited: 0,
    },
    'baomu': {
      orderTotal: 0,
      assigned: 0,
      canceled: 0,
      waited: 0,
    },
    'paotui': {
      orderTotal: 0,
      assigned: 0,
      canceled: 0,
      waited: 0,
    },
  }

  xls_content.forEach(function(value, index, array) {
    if (value[0].indexOf('清洗') > -1) {
      //计算清洗类
      result.jiadianqingxi.orderTotal += parseInt(value[2]) + parseInt(value[3]) + parseInt(value[4]);
      result.jiadianqingxi.waited += parseInt(value[2]);
      result.jiadianqingxi.assigned += parseInt(value[3]);
      result.jiadianqingxi.canceled += parseInt(value[4]);
    }
    if (value[0].indexOf('保姆') > -1) {
      //计算清洗类
      result.baomu.orderTotal += parseInt(value[2]) + parseInt(value[3]) + parseInt(value[4]);
      result.baomu.waited += parseInt(value[2]);
      result.baomu.assigned += parseInt(value[3]);
      result.baomu.canceled += parseInt(value[4]);
    }
    if (value[0].indexOf('跑腿') > -1) {
      //计算清洗类
      result.paotui.orderTotal += parseInt(value[2]) + parseInt(value[3]) + parseInt(value[4]);
      result.paotui.waited += parseInt(value[2]);
      result.paotui.assigned += parseInt(value[3]);
      result.paotui.canceled += parseInt(value[4]);
    }
  });

  appendText = `家电清洗：订单数：${result.jiadianqingxi.orderTotal}，指派数量：${result.jiadianqingxi.assigned}，取消数量：${result.jiadianqingxi.canceled}，待指派数量：${result.jiadianqingxi.waited}\n保姆：订单数：${result.baomu.orderTotal}，指派数量：${result.baomu.assigned}，取消数量：${result.baomu.canceled}，待指派数量：${result.baomu.waited}\n跑腿：订单数：${result.paotui.orderTotal}，指派数量：${result.paotui.assigned}，取消数量：${result.paotui.canceled}，待指派数量：${result.paotui.waited}`;

  fs.appendFile('C:/Users/Administrator/Desktop/result.txt', appendText, callback);
}

try {
  start(function() {
    document.getElementById('status').innerText = '成功';
  });
} catch (e) {
  alert(e);
}