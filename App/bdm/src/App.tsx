import NavBar from "./components/NavBar";
import "./main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignPage from "./components/SignPage";
import HistoryPage from "./components/HistoryPage";
import DeleteRecord from "./components/content/DeleteRecord";
import RequestBlood from "./components/content/RequestBlood";

function App() {
  const navList = [
    "Home",
    "Blood Matching",
    "Search",
    "Donate",
    "Report"
  ];

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={<NavBar pages={navList} heading="BDM" pageIndex={2} userStatus="user" />}
          />
          <Route path="/Login" element={<SignPage />} />
          <Route path="/SearchHistory" element={<HistoryPage/>}/>
          <Route path ="/DeleteRecord" element={<DeleteRecord/>} />
          <Route path="/RequestBlood" element={<RequestBlood/>} />
        </Routes>
      </BrowserRouter>
      <footer
        style={{
          display: "table",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        All rights reserved to Team 5. Abdulghani Khayat & Ahmed Shewaikan.
      </footer>
      
    </>
  );
}

export default App;
