import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DogComponent from "../components/DogComponent";
import ForbiddenPage from "../components/ForbiddenPage"; // Trang lỗi 403
import { Provider } from "react-redux";
import store from "../store/store";

const AppRouter: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<DogComponent />} />
          <Route path="/403" element={<ForbiddenPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default AppRouter;
