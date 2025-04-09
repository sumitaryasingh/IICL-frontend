import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import Modal from "react-modal";
import { FaSearchPlus } from "react-icons/fa";
import "./Gallery.css";
import Navbar from "../common-components/Navbar";
import Footer from "../common-components/Footer";
Modal.setAppElement("#root");
const imagesData = [
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
const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const filteredImages = selectedCategory === "All" ? imagesData : imagesData.filter(img => img.category === selectedCategory);
    const openModal = (image) => {
        setSelectedImage(image);
        setModalIsOpen(true);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsxs("section", { className: "gallery", children: [_jsx("h2", { className: "gallery-title", children: "Our Institute Gallery" }), _jsx("div", { className: "filter-buttons", children: categories.map((category) => (_jsx("button", { className: `filter-btn ${selectedCategory === category ? "active" : ""}`, onClick: () => setSelectedCategory(category), children: category }, category))) }), _jsx("div", { className: "gallery-grid", children: filteredImages.map((image) => (_jsxs("div", { className: "gallery-item", onClick: () => openModal(image), children: [_jsx("img", { src: image.url, alt: image.title }), _jsx("div", { className: "zoom-overlay", children: _jsx(FaSearchPlus, { className: "zoom-icon" }) })] }, image.id))) }), selectedImage && (_jsxs(Modal, { isOpen: modalIsOpen, onRequestClose: () => setModalIsOpen(false), className: "modal", overlayClassName: "modal-overlay", children: [_jsx("img", { src: selectedImage.url, alt: selectedImage.title, className: "modal-image" }), _jsx("p", { className: "modal-title", children: selectedImage.title }), _jsx("button", { className: "close-btn", onClick: () => setModalIsOpen(false), children: "Close" })] }))] }), _jsx(Footer, {})] }));
};
export default Gallery;
