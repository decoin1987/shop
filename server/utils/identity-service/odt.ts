enum ProductTypes {
  FLOWER,
  BOUQUET,
  COMPOSITION,
  TOYS,
  TAPE,
  WRAPING_PAPER,
  POSTCARDS,
  BOXES,
}

export interface Product {
  id: string; // id
  title: string; // название
  verbose: string[]; // склонения множественное число и.т.д
  price: string;
  articul: number;
  opt_price: string;
  productType: ProductTypes;
}

export interface Flower extends Product {
  id: string; // id
  color: string; // Цвет
  type: string; // тип цветов (сезонные, уникальные, на праздник(конкретный))
}
