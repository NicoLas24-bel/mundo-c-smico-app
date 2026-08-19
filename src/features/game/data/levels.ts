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
  image: any; // usando any por el retorno de require() en RN
  objects: GameObject[];
};

export const levels: Level[] = [
  {
    id: 1,
    name: "Bedroom",
    difficulty: "easy",
    image: require('../../../../assets/images/levels/bedroom/bedroom.png'),
    objects: [
      { id: "bed", word: "BED", translation: "cama", top: 63, left: 50, width: 45, height: 22 },
      { id: "chair", word: "CHAIR", translation: "silla", top: 65, left: 85, width: 14, height: 22 },
      { id: "window", word: "WINDOW", translation: "ventana", top: 28, left: 24, width: 23, height: 24 },
      { id: "lamp", word: "LAMP", translation: "lámpara", top: 40, left: 46, width: 8, height: 16 },
      { id: "bear", word: "BEAR", translation: "oso", top: 84, left: 69, width: 10, height: 10 },
      { id: "ball", word: "BALL", translation: "pelota", top: 85, left: 80, width: 9, height: 10 }
    ]
  },
  {
    id: 2,
    name: "Kitchen",
    difficulty: "easy",
    image: require('../../../../assets/images/levels/kitchen/kitchen.png'),
    objects: [
      { id: "table", word: "TABLE", translation: "mesa", top: 60, left: 30, width: 40, height: 18 },
      { id: "oven", word: "OVEN", translation: "horno", top: 50, left: 78, width: 20, height: 15 },
      { id: "plate", word: "PLATE", translation: "plato", top: 55, left: 49, width: 20, height: 8 },
      { id: "cup", word: "CUP", translation: "taza", top: 55, left: 64, width: 10, height: 9 },
      { id: "house", word: "HOUSE", translation: "casa", top: 25, left: 51, width: 15, height: 20 },
      { id: "plant", word: "PLANT", translation: "planta", top: 19, left: 16, width: 10, height: 10 }
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
      { id: "book", word: "BOOK", translation: "libro", top: 55, left: 57, width: 15, height: 11 },
      { id: "board", word: "BOARD", translation: "pizarrón", top: 30, left: 80, width: 40, height: 22 },
      { id: "map", word: "MAP", translation: "mapa", top: 30, left: 49, width: 19, height: 10 },
      { id: "earth", word: "EARTH", translation: "tierra", top: 94, left: 38, width: 15, height: 9 },
    ]
  },
  {
    id: 4,
    name: "Street",
    difficulty: "medium",
    image: require('../../../../assets/images/levels/street/street.png'),
    objects: [
      { id: "car", word: "CAR", translation: "auto", top: 80, left: 55, width: 25, height: 16 },
      { id: "bus", word: "BUS", translation: "autobús", top: 58, left: 22, width: 32, height: 26 },
      { id: "tree", word: "TREE", translation: "árbol", top: 42, left: 77, width: 20, height: 38 },
      { id: "road", word: "ROAD", translation: "calle", top: 92, left: 50, width: 90, height: 14 },
      { id: "cloud", word: "CLOUD", translation: "nube", top: 12, left: 20, width: 30, height: 10 },
      { id: "children", word: "CHILDREN", translation: "niños", top: 77, left: 87, width: 15, height: 15 }
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
      { id: "bench", word: "BENCH", translation: "banco", top: 73, left: 78, width: 30, height: 15 },
      { id: "bicycle", word: "BICYCLE", translation: "bicicleta", top: 83, left: 18, width: 22, height: 22 },
      { id: "flower", word: "FLOWER", translation: "flor", top: 58, left: 10, width: 15, height: 10 },
      { id: "lake", word: "LAKE", translation: "lago", top: 56, left: 83, width: 25, height: 10 },
    ]
  },
  {
    id: 6,
    name: "Bathroom",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/bathroom/bathroom.png'),
    objects: [
      { id: "mirror", word: "MIRROR", translation: "espejo", top: 27, left: 54, width: 30, height: 30 },
      { id: "towel", word: "TOWEL", translation: "toalla", top: 65, left: 85, width: 15, height: 25 },
      { id: "soap", word: "SOAP", translation: "jabón", top: 55, left: 40, width: 15, height: 8 },
      { id: "toothbrush", word: "TOOTHBRUSH", translation: "cepillo de dientes", top: 50, left: 69, width: 10, height: 12 },
      { id: "shower", word: "SHOWER", translation: "ducha", top: 25, left: 90, width: 22, height: 38 },
      { id: "masseter", word: "MASSETER", translation: "masetero", top: 49, left: 9, width: 10, height: 12 }
    ]
  },
  {
    id: 7,
    name: "Living Room",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/living_room/living_room.png'),
    objects: [
      { id: "sofa", word: "SOFA", translation: "sofá", top: 60, left: 30, width: 38, height: 22 },
      { id: "television", word: "TELEVISION", translation: "televisor", top: 52, left: 82, width: 22, height: 18 },
      { id: "rug", word: "RUG", translation: "alfombra", top: 86, left: 50, width: 36, height: 16 },
      { id: "painting", word: "PAINTING", translation: "cuadro", top: 28, left: 40, width: 22, height: 18 },
      { id: "curtain", word: "CURTAIN", translation: "cortina", top: 26, left: 76, width: 10, height: 20 },
      { id: "ceiling", word: "CEILING", translation: "techo", top: 2, left: 47, width: 50, height: 18 }
    ]
  },
  {
    id: 8,
    name: "Supermarket",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/supermarket/supermarket.png'),
    objects: [
      { id: "cart", word: "CART", translation: "carrito", top: 85, left: 88, width: 10, height: 14 },
      { id: "apple", word: "APPLE", translation: "manzana", top: 67, left: 36, width: 10, height: 6 },
      { id: "bread", word: "BREAD", translation: "pan", top: 62, left: 18, width: 20, height: 6 },
      { id: "milk", word: "MILK", translation: "leche", top: 32, left: 74, width: 3, height: 5 },
      { id: "fish", word: "FISH", translation: "pescado", top: 16, left: 10, width: 10, height: 9 },
      { id: "Fridge", word: "FRIDGE", translation: "refrigerador", top: 30, left: 90, width: 15, height: 10 },
      { id: "lettuce", word: "LETTUCE", translation: "lechuga", top: 48, left: 44, width: 10, height: 6 },
      { id: "bag", word: "BAG", translation: "bolsa", top: 59, left: 83, width: 5, height: 5 }
    ]
  },
  {
    id: 9,
    name: "Beach",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/beach/beach.png'),
    objects: [
      { id: "ocean", word: "OCEAN", translation: "océano", top: 50, left: 36, width: 40, height: 18 },
      { id: "umbrella", word: "UMBRELLA", translation: "sombrilla", top: 55, left: 75, width: 24, height: 20 },
      { id: "shell", word: "SHELL", translation: "concha", top: 85, left: 16, width: 10, height: 10 },
      { id: "sand", word: "SAND", translation: "arena", top: 92, left: 50, width: 50, height: 12 },
      { id: "shovel", word: "SHOVEL", translation: "pala", top: 70, left: 86, width: 10, height: 10 },
      { id: "sailboat", word: "SAILBOAT", translation: "velero", top: 35, left: 73, width: 10, height: 14 },
      { id: "palm", word: "PALM", translation: "palmera", top: 20, left: 6, width: 10, height: 14 },
      { id: "trace", word: "TRACE", translation: "huella", top: 88, left: 85, width: 10, height: 10 }
    ]
  },
  {
    id: 10,
    name: "Hospital",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/hospital/hospital.png'),
    objects: [
      { id: "doctor", word: "DOCTOR", translation: "doctor", top: 33, left: 46, width: 12, height: 12 },
      { id: "hospital_bed", word: "BED", translation: "cama de hospital", top: 72, left: 65, width: 36, height: 26 },
      { id: "stethoscope", word: "STETHOSCOPE", translation: "estetoscopio", top: 45, left: 43, width: 10, height: 10 },
      { id: "ambulance", word: "AMBULANCE", translation: "ambulancia", top: 40, left: 20, width: 22, height: 16 },
      { id: "lamp", word: "LAMP", translation: "lampara", top: 2, left: 50, width: 22, height: 16 },
      { id: "syrup", word: "SYRUP", translation: "jarabe", top: 60, left: 15, width: 5, height: 5 },
      { id: "serum", word: "SERUM", translation: "suero", top: 30, left: 65, width: 5, height: 10 },
      { id: "building", word: "BUILDING", translation: "edificio", top: 26, left: 25, width: 10, height: 10 },

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
      { id: "fork", word: "FORK", translation: "tenedor", top: 79, left: 25, width: 10, height: 18 },
      { id: "knife", word: "KNIFE", translation: "cuchillo", top: 79, left: 75, width: 10, height: 18 },
      { id: "chieff", word: "CHIEFF", translation: "chef", top: 20, left: 30, width: 12, height: 12 },
      { id: "napkin", word: "NAPKIN", translation: "servilleta", top: 84, left: 86, width: 10, height: 10 }
    ]
  },
  {
    id: 12,
    name: "Museum",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/museum/museum.png'),
    objects: [
      { id: "dinosaur", word: "DINOSAUR", translation: "dinosaurio", top: 50, left: 65, width: 40, height: 25 },
      { id: "painting", word: "PAINTING", translation: "pintura", top: 55, left: 19, width: 20, height: 20 },
      { id: "statue", word: "STATUE", translation: "estatua", top: 25, left: 5, width: 15, height: 25 },
      { id: "guard", word: "GUARD", translation: "guardia", top: 40, left: 90, width: 8, height: 20 },
      { id: "vase", word: "VASE", translation: "vaso", top: 85, left: 95, width: 8, height: 8 },
      { id: "dress", word: "DRESS", translation: "vestido", top: 80, left: 20, width: 8, height: 8 },
      { id: "skull", word: "SKULL", translation: "cráneo", top: 25, left: 53, width: 10, height: 10 },
      { id: "egg", word: "EGG", translation: "huevo", top: 67, left: 58, width: 5, height: 10 },
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
      { id: "computer", word: "COMPUTER", translation: "computadora", top: 40, left: 87, width: 12, height: 12 },
      { id: "brochure", word: "BROCHURE", translation: "folleto", top: 7, left: 40, width: 10, height: 10 },
      { id: "globe", word: "GLOBE", translation: "globo", top: 90, left: 57, width: 10, height: 10 },
      { id: "keyboard", word: "KEYBOARD", translation: "teclado", top: 49, left: 87, width: 10, height: 5 },
      { id: "wheel", word: "WHEEL", translation: "rueda", top: 95, left: 75, width: 5, height: 5}
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
      { id: "ticket", word: "TICKET", translation: "boleto", top: 88, left: 50, width: 10, height: 5 },
      { id: "seat", word: "SEAT", translation: "asiento", top: 80, left: 85, width: 30, height: 30 },
      { id: "door", word: "DOOR", translation: "puerta", top: 35, left: 76, width: 8, height: 15 },
      { id: "ladder", word: "LADDER", translation: "escalera", top:65, left: 50, width: 10, height: 30},
      { id: "lanterns", word: "LANTERNS", translation: "faroles", top: 25, left: 10, width: 8, height: 8},
      { id: "handle", word: "HANDLE", translation: "manija", top: 35, left: 24, width: 5, height: 5}
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
      { id: "passport", word: "PASSPORT", translation: "pasaporte", top: 78, left: 88, width: 5, height: 5 },
      { id: "screen", word: "SCREEN", translation: "pantalla", top: 28, left: 95, width: 15, height: 15 },
      { id: "briefcase", word: "BRIEFCASE", translation: "maletin", top: 88, left: 25, width: 10, height: 10},
      { id: "cushion", word: "CUSHION", translation: "cojin", top: 60, left: 65, width: 8, height: 8},
      { id: "dispenser", word: "DISPENSER", translation: "dispensador", top: 48, left: 45, width: 5, height: 10},
      { id: "bush", word: "BUSH", translation: "arbusto", top: 25, left: 30, width: 15, height: 10},
      { id: "floor", word: "FLOOR", translation: "suelo", top: 90, left: 50, width: 35, height: 20}
    ]
  }
];
