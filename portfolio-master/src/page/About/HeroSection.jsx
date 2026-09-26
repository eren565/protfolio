import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RightA from '../../assets/Image/RightA.png'
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showNextPage, setShowNextPage] = useState(false);
  const toggleGallery = () => setShowGallery(!showGallery);
  const navigate = useNavigate();


  const galleryImages = [
    "https://baapcompany.com/wp-content/uploads/2025/02/thebaapcompany_carousel3-2.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQndTnpZAasCTJirFgWpEUZleMfEJjH3eOU8VasB1vb9ckA7r_5IEL5y0EIEy6RIC-JJ8M&usqp=CAU", 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQJlfl_fygcJbnz8VE59InpHthe72yZNh-yg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwNvMBJ0FoN_1ULnNGR-FBe6X301M9bCfafg&s",
    "https://i.ytimg.com/vi/XuT5W88mJEI/maxresdefault.jpg",
  ];

const clickNextPage = () => {
  navigate('/progress');
};

  const aboutCards = [
    {
      title: " V.PNAIK HIGHSCH NANDURSHINGOTE",
      description:
        "V.PNAIK HIGHSCH NANDURSHINGOTE was established in 1964 and it is managed by the Pvt. Aided. It is located in Rural area. It is located in SINNER block of NASHIK district of Maharashtra. The school consists of Grades from 5 to 12. The school.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
      std: "5 to 10"
    },
    {
      title: "Sahakar Maharshi Bhausaheb Santuji Thorat Arts Science and Commerce College Sangamner",
      description:
        "Pursued Bachelor of Computer Applications. Focused on full-stack development, UI/UX design, and technical innovation.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh0U_O5g6KAOQXRYdXKnDVdksR-YcDRvmCXQ&s ",
    },
    {
      title: "BAAP Company (2 Years)",
      description:
        "Currently working as a Web & App Developer. Building scalable and high-performing apps with modern tech.",
      image: "https://media.licdn.com/dms/image/v2/D4E22AQHPQTvPvO4JyA/feedshare-shrink_800/B4EZcQQSQgH0Ag-/0/1748324396159?e=2147483647&v=beta&t=scPHB4ZAZG_YvuAwNZsM0ISZaKVSbYIfbeBAoRqjfd0",
      button: "See More",
    },
  ];

  return (
    <section className="w-full h-207 relative mt-[50px] py-16 bg-gray-50 dark:bg-gray-900 flex flex-col items-center text-center px-4">
        <>      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-4"
      >
        About Me
      </motion.h2>

      <p className="max-w-2xl text-gray-700 dark:text-gray-300 mb-12 text-base md:text-lg">
        I’m <span className="font-semibold text-green-500">Rohit Nanaware</span>,
        a passionate developer from India. I love turning ideas into digital
        experiences through creativity and clean code.
      </p>

      {/* Cards layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl justify-items-center">
        {/* First two cards in row */}
        {aboutCards.slice(0, 2).map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all"
          >
            <img
              className="object-cover w-full rounded-t-lg h-75 md:h-auto md:w-56 md:rounded-none md:rounded-s-lg"
              src={card.image}
              alt={card.title}
            />
            <div className="flex flex-col justify-between p-4 leading-normal text-left">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {card.title}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Third card centered below */}
      <div className="mt-8 flex justify-center">
        {aboutCards.slice(2, 3).map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all"
          >
            <img
              className="object-cover w-full rounded-t-lg h-70  md:w-56 md:rounded-none md:rounded-s-lg"
              src={card.image}
              alt={card.title}
            />
            <div className="flex flex-col justify-between p-4 leading-normal text-left">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {card.title}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {card.description}
              </p>
              <span>{card.std}</span>
              {card.button && (
                <button
                  onClick={toggleGallery}
                  className="inline-flex w-60 text-center items-center px-4 py-2 text-sm font-medium items-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
                >
                  {showGallery ? "Hide Gallery" : card.button}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
        <button onClick={clickNextPage} className="fixed right-4 sm:right-6 bottom-6 sm:bottom-8 md:bottom-10 bg-[#00a63d] p-2 sm:p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:rotate-20 z-50"> 
        <img src={RightA} className='h-10' alt="" />
         </button>

      {/* Popup gallery */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-[90%] relative"
            >
              <button
                onClick={toggleGallery}
                className="absolute top-2 right-3 text-gray-700 dark:text-gray-300 text-2xl font-bold hover:text-green-500"
              >
                ×
              </button>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                BAAP Company Memories
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className=" rounded-lg cursor-pointer hover:scale-105 transition-transform"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(src)}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed h-auto inset-0 bg-black/90 flex items-center justify-center z-[60]"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Selected"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-[90%] rounded-lg shadow-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
          </>
    </section>
    
  );
};

export default AboutSection;
