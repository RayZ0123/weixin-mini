Component({
    data: {
        inputShowed: false,
        inputVal: ""
    },
    properties: {
      value: {
        type: String,
        value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
        observer(newVal, oldVal, changedPath) {
          // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
          // 通常 newVal 就是新设置的数据， oldVal 是旧数据
          this.setData({
            inputVal: newVal
          })
        }
      }
    },
  methods: {

    showInput: function () {
      this.setData({
        inputShowed: true
      });
    },
    submitInput: function () {
      let eventOption = {

      };
      this.triggerEvent('bindChange', { inputValue: this.data.inputValue }, eventOption)
    },
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
      let eventOption = {

      };
      this.triggerEvent('bindChange', { inputValue: '' }, eventOption)
    },
    inputTyping: function (e) {
      let inputValue = e.detail.value;

      this.setData({
        inputValue
      });

    }

  },
    
});