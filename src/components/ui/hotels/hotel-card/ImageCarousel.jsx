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
        className="w-full h-full object-cover"
      />

      {images.length > 1 && showButtons && (
        <>
          <button
            onClick={onPrevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={onNextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx === currentImageIndex ? "bg-white" : "bg-white/50"
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