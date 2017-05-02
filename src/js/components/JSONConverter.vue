<template>
  <div>
    <div class='row'>
      <div class='field gr-12'>
        <label class='field__label'>JSON</label>
        <textarea class='field__input' style='height: 150px' v-model='json'></textarea>
      </div>
      <div class='field gr-12'>
        <label class='field__label'>Starting Point</label>
        <input type='text' class='field__input' v-model='startingPoint'>
      </div>
      <div class='field gr-12'>
        <label class='field__label'>Keys</label>
        <input type='text' class='field__input' v-model='keys'>
      </div>
      <div class='field gr-12 u-clearfix'>
        <button class='btn btn--cta btn--medium' style='float: right;' v-on:click='convert'>Convert</button>
      </div>
      <div v-if='showGeneratedCSV'>
        <div class='field gr-12'>
          <label class='field__label'>Generated CSV</label>
          <textarea class='field__input' style='height: 150px' v-model='csv'></textarea>
        </div>
        <div class='field gr-12'>
          <label class='field__label'>Filename</label>
          <input type='text' class='field__input' v-model='filename'>
        </div>
        <div class='field gr-12 u-clearfix'>
          <button class='btn btn--cta btn--medium' style='float: right;' v-on:click='download'>Download CSV</button>
        </div>
      </div>
    </div>
    <div class='row' v-if='errors.length > 0'>
      <div class='field gr-12'>
        <div class='callout callout--block callout--red'>
          <div v-for='error in errors'>{{ error.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    name: 'json-converter',
    data: function() {
      return {
        json: '',
        startingPoint: '',
        keys: '',
        filename: '',
        csv: '',
        showGeneratedCSV: false,
        errors: []
      };
    },
    methods: {
      convertToCSV: function(data) {
        if (data.length > 0) {
          var columnDelimiter = ',';
          var lineDelimiter = '\n';
          var keys = Object.keys(data[0])
          var result = '';
          result += keys.join(columnDelimiter);
          result += lineDelimiter;

          data.forEach(function(item) {
            var ctr = 0;
            keys.forEach(function(key) {
              if (ctr > 0) result += columnDelimiter;
              result += item[key];
              ctr++;
            });
            result += lineDelimiter;
          });
          return result;
        } else {
          return '';
        }
      },
      cleanJSON: function() {
        try {
          var data = JSON.parse(this.json);
        } catch (exception) {
          this.errors.push(exception);
          return [];
        }
        var cleanData = data;
        if (this.startingPoint !== '') {
          var startingPoint = this.startingPoint.split(',').map(function(item) { return item.trim(); });
          startingPoint.forEach(function(item) {
            cleanData = cleanData[item];
          });
        }
        if (this.keys !== '') {
          var keys = this.keys.split(',').map(function(item) { return item.trim(); });
          cleanData = cleanData.map(function(item) {
            var newItem = {};
            keys.forEach(function (key) {
              if (item.hasOwnProperty(key)) {
                newItem[key] = item[key];
              } else {
                newItem[key] = '';
              }
            });
            return newItem;
          });
        }
        return cleanData;
      },
      convert: function() {
        this.errors = [];
        var data = this.cleanJSON();
        this.csv = this.convertToCSV(data);
        if (this.errors.length === 0) {
          this.showGeneratedCSV = true;
        }
      },
      download: function() {
        var csv, data, link, filename;
        filename = this.filename === '' ? 'download.csv' : this.filename;
        if (this.csv !== '' && !this.csv.match(/^data:text\/csv/i)) {
          csv = 'data:text/csv;charset=utf-8,' + this.csv;
        }
        try {
          data = encodeURI(csv);
        } catch (exception) {
          this.errors.push(exception);
          return;
        }
        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
      }
    }
  };
</script>
