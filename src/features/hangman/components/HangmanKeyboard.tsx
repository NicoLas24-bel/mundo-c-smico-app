import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

interface HangmanKeyboardProps {
  guessedLetters: Set<string>;
  onGuess: (letter: string) => void;
  disabled?: boolean;
}

export function HangmanKeyboard({ guessedLetters, onGuess, disabled = false }: HangmanKeyboardProps) {
  return (
    <View style={styles.container}>
      {ROWS.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((letter) => {
            const isGuessed = guessedLetters.has(letter);
            return (
              <TouchableOpacity
                key={letter}
                activeOpacity={0.7}
                disabled={disabled || isGuessed}
                onPress={() => onGuess(letter)}
                style={[
                  styles.key,
                  isGuessed && styles.keyDisabled
                ]}
              >
                <Text style={[styles.keyText, isGuessed && styles.keyTextDisabled]}>
                  {letter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const keyWidth = (width - 48 - (9 * 6)) / 10; // Margins and gaps calculation

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  key: {
    width: keyWidth,
    height: keyWidth * 1.25,
    backgroundColor: '#334155',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#475569',
  },
  keyDisabled: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
    opacity: 0.5,
  },
  keyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  keyTextDisabled: {
    color: '#64748b',
  },
});
