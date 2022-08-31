import "../Styles/global.css"
import './Navigation.css';
import Annalect from "./icons/Annalect.png";
import dashboard from "./icons/Dashboard_logo.svg";
import Filter from "./icons/Filter.svg";
import ChartsIcon from "./icons/Charts.svg";
import ReportIcon from "./icons/Reports.svg";
import SettingsIcon from "./icons/Settings.svg";
import DownloadIcon from "./icons/Download.svg";
import LogoutIcon from "./icons/Log_Out.svg";
import ArrrowdownIcon from "./icons/ArrowDown.svg";
import SwitchDarkmodeIcon from "./icons/Switch_darkmode.svg";

export default function Navigation() {
    return ( 
        <>
        <div className='naviagtion_container_group'>
 
        <div className='hero_logo'>
            <img src={Annalect} alt="Main Menu logo " className='hero_logo_container'></img> 
            
        </div>

        <div className='hero_main_menu_container'>
        <div className='main_menu_container'>
            <li className='header_main_menu'>MAIN MENU</li>
        <ul>
            <div className='filterbutton_container' id="dashboardbutton">
                <img src={dashboard} alt="this is a test"></img>
                <li className='dashboardbutton_text'>Dashboard</li>
            </div>
        </ul>
        <ul>
            <div className='filterbutton'>
                <div className='filterbutton_container'>
                    <img src={Filter} alt="this is filter"></img>
                     <li>Filters</li>
                </div>
                <img src={ArrrowdownIcon}></img>
            </div>
        </ul>
        </div>
        </div>

        <div  className="header_main_menu_container">
        <li className='header_main_menu'>WORK FLOW</li>
        <ul>
            <div className='filterbutton'>
            <div className='filterbutton_container'>
                <img src= {ChartsIcon} alt="Logo_Charts "></img>
                <li>Charts</li></div>
                <img src={ArrrowdownIcon}></img>
            </div>
            <div className='filterbutton'>
            <div className='filterbutton_container'>
                <img src={ReportIcon } alt="Logo_Charts "></img>
                <li>Reports</li></div>
                <img src={ArrrowdownIcon}></img>
            </div>  
        </ul>
        </div>

        <div  className="header_main_menu_container">
        <li className='header_main_menu'>GENERAL</li>
        <ul>
            <div className='filterbutton_container'>
                <img src={SettingsIcon} alt="Logo_Charts "></img>
                <li>Settings</li>
            </div>
        </ul>
        </div>

        <div  className="download_button_container">
        <li className='download_header'>PDF Report</li>
        <ul className='download_ul'>
            <div className='download_paragraph'>Download montly report</div>
            <div className='download_button'>
            <li>Download</li>
                <img src={DownloadIcon} alt="Logo_Charts "></img>
                
               
            </div>
        </ul>
        </div>

        <div  className="download_button_container">
        <li className='download_header'>CSV Report</li>
        <ul className='download_ul'>
            <div className='download_paragraph'>Download a full report or per chart </div>
            <div className='download_button'>
            <li>Download</li>
                <img src={DownloadIcon} alt="Logo_Charts "></img>
                
                
            </div>
        </ul>
        </div>

        <div className='logout_button'>
            <img src={LogoutIcon} alt="Logo_Charts "></img>
            <li>Log out</li>
        </div>
       
        <div className='dark_mode'>
        <ul>Dark Mode</ul>
        <img src={SwitchDarkmodeIcon} alt="Logo_Charts "></img>
        </div>

        </div>
        </>
    ); }