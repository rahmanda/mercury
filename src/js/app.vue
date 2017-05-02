<template>
  <div class='u-pd--medium'>
    <json-converter></json-converter>
  </div>
</template>

<script>
  var JSONConverter = require('./components/JSONConverter.vue');
  module.exports = {
    components: {
      'json-converter': JSONConverter
    }
  };
</script>
