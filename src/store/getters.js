const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  pathname: state => state.app.pathname,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.userName
}
export default getters
