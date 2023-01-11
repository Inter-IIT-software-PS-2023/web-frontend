import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ProSidebarProvider } from 'react-pro-sidebar'
import { persistor, store } from './store/app/Store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';import { BrowserRouter } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  		<BrowserRouter>
			<ProSidebarProvider>
				<App />
  			</ProSidebarProvider>
		</BrowserRouter>
	</PersistGate>
  </Provider>
)
