import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IndexPage from "./components/landingpage/index"; 



const App = () => {
  return (
    <Router>
      <div className='bg-slate-950 '>
        <Routes>
          <Route path="*" element={<Navigate to="/index" />} /> 
          <Route path="/index" element={<IndexPage />} /> {/* Add the route for the IndexPage component */}
        </Routes>
      </div>
    </Router>
  )
}

export default App;