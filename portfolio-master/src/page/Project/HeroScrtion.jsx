import React, { useState, useRef, useEffect } from "react";
import Anime from "../../assets/Image/Anime.png";
import Manga from "../../assets/Image/Manga.png";
import GoOrder from "../../assets/Image/GoOrder.png";
import Under from "../../assets/Video/under.mp4";

const projects = [
  {
    id: 1,
    title: "Anime India  Anime & Manga ",
    description: "this Anime India website built with React, Vite, and TailwindCSS.",
    tags: ["React", "Vite", "TailwindCSS"],
    images: [
        Anime,
      Manga,
      "https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg?semt=ais_hybrid&w=740&q=80",
    ],
    video: Under,
  },
  {
    id: 2,
    title: "GoOrder Shopping Web Low Price",
    description: "This Web is shopping website built with react and tailwindcss .",
    tags: ["React", "vite" ,"TailwindCSS", "JavaScript" ],
    images: [
       GoOrder,
      "https://media.istockphoto.com/id/1411798446/vector/modern-coming-soon-under-construction-sticker-banner.jpg?s=612x612&w=0&k=20&c=KgQ9eYEfuzTdmc5ypmMYoz8JHPTbe_TjEXxyxNixKQ4=",
      "https://media.istockphoto.com/id/1411798446/vector/modern-coming-soon-under-construction-sticker-banner.jpg?s=612x612&w=0&k=20&c=KgQ9eYEfuzTdmc5ypmMYoz8JHPTbe_TjEXxyxNixKQ4=",
    ],
    video: Under,
  },
];

function VideoPlayer({ videoUrl, title, onBack }) {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100 || 0;
      setProgress(progress);
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setPlaying(false);
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (playing) {
      video.pause();
    } else {
      video.play();
    }
    setPlaying(!playing);
  };

  const skip = (seconds) => {
    const video = videoRef.current;
    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    videoRef.current.volume = vol;
    if (vol > 0) setMuted(false);
  };

  const toggleMute = () => {
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const fullscreen = () => {
    const video = videoRef.current;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border border-green-600/30">
      {onBack && (
        <div className="px-4 py-3 bg-gray-900/80 backdrop-blur-sm border-b border-green-700/30">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
          >
            <span className="text-xl" style={{rotate: '180deg'}}>←</span>
            <span className="font-medium">Back to Gallery</span>
          </button>
        </div>
      )}
      
      <div className="relative bg-black">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full aspect-video cursor-pointer"
          onClick={togglePlay}
        />
        
        {/* Play/Pause Overlay */}
        {!playing && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity hover:bg-black/40"
            onClick={togglePlay}
          >
            <div className="w-20 h-20 bg-green-600/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <span className="text-white text-3xl ml-1">▶︎</span>
            </div>
          </div>
        )}

        {/* Title Overlay */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4">
          <h3 className="text-green-400 text-xl font-bold">{title}</h3>
        </div>
      </div>

      {/* Progress Bar */}
      <div 
        className="h-2 bg-gray-800 cursor-pointer group relative"
        onClick={handleProgressClick}
      >
        <div 
          className="h-full bg-gradient-to-r from-green-600 to-green-500 transition-all relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"></div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="px-5 py-2.5 bg-green-600 hover:bg-green-500 rounded-lg font-semibold text-black transition-all hover:shadow-lg hover:shadow-green-500/50 active:scale-95"
            >
              {playing ? "❚❚ Pause" : "▶︎ Play"}
            </button>
            <button
              onClick={() => skip(-10)}
              className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-green-400 transition-all active:scale-95"
              title="Rewind 10 seconds"
            >
              <span className="inline-block rotate-180">➤</span>
            </button>
            <button
              onClick={() => skip(10)}
              className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-green-400 transition-all active:scale-95"
              title="Forward 10 seconds"
            >
              <span style={{rotate: '180deg'}}>➤</span>
            </button>
            <span className="text-green-400 text-sm font-mono hidden sm:block">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                {muted || volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={muted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-24 accent-green-600 cursor-pointer"
              />
            </div>

            <button
              onClick={fullscreen}
              className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-green-400 transition-all active:scale-95"
              title="Fullscreen"
            >
              ⛶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryPopup({ project, onClose }) {
  const [selectedImg, setSelectedImg] = useState(project.images[0]);
  const [showVideo, setShowVideo] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 max-w-6xl w-full relative shadow-2xl border border-green-600/30 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-green-400 text-2xl hover:text-green-300 hover:bg-gray-700 rounded-full transition-all z-10"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-green-400 mb-2">{project.title}</h2>
          <p className="text-gray-400 mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm border border-green-600/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Main display area */}
        {!showVideo ? (
          <>
            <div className="relative mb-4">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-xl">
                  <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={selectedImg}
                alt={project.title}
                className="w-full h-[400px] object-cover rounded-xl border-2 border-green-600/40 shadow-lg"
                onLoad={() => setImageLoading(false)}
              />
            </div>

            {/* Thumbnail gallery */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {project.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImg(img);
                    setImageLoading(true);
                  }}
                  className={`w-20 h-20 border-2 rounded-lg overflow-hidden transition-all transform hover:scale-105 ${
                    selectedImg === img
                      ? "border-green-500 shadow-lg shadow-green-500/50 scale-105"
                      : "border-gray-600 hover:border-green-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Video Button */}
            <div className="text-center">
              <button
                onClick={() => setShowVideo(true)}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-black rounded-lg font-bold transition-all hover:shadow-lg hover:shadow-green-500/50 active:scale-95"
              >
                ▶︎ Watch Demo Video
              </button>
            </div>
          </>
        ) : (
          <VideoPlayer 
            videoUrl={project.video} 
            title={project.title}
            onBack={() => setShowVideo(false)}
          />
        )}
      </div>
    </div>
  );
}

export default function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-green-400 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-6xl font-extrabold mb-4 tracking-wide bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          My Projects
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Web Development, Game Design, and Creative Works — Explore my interactive portfolio
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-green-700/40 shadow-xl hover:shadow-green-500/30 transition-all duration-500 group overflow-hidden hover:scale-[1.02]"
          >
            <div className="relative overflow-hidden">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-8 py-3 bg-green-600 hover:bg-green-500 text-black rounded-lg font-bold transform scale-90 group-hover:scale-100 transition-all shadow-lg"
                >
                  View Details
                </button>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-green-300">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-xs border border-green-600/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedProject(project)}
                className="w-full px-4 py-2.5 border-2 border-green-500 text-green-400 rounded-lg hover:bg-green-500 hover:text-black font-semibold transition-all active:scale-95"
              >
                Explore Project →
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <GalleryPopup
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}