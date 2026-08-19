import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { Check, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

function FlipWord({ word, translation, found, isSelected }: any) {
  const [rotate] = useState(() => new Animated.Value(0));
  const [showBack, setShowBack] = useState(found);
  const animatedRef = useRef(found);

  useEffect(() => {
    if (found && !animatedRef.current) {
      animatedRef.current = true;
      Animated.timing(rotate, {
        toValue: 90,
        duration: 200,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setShowBack(true);
          Animated.timing(rotate, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      });
    }
  }, [found, rotate]);

  const scaleX = rotate.interpolate({ inputRange: [0, 90], outputRange: [1, 0] });

  return (
    <Animated.View style={[styles.flipContainer, { transform: [{ scaleX }] }]}>
      {showBack ? (
        <Text style={styles.flipBackText} numberOfLines={1}>
          {translation}
        </Text>
      ) : (
        <Text
          style={[styles.wordText, isSelected && styles.wordTextSelected]}
          numberOfLines={1}
        >
          {word}
        </Text>
      )}
    </Animated.View>
  );
}

export const WordList = ({ words, foundObjects, selectedWord, onWordSelect }: any) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={['#6366f1', '#a855f7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconContainer}
        >
          <Sparkles color="white" size={16} />
        </LinearGradient>
        <Text style={styles.headerTitle}>WORDS</Text>
        <Text style={styles.progressText}>
          {foundObjects.length}/{words.length}
        </Text>
      </View>

      <View style={styles.divider} />

      {/* Words List */}
      <ScrollView
        contentContainerStyle={styles.wordsContainer}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
      >
        <View style={styles.grid}>
          {words.map((obj: any, i: number) => {
            const isFound = foundObjects.includes(obj.id);
            const isSelected = selectedWord === obj.id;

            return (
              <TouchableOpacity
                key={obj.id}
                onPress={() => onWordSelect(obj.id)}
                disabled={isFound}
                activeOpacity={0.7}
                style={[
                  styles.wordButton,
                  isFound && styles.wordButtonFound,
                  isSelected && styles.wordButtonSelected,
                ]}
              >
                {isSelected && !isFound && (
                  <LinearGradient
                    colors={['#6366f1', '#a855f7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                  />
                )}

                <View style={[
                  styles.numberPill,
                  isFound ? styles.numberPillFound : isSelected ? styles.numberPillSelected : null
                ]}>
                  <Text style={[
                    styles.numberText,
                    isFound ? styles.numberTextFound : isSelected ? styles.numberTextSelected : null
                  ]}>
                    {i + 1}
                  </Text>
                </View>

                <FlipWord
                  word={obj.word}
                  translation={obj.translation}
                  found={isFound}
                  isSelected={isSelected}
                />

                {isFound && (
                  <View style={styles.checkContainer}>
                    <Check color="#4ade80" size={14} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Hint */}
      <View style={styles.hintContainer}>
        <Text style={styles.hintText}>Select a word, then click the object in the scene</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    width: '120%',
    right: '10%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: 'white',
    letterSpacing: 1,
  },
  progressText: {
    marginLeft: 'auto',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#94a3b8',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: 16,
  },
  wordsContainer: {
    paddingBottom: 16,
  },
  scroll: {
    height: 190,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  wordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    overflow: 'hidden',
  },
  wordButtonFound: {
    backgroundColor: 'rgba(34,197,94,0.15)',
    borderColor: 'rgba(34,197,94,0.35)',
  },
  wordButtonSelected: {
    borderColor: 'rgba(99,102,241,0.8)',
    backgroundColor: 'transparent', // gradient background
  },
  numberPill: {
    width: 24,
    height: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginRight: 8,
  },
  numberPillFound: {
    backgroundColor: 'rgba(34,197,94,0.3)',
  },
  numberPillSelected: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  numberText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#64748b',
  },
  numberTextFound: {
    color: '#4ade80',
  },
  numberTextSelected: {
    color: 'white',
  },
  wordText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#e2e8f0',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  wordTextSelected: {
    color: 'white',
  },
  flipContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  flipBackText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#4ade80',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(34,197,94,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  hintContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  hintText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
  }
});
