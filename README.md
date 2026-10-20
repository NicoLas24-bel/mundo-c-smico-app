# 🌌 Mundo Cósmico — Aprendo Inglés Jugando

> **Aplicación móvil educativa** para aprender vocabulario en inglés de forma interactiva, gamificada y divertida. Diseñada para niños y adultos que quieran expandir su léxico en inglés a través del juego.

---

## 🎯 Idea Principal

**Mundo Cósmico** convierte el aprendizaje del inglés en una aventura. En lugar de memorizar listas de palabras, el jugador explora **escenarios ilustrados del mundo real** (habitaciones, parques, supermercados, aeropuertos…) e **interactúa con los objetos** que aparecen en ellos, asociando visualmente cada palabra en inglés con su representación concreta en el mundo real.

La app combina dos modalidades de juego:

| Modo | Descripción |
|---|---|
| 🔍 **Encuentra el Objeto** | Se muestra una escena ilustrada y una lista de palabras en inglés. El jugador selecciona una palabra y toca el objeto correcto dentro de la imagen. |
| 🪢 **El Ahorcado** | Juego clásico del ahorcado adaptado al vocabulario inglés. El jugador adivina letras para descubrir la palabra oculta antes de agotar sus vidas. |

---

## 🕹️ ¿Cómo funciona?

### Flujo de la aplicación

```
Splash → Pantalla de Bienvenida → Selección de Juego
                                       ├── Encuentra el Objeto → Dashboard del Juego
                                       └── El Ahorcado
```

### 🔍 Modo: Encuentra el Objeto

1. El jugador ve un **escenario ilustrado** (ej.: un dormitorio, una cocina, un parque).
2. En la parte inferior aparece una **lista de palabras en inglés** correspondientes a objetos dentro de la imagen.
3. El jugador selecciona una palabra y luego **toca el área** de la imagen donde se encuentra ese objeto.
4. Si acierta, el objeto queda marcado con ✅ y se reproduce un sonido de acierto.
5. Si falla, suma un **error** (máximo 3 errores antes de perder).
6. Al encontrar todos los objetos, **avanza al siguiente nivel**.
7. El progreso se **guarda automáticamente** para poder continuar en otra sesión.

**Características extra del modo:**
- ⏱️ **Temporizador opcional** — configurable desde Ajustes.
- ⭐ **Sistema de estrellas** — se otorgan según el tiempo restante al completar el nivel.
- 🔊 **Efectos de sonido** — aciertos, errores, completar nivel y victoria general.
- ⏸️ **Menú de pausa** — accesible con el botón físico "atrás" de Android.
- 📖 **Modal de instrucciones** — aparece al iniciar el juego por primera vez.
- 💬 **Detalle de palabra** — toca una palabra encontrada para ver su traducción al español.

### 🪢 Modo: El Ahorcado

El clásico juego del ahorcado con vocabulario en inglés. El jugador elige letras desde un teclado virtual para descubrir la palabra oculta. El dibujo del ahorcado se construye progresivamente con cada error cometido.

---

## 🗺️ Niveles disponibles

La app incluye **15 escenarios** progresivos organizados por dificultad:

| Dificultad | Escenarios |
|---|---|
| 🟢 **Fácil** | Bedroom, Park, Classroom, Living Room, Bathroom |
| 🟡 **Medio** | Kitchen, Street, Supermarket, Restaurant, Hospital |
| 🔴 **Difícil** | Beach, Museum, Gym, Mechanic, Airport |

Cada escenario contiene entre **6 y 10 objetos** a encontrar, con su nombre en inglés y traducción al español.

---

## ✨ Características Generales

- 🌍 Vocabulario en **inglés con traducción al español**
- 📱 Diseño **dark mode** con gradientes y glassmorphism
- 🔒 **Progreso persistente** guardado localmente (AsyncStorage)
- 🔓 **Desbloqueo secuencial** de niveles
- ⚙️ **Pantalla de configuraciones** (activar/desactivar temporizador, etc.)
- 🎨 Interfaz animada con micro-animaciones y transiciones suaves
- 📳 Compatible con **Android e iOS**

---

## 🏗️ Arquitectura del Proyecto

El proyecto usa una arquitectura modular organizada por **features** (características), cada una completamente autocontenida:

```
src/
├── app/                    # Rutas de Expo Router (file-based routing)
│   ├── _layout.tsx
│   ├── index.tsx           # Splash / entrada
│   ├── welcome.tsx
│   ├── game-selection.tsx
│   ├── dashboard.tsx       # Juego: Encuentra el Objeto
│   ├── hangman.tsx
│   ├── menu.tsx
│   └── settings.tsx
│
├── features/               # Módulos por funcionalidad
│   ├── splash/
│   ├── welcome/
│   ├── game-selection/
│   ├── game/               # Lógica principal del juego
│   │   ├── components/     # GameBoard, WordList, GameStatus, GameTimer…
│   │   ├── data/           # levels.ts — definición de todos los niveles y objetos
│   │   ├── hooks/          # useGameState, useGameTimer, useSound
│   │   └── utils/          # storage, stars
│   ├── hangman/
│   ├── dashboard/
│   ├── menu/
│   └── settings/
│
├── router/                 # Navegación centralizada (navigate.to*)
└── shared/                 # Componentes y utilidades compartidas
```

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|---|---|
| [Expo SDK 57](https://expo.dev) | Framework base para React Native |
| [React Native 0.86](https://reactnative.dev) | Motor de la app |
| [Expo Router](https://expo.github.io/router) | Navegación basada en archivos |
| [React Native Reanimated 4](https://docs.swmansion.com/react-native-reanimated/) | Animaciones de alto rendimiento |
| [expo-linear-gradient](https://docs.expo.dev/versions/v57.0.0/sdk/linear-gradient/) | Gradientes visuales |
| [expo-audio](https://docs.expo.dev/versions/v57.0.0/sdk/audio/) | Efectos de sonido |
| [expo-glass-effect](https://docs.expo.dev/versions/v57.0.0/sdk/glass-effect/) | Efectos de glassmorphism |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Persistencia local del progreso |
| [lucide-react-native](https://lucide.dev) | Iconografía |
| TypeScript | Tipado estático |

---

## 🚀 Instalación y ejecución

### Prerrequisitos

- Node.js 18+
- npm o yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Para Android: Android Studio con emulador configurado, o dispositivo físico con Expo Go
- Para iOS: Xcode (solo macOS)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/NicoLas24-bel/mundo-c-smico-app.git
cd mundo-c-smico-app

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm start

# O directamente en Android:
npm run android

# O en iOS:
npm run ios
```

---

## 📂 Scripts disponibles

| Script | Descripción |
|---|---|
| `npm start` | Inicia el servidor de desarrollo Expo |
| `npm run android` | Compila y lanza en Android |
| `npm run ios` | Compila y lanza en iOS |
| `npm run web` | Lanza en navegador web |
| `npm run lint` | Ejecuta ESLint |

---

## 🌿 Ramas del proyecto

| Rama | Descripción |
|---|---|
| `master` | Versión estable de producción |
| `develop` | Rama de integración de nuevas features |
| `feat/*` | Nuevas funcionalidades en desarrollo |
| `feature/*` | Nuevas pantallas o módulos |
| `fix/*` | Correcciones de bugs |

---

## 📄 Licencia

Este proyecto está bajo la licencia incluida en el archivo [LICENSE](./LICENSE).

---

<p align="center">© mundocosmico.cl — Hecho con ❤️ para aprender inglés jugando</p>
