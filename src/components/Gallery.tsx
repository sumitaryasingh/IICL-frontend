import React, { useState } from "react";
import Modal from "react-modal";
import { FaSearchPlus } from "react-icons/fa";
import "./Gallery.css";
import Navbar from "../common-components/Navbar";
import Footer from "../common-components/Footer";

Modal.setAppElement("#root");

interface ImageData {
  id: number;
  url: string;
  category: string;
  title: string;
}

const imagesData: ImageData[] = [
  { id: 1, url: "/images/adca.png", category: "Events", title: "Annual Event" },
  { id: 11, url: "/images/eve1.jpg", category: "Events", title: "Annual Event" },
  { id: 12, url: "/images/hero.jpg", category: "Events", title: "Annual Event" },
  { id: 13, url: "/images/ev2.webp", category: "Events", title: "Annual Event" },
  { id: 2, url: "/images/img-ins.jpg", category: "Students", title: "Classroom Session" },
  { id: 21, url: "/images/cs1.avif", category: "Students", title: "Classroom Session" },
  { id: 22, url: "/images/cs2.webp", category: "Students", title: "Classroom Session" },
  { id: 23, url: "/images/cs2.webp", category: "Students", title: "Classroom Session" },
  { id: 3, url: "/images/ac1.jpeg", category: "Achievements", title: "Top Performer Award" },
  { id: 31, url: "/images/ac2.jpeg", category: "Achievements", title: "Top Performer Award" },
  { id: 32, url: "/images/ac3.jpeg", category: "Achievements", title: "Top Performer Award" },
  { id: 33, url: "/images/ac3.jpeg", category: "Achievements", title: "Top Performer Award" },
  { id: 4, url: "/images/cp1.jpeg", category: "Campus", title: "Our Beautiful Campus" },
  { id: 41, url: "/images/cp2.jpeg", category: "Campus", title: "Our Beautiful Campus" },
  { id: 42, url: "/images/cp3.jpeg", category: "Campus", title: "Our Beautiful Campus" },
  { id: 5, url: "/images/cl1.jpeg", category: "Labs", title: "Advanced Lab Facilities" },
  { id: 51, url: "/images/cl2.jpeg", category: "Labs", title: "Advanced Lab Facilities" },
  { id: 52, url: "/images/cl3.webp", category: "Labs", title: "Advanced Lab Facilities" },
  { id: 53, url: "/images/cl4.webp", category: "Labs", title: "Advanced Lab Facilities" },
];

const categories = ["All", "Events", "Students", "Achievements", "Campus", "Labs"];

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  const filteredImages = selectedCategory === "All" ? imagesData : imagesData.filter(img => img.category === selectedCategory);

  const openModal = (image: ImageData) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  return (
    <>
    <Navbar/>
    <section className="gallery">
      <h2 className="gallery-title">Our Institute Gallery</h2>
      
      {/* Filter Buttons */}
      <div className="filter-buttons">
        {categories.map((category) => (
          <button 
            key={category} 
            className={`filter-btn ${selectedCategory === category ? "active" : ""}`} 
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="gallery-grid">
        {filteredImages.map((image) => (
          <div key={image.id} className="gallery-item" onClick={() => openModal(image)}>
            <img src={image.url} alt={image.title} />
            <div className="zoom-overlay">
              <FaSearchPlus className="zoom-icon" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="modal" overlayClassName="modal-overlay">
          <img src={selectedImage.url} alt={selectedImage.title} className="modal-image" />
          <p className="modal-title">{selectedImage.title}</p>
          <button className="close-btn" onClick={() => setModalIsOpen(false)}>Close</button>
        </Modal>
      )}
    </section>
    <Footer/>
    </>
  );
};

export default Gallery;
