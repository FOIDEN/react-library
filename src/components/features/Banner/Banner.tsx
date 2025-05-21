import React from "react";
import BooksStack from "../../../assets/website/library.png";
import Vector from "../../../assets/website/vector3.png";

const Banner = () => {
  const bgImage: React.CSSProperties = {
    backgroundImage: `url(${Vector})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  };

  return (
    <>
      <div className="min-h-[550px]">
        <div
          className="min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0"
          style={bgImage}
        >
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Image section */}
              <div className="relative">
                <img
                  src={BooksStack}
                  alt="Library books stack"
                  className="max-w-[400px] h-[350px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                />
              </div>

              {/* Text content section */}
              <div className="flex flex-col justify-center gap-6 sm:pt-0">
                <h1 className="text-3xl sm:text-4xl font-bold text-center">
                Читай, мечтай, живи
                </h1>
                <div className="max-w-[600px] mx-auto px-4">
                  <p className="text-sm tracking-wide leading-6 text-center text-justify whitespace-pre-line">
                  Наш магазин предлагает уникальный опыт чтения, объединяя широкий выбор жанров и авторов, чтобы удовлетворить вкусы каждого читателя. Мы гордимся нашей тщательно подобранной коллекцией лучших книг, которые не только развлекают, но и обогащают знания.  
Здесь каждый найдёт что-то особенное: от классической литературы до современных бестселлеров, от захватывающих детективов до глубоких философских трудов. Мы стремимся создать пространство, где каждая книга становится проводником в мир идей, эмоций и новых открытий.  
Кроме того, мы регулярно обновляем наш ассортимент, следя за последними новинками и трендами в мире.
                  </p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default Banner;