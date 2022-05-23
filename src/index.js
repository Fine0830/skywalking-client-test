/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import ClientMonitor from '../node_modules/skywalking-client-js/src/index';
// import ClientMonitor from 'skywalking-client-js';
import Vue from 'vue';
ClientMonitor.register({
    service: 'test-ui',
    pagePath: 'index.html',
    serviceVersion: 'v1.0.0',
    vue: Vue,
    useFmp: true,
    traceSDKInternal: true,
});


var url = 'https://api.test.com/test';
var xhr = new XMLHttpRequest();
xhr.open('post', url, true);
xhr.setRequestHeader('X-Custom-Header', 'value');
xhr.send();
// // promise error
function foo() {
  Promise.reject({
    message: 'promise test',
    stack: 'promise error'
  });
}
foo();

// fetch('http://example.com/movies')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(myJson);
//   });

// // ajax error
// function loadXMLDoc() {
//   let xmlhttp;
//   if (window.XMLHttpRequest) {
//     //  IE7+, Firefox, Chrome, Opera, Safari
//     xmlhttp = new XMLHttpRequest();
//   } else {
//     // IE6, IE5
//     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//   }
//   xmlhttp.onreadystatechange = () => {
//     if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
//       document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
//     }
//   };
//   xmlhttp.open("GET", "/try/ajax/ajax_info.txt", true);
//   xmlhttp.send();
// }
// loadXMLDoc();

// vue error
new Vue({
  methods: {
    async click1() {
      throw {message: 'async function error', stack: 'click1 error'};
    },
    async test() {
      throw {
        message: 'vue test',
        stack: 'vue error'
      }
    }
  },
  created() {
    this.test();
    this.click1();
  },
  config: {
    errorHandler(error) {
      console.log(error);
    }
  }
})

// mock
function timeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => Math.random() > 0.5 ?
      resolve() :
      reject({
        message: 'timeout test',
        stack: 2000
      }), 500)
  })
}
timeout();
// resource errors
// const img = new Image(10, 10);
// img.src = 'test.jpg';
// 
// fetch('/peppa', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
// })
// .then(response => response.body)
// .then(body => {
//   const reader = body.getReader();
//   console.log(reader);
// });

// const xhr = new XMLHttpRequest();
// xhr.open('post', '/graphql', true);
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4 && xhr.status < 400) {
//     console.log('Report Successfully');
//   }
// };
// xhr.send(JSON.stringify({
//   query: "query queryServices($duration: Duration!,$keyword: String!) {\n    services: getAllServices(duration: $duration, group: $keyword) {\n      key: id\n      label: name\n      group\n    }\n  }",
//   variables: {"duration":{"start":"2020-12-23 1503","end":"2020-12-23 1603","step":"MINUTE"},"keyword":""},
// }));

// fetch('/graphql', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     query: "query queryServices($duration: Duration!,$keyword: String!) {\n    services: getAllServices(duration: $duration, group: $keyword) {\n      key: id\n      label: name\n      group\n    }\n  }",
//     variables: {"duration":{"start":"2020-12-23 1503","end":"2020-12-23 1603","step":"MINUTE"},"keyword":""},
//   })
// }).then((data) => {
//   console.log(data);
// })

// js error
const ss = null;
ss.v;


function foreachTree1(tree, func) {
  tree.forEach(element => {
    func(element);
    element.children && mapTree1(element.children);
  });
}
function foreachTree2(tree, func) {
  tree.forEach(element => {
    element.children && mapTree1(element.children);
    func(element);
  });
}
function foreachTree3(tree, func) {
  const list = [...tree];
  let node;

  while (node = list.shift()) {
    func(node);
    node.children && list.push(node.children);
  }
}

function foreachTree4(tree, func) {
  const list = [...tree];
  let node;
  while (node = list.shift()) {
    func(node);
    node.children && list.unshift(node.children);
  }
}

function foreachTree5(tree, func) {
  const list = [...tree];
  let node, i = 0;
  while(list[i]) {
    const len = node.children ? node.children.length : 0;
    if (!node.children || node.children[len - 1] === list[i - 1]) {
      func(node);
      i++
    } else {
      list.splice(i, 0, ...node.children);
    }
  }
}

function listToTree6(list) {
  const info = list.reduce((map, node) => {map[node.id] = node; node.children = [];});

  const tree = list.fliter((node) => {
    info[node.pId] && info[node.pId].children.push(node);
    return !node.pId;
  })
}
