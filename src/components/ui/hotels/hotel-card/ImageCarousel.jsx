import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";

export const ImageCarousel = ({ 
  images, 
  currentImageIndex, 
  onPrevImage, 
  onNextImage,
  showButtons = true 
}) => {
  const imageVariants = {
    enter: { opacity: 0, scale: 1.05 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <>
      <motion.img
        key={currentImageIndex}
        src={images[currentImageIndex]}
        alt="Hotel"
        variants={imageVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />

      {images.length > 1 && showButtons && (
        <>
          <button
            onClick={onPrevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-amber-300 hover:scale-110 z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 hover:text-amber-600 transition-colors" />
          </button>
          <button
            onClick={onNextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-amber-300 hover:scale-110 z-20"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-gray-700 hover:text-amber-600 transition-colors" />
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentImageIndex 
                  ? "w-8 bg-gradient-to-r from-amber-400 to-orange-400 shadow-md" 
                  : "w-2 bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentImageIndex: PropTypes.number.isRequired,
  onPrevImage: PropTypes.func.isRequired,
  onNextImage: PropTypes.func.isRequired,
  showButtons: PropTypes.bool
};