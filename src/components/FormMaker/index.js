import componentObj, { componentLibMapping, isFunction } from "./utils";

export default {
  props: {
    instance: Object,
    formItems: Array,
    model: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.$emit("update:instance", this.$refs.form); // 暴露 form 实例
  },
  render(h) {
    const formItems = this.formItems;
    if (!formItems) {
      return h("div");
    }

    const options = this.options;
    const formData = this.model;
    const components = formItems.map(item => {
      if (isFunction(item.visible) && !item.visible(formData)) {
        return null;
      }

      let func = componentObj[item.type];
      let subComponent = func ? func.call(this, h, formData, item, this) : null;
      let component = componentObj.formItem(h, item, subComponent);

      return componentObj.col(h, item, component);
    });

    if (options.submit) {
      processSubmitOrReset(
        components,
        h,
        formData,
        options.submit,
        this,
        "submit"
      );
    }

    if (options.reset) {
      processSubmitOrReset(
        components,
        h,
        formData,
        options.reset,
        this,
        "reset"
      );
    }

    return h(
      componentLibMapping.form,
      {
        ref: "form",
        props: {
          model: formData,
          ...options.formProps
        },
        class: "vue-generate-form"
      },
      [
        h(
          componentLibMapping.row,
          {
            props: options.rowProps
          },
          components
        )
      ]
    );
  }
};

function processSubmitOrReset(components, h, formData, obj, vm, type) {
  let subComponent = componentObj[type](h, formData, obj, vm);
  let component = componentObj.formItem(h, obj, subComponent);
  components.push(componentObj.col(h, obj, component));
}
