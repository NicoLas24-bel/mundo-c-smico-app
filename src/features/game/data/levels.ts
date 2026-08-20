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
      { id: "bed", word: "BED", translation: "CAMA", top: 63, left: 50, width: 45, height: 22 },
      { id: "armchair", word: "ARMCHAIR", translation: "SILLÓN", top: 64, left: 85, width: 18, height: 22 },
      { id: "window", word: "WINDOW", translation: "VENTANA", top: 28, left: 24, width: 23, height: 24 },
      { id: "lamp", word: "LAMP", translation: "LÁMPARA", top: 40, left: 46, width: 8, height: 16 },
      { id: "bear", word: "BEAR", translation: "OSO", top: 84, left: 69, width: 10, height: 10 },
      { id: "ball", word: "BALL", translation: "PELOTA", top: 85, left: 80, width: 9, height: 10 },
    ]
  },
  {
    id: 2,
    name: "Park",
    difficulty: "easy",
    image: require('../../../../assets/images/levels/park/park.png'),
    objects: [
      { id: "sun", word: "SUN", translation: "SOL", top: 16, left: 79, width: 20, height: 20 },
      { id: "ball", word: "BALL", translation: "PELOTA", top: 65, left: 34, width: 15, height: 8 },
      { id: "bench", word: "BENCH", translation: "BANCO", top: 73, left: 78, width: 30, height: 15 },
      { id: "bicycle", word: "BICYCLE", translation: "BICICLETA", top: 83, left: 18, width: 22, height: 22 },
      { id: "flower", word: "FLOWER", translation: "FLOR", top: 58, left: 10, width: 15, height: 10 },
      { id: "lake", word: "LAKE", translation: "LAGO", top: 56, left: 83, width: 25, height: 10 },
    ]
  },
  {
    id: 3,
    name: "Classroom",
    difficulty: "easy",
    image: require('../../../../assets/images/levels/classroom/classroom.png'),
    objects: [
      { id: "desk", word: "DESK", translation: "PUPITRE", top: 70, left: 52, width: 38, height: 20 },
      { id: "clock", word: "CLOCK", translation: "RELOJ", top: 16, left: 48, width: 12, height: 13 },
      { id: "book", word: "BOOK", translation: "LIBRO", top: 55, left: 57, width: 15, height: 11 },
      { id: "board", word: "BOARD", translation: "PIZARRA", top: 30, left: 80, width: 40, height: 22 },
      { id: "map", word: "MAP", translation: "MAPA", top: 30, left: 49, width: 19, height: 10 },
      { id: "earth", word: "EARTH", translation: "TIERRA", top: 94, left: 38, width: 15, height: 9 },
    ]
  },
  {
    id: 4,
    name: "Living Room",
    difficulty: "easy",
    image: require('../../../../assets/images/levels/living_room/living_room.png'),
    objects: [
      { id: "sofa", word: "SOFA", translation: "SOFÁ", top: 60, left: 30, width: 38, height: 22 },
      { id: "television", word: "TELEVISION", translation: "TELEVISOR", top: 52, left: 82, width: 22, height: 18 },
      { id: "rug", word: "RUG", translation: "ALFOMBRA", top: 86, left: 50, width: 36, height: 16 },
      { id: "painting", word: "PAINTING", translation: "CUADRO", top: 28, left: 40, width: 22, height: 18 },
      { id: "curtain", word: "CURTAIN", translation: "CORTINA", top: 26, left: 76, width: 10, height: 20 },
      { id: "ceiling", word: "CEILING", translation: "TECHO", top: 2, left: 47, width: 50, height: 18 }
    ]
  },
  {
    id: 5,
    name: "Bathroom",
    difficulty: "easy",
    image: require('../../../../assets/images/levels/bathroom/bathroom.png'),
    objects: [
      { id: "mirror", word: "MIRROR", translation: "ESPEJO", top: 27, left: 54, width: 30, height: 30 },
      { id: "towel", word: "TOWEL", translation: "TOALLA", top: 65, left: 85, width: 15, height: 25 },
      { id: "soap", word: "SOAP", translation: "JABÓN", top: 55, left: 40, width: 15, height: 8 },
      { id: "toothbrush", word: "TOOTHBRUSH", translation: "CEPILLO DE DIENTES", top: 50, left: 69, width: 10, height: 12 },
      { id: "shower", word: "SHOWER", translation: "DUCHA", top: 25, left: 90, width: 22, height: 38 },
      { id: "planter", word: "PLANTER", translation: "MACETERO", top: 49, left: 9, width: 10, height: 12 }
    ]
  },
  {
    id: 6,
    name: "Kitchen",
    difficulty: "medium",
    image: require('../../../../assets/images/levels/kitchen/kitchen.png'),
    objects: [
      { id: "table", word: "TABLE", translation: "MESA", top: 60, left: 30, width: 40, height: 18 },
      { id: "oven", word: "OVEN", translation: "HORNO", top: 50, left: 78, width: 20, height: 15 },
      { id: "plate", word: "PLATE", translation: "PLATO", top: 55, left: 49, width: 20, height: 8 },
      { id: "cup", word: "CUP", translation: "TAZA", top: 55, left: 64, width: 10, height: 9 },
      { id: "house", word: "HOUSE", translation: "CASA", top: 25, left: 51, width: 15, height: 20 },
      { id: "plant", word: "PLANT", translation: "PLANTA", top: 19, left: 16, width: 10, height: 10 },
      { id: "scrubber", word: "SCRUBBER", translation: "ESTROPAJO", top: 31, left: 95, width: 10, height: 11 },
      { id: "skillet", word: "SKILLET", translation: "SARTÉN", top: 37, left: 73, width: 10, height: 10 }
    ]
  },
  {
    id: 7,
    name: "Street",
    difficulty: "medium",
    image: require('../../../../assets/images/levels/street/street.png'),
    objects: [
      { id: "car", word: "CAR", translation: "AUTO", top: 80, left: 55, width: 25, height: 16 },
      { id: "bus", word: "BUS", translation: "AUTOBÚS", top: 58, left: 22, width: 32, height: 26 },
      { id: "tree", word: "TREE", translation: "ÁRBOL", top: 42, left: 77, width: 20, height: 38 },
      { id: "road", word: "ROAD", translation: "CALLE", top: 92, left: 50, width: 90, height: 14 },
      { id: "cloud", word: "CLOUD", translation: "NUBE", top: 12, left: 20, width: 30, height: 10 },
      { id: "children", word: "CHILDREN", translation: "NIÑOS", top: 77, left: 87, width: 15, height: 15 },
      { id: "dog", word: "DOG", translation: "PERRO", top: 54, left: 65, width: 8, height: 8 },
      { id: "pushchair", word: "PUSHCHAIR", translation: "COCHECITO", top: 58, left: 91, width: 8, height: 8 }
    ]
  },
  {
    id: 8,
    name: "Supermarket",
    difficulty: "medium",
    image: require('../../../../assets/images/levels/supermarket/supermarket.png'),
    objects: [
      { id: "cart", word: "CART", translation: "CARRITO", top: 85, left: 88, width: 10, height: 14 },
      { id: "apple", word: "APPLE", translation: "MANZANA", top: 67, left: 36, width: 10, height: 6 },
      { id: "bread", word: "BREAD", translation: "PAN", top: 62, left: 18, width: 20, height: 6 },
      { id: "milk", word: "MILK", translation: "LECHE", top: 32, left: 74, width: 3, height: 5 },
      { id: "fish", word: "FISH", translation: "PESCADO", top: 16, left: 10, width: 10, height: 9 },
      { id: "fridge", word: "FRIDGE", translation: "REFRIGERADOR", top: 30, left: 90, width: 15, height: 10 },
      { id: "lettuce", word: "LETTUCE", translation: "LECHUGA", top: 48, left: 44, width: 10, height: 6 },
      { id: "bag", word: "BAG", translation: "BOLSA", top: 59, left: 83, width: 5, height: 5 }
    ]
  },
  {
    id: 9,
    name: "Restaurant",
    difficulty: "medium",
    image: require('../../../../assets/images/levels/restaurant/restaurant.png'),
    objects: [
      { id: "menu", word: "MENU", translation: "MENÚ", top: 75, left: 50, width: 40, height: 30 },
      { id: "waiter", word: "WAITER", translation: "MESERO", top: 43, left: 54, width: 20, height: 35 },
      { id: "fork", word: "FORK", translation: "TENEDOR", top: 79, left: 25, width: 10, height: 18 },
      { id: "knife", word: "KNIFE", translation: "CUCHILLO", top: 80, left: 75, width: 10, height: 20 },
      { id: "chef", word: "CHEF", translation: "CHEF", top: 20, left: 30, width: 12, height: 12 },
      { id: "napkin", word: "NAPKIN", translation: "SERVILLETA", top: 84, left: 86, width: 10, height: 10 },
      { id: "tablecloth", word: "TABLECLOTH", translation: "MANTEL", top: 95, left: 50, width: 50, height: 10 },
      { id: "salad", word: "SALAD", translation: "ENSALADA", top: 73, left: 84, width: 10, height: 10 },
    ]
  },
  {
    id: 10,
    name: "Hospital",
    difficulty: "medium",
    image: require('../../../../assets/images/levels/hospital/hospital.png'),
    objects: [
      { id: "doctor", word: "DOCTOR", translation: "DOCTOR", top: 33, left: 46, width: 12, height: 12 },
      { id: "stretcher", word: "STRETCHER", translation: "CAMILLA", top: 72, left: 65, width: 36, height: 26 },
      { id: "stethoscope", word: "STETHOSCOPE", translation: "ESTETOSCOPIO", top: 45, left: 43, width: 10, height: 10 },
      { id: "ambulance", word: "AMBULANCE", translation: "AMBULANCIA", top: 40, left: 20, width: 22, height: 16 },
      { id: "light_bulb", word: "LIGHT BULB", translation: "BOMBILLA", top: 5, left: 50, width: 22, height: 16 },
      { id: "syrup", word: "SYRUP", translation: "JARABE", top: 60, left: 15, width: 5, height: 5 },
      { id: "serum", word: "SERUM", translation: "SUERO", top: 30, left: 65, width: 5, height: 10 },
      { id: "building", word: "BUILDING", translation: "EDIFICIO", top: 26, left: 25, width: 10, height: 10 },
    ]
  },
  {
    id: 11,
    name: "Beach",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/beach/beach.png'),
    objects: [
      { id: "ocean", word: "OCEAN", translation: "OCÉANO", top: 50, left: 36, width: 40, height: 18 },
      { id: "umbrella", word: "UMBRELLA", translation: "SOMBRILLA", top: 55, left: 75, width: 24, height: 20 },
      { id: "shell", word: "SHELL", translation: "CONCHA", top: 86, left: 18, width: 15, height: 10 },
      { id: "sand", word: "SAND", translation: "ARENA", top: 92, left: 58, width: 45, height: 15 },
      { id: "shovel", word: "SHOVEL", translation: "PALA", top: 70, left: 86, width: 10, height: 10 },
      { id: "sailboat", word: "SAILBOAT", translation: "VELERO", top: 35, left: 73, width: 10, height: 14 },
      { id: "palm_tree", word: "PALM TREE", translation: "PALMERA", top: 20, left: 6, width: 10, height: 14 },
      { id: "footprint", word: "FOOTPRINT", translation: "HUELLA", top: 88, left: 85, width: 10, height: 10 },
      { id: "clam", word: "CLAM", translation: "ALMEJA", top: 91, left: 32, width: 8, height: 8 },
      { id: "bucket", word: "BUCKET", translation: "CUBETA", top: 79, left: 81, width: 10, height: 10 },


    ]
  },
  {
    id: 12,
    name: "Museum",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/museum/museum.png'),
    objects: [
      { id: "dinosaur", word: "DINOSAUR", translation: "DINOSAURIO", top: 50, left: 65, width: 40, height: 25 },
      { id: "rainbow", word: "RAINBOW", translation: "ARCOIRIS", top: 52, left: 23, width: 10, height: 10 },
      { id: "statue", word: "STATUE", translation: "ESTATUA", top: 25, left: 7, width: 15, height: 25 },
      { id: "guard", word: "GUARD", translation: "GUARDIA", top: 40, left: 90, width: 8, height: 20 },
      { id: "vase", word: "VASE", translation: "FLORERO", top: 85, left: 94, width: 8, height: 8 },
      { id: "dress", word: "DRESS", translation: "VESTIDO", top: 80, left: 20, width: 8, height: 8 },
      { id: "skull", word: "SKULL", translation: "CRÁNEO", top: 25, left: 53, width: 10, height: 10 },
      { id: "egg", word: "EGG", translation: "HUEVO", top: 67, left: 58, width: 5, height: 10 },
      { id: "purse", word: "PURSE", translation: "CARTERA", top: 95, left: 73, width: 8, height: 8 },
      { id: "velvet_rope", word: "VELVET ROPE", translation: "CUERDA DE TERCIOPELO", top: 74, left: 74, width: 10, height: 8 },

    ]
  },
  {
    id: 13,
    name: "Gym",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/gym/gym.png'),
    objects: [
      { id: "punching_bag", word: "PUNCHING BAG", translation: "SACO DE BOXEO", top: 26, left: 26, width: 10, height: 20 },
      { id: "treadmill", word: "TREADMILL", translation: "CINTA DE CORRER", top: 40, left: 55, width: 20, height: 20 },
      { id: "exercise_bike", word: "EXERCISE BIKE", translation: "BICICLETA ESTÁTICA", top: 28, left: 10, width: 15, height: 20 },
      { id: "dumbbell", word: "DUMBBELL", translation: "MANCUERNA", top: 72, left: 4, width: 15, height: 8 },
      { id: "yoga_mat", word: "YOGA MAT", translation: "ESTERILLA", top: 74, left: 50, width: 10, height: 10 },
      { id: "water_bottle", word: "WATER BOTTLE", translation: "BOTELLA DE AGUA", top: 85, left: 68, width: 8, height: 8 },
      { id: "mirror", word: "MIRROR", translation: "ESPEJO", top: 53, left: 20, width: 15, height: 25 },
      { id: "jump_rope", word: "JUMP ROPE", translation: "CUERDA PARA SALTAR", top: 93, left: 45, width: 10, height: 10 },
      { id: "barbell", word: "BARBELL", translation: "BARRA", top: 75, left: 85, width: 20, height: 30 },
      { id: "kettlebell", word: "KETTLEBELL", translation: "PESA RUSA", top: 82, left: 18, width: 8, height: 8 },

    ]
  },
  {
    id: 14,
    name: "Mechanic",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/mechanic/mechanic.png'),
    objects: [
      { id: "tire", word: "TIRE", translation: "NEUMÁTICO", top: 30, left: 20, width: 17, height: 20 },
      { id: "wrench", word: "WRENCH", translation: "LLAVE INGLESA", top: 70, left: 15, width: 10, height: 5 },
      { id: "oil_can", word: "OIL CAN", translation: "LATA DE ACEITE", top: 64, left: 8, width: 8, height: 10 },
      { id: "battery", word: "BATTERY", translation: "BATERÍA", top: 10, left: 60, width: 10, height: 10 },
      { id: "toolbox", word: "TOOLBOX", translation: "CAJA DE HERRAMIENTAS", top: 30, left: 52, width: 15, height: 12 },
      { id: "funnel", word: "FUNNEL", translation: "EMBUDO", top: 80, left: 28, width: 8, height: 8 },
      { id: "gloves", word: "GLOVES", translation: "GUANTES", top: 85, left: 65, width: 10, height: 10 },
      { id: "bolt", word: "BOLT", translation: "PERNO", top: 68, left: 74, width: 10, height: 10 },
      { id: "screwdriver", word: "SCREWDRIVER", translation: "DESTORNILLADOR", top: 25, left: 67, width: 13, height: 8 },
      { id: "bumper", word: "BUMPER", translation: "PARACHOQUES", top: 60, left: 65, width: 20, height: 8 },
    ]
  },
  {
    id: 15,
    name: "Airport",
    difficulty: "hard",
    image: require('../../../../assets/images/levels/airport/airport.png'),
    objects: [
      { id: "airplane", word: "AIRPLANE", translation: "AVIÓN", top: 35, left: 65, width: 30, height: 15 },
      { id: "suitcase", word: "SUITCASE", translation: "MALETA", top: 70, left: 60, width: 8, height: 15 },
      { id: "pilot", word: "PILOT", translation: "PILOTO", top: 65, left: 35, width: 10, height: 25 },
      { id: "passport", word: "PASSPORT", translation: "PASAPORTE", top: 78, left: 88, width: 5, height: 5 },
      { id: "screen", word: "SCREEN", translation: "PANTALLA", top: 28, left: 95, width: 15, height: 15 },
      { id: "briefcase", word: "BRIEFCASE", translation: "MALETÍN", top: 88, left: 25, width: 10, height: 10 },
      { id: "cushion", word: "CUSHION", translation: "COJÍN", top: 60, left: 65, width: 8, height: 8 },
      { id: "dispenser", word: "DISPENSER", translation: "DISPENSADOR", top: 48, left: 45, width: 5, height: 10 },
      { id: "bush", word: "BUSH", translation: "ARBUSTO", top: 25, left: 30, width: 15, height: 10 },
      { id: "floor", word: "FLOOR", translation: "SUELO", top: 90, left: 50, width: 35, height: 20 }
    ]
  }
];
