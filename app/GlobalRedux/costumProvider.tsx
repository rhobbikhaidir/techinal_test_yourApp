'use client'
import { Provider } from 'react-redux'
import { store } from './store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
const persistor = persistStore(store)

export function CostumProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>{children}</PersistGate>
    </Provider>
  )
}
