"use client";
import React, { useRef, useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Menu, ChevronDown, ChevronLeft, ChevronRight, CornerRightUp } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

// --- Placeholder Data ---
const categoryGridItems = [
    { name: 'Textbooks', icon: '📚', href: '/category/textbooks' }, 
    { name: 'Study Notes', icon: '📝', href: '/category/study-notes' }, 
    { name: 'Calculators', icon: '🧮', href: '/category/calculators' }, 
    { name: 'Lab Gear', icon: '🥼', href: '/category/lab-gear' }, 
    { name: 'Art Supplies', icon: '🎨', href: '/category/art-supplies' },
    { name: 'Apparel', icon: '👕', href: '/category/apparel' },
];

const featuredItems = [
    { id: 1, title: 'Biology Textbook', price: 250, type: 'Book', label: 'Biology', imageUrl: 'https://placehold.co/400x200/A0AF2B/FFF?text=Biology' },
    { id: 2, title: 'Organic Chem II Notes', price: 100, type: 'Notes', label: 'Organic Chem II', imageUrl: 'https://placehold.co/400x200/523E28/FFF?text=Chemistry' },
    { id: 3, title: 'Lecture Chem II', price: 200, type: 'Book', label: 'Lecture Chem II', imageUrl: 'https://placehold.co/400x200/523E28/FFF?text=Chemistry' },
    { id: 4, title: 'Sake Rogs T-Shirt', price: 500, type: 'Apparel', label: 'Sake Rogs', imageUrl: 'https://placehold.co/400x200/5F5F5B/DDD?text=Apparel' },
    { id: 5, title: 'Calculus I Study Guide', price: 250, type: 'Guide', label: 'Calculus I', imageUrl: 'https://placehold.co/400x200/A0AF2B/FFF?text=calc-guide' },
    { id: 6, title: 'Microscope Kit', price: 190, type: 'Equipment', label: 'Micro Kit', imageUrl: 'https://placehold.co/400x200/523E28/5F5F5B?text=Equipment' },
    { id: 7, title: 'Intro to History Text', price: 180, type: 'Book', label: 'History 101', imageUrl: 'https://placehold.co/400x200/A0AF2B/FFF?text=history' },
    { id: 8, title: 'Used Graphing Calc', price: 300, type: 'Calculator', label: 'TI-84+', imageUrl: 'https://placehold.co/400x200/A0AF2B/FFF?text=calculator' },
    { id: 9, title: 'Advanced Physics', price: 315, type: 'Book', label: 'Physics', imageUrl: 'https://placehold.co/400x200/A0AF2B/FFF?text=physics' },
    { id: 10, title: 'Linear Algebra Notes', price: 120, type: 'Notes', label: 'Linear Algebra', imageUrl: 'https://placehold.co/400x200/A0AF2B/FFF?text=linear-algebra' },
];

const heroImages = [
    // SRC PATHS KEPT UNCHANGED
    { src: '/slider_image_3.png', alt: 'Stack of used textbooks and notes' },
    { src: '/slider_image_2.png', alt: 'Student selling used lab gear' },
    { src: '/slider_image_1.png', alt: 'Close up of affordable books' },
];

// --- 1. Header Component ---
const Header = () => (
    <header className="bg-white border-b sticky top-0 z-20 shadow-lg">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2 md:space-x-8">
                <a href="/" className="flex items-center space-x-2">
                    <img 
                        src="/logoo.png" 
                        alt="BookBazzar Logo" 
                        className="w-8 h-8 md:w-10 md:h-10 object-contain"
                    />
                    <h1 className="text-xl md:text-2xl font-bold text-blue-700 hover:text-blue-600 transition">BookBazzar</h1>
                </a>
                <nav className="hidden md:flex space-x-6 text-gray-600">
                    <a href="#" className="flex items-center font-semibold text-blue-700 border-b-2 border-blue-700 pb-1">
                        Buy Books <ChevronDown className="w-4 h-4 ml-1" />
                    </a>
                    <a href="#" className="hover:text-blue-700 transition font-medium">Sell Books</a>
                    <a href="#" className="hover:text-blue-700 transition font-medium">My Account</a>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                <Search className="h-5 w-5 text-gray-600 cursor-pointer hover:text-blue-600 transition hidden sm:block" />
                <ShoppingCart className="h-6 w-6 text-gray-700 cursor-pointer hover:text-blue-600 transition" />
                <User className="h-6 w-6 text-gray-700 cursor-pointer hidden sm:block hover:text-blue-600 transition" />
                <Menu className="h-6 w-6 text-gray-700 cursor-pointer md:hidden hover:text-blue-600 transition" />
            </div>
        </div>
    </header>
);

// 2. Full-Width Hero Slider Component (CORRECTED SCOPE)
const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // FUNCTIONS ARE SCOPED CORRECTLY HERE
    const nextSlide = () => {
        setCurrentIndex(prevIndex => 
            prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex(prevIndex => 
            prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const intervalId = setInterval(nextSlide, 5000); 
        return () => clearInterval(intervalId); 
    }, []);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        // Mobile: 300px height. Desktop: 80vh height (Full-Screen effect)
        <div className="h-[300px] md:h-[80vh] w-full overflow-hidden relative group">
            <div 
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {heroImages.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-full h-full">
                        <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="w-full h-full object-cover" 
                        />
                         {/* Overlay and CTA */}
                        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4">
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg">
                                Exchange Study Material Seamlessly
                            </h2>
                            <p className="mt-2 text-md sm:text-xl text-white/90 text-center hidden md:block drop-shadow-md">
                                Your trusted campus marketplace for affordable books and gear.
                            </p>
                            <button className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-bold rounded-full hover:bg-blue-600 transition transform hover:scale-105 shadow-xl">
                                Start Browsing
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons - USE DEFINED FUNCTIONS */}
            <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/30 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black/50 hidden sm:block"
                aria-label="Previous Slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/30 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black/50 hidden sm:block"
                aria-label="Next Slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicator Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            index === currentIndex ? 'bg-blue-500 shadow-lg border border-white' : 'bg-gray-400 opacity-70 hover:opacity-100'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

// 3. Item Card Component
const ItemCard = ({ item }: { item: typeof featuredItems[0] }) => (
    <div className="flex-shrink-0 w-[250px] sm:w-[300px] md:w-[280px] lg:w-[220px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.03] transition-all duration-300 cursor-pointer">
        <div className="h-40 relative">
            <img
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover" 
            />
        </div>
        <div className="p-4">
            <h3 className="text-base font-semibold text-gray-800 truncate" title={item.title}>{item.label}</h3>
            <p className="text-xl font-bold text-blue-700 mt-1"> ₹{item.price}</p> 
            <button className="w-full mt-3 py-2 text-sm font-bold text-white bg-blue-700 rounded-full hover:bg-blue-600 transition transform hover:shadow-xl hover:-translate-y-0.5">
                Add to Cart
            </button>
        </div>
    </div>
);

// 4. Featured Items Slider Component
const FeaturedSlider = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
          const scrollAmount = 250; 
          const newScrollPosition = direction === 'left' 
            ? scrollRef.current.scrollLeft - scrollAmount 
            : scrollRef.current.scrollLeft + scrollAmount;
          scrollRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
        }
    };
    return (
        <section className="relative my-12">
            <h3 className="text-3xl font-bold text-blue-700 mb-6">📚 Featured Study Essentials</h3>
            <div ref={scrollRef} className="flex overflow-x-scroll gap-6 pb-6 pt-2 scrollbar-hide" style={{ scrollSnapType: 'x mandatory' }}>
              {featuredItems.map((item) => (
                  <div key={item.id} style={{ scrollSnapAlign: 'start' }}>
                    <ItemCard item={item} />
                  </div>
              ))}
            </div>
            <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -mt-10 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-xl z-20 hover:bg-gray-100 transition hidden lg:block" aria-label="Previous Item">
              <ChevronLeft className="w-6 h-6 text-blue-700" />
            </button>
            <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -mt-10 transform translate-x-1/2 bg-white p-3 rounded-full shadow-xl z-20 hover:bg-gray-100 transition hidden lg:block" aria-label="Next Item">
              <ChevronRight className="w-6 h-6 text-blue-700" />
            </button>
            <p className="text-center text-sm text-gray-500 mt-4 md:hidden font-medium">&lt; Swipe left/right to browse more items &gt;</p>
        </section>
      );
};

// 5. Category Grid Component
const CategoryGrid = () => (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <h3 className="text-3xl font-bold text-blue-700 mb-6 text-center md:text-left">
            Popular Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categoryGridItems.map((item) => (
                <a 
                    key={item.name} 
                    href={item.href}
                    className="bg-white p-4 md:p-6 rounded-xl shadow-lg border-b-4 border-transparent 
                            flex flex-col items-center justify-center text-center 
                            hover:shadow-xl hover:border-blue-600 transform hover:-translate-y-1 transition-all duration-300 group"
                >
                    <div className="text-4xl md:text-5xl mb-3 text-blue-700 group-hover:text-blue-600 transition">
                        {item.icon}
                    </div>
                    <p className="text-sm md:text-base font-semibold text-gray-700">
                        {item.name}
                    </p>
                </a>
            ))}
        </div>
    </section>
);

// 6. Footer Component
const Footer = () => (
    <footer className="bg-gray-950 text-white mt-20 py-10 border-t border-gray-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm pb-8">
                <div className="text-center md:text-left">
                    <p className="text-2xl font-extrabold text-blue-500 mb-2 tracking-wider">BookBazzar</p>
                    <p className="text-gray-400 mb-4 max-w-xs mx-auto md:mx-0">
                        The ultimate student-led platform for buying, selling, and exchanging campus resources.
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4 text-xl mt-4">
                        <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-blue-500 transition duration-300"><FaFacebook /></a>
                        <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-blue-400 transition duration-300"><FaTwitter /></a>
                        <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-pink-500 transition duration-300"><FaInstagram /></a> 
                        <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-blue-600 transition duration-300"><FaLinkedin /></a>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <p className="text-lg font-semibold text-blue-400 mb-2">Quick Links</p>
                    <div className="flex flex-col items-center md:items-start space-y-2">
                        <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">About Us</a>
                        <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">How It Works</a>
                        <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">FAQ</a>
                        <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">Contact Support</a>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <p className="text-lg font-semibold text-blue-400 mb-2">Legal & Resources</p>
                    <div className="flex flex-col items-center md:items-start space-y-2">
                        <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">Terms of Service</a>
                        <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">Privacy Policy</a>
                        <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">Affiliate Program</a>
                        <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">Sitemap</a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-4 pt-4 text-center">
                <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} BookBazzar. All rights reserved.</p>
            </div>
        </div>
    </footer>
);


// --- Main Page Component ---
export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* 1. FULL-WIDTH SLIDER SECTION - Seamlessly connected below the Header */}
            <section className="w-full">
                <HeroSlider />
            </section>

            {/* 2. MAIN CONTENT AREA (Below the Slider) */}
            <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 md:pt-12">
                
                {/* --- Primary Pitch & Search Bar --- */}
                <section className="mb-12 md:mb-16 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-snug">
                        Buy & Sell Used <span className='text-blue-600'>Study Stuff</span> Easily
                    </h2>
                    <p className="text-lg text-gray-600 mt-3 mb-6 max-w-3xl mx-auto">
                        A student-to-student marketplace for books, notes, calculators, lab gear & more. **Find what you need today!**
                    </p>

                    {/* Search Bar */}
                    <div className="flex shadow-xl rounded-full overflow-hidden max-w-xl mx-auto border-2 border-blue-700">
                        <input 
                            type="text" 
                            placeholder="Search for subjects, authors, equipment..." 
                            className="p-3 md:p-4 border-none w-full focus:outline-none focus:ring-0 text-gray-700"
                        />
                        <button className="px-5 py-3 bg-blue-700 text-white font-semibold hover:bg-blue-600 transition flex-shrink-0 flex items-center space-x-2">
                            <Search className="h-5 w-5" />
                            <span className='hidden sm:inline'>Search</span>
                        </button>
                    </div>
                </section>

                <hr className="my-10 border-gray-200" />
                
                {/* --- Featured Categories --- */}
                <CategoryGrid />
                
                <hr className="my-10 border-gray-200" />

                {/* --- Featured Items Slider --- */}
                <FeaturedSlider />

                {/* --- Call to Action Section --- */}
                <section className="bg-blue-50 p-6 sm:p-8 rounded-xl shadow-lg text-center mb-16 border-2 border-blue-200">
                    <h3 className="text-3xl font-extrabold text-blue-700 mb-3">
                        Ready to Declutter and Earn?
                    </h3>
                    <p className="text-lg text-gray-600 mb-6">
                        List your item in under 60 seconds and start making money from your unused books and gear!
                    </p>
                    <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto space-x-2">
                        <CornerRightUp className="w-5 h-5" />
                        <span>Start Selling Now</span>
                    </button>
                </section>

            </main>

            <Footer />
        </div>
    );
}