import { store } from '../store/store.ts'

export const getAuthToken = (): string | null => {
  const state = store.getState()
  return state.auth.token
}

export const isUserAuthenticated = (): boolean => {
  const state = store.getState()
  return state.auth.isAuthenticated
}