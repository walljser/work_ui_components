/**
 * Toast本质上不是React组件，它依赖于Notification，动态修改Notification
 * created by gre_yu@163.com
 */
import Notification from './Notification';

let notification

/**
 * 通过使用Notification暴露出来的静态方法，改变Notification
 */
const getNotification = () => {
  if (!notification) {
    notification = Notification.specialInstance()
  }

  return notification
}

const notice = (type, content, onClose, duration) => {
  let instance = getNotification()

  instance.notice({
    duration,
    type,
    content,
    onClose: () => {
      if (onClose) {
        onClose()
      }
    }
  })
}

export default {
  success: (content, onClose, duration) => (notice('success', content, onClose, duration)),
  info: (content, onClose, duration) => (notice('info', content, onClose, duration))
}