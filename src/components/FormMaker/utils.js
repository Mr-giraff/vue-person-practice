const componentObj = {
  input: generateInputComponent,
  button: generateButtonComponent,
  buttonGroup: generateButtonGroupComponent,
  reset: generateResetComponent,
  submit: generateSubmitComponent,
  icon: generateIconComponent,
  radio: generateRadioComponent,
  radioGroup: generateRadioGroupComponent,
  checkbox: generateCheckboxComponent,
  checkboxGroup: generateCheckboxGroupComponent,
  switch: generateSwitchComponent,
  select: generateSelectComponent,
  slider: generateSliderComponent,
  date: generateDateComponent,
  time: generateTimeComponent,
  cascader: generateCascaderComponent,
  inputNumber: generateInputNumberComponent,
  rate: generateRateComponent,
  upload: generateUploadComponent,
  colorPicker: generateColorPickerComponent,
  col: generateColComponent,
  formItem: generateFormItemComponent
};

// 不同组件库组件名映射
export const componentLibMapping = {
  input: "el-input",
  button: "el-button",
  buttonGroup: "el-buttonGroup",
  icon: "el-icon",
  radio: "el-radio",
  radioGroup: "el-radioGroup",
  checkbox: "el-checkbox",
  checkboxGroup: "el-checkboxGroup",
  switch: "el-switch",
  select: "el-select",
  option: "el-option",
  optionGroup: "el-optionGroup",
  slider: "el-slider",
  date: "el-date-picker",
  time: "el-time-select",
  cascader: "el-cascader",
  inputNumber: "el-inputNumber",
  rate: "el-rate",
  upload: "el-upload",
  colorPicker: "el-colorPicker",
  col: "el-col",
  row: "el-row",
  formItem: "el-formItem",
  form: "el-form"
};

const toString = Object.prototype.toString;

export function isFunction(arg) {
  return toString.call(arg) === "[object Function]";
}

function onNativeEvent(modifiers, listener) {
  return event => {
    if (modifiers.includes("stop")) {
      event.stopPropagation();
    }

    if (modifiers.includes("prevent")) {
      event.preventDefault();
    }

    if (modifiers.includes("self") && event.target !== event.currentTarget)
      return;

    if (modifiers.includes("enter") && event.keyCode !== 13) return;

    listener(event);
  };
}

/**
 * 修饰符处理
 * @param {*} result - 最终事件集合
 * @param {*} vm - 外部 this 作用域
 * @param {*} native - 是否原生事件
 * @param {*} modifiers - 修饰符
 * @param {*} eventName - 事件名称
 * @param {*} listener - 事件绑定函数
 */
function onModifiers(result, vm, native, modifiers, eventName, listener) {
  // native 修饰符
  // native === true, modifiers.includes('native') === false
  // native === false, modifiers.includes('native') === ture
  if (native !== modifiers.includes("native")) return;

  const func = native ? onNativeEvent(modifiers, listener) : listener;

  result[eventName] = func.bind(vm);
}

/**
 * 事件转换
 * @param {*} events - 事件集合
 * @param {*} vm - 外部 this 作用域
 * @param {*} native - 是否原生事件
 */
export function translateEvents(events = {}, vm, native = false) {
  const result = {};
  for (let event in events) {
    const phrase = event.split(".");
    const eventName = phrase.shift();

    onModifiers(result, vm, native, phrase, eventName, events[event]);
  }

  return result;
}

function generateAdvancedConfig(formData = {}, obj, vm, onInput) {
  const key = obj.key ? obj.key : "";
  const input = onInput ? onInput : val => key && (formData[key] = val);

  return {
    props: {
      value: key ? formData[key] : "",
      ...obj.props
    },
    attrs: obj.props,
    style: obj.style,
    slot: obj.slot,
    on: {
      ...translateEvents(obj.events, vm),
      input
    },
    nativeOn: translateEvents(obj.events, vm, true)
  };
}

function generateSimpleConfig(obj) {
  return {
    props: obj.props ? obj.props : obj,
    slot: obj.slot,
    style: obj.style,
    on: obj.events
  };
}

function generateInputComponent(h, formData = {}, obj, vm) {
  let children = [];

  if (obj.children) {
    children = obj.children.map(item => {
      let component;
      if (item.type == "span") {
        component = h(
          "span",
          {
            slot: item.slot
          },
          [item.text]
        );
      } else {
        let func = componentObj[item.type];
        component = func ? func.call(vm, h, formData, item, vm) : null;
      }
      return component;
    });
  }

  return h(
    componentLibMapping.input,
    generateAdvancedConfig(formData, obj, vm),
    children
  );
}

function generateButtonComponent(h, _, obj) {
  return h(componentLibMapping.button, generateSimpleConfig(obj), [obj.text]);
}

function generateButtonGroupComponent(h, _, obj) {
  const components = obj.children.map(item => {
    return h(componentLibMapping.button, generateSimpleConfig(item), [
      item.text
    ]);
  });

  return h(
    componentLibMapping.buttonGroup,
    {
      props: obj.props,
      style: obj.style,
      slot: obj.slot
    },
    [components]
  );
}

function generateSubmitComponent(h, formData = {}, obj, vm) {
  const components = [];
  const submit = h(
    componentLibMapping.button,
    {
      props: obj.props,
      style: obj.style,
      on: {
        click() {
          vm.$refs["form"].validate(valid => {
            if (valid) {
              obj.success.call(vm, formData);
            } else {
              obj.fail.call(vm, formData);
            }
          });
        }
      }
    },
    [obj.text]
  );

  components.push(submit);

  if (obj.reset) {
    const reset = h(
      componentLibMapping.button,
      {
        props: obj.reset.props,
        style: {
          marginLeft: "10px",
          ...obj.style
        },
        on: {
          click() {
            vm.$refs["form"].resetFields();
          }
        }
      },
      [obj.reset.text]
    );

    components.push(reset);
  }

  return h("div", components);
}

function generateResetComponent(h, _, obj, vm) {
  return h(
    componentLibMapping.button,
    {
      props: obj.props,
      style: obj.style,
      slot: obj.slot,
      on: {
        click() {
          vm.$refs["form"].resetFields();
        }
      }
    },
    [obj.text]
  );
}

function generateIconComponent(h, _, obj) {
  return h(componentLibMapping.icon, generateSimpleConfig(obj));
}

function generateRadioComponent(h, formData = {}, obj, vm) {
  return h(
    componentLibMapping.radio,
    generateAdvancedConfig(formData, obj, vm),
    [obj.text]
  );
}

function generateRadioGroupComponent(h, formData = {}, obj, vm) {
  let components = [];

  if (obj.children) {
    components = obj.children.map(child => {
      return h(
        componentLibMapping.radio,
        {
          props: child.props ? child.props : child
        },
        [child.text]
      );
    });
  }

  return h(
    componentLibMapping.radioGroup,
    generateAdvancedConfig(formData, obj, vm),
    [components]
  );
}

function generateCheckboxComponent(h, formData = {}, obj, vm) {
  return h(
    componentLibMapping.checkbox,
    generateAdvancedConfig(formData, obj, vm),
    [obj.text]
  );
}

function generateCheckboxGroupComponent(h, formData = {}, obj, vm) {
  let components = [];

  if (obj.children) {
    components = obj.children.map(child => {
      return h(
        componentLibMapping.checkbox,
        {
          props: child.props ? child.props : child
        },
        [child.text]
      );
    });
  }

  return h(
    componentLibMapping.checkboxGroup,
    generateAdvancedConfig(formData, obj, vm),
    [components]
  );
}

function generateSwitchComponent(h, formData = {}, obj, vm) {
  let components = [];

  if (obj.children) {
    components = obj.children.map(item => {
      let temp;
      if (item.type == "icon") {
        temp = generateIconComponent(h, formData, item);
      } else if (item.type == "span") {
        temp = h(
          "span",
          {
            slot: item.slot
          },
          [item.text]
        );
      }

      return temp;
    });
  }

  return h(
    componentLibMapping.switch,
    generateAdvancedConfig(formData, obj, vm),
    components
  );
}

function generateSelectComponent(h, formData = {}, obj, vm) {
  let components = [];

  if (obj.children) {
    components = obj.children.map(item => {
      if (item.type == "optionGroup") {
        return h(
          componentLibMapping.optionGroup,
          {
            props: item.props ? item.props : item
          },
          item.children.map(child => {
            return h(componentLibMapping.option, {
              props: child.props ? child.props : child
            });
          })
        );
      } else {
        return h(componentLibMapping.option, {
          props: item.props ? item.props : item
        });
      }
    });
  }

  return h(
    componentLibMapping.select,
    generateAdvancedConfig(formData, obj, vm),
    components
  );
}

function generateSliderComponent(h, formData = {}, obj, vm) {
  return h(
    componentLibMapping.slider,
    generateAdvancedConfig(formData, obj, vm)
  );
}

function generateDateComponent(h, formData = {}, obj, vm) {
  const key = obj.key ? obj.key : "";
  const type = obj.props.type;
  const onInput = date => {
    if (key) {
      if (type.includes("datetime")) {
        if (Array.isArray(date)) {
          formData[key] = date
            ? date.map(item =>
                item
                  ? item.toLocaleDateString() +
                    " " +
                    item.toTimeString().split(" ")[0]
                  : ""
              )
            : [];
        } else {
          formData[key] = date
            ? date.toLocaleDateString() +
              " " +
              date.toTimeString().split(" ")[0]
            : "";
        }
      } else {
        if (Array.isArray(date)) {
          formData[key] = date
            ? date.map(item => (item ? item.toLocaleDateString() : ""))
            : [];
        } else {
          formData[key] = date ? date.toLocaleDateString() : "";
        }
      }
    }
  };

  return h(
    componentLibMapping.date,
    generateAdvancedConfig(formData, obj, vm, onInput)
  );
}

function generateTimeComponent(h, formData = {}, obj, vm) {
  return h(componentLibMapping.time, generateAdvancedConfig(formData, obj, vm));
}

function generateCascaderComponent(h, formData = {}, obj, vm) {
  return h(
    componentLibMapping.cascader,
    generateAdvancedConfig(formData, obj, vm)
  );
}

function generateInputNumberComponent(h, formData = {}, obj, vm) {
  return h(
    componentLibMapping.inputNumber,
    generateAdvancedConfig(formData, obj, vm)
  );
}

function generateRateComponent(h, formData = {}, obj, vm) {
  return h(componentLibMapping.rate, generateAdvancedConfig(formData, obj, vm));
}

function generateUploadComponent(h, formData = {}, obj, vm) {
  let components = [];

  if (obj.children) {
    components = obj.children.map(item => {
      let func = componentObj[item.type];
      return func ? func.call(vm, h, formData, item, vm) : null;
    });
  }
  return h(componentLibMapping.upload, generateSimpleConfig(obj), components);
}

function generateColorPickerComponent(h, formData = {}, obj, vm) {
  return h(
    componentLibMapping.colorPicker,
    generateAdvancedConfig(formData, obj, vm)
  );
}

function generateColComponent(h, obj, component) {
  return h(
    componentLibMapping.col,
    {
      props: {
        span: obj.span,
        push: obj.push,
        pull: obj.pull,
        offset: obj.offset,
        order: obj.order,
        "class-name": obj["class-name"] || obj["className"],
        xs: obj.xs,
        sm: obj.sm,
        md: obj.md,
        lg: obj.lg
      },
      key: obj.key
    },
    [component]
  );
}

function generateFormItemComponent(h, obj, component) {
  return h(
    componentLibMapping.formItem,
    {
      class: obj.className,
      props: {
        label: obj.label,
        rules: obj.rules,
        prop: obj.key ? obj.key : "",
        "label-width": obj["label-width"] || obj["labelWidth"],
        "label-for": obj["label-for"] || obj["labelFor"],
        error: obj.error,
        "show-message": obj["show-message"] || obj["showMessage"]
      }
    },
    [component]
  );
}

export default componentObj;
