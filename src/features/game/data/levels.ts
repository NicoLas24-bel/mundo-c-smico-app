export type GameObject = {
  id: string;
  word: string;
  translation: string;
  top: number;
  left: number;
  width: number;
  height: number;
};

export type Level = {
  id: number;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  image: any; // using any for require() return type in RN
  objects: GameObject[];
};

export const levels: Level[] = [
  {
    id: 1,
    name: "Bedroom",
    difficulty: "easy",
    image: require('../../../../assets/images/levels/bedroom/bedroom.png'),
    objects: [
      { id: "bed", word: "BED", translation: "cama", top: 68, left: 50, width: 45, height: 22 },
      { id: "chair", word: "CHAIR", translation: "silla", top: 72, left: 82, width: 14, height: 22 },
      { id: "window", word: "WINDOW", translation: "ventana", top: 28, left: 20, width: 18, height: 24 },
      { id: "lamp", word: "LAMP", translation: "lámpara", top: 44, left: 47, width: 8, height: 16 }
    ]
  },
  {
    id: 2,
    name: "Kitchen",
    difficulty: "easy",
    image: require('../../../../assets/images/levels/kitchen/kitchen.png'),
    objects: [
      { id: "table", word: "TABLE", translation: "mesa", top: 60, left: 30, width: 40, height: 18 },
      { id: "oven", word: "OVEN", translation: "horno", top: 47, left: 78, width: 20, height: 30 },
      { id: "plate", word: "PLATE", translation: "plato", top: 55, left: 50, width: 20, height: 8 },
      { id: "cup", word: "CUP", translation: "taza", top: 55, left: 65, width: 20, height: 9 }
    ]
  },
  {
    id: 3,
    name: "Classroom",
    difficulty: "medium",
    image: require('../../../../assets/images/levels/classroom/classroom.png'),
    objects: [
      { id: "desk", word: "DESK", translation: "escritorio", top: 70, left: 52, width: 38, height: 20 },
      { id: "clock", word: "CLOCK", translation: "reloj", top: 16, left: 48, width: 12, height: 13 },
      { id: "book", word: "BOOK", translation: "libro", top: 60, left: 57, width: 10, height: 11 },
      { id: "board", word: "BOARD", translation: "pizarrón", top: 30, left: 79, width: 40, height: 22 }
    ]
  },
  {
    id: 4,
    name: "Street",
    difficulty: "medium",
    image: require('../../../../assets/images/levels/street/street.png'),
    objects: [
      { id: "car", word: "CAR", translation: "auto", top: 80, left: 50, width: 30, height: 16 },
      { id: "bus", word: "BUS", translation: "autobús", top: 58, left: 22, width: 32, height: 26 },
      { id: "tree", word: "TREE", translation: "árbol", top: 42, left: 80, width: 16, height: 38 },
      { id: "road", word: "ROAD", translation: "calle", top: 92, left: 50, width: 90, height: 14 }
    ]
  },
  {
    id: 5,
    name: "Park",
    difficulty: "medium",
    image: require('../../../../assets/images/levels/park/park.png'),
    objects: [
      { id: "sun", word: "SUN", translation: "sol", top: 16, left: 79, width: 20, height: 20 },
      { id: "ball", word: "BALL", translation: "pelota", top: 65, left: 34, width: 15, height: 8 },
      { id: "bench", word: "BENCH", translation: "banco", top: 70, left: 80, width: 30, height: 20 },
      { id: "bicycle", word: "BICYCLE", translation: "bicicleta", top: 83, left: 18, width: 22, height: 22 }
    ]
  },
  {
    id: 6,
    name: "Bathroom",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/bathroom/bathroom.png'),
    objects: [
      { id: "mirror", word: "MIRROR", translation: "espejo", top: 30, left: 50, width: 22, height: 22 },
      { id: "towel", word: "TOWEL", translation: "toalla", top: 60, left: 85, width: 15, height: 30 },
      { id: "soap", word: "SOAP", translation: "jabón", top: 58, left: 38, width: 15, height: 8 },
      { id: "toothbrush", word: "TOOTHBRUSH", translation: "cepillo de dientes", top: 50, left: 69, width: 15, height: 12 }
    ]
  },
  {
    id: 7,
    name: "Living Room",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/living_room/living_room.png'),
    objects: [
      { id: "sofa", word: "SOFA", translation: "sofá", top: 66, left: 35, width: 38, height: 22 },
      { id: "television", word: "TELEVISION", translation: "televisor", top: 52, left: 82, width: 22, height: 18 },
      { id: "rug", word: "RUG", translation: "alfombra", top: 84, left: 50, width: 36, height: 16 },
      { id: "painting", word: "PAINTING", translation: "cuadro", top: 28, left: 47, width: 22, height: 18 }
    ]
  },
  {
    id: 8,
    name: "Supermarket",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/supermarket/supermarket.png'),
    objects: [
      { id: "cart", word: "CART", translation: "carrito", top: 80, left: 88, width: 20, height: 15 },
      { id: "apple", word: "APPLE", translation: "manzana", top: 66, left: 35, width: 20, height: 6 },
      { id: "bread", word: "BREAD", translation: "pan", top: 62, left: 18, width: 20, height: 6 },
      { id: "milk", word: "MILK", translation: "leche", top: 32, left: 74, width: 3, height: 5 }
    ]
  },
  {
    id: 9,
    name: "Beach",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/beach/beach.png'),
    objects: [
      { id: "ocean", word: "OCEAN", translation: "océano", top: 38, left: 55, width: 40, height: 18 },
      { id: "umbrella", word: "UMBRELLA", translation: "sombrilla", top: 58, left: 68, width: 24, height: 28 },
      { id: "shell", word: "SHELL", translation: "concha", top: 83, left: 16, width: 10, height: 10 },
      { id: "sand", word: "SAND", translation: "arena", top: 92, left: 50, width: 50, height: 12 }
    ]
  },
  {
    id: 10,
    name: "Hospital",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/hospital/hospital.png'),
    objects: [
      { id: "doctor", word: "DOCTOR", translation: "doctor", top: 35, left: 48, width: 12, height: 12 },
      { id: "hospital_bed", word: "BED", translation: "cama de hospital", top: 72, left: 65, width: 36, height: 26 },
      { id: "stethoscope", word: "STETHOSCOPE", translation: "estetoscopio", top: 52, left: 48, width: 10, height: 10 },
      { id: "ambulance", word: "AMBULANCE", translation: "ambulancia", top: 40, left: 20, width: 22, height: 16 }
    ]
  },
  {
    id: 11,
    name: "Restaurant",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/restaurant/restaurant.png'),
    objects: [
      { id: "menu", word: "MENU", translation: "menú", top: 75, left: 50, width: 40, height: 30 },
      { id: "waiter", word: "WAITER", translation: "mesero", top: 40, left: 55, width: 25, height: 35 },
      { id: "fork", word: "FORK", translation: "tenedor", top: 72, left: 25, width: 20, height: 18 },
      { id: "knife", word: "KNIFE", translation: "cuchillo", top: 72, left: 72, width: 20, height: 18 }
    ]
  },
  {
    id: 12,
    name: "Museum",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/museum/museum.png'),
    objects: [
      { id: "dinosaur", word: "DINOSAUR", translation: "dinosaurio", top: 50, left: 60, width: 40, height: 40 },
      { id: "painting", word: "PAINTING", translation: "pintura", top: 50, left: 15, width: 25, height: 25 },
      { id: "statue", word: "STATUE", translation: "estatua", top: 25, left: 5, width: 15, height: 25 },
      { id: "guard", word: "GUARD", translation: "guardia", top: 40, left: 90, width: 8, height: 20 }
    ]
  },
  {
    id: 13,
    name: "Library",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/library/library.png'),
    objects: [
      { id: "bookshelf", word: "BOOKSHELF", translation: "estantería", top: 30, left: 50, width: 40, height: 30 },
      { id: "librarian", word: "LIBRARIAN", translation: "bibliotecario", top: 40, left: 35, width: 15, height: 15 },
      { id: "desk", word: "DESK", translation: "escritorio", top: 75, left: 25, width: 20, height: 15 },
      { id: "computer", word: "COMPUTER", translation: "computadora", top: 40, left: 85, width: 12, height: 12 }
    ]
  },
  {
    id: 14,
    name: "Cinema",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/cinema/cinema.png'),
    objects: [
      { id: "screen", word: "SCREEN", translation: "pantalla", top: 20, left: 50, width: 40, height: 25 },
      { id: "popcorn", word: "POPCORN", translation: "palomitas", top: 65, left: 35, width: 5, height: 10 },
      { id: "ticket", word: "TICKET", translation: "boleto", top: 85, left: 50, width: 10, height: 5 },
      { id: "seat", word: "SEAT", translation: "asiento", top: 80, left: 80, width: 20, height: 30 }
    ]
  },
  {
    id: 15,
    name: "Airport",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/airport/airport.png'),
    objects: [
      { id: "airplane", word: "AIRPLANE", translation: "avión", top: 35, left: 65, width: 30, height: 15 },
      { id: "suitcase", word: "SUITCASE", translation: "maleta", top: 70, left: 60, width: 8, height: 15 },
      { id: "pilot", word: "PILOT", translation: "piloto", top: 65, left: 35, width: 10, height: 25 },
      { id: "passport", word: "PASSPORT", translation: "pasaporte", top: 78, left: 88, width: 5, height: 5 }
    ]
  }
];
