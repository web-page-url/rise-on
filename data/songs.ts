export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  src: string;
  duration?: number;
  category: string;
  tags: string[];
}

export const songs: Song[] = [
  {
    id: "asan-hai-maheshwari",
    title: "Asan Hai",
    artist: "Maheshwari",
    cover: "/covers/asan-hai.jpg",
    src: "/songs/asan-hai-maheshwari.mp3",
    category: "Morning Motivation",
    tags: ["morning", "start", "positive", "energy", "begin"]
  },
  {
    id: "energetic-maheshwari",
    title: "Energetic Motivation",
    artist: "Maheshwari",
    cover: "/covers/energetic-motivation.jpg",
    src: "/songs/energetic-maheshwari.mp3",
    category: "Workout",
    tags: ["workout", "exercise", "energy", "gym", "fitness", "power"]
  },
  {
    id: "kab-tak-mughko-rokoge",
    title: "Kab Tak Mujhko Rokoge",
    artist: "Maheshwari",
    cover: "/covers/kab-tak-mujhko-rokoge.jpg",
    src: "/songs/kab-tak-mughko-rokoge.mp3",
    category: "Perseverance",
    tags: ["never give up", "perseverance", "determination", "fight", "strong"]
  },
  {
    id: "powerful-maheswari",
    title: "Powerful Motivation",
    artist: "Maheshwari",
    cover: "/covers/powerful-motivation.jpg",
    src: "/songs/powerful-maheswari.mp3",
    category: "Success",
    tags: ["success", "power", "achievement", "winner", "champion"]
  },
  {
    id: "mehnat-khamosi-se-karo-maheshwari",
    title: "Mehnat Khamosi Se Karo",
    artist: "Maheshwari",
    cover: "/covers/mehnat-khamosi-se-karo.jpg",
    src: "/songs/mehnat-khamosi-se-karo-maheshwari.mp3",
    category: "Hard Work",
    tags: ["hard work", "effort", "dedication", "silent", "grind", "focus"]
  },
  {
    id: "night-affirmation-maheshwari",
    title: "Night Affirmation",
    artist: "Maheshwari",
    cover: "/covers/night-affirmation.jpg",
    src: "/songs/night-affirmation-maheshwari.mp3",
    category: "Sleep & Affirmations",
    tags: ["sleep", "affirmation", "night", "positive", "dreams", "subconscious"]
  }
];

export const categories = [
  "All",
  "Morning Motivation",
  "Workout",
  "Perseverance",
  "Success",
  "Hard Work",
  "Sleep & Affirmations"
];
