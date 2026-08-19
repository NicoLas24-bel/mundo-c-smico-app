/**
 * Calcula las estrellas ganadas según la cantidad de errores del jugador.
 *
 * - 0 errores  → 3 estrellas (todo acertado a la primera)
 * - 1 a 4 errores → 2 estrellas
 * - más de 4 errores → 1 estrella
 */
export const getStars = (errors: number): number => {
  if (errors <= 0) return 3;
  if (errors <= 4) return 2;
  return 1;
};