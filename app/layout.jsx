import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import ToasterProvider from '@components/ToasterProvider'

export const metadata={
    title: 'PromptIA',
    description: 'Discover & Share AI Prompts'
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <Provider>
            <ToasterProvider />
            <div className="main">
                <div className="gradient"/>
            </div>
            <main className="app">
                <Nav/>
                {children}
            </main>
            </Provider>
        </body>

    </html>
    
    
  )
}

export default RootLayout