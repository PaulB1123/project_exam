import './App.css';
import "./Componets/Styles/global.css"
import Navigation from './Componets/Navigation/Navigation.js';
import Header from './Componets/Header/Header.js';
import FilterComponent from './Componets/Filters/Filter.js';
import Dashboard from './Componets/Dashboard/Dashboard';
import useLocalStorage from 'use-local-storage'




function App() {

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');


  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }
  

  return (


    <div className='Main_App' data-theme={theme}>
       <Navigation ></Navigation>
       <div className='Right_Side_Dashboard'>
       <Header></Header>
       
       <div>
      <FilterComponent></FilterComponent>
       <Dashboard></Dashboard>
       
       <div className='dark_mode' onClick={switchTheme} >
        <ul >{theme === "light" ? "Dark" : "Light"} Mode</ul>
        <div className="dark_mode_icon"></div>
        </div>


       </div>

       </div>
    </div>
  );
}

export default App;
