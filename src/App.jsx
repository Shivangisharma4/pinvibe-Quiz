import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Button,
  VStack,
  Text,
  Progress,
  Container,
  Flex,
  useColorModeValue,
  Image,
  Grid,
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react';

// Custom theme to set global background
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'gray.200',
      },
    },
  },
});

// Import images for each vibe (adjust file names to match yours)
const vibeImages = {
  BohoCoder: [
    { id: 'boho1', url: new URL('./images/BohoCoder/boho1.jpg', import.meta.url).href, description: 'Boho Anime Vibe' },
    { id: 'boho2', url: new URL('./images/BohoCoder/boho2.jpg', import.meta.url).href, description: 'Cozy Kawaii' },
    { id: 'boho3', url: new URL('./images/BohoCoder/boho3.jpg', import.meta.url).href, description: 'Pastel Dream' },
    { id: 'boho4', url: new URL('./images/BohoCoder/boho4.jpg', import.meta.url).href, description: 'Boho Bliss' },
    { id: 'boho5', url: new URL('./images/BohoCoder/boho5.jpg', import.meta.url).href, description: 'Anime Nook' },
  ],
  CyberMinimal: [
    { id: 'cyber1', url: new URL('./images/CyberMinimal/cyber1.jpg', import.meta.url).href, description: 'Cyber Anime' },
    { id: 'cyber2', url: new URL('./images/CyberMinimal/cyber2.jpg', import.meta.url).href, description: 'Neon Minimal' },
    { id: 'cyber3', url: new URL('./images/CyberMinimal/cyber3.jpg', import.meta.url).href, description: 'Tech Kawaii' },
    { id: 'cyber4', url: new URL('./images/CyberMinimal/cyber4.jpg', import.meta.url).href, description: 'Sleek Vibes' },
    { id: 'cyber5', url: new URL('./images/CyberMinimal/cyber5.jpg', import.meta.url).href, description: 'Cyber Chill' },
  ],
  RetroGeek: [
    { id: 'retro1', url: new URL('./images/RetroGeek/retro1.jpg', import.meta.url).href, description: 'Vaporwave Anime' },
    { id: 'retro2', url: new URL('./images/RetroGeek/retro2.jpg', import.meta.url).href, description: 'Retro Tech' },
    { id: 'retro3', url: new URL('./images/RetroGeek/retro3.jpg', import.meta.url).href, description: '80s Vibes' },
    { id: 'retro4', url: new URL('./images/RetroGeek/retro4.jpg', import.meta.url).href, description: 'Anime Nostalgia' },
    { id: 'retro5', url: new URL('./images/RetroGeek/retro5.jpg', import.meta.url).href, description: 'Geeky Glow' },
  ],
  WildEclectic: [
    { id: 'eclectic1', url: new URL('./images/WildEclectic/eclectic1.jpg', import.meta.url).href, description: 'Eclectic Anime' },
    { id: 'eclectic2', url: new URL('./images/WildEclectic/eclectic2.jpg', import.meta.url).href, description: 'Color Burst' },
    { id: 'eclectic3', url: new URL('./images/WildEclectic/eclectic3.jpg', import.meta.url).href, description: 'Wild Kawaii' },
    { id: 'eclectic4', url: new URL('./images/WildEclectic/eclectic4.jpg', import.meta.url).href, description: 'Mixed Vibes' },
    { id: 'eclectic5', url: new URL('./images/WildEclectic/eclectic5.jpg', import.meta.url).href, description: 'Anime Chaos' },
  ],
  GothicDev: [
    { id: 'gothic1', url: new URL('./images/GothicDev/gothic1.jpg', import.meta.url).href, description: 'Gothic Anime' },
    { id: 'gothic2', url: new URL('./images/GothicDev/gothic2.jpg', import.meta.url).href, description: 'Dark Kawaii' },
    { id: 'gothic3', url: new URL('./images/GothicDev/gothic3.jpg', import.meta.url).href, description: 'Mysterious Vibe' },
    { id: 'gothic4', url: new URL('./images/GothicDev/gothic4.jpg', import.meta.url).href, description: 'Anime Shadows' },
    { id: 'gothic5', url: new URL('./images/GothicDev/gothic5.jpg', import.meta.url).href, description: 'Goth Glow' },
  ],
  ZenCoder: [
    { id: 'zen1', url: new URL('./images/ZenCoder/zen1.jpg', import.meta.url).href, description: 'Zen Anime' },
    { id: 'zen2', url: new URL('./images/ZenCoder/zen2.jpg', import.meta.url).href, description: 'Pastel Calm' },
    { id: 'zen3', url: new URL('./images/ZenCoder/zen3.jpg', import.meta.url).href, description: 'Serene Kawaii' },
    { id: 'zen4', url: new URL('./images/ZenCoder/zen4.jpg', import.meta.url).href, description: 'Peaceful Vibe' },
    { id: 'zen5', url: new URL('./images/ZenCoder/zen5.jpg', import.meta.url).href, description: 'Anime Zen' },
  ],
};

// Vibe explanations
const vibeExplanations = {
  BohoCoder: "You’re a free-spirited soul with a love for cozy corners and soft pastels. Your vibe is all about blending boho charm with anime dreams—think flower crowns and pixelated sunsets!",
  CyberMinimal: "Sleek, sharp, and futuristic—you’re the coder who thrives in neon glows and minimalist lines. Your aesthetic screams cyberpunk anime with a chill, techy edge.",
  RetroGeek: "Nostalgia is your jam! You’re rocking that vaporwave anime life—old-school tech, bright oranges, and a playlist straight out of the 80s, all wrapped in geeky glory.",
  WildEclectic: "Chaos meets creativity in your world! You’re a whirlwind of colors, patterns, and anime flair—think eclectic vibes with a side of wild, untamed energy.",
  GothicDev: "Dark, mysterious, and oh-so-cool—you’re the coder with a gothic anime soul. Candles, shadows, and a touch of kawaii darkness define your hauntingly beautiful vibe.",
  ZenCoder: "Calm, serene, and totally zen—you’re all about peaceful vibes and pastel anime aesthetics. Your space is a tranquil escape, blending nature with soft, dreamy tones.",
};

// Helper function to shuffle an array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [vibeImagesToShow, setVibeImagesToShow] = useState([]);

  const questions = [
    { question: "Where do you like to spend your weekend?", options: ["Home with a notebook", "City coding event", "Forest with no internet"] },
    { question: "What colors do you like for your computer?", options: ["Light and soft", "Dark and black", "Old-style orange"] },
    { question: "What’s your favorite work area?", options: ["Small space with plants", "Clean desk with two screens", "Messy table with tools"] },
    { question: "What music do you listen to?", options: ["Calm coding music", "Fast electronic songs", "Mixed fun tunes"] },
    { question: "What clothes do you wear?", options: ["Sweater and pants", "Cool dark jacket", "Old funny shirt"] },
    { question: "Where do you want to go for a trip?", options: ["Beach with a book", "Big tech meeting", "Quiet mountain"] },
    { question: "What drink do you like in the morning?", options: ["Fancy coffee", "Energy drink", "Green tea"] },
    { question: "What do you put on your wall?", options: ["Flower pictures", "Computer code art", "Bright signs"] },
    { question: "What lights do you like at night?", options: ["Soft small lights", "Colorful computer lights", "Warm candles"] },
    { question: "Which season do you enjoy?", options: ["Spring with new flowers", "Hot summer", "Cold dark winter"] },
    { question: "What desk do you want for coding?", options: ["Simple wood desk", "Shiny glass desk", "Fun painted desk"] },
    { question: "What do you wear on your wrist?", options: ["Beads bracelet", "Smart watch", "Old disk pin"] },
    { question: "What do you do at night?", options: ["Make something by hand", "Fix code", "Look at stars"] },
    { question: "What furniture do you like?", options: ["Old wood chair", "New metal table", "Mixed old finds"] },
    { question: "What smell do you enjoy?", options: ["Flowers and lemon", "Rain and metal", "Books and smoke"] },
    { question: "Where do you like to think?", options: ["Window with pillows", "Room with tech", "Outside bed"] },
    { question: "What feel do you like to touch?", options: ["Soft fabric", "Hard metal", "Rough cloth"] },
    { question: "How do you like your photos?", options: ["Bright and warm", "Clear black and white", "Old TV look"] },
    { question: "What plant do you keep near you?", options: ["Big green plant", "Small dry plant", "Long climbing plant"] },
    { question: "Where do you want to hide and work?", options: ["Tree house with internet", "City roof room", "Dark tech cave"] },
  ];

  useEffect(() => {
    setShuffledQuestions(shuffleArray([...questions]));
  }, []);

  useEffect(() => {
    if (quizCompleted) {
      const vibes = determineVibes();
      const primaryVibe = vibes.primary;
      const images = vibeImages[primaryVibe] || [];
      setVibeImagesToShow(images.slice(0, 5));
    }
  }, [quizCompleted]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizCompleted(false);
    setShuffledQuestions(shuffleArray([...questions]));
    setVibeImagesToShow([]);
  };

  const determineVibes = () => {
    const vibeCounts = {
      BohoCoder: 0,
      CyberMinimal: 0,
      RetroGeek: 0,
      WildEclectic: 0,
      GothicDev: 0,
      ZenCoder: 0,
    };

    answers.forEach((answer) => {
      if (answer === "Home with a notebook" || answer === "Light and soft" || answer === "Small space with plants" || answer === "Calm coding music" || answer === "Sweater and pants" || answer === "Fancy coffee" || answer === "Flower pictures" || answer === "Soft small lights" || answer === "Flowers and lemon" || answer === "Big green plant") vibeCounts.BohoCoder += answer.includes("soft") || answer.includes("plant") ? 2 : 1;
      if (answer === "City coding event" || answer === "Dark and black" || answer === "Clean desk with two screens" || answer === "Fast electronic songs" || answer === "Cool dark jacket" || answer === "Energy drink" || answer === "Computer code art" || answer === "Colorful computer lights" || answer === "Rain and metal" || answer === "Small dry plant") vibeCounts.CyberMinimal += answer.includes("clean") || answer.includes("tech") ? 2 : 1;
      if (answer === "Forest with no internet" || answer === "Old-style orange" || answer === "Old funny shirt" || answer === "Big tech meeting" || answer === "Bright signs" || answer === "Old disk pin" || answer === "Old TV look" || answer === "Dark tech cave" || answer === "Messy table with tools") vibeCounts.RetroGeek += answer.includes("old") || answer.includes("retro") ? 2 : 1;
      if (answer === "Mixed fun tunes" || answer === "Beach with a book" || answer === "Fun painted desk" || answer === "Mixed old finds" || answer === "Outside bed" || answer === "Long climbing plant" || answer === "Fix code" || answer === "City roof room") vibeCounts.WildEclectic += answer.includes("mixed") || answer.includes("fun") ? 2 : 1;
      if (answer === "Cold dark winter" || answer === "Dark and black" || answer === "Warm candles" || answer === "Books and smoke" || answer === "Clear black and white" || answer === "Dark tech cave" || answer === "Cool dark jacket" || answer === "Fix code") vibeCounts.GothicDev += answer.includes("dark") || answer.includes("cold") ? 2 : 1;
      if (answer === "Forest with no internet" || answer === "Clean desk with two screens" || answer === "Green tea" || answer === "Quiet mountain" || answer === "Look at stars" || answer === "Flowers and lemon" || answer === "Window with pillows" || answer === "Big green plant") vibeCounts.ZenCoder += answer.includes("calm") || answer.includes("quiet") ? 2 : 1;
    });

    const sortedVibes = Object.entries(vibeCounts).sort((a, b) => b[1] - a[1]).map(([vibe]) => vibe);
    return { primary: sortedVibes[0], secondary: sortedVibes[1] && vibeCounts[sortedVibes[1]] > 0 ? sortedVibes[1] : null };
  };

  const bgColor = useColorModeValue('black', 'black');
  const gradientBg = 'linear-gradient(135deg, #EF5350 0%, #D32F2F 100%)';
  const buttonHover = { bg: '#FFCDD2', color: 'red.800', transform: 'scale(1.05)' };
  const cardBg = '#F5F5F5';
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const patternOverlay = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23EF5350' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='2'/%3E%3Ccircle cx='13' cy='13' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundSize: '20px 20px',
  };
  const progressGradient = 'linear-gradient(to right, #FFFFFF 0%, #EF5350 100%)';

  return (
    <Container py={10} bg={bgColor} minH="100vh" {...patternOverlay} maxW="full" centerContent>
      <Flex
        direction="column"
        align="center"
        justify={currentQuestion === 0 ? "center" : "flex-start"}
        minH="100vh"
        w="full"
        maxW="md"
      >
        <Heading
          as="h1"
          mb={8}
          fontSize={{ base: '3xl', md: '4xl' }}
          fontFamily="'Comic Neue', cursive"
          bgGradient={gradientBg}
          bgClip="text"
          textShadow="1px 1px 3px rgba(0, 0, 0, 0.3)"
        >
          Pinvibe Quiz
        </Heading>

        {!quizCompleted ? (
          currentQuestion === 0 ? (
            <Button
              bgGradient={gradientBg}
              color="white"
              size="lg"
              borderRadius="full"
              boxShadow="md"
              fontFamily="'Comic Neue', cursive"
              _hover={buttonHover}
              transition="all 0.3s"
              onClick={() => setCurrentQuestion(1)}
            >
              Find Your Vibe
            </Button>
          ) : (
            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              boxShadow="lg"
              w="full"
              transition="all 0.3s"
              _hover={{ boxShadow: 'xl' }}
            >
              <VStack spacing={6}>
                <Progress
                  value={(currentQuestion / questions.length) * 100}
                  size="sm"
                  bgGradient={progressGradient}
                  w="full"
                  borderRadius="md"
                />
                <Text fontSize="sm" color={textColor} fontFamily="'Comic Neue', cursive">
                  Q{currentQuestion}/{questions.length}
                </Text>
                <Heading
                  as="h2"
                  size="md"
                  textAlign="center"
                  color="red.800"
                  fontFamily="'Comic Neue', cursive"
                >
                  {shuffledQuestions[currentQuestion - 1]?.question}
                </Heading>
                <VStack spacing={4} w="full">
                  {shuffledQuestions[currentQuestion - 1]?.options.map((option, index) => (
                    <Button
                      key={index}
                      bg="#F5F5F5"
                      color="red.700"
                      w="full"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="red.300"
                      fontFamily="'Comic Neue', cursive"
                      _hover={buttonHover}
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </VStack>
              </VStack>
            </Box>
          )
        ) : (
          <Box
            bg={cardBg}
            p={8}
            borderRadius="xl"
            boxShadow="lg"
            w="full"
            textAlign="center"
          >
            <VStack spacing={6}>
              <Heading as="h2" size="xl" color="red.800" fontFamily="'Comic Neue', cursive">
                Your Vibes
              </Heading>
              {(() => {
                const vibes = determineVibes();
                return (
                  <>
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      bgGradient={gradientBg}
                      bgClip="text"
                      fontFamily="'Comic Neue', cursive"
                    >
                      {vibes.primary}
                    </Text>
                    {vibes.secondary && (
                      <Text
                        fontSize="lg"
                        color="red.600"
                        fontFamily="'Comic Neue', cursive"
                      >
                        with a bit of {vibes.secondary}
                      </Text>
                    )}
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontFamily="'Comic Neue', cursive"
                      px={4}
                      lineHeight="tall"
                    >
                      {vibeExplanations[vibes.primary]}
                    </Text>
                  </>
                );
              })()}
              {vibeImagesToShow.length > 0 ? (
                <Grid
                  templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
                  gap={4}
                  w="full"
                  maxW="sm"
                  autoRows="auto"
                  position="relative"
                >
                  {vibeImagesToShow.map((image, index) => (
                    <Box
                      key={image.id}
                      borderRadius="md"
                      overflow="hidden"
                      boxShadow="md"
                      transform={
                        index === 0 ? 'rotate(-5deg)' :
                        index === 1 ? 'rotate(3deg)' :
                        index === 2 ? 'rotate(-2deg)' :
                        index === 3 ? 'rotate(5deg)' : 'rotate(0deg)'
                      }
                      transition="transform 0.2s"
                      _hover={{ transform: 'scale(1.05)', zIndex: 1 }}
                      bg="white"
                      border="2px solid"
                      borderColor="red.300"
                    >
                      <Image src={image.url} alt={image.description} objectFit="cover" w="full" h="150px" />
                      <Text fontSize="sm" color={textColor} p={2} fontFamily="'Comic Neue', cursive">
                        {image.description}
                      </Text>
                    </Box>
                  ))}
                </Grid>
              ) : (
                <Text fontSize="sm" color={textColor} fontFamily="'Comic Neue', cursive">
                  No images found, try again!
                </Text>
              )}
              <Button
                bgGradient={gradientBg}
                color="white"
                borderRadius="full"
                boxShadow="md"
                fontFamily="'Comic Neue', cursive"
                _hover={buttonHover}
                onClick={resetQuiz}
              >
                Try Again
              </Button>
            </VStack>
          </Box>
        )}
      </Flex>
    </Container>
  );
}

export default function Root() {
  return (
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  );
}
