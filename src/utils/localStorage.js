const ls = window.localStorage

export default {
  setItem (name, value) {
      if (typeof ls.getItem(value) === 'string' ) {
          return ls.setItem(name, value)
      } else {
          return  ls.setItem(name, JSON.stringify(value))
      }
    // ls.setItem(name, JSON.stringify(value))
  },
  getItem (name) {
    try {
        if (typeof ls.getItem(name) === 'string' ) {
          return ls.getItem(name)
        } else {
            return JSON.parse(ls.getItem(name))
        }

    } catch (e) {
      return null
    }
  },
  removeItem (name) {
    ls.removeItem(name)
  },
  clear() {
    ls.clear()
  }
}
