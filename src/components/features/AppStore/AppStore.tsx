import React from "react";

const bannerStyle: React.CSSProperties = {

  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const AppStore = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-10" style={bannerStyle}>
      <div className="container">
        <div className="w-full mx-auto px-4">
          <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900 dark:text-white text-center">
          "Книги — корабли мысли, странствующие по волнам времени." — Фрэнсис Бэкон
          </h1>
        </div>
      </div>
    </div>
  );
};
export default AppStore;