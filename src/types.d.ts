/**
 * Объявления типов для импорта файлов различных форматов
 * Позволяет TypeScript корректно обрабатывать импорты медиафайлов
 */

// Определение типа для PNG изображений
declare module "*.png" {
    const value: string;
    export default value;
}

// Определение типа для JPG изображений
declare module "*.jpg" {
    const value: string;
    export default value;
}

// Определение типа для JPEG изображений
declare module "*.jpeg" {
    const value: string;
    export default value;
}

// Определение типа для GIF анимаций
declare module "*.gif" {
    const value: string;
    export default value;
}

// Определение типа для SVG векторной графики
// SVG обрабатывается как React компонент с соответствующими атрибутами
declare module "*.svg" {
    const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default value;
}

// Определение типа для PDF документов
declare module "*.pdf" {
    const value: string;
    export default value;
}