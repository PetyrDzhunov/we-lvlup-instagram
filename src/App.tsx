import { ReactElement } from 'react'
import './App.css'
import TestComponent from './components/test-component'

function App(): ReactElement | null {
    return (
        <div>
            Hello World
            <TestComponent />
        </div>
    )
}

export default App
