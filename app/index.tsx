import { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
  FadeOut,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { Colors } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

const videoSource = require('@/assets/videos/carga.mp4');
const logoSource = require('@/assets/images/logo.png');

export default function LoadingScreen() {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);
  const logoOpacity = useSharedValue(0);

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
  });

  useEffect(() => {
    // Fade in the logo, then fade it out and switch to video
    logoOpacity.value = withTiming(
      1,
      { duration: 800 },
      () => {
        logoOpacity.value = withDelay(
          1000,
          withTiming(0, { duration: 500 }, () => {
            runOnJS(setShowVideo)(true);
          })
        );
      }
    );
  }, []);

  useEffect(() => {
    if (showVideo) {
      player.play();
    }
  }, [showVideo]);

  // Use the new expo-video event listener approach
  useEffect(() => {
    const subscription = player.addListener('statusChange', (status) => {
      // In expo-video, status is an object containing various properties.
      // We can check if it's finished playing by listening to playing changes
      // or by checking the player state.
    });
    
    const playToEndSubscription = player.addListener('playToEnd', () => {
       // When video finishes, navigate to welcome
       router.replace('/welcome' as any);
    });

    return () => {
      subscription.remove();
      playToEndSubscription.remove();
    };
  }, [player, router]);

  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
    };
  });

  return (
    <View style={styles.container}>
      {!showVideo ? (
        <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
          <View style={styles.topRightCircle} />
          <View style={styles.bottomLeftCircle} />
          <Image source={logoSource} style={styles.logo} contentFit="contain" />
        </Animated.View>
      ) : (
        <View style={styles.videoContainer}>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen={false}
            allowsPictureInPicture={false}
            contentFit="contain"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  topRightCircle: {
    position: 'absolute',
    top: 100,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.light.lightGreenBackground,
    opacity: 0.7,
  },
  bottomLeftCircle: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.light.lightGreenBackground,
    opacity: 0.7,
  },
  logo: {
    width: 320,
    height: 180,
    zIndex: 1,
  },
  videoContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.light.background,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
