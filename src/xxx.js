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
import axios from 'axios';

var ui = new firebaseui.auth.AuthUI(firebase.auth());
// ClientMonitor.register({
//     service: 'test-ui',
//     pagePath: 'index.html',
//     serviceVersion: 'v1.0.0',
//     vue: Vue,
//     useFmp: true,
// });
const http = axios.create({
  baseURL: "/demo-service",
  headers: {
    "Content-type": "application/json",
  }
});

// http.post("/test", {id:1}).then((res) => {
//   console.log(res);
// });
console.log(XMLHttpRequest.prototype.open)

class demoService {
  get(id) {
    return http.get("/test/123");
  }
  post(data) {
    return http.post("/post", data);
  }
}
const serv = new demoService();
new Vue({
  data(){
    return {
      goods: {
        goodsId: 1,
      }
    }
  },
  methods: {
    getCustom(id) {
      serv.get(id);
    },
    postGoods() {
      serv.get(this.goods.goodsId);
    }
  },
  created() {
    this.postGoods();
  }
})