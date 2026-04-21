import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import UserDetail from "./pages/UserDetail";
import EditUser from "./pages/EditUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <div className="mx-auto mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddUser />} />
              <Route path="/edit/:id" element={<EditUser />} />
              <Route path="/user/:id" element={<UserDetail />} />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
  );
};

export default App;
