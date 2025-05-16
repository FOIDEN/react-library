/**
 * Точка входа в приложение
 * Инициализирует React приложение и подключает все необходимые зависимости
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Стили для карусели Slick (используется для слайдеров в приложении)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * Рендеринг приложения в DOM
 * StrictMode включен для выявления потенциальных проблем
 * BrowserRouter обеспечивает маршрутизацию на стороне клиента
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
);