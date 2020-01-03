<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    }
  },
  // render(h, context) {
  //   const { icon, title } = context.props;
  //   const vnodes = [];
  //   if (icon) {
  //     vnodes.push(<i class={icon} />);
  //   }

  //   if (title) {
  //     vnodes.push(<span>{title}</span>);
  //   }
  //   return vnodes;
  // }
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];
    if (icon) {
      vnodes.push(<i class={icon} />);
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    return vnodes;
  }
};
</script>
