var Vue = require('vue');
var App = require('./app.vue');

var Mercury = new Vue({
  el: '#app',
  render: function (createElement) {
    return createElement(App);
  }
});
