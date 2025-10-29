# Rise On - Motivational Music App

A beautiful, modern web application that delivers motivational songs to fuel your focus and feed your fire.

## 🚀 Features

- **Modern UI**: Built with Next.js 16, TypeScript, and Tailwind CSS
- **Smooth Animations**: Framer Motion powered transitions and effects
- **Responsive Design**: Mobile-first approach that works on all devices
- **Audio Player**: Full-featured music player with controls
- **Dark Theme**: Modern dark design with gradient accents
- **Search & Filter**: Find songs by category and search terms
- **Live at**: [https://rise-on.vercel.app/](https://rise-on.vercel.app/)

## 🎵 Pages

### Home (/)
- Hero section with motivational messaging
- Animated background with floating particles
- Call-to-action buttons to explore the app

### Discover (/discover)
- Grid layout of motivational songs
- Song cards with cover art and metadata
- Advanced search and category filtering
- Click to play functionality
- Responsive grid that adapts to screen size

### About (/about)
- Mission statement and app philosophy
- Feature highlights
- Inspirational content

## 🎮 How to Use

1. **Start the app**: Click "Start Listening" on the home page
2. **Browse songs**: Navigate to the Discover page to see all available tracks
3. **Search & Filter**: Use the search bar and category buttons to find specific songs
4. **Play music**: Click on any song card to start playing
5. **Control playback**: Use the bottom player controls for play/pause, skip, and volume

## 🔧 Technical Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: shadcn/ui
- **Audio**: HTML5 Audio API
- **State Management**: React Context

## 📁 Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Home page
├── discover/
│   └── page.tsx       # Song discovery page
├── about/
│   └── page.tsx       # About page
components/
├── Header.tsx         # Navigation header
├── Footer.tsx         # App footer
├── SongCard.tsx       # Individual song display
├── Player.tsx         # Bottom music player
├── SearchAndFilter.tsx # Search and category filtering
contexts/
├── PlayerContext.tsx  # Music player state management
data/
├── songs.ts          # Song metadata and configuration
public/
├── songs/            # Place .mp3 files here
├── covers/           # Place album cover images here
```

## 🎼 Adding Songs

1. Add your `.mp3` files to `public/songs/`
2. Add cover images to `public/covers/`
3. Update `data/songs.ts` with song metadata:

```typescript
{
  id: "your-song-id",
  title: "Song Title",
  artist: "Artist Name",
  cover: "/covers/your-cover.jpg",
  src: "/songs/your-song.mp3",
  category: "Your Category",
  tags: ["tag1", "tag2", "tag3"]
}
```

## 🏃‍♂️ Running the App

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Design Philosophy

- **Motivational**: Every element inspires action and focus
- **Modern**: Clean gradients, smooth animations, contemporary UI
- **Accessible**: Proper contrast, keyboard navigation, screen reader support
- **Performance**: Optimized loading, lazy images, efficient animations

## 🌟 Key Features

- **Persistent Player**: Stays visible across page navigation
- **Advanced Search**: Find songs by title, artist, category, or tags
- **Category Filtering**: Browse by Morning Motivation, Workout, Success, etc.
- **Smooth Transitions**: Page transitions and micro-interactions
- **Responsive Layout**: Adapts perfectly to mobile and desktop
- **Type-Safe**: Full TypeScript coverage for reliability
- **SEO Optimized**: Proper meta tags and semantic HTML

## 📱 Mobile Experience

- Touch-optimized controls
- Responsive grid layouts
- Mobile-first design approach
- Optimized for iPhone and Android devices

---

**Fuel your focus. Feed your fire.** 🔥

*Live at: [https://rise-on.vercel.app/](https://rise-on.vercel.app/)*
