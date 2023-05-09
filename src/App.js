import Home from './components/Home'
import Feed from './components/Feed';
import Explore from './components/Explore';


import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
    	<Router>
    		<Routes>
    			<Route path="*" element={<Home />} />
    		</Routes>
    	</Router>
    </>
  );
}

export default App;
