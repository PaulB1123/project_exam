import './App.css';
import Navigation from './Componets/Navigation/Navigation.js';
import Header from './Componets/Header/Header.js';
import FilterComponent from './Componets/Filters/Filter.js';
import Dashboard from './Componets/Dashboard/Dashboard';


function App() {
  return (
    <div className='Main_App'>
       <Navigation></Navigation>
       <div className='Right_Side_Dashboard'>
       <Header></Header>
       <div>
        <FilterComponent></FilterComponent>
       <Dashboard></Dashboard>
       </div>
       </div>
    </div>
  );
}

export default App;
