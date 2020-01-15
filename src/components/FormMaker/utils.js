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

function generateInputComponent(h, formData = {}, obj, vm) {
  const key = obj.key ? obj.key : "";
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
    {
      props: {
        value: key ? formData[key] : "",
        ...obj.props
      },
      style: obj.style,
      on: {
        ...translateEvents(obj.events, vm),
        input(val) {
          if (key) {
            formData[key] = val;
          }
        }
      },
      slot: obj.slot
    },
    children
  );
}

function generateButtonComponent(h, _, obj) {
  return h(
    componentLibMapping.button,
    {
      props: obj.props,
      slot: obj.slot,
      style: obj.style,
      on: obj.events
    },
    [obj.text]
  );
}

function generateButtonGroupComponent(h, _, obj) {
  const components = obj.children.map(item => {
    return h(
      componentLibMapping.button,
      {
        props: item.props ? item.props : item,
        slot: item.slot,
        style: item.style,
        on: item.events
      },
      [item.text]
    );
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
  return h(componentLibMapping.icon, {
    props: obj.props,
    style: obj.style,
    slot: obj.slot
  });
}

function generateRadioComponent(h, formData = {}, obj, vm) {
  const key = obj.key ? obj.key : "";

  return h(
    componentLibMapping.radio,
    {
      props: {
        value: key ? formData[key] : false,
        ...obj.props
      },
      style: obj.style,
      slot: obj.slot,
      on: {
        ...translateEvents(obj.events, vm),
        input(val) {
          if (key) {
            formData[key] = val;
          }
        }
      }
    },
    [obj.text]
  );
}

function generateRadioGroupComponent(h, formData = {}, obj, vm) {
  let components = [];
  const key = obj.key ? obj.key : "";
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
    {
      props: {
        value: key ? formData[key] : "",
        ...obj.props
      },
      style: obj.style,
      slot: obj.slot,
      on: {
        ...translateEvents(obj.events, vm),
        input(val) {
          if (key) {
            formData[key] = val;
          }
        }
      }
    },
    [components]
  );
}

function generateCheckboxComponent(h, formData = {}, obj, vm) {
  const key = obj.key ? obj.key : "";

  return h(
    componentLibMapping.checkbox,
    {
      props: {
        value: key ? formData[key] : "",
        ...obj.props
      },
      style: obj.style,
      slot: obj.slot,
      on: {
        ...translateEvents(obj.events, vm),
        input(val) {
          if (key) {
            formData[key] = val;
          }
        }
      }
    },
    [obj.text]
  );
}

function generateCheckboxGroupComponent(h, formData = {}, obj, vm) {
  let components = [];
  const key = obj.key ? obj.key : "";

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
    {
      props: {
        value: key ? formData[key] : [],
        ...obj.props
      },
      style: obj.style,
      slot: obj.slot,
      on: {
        ...translateEvents(obj.events, vm),
        input(val) {
          if (key) {
            formData[key] = val;
          }
        }
      }
    },
    [components]
  );
}

function generateSwitchComponent(h, formData = {}, obj, vm) {
  const key = obj.key ? obj.key : "";

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
    {
      props: {
        value: key ? formData[key] : false,
        ...obj.props
      },
      style: obj.style,
      slot: obj.slot,
      on: {
        ...translateEvents(obj.events, vm),
        input(val) {
          if (key) {
            formData[key] = val;
          }
        }
      }
    },
    components
  );
}

function generateSelectComponent(h, formData = {}, obj, vm) {
  const key = obj.key ? obj.key : "";

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
    {
      props: {
        value: formData[key],
        ...obj.props
      },
      style: obj.style,
      on: {
        ...translateEvents(obj.events, vm),
        input(val) {
          if (key) {
            formData[key] = val;
          }
        }
      },
      slot: obj.slot
    },
    components
  );
}

function generateSliderComponent(h, formData = {}, obj, vm) {
  const key = obj.key ? obj.key : "";

  return h(componentLibMapping.slider, {
    props: {
      value: formData[key],
      ...obj.props
    },
    style: obj.style,
    slot: obj.slot,
    on: {
      ...translateEvents(obj.events, vm),
      input(val) {
        if (key) {
          formData[key] = val;
        }
      }
    }
  });
}

function generateDateComponent(h, formData = {}, obj, vm) {
  const key = obj.key ? obj.key : "";
  const type = obj.props.type;
  return h(componentLibMapping.date, {
    props: {
      value: key ? formData[key] : "",
      ...obj.props
    },
    style: obj.style,
    slot: obj.slot,
    on: {
      ...translateEvents(obj.events, vm),
      input(date) {
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
      }
    }
  });
}

function generateTimeComponent(h, formData = {}, obj, vm) {
  const key = obj.key ? obj.key : "";

  return h(componentLibMapping.time, {
    props: {
      value: key ? formData[key] : "",
      ...obj.props
    },
    style: obj.style,
    slot: obj.slot,
    on: {
      ...translateEvents(obj.events, vm),
      input(val) {
        if (key) {
          formData[key] = val;
        }
      }
    }
  });
}

function generateCascaderComponent(h, formData = {}, obj, vm) {
  const key = obj.key ? obj.key : "";

  return h(componentLibMapping.cascader, {
    props: {
      value: key ? formData[key] : [],
      ...obj.props
    },
    style: obj.style,
    slot: obj.slot,
    on: {
      ...translateEvents(obj.events, vm),
      input(val) {
        if (key) {
          formData[key] = val;
        }
      }
    }
  });
}

function generateInputNumberComponent(h, formData = {}, obj, vm) {
  const key = obj.key ? obj.key : "";

  return h(componentLibMapping.inputNumber, {
    props: {
      value: key ? formData[key] : null,
      ...obj.props
    },
    style: obj.style,
    slot: obj.slot,
    on: {
      ...translateEvents(obj.events, vm),
      input(val) {
        if (key) {
          formData[key] = val;
        }
      }
    }
  });
}

function generateRateComponent(h, formData = {}, obj, vm) {
  const key = obj.key ? obj.key : "";

  return h(componentLibMapping.rate, {
    props: {
      value: key ? formData[key] : 0,
      ...obj.props
    },
    slot: obj.slot,
    style: obj.style,
    on: {
      ...translateEvents(obj.events, vm),
      input(val) {
        if (key) {
          formData[key] = val;
        }
      }
    }
  });
}

function generateUploadComponent(h, formData = {}, obj, vm) {
  let components = [];

  if (obj.children) {
    components = obj.children.map(item => {
      let func = componentObj[item.type];
      return func ? func.call(vm, h, formData, item, vm) : null;
    });
  }
  return h(
    componentLibMapping.upload,
    {
      props: obj.props,
      style: obj.style,
      slot: obj.slot
    },
    components
  );
}

function generateColorPickerComponent(h, formData = {}, obj, vm) {
  const key = obj.key ? obj.key : "";

  return h(componentLibMapping.colorPicker, {
    props: {
      value: key ? formData[key] : "",
      ...obj.props
    },
    style: obj.style,
    slot: obj.slot,
    on: {
      ...translateEvents(obj.events, vm),
      input(val) {
        if (key) {
          formData[key] = val;
        }
      }
    }
  });
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
      }
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

function translateEvents(events = {}, vm) {
  const result = {};
  for (let event in events) {
    result[event] = events[event].bind(vm);
  }

  return result;
}

export default componentObj;
