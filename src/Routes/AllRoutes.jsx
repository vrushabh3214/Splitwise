// import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import ExpForm from "../pages/ExpForm.jsx";
import GroupExp from "../pages/GroupExp.jsx";

export default function Allroutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/ExpForm" element={<ExpForm />} />

        <Route path="/GroupExp/:id" element={<GroupExp />} />
      </Routes>
    </div>
  );
}
