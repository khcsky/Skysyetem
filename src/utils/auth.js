import Cookies from 'js-cookie'

const SessionKey = 'Admin-Session'

export function getSession(Key = SessionKey) {
  return Cookies.get(Key)
}

export function setSession(session, Key = SessionKey) {
  return Cookies.set(Key, session)
}

export function removeSession(Key = SessionKey) {
  return Cookies.remove(Key)
}
