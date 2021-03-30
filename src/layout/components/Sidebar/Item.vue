<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    svg: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title, svg } = context.props
    const vnodes = []
    if (icon) {
      //<i :class="item.imageurl"></i>
      if (icon.indexOf('svg') >= 0) {
        vnodes.push(<svg-icon icon-class={icon.split('-')[1]} />)
      } else {
        vnodes.push(<i class={'fa ' + icon}></i>)
      }
    } else if (svg) {
      vnodes.push(<svg-icon icon-class={svg} />)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
