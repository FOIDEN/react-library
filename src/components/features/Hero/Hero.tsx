import React from "react";
import Book1 from "../../../assets/books/book1.jpg";
import Vector from "../../../assets/website/blue-pattern.png";

const Hero: React.FC = () => {
  const bgImage: React.CSSProperties = {
    backgroundImage: `url(${Vector})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <>
      <div className="min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200" style={bgImage}>
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Text Content Section */}
            <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1">
              <h1 className="text-3xl sm:text-3xl lg:text-5xl font-bold whitespace-nowrap">
                Откройте мир книг
              </h1>
              <p className="text-sm">
                Добро пожаловать в нашу библиотеку, где каждая книга - это новое приключение. Найдите свою следующую любимую книгу в нашей обширной коллекции и погрузитесь в мир знаний и воображения.
              </p>
            </div>

            {/* Image Section */}
            <div className="min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2">
              <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center">
                <img
                  src={Book1}
                  alt="book preview"
                  className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-125 object-contain mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;