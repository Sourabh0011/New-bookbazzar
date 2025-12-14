"use client";
import React, { useRef, useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Menu, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Placeholder Data (Omitted for brevity) ---
const categoryGridItems = [
  { name: 'Books', icon: '📚' }, 
  { name: 'Notes', icon: '📝' }, 
  { name: 'Calculators', icon: '🧮' }, 
  { name: 'Lab Gear', icon: '🥼' }, 
  { name: 'Study Guides', icon: '📖' },
  { name: 'Art Supplies', icon: '🎨' },
];

const featuredItems = [
  // IMPORTANT: These URLs are placeholder names. You must place these files in your /public folder.
  { id: 1, title: 'Biology Textbook', price: 25, type: 'Book', label: 'Biology', imageUrl: 'https://placehold.co/400x200/A0AF2B/FFF?text=Biology' },
  { id: 2, title: 'Organic Chem II Notes', price: 10, type: 'Notes', label: 'Organic Chem II', imageUrl: 'https://placehold.co/400x200/523E28/FFF?text=Chemistry I' },
  { id: 3, title: 'Lecture Chem II', price: 20, type: 'Book', label: 'Lecture Chem II', imageUrl: 'https://placehold.co/400x200/523E28/FFF?text=Chemistry II' },
  { id: 4, title: 'Sake Rogs T-Shirt', price: 50, type: 'Apparel', label: 'Sake Rogs', imageUrl: 'https://placehold.co/400x200/5F5F5B/DDD?text=Calsi' },
  { id: 5, title: 'Calculus I Study Guide', price: 25, type: 'Guide', label: 'Calculus I', imageUrl: 'https://placehold.co/400x200/A0AF2B/FFF?text=calc-guide' },
  { id: 6, title: 'Microscope Kit', price: 90, type: 'Equipment', label: 'Micro Kit', imageUrl: 'https://placehold.co/400x200/523E28/5F5F5B?text=Micro Kit' },
  { id: 7, title: 'Intro to History Text', price: 18, type: 'Book', label: 'History 101', imageUrl: 'https://placehold.co/400x200/A0AF2B/FFF?text=history' },
  { id: 8, title: 'Used Graphing Calc', price: 70, type: 'Calculator', label: 'TI-84+', imageUrl: 'https://placehold.co/400x200/A0AF2B/FFF?text=calculator' },
  { id: 9, title: 'Advanced Physics', price: 35, type: 'Book', label: 'Physics', imageUrl: 'https://placehold.co/400x200/A0AF2B/FFF?text=physics' },
  { id: 10, title: 'Linear Algebra Notes', price: 12, type: 'Notes', label: 'Linear Algebra', imageUrl: 'https://placehold.co/400x200/A0AF2B/FFF?text=linear-algebra' },
];

const heroImages = [
    { src: '/slider_image_3.png', alt: 'Stack of used textbooks and notes' },
    { src: '/slider_image_2.png', alt: 'Student selling used lab gear' },
    { src: '/slider_image_1.png', alt: 'Close up of affordable books' },
];

// --- Components ---

// 1. Header Component (UPDATED with Logo)
const Header = () => (
  <header className="bg-white border-b sticky top-0 z-20 shadow-md">
    <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2 md:space-x-8">
        
        {/* Logo and Title */}
        <a href="/" className="flex items-center space-x-2">
            {/* LOGO IMAGE - Must place 'logo.png' in the /public folder */}
            <img 
                src="/logoo.png" 
                alt="BookBazzar Logo" 
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
            />
            <h1 className="text-2xl font-bold text-blue-700 hover:text-blue-600 transition">BookBazzar</h1>
        </a>

        <nav className="hidden md:flex space-x-6 text-gray-600">
          <a href="#" className="flex items-center font-semibold text-green-700 border-b-2 border-green-700 pb-1">
            Buy Books <ChevronDown className="w-4 h-4 ml-1" />
          </a>
          <a href="#" className="hover:text-blue-700 transition">Sell Books</a>
          <a href="#" className="hover:text-blue-700 transition">My Account</a>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Search className="h-5 w-5 text-gray-600 cursor-pointer hover:text-green-700 transition" />
        <ShoppingCart className="h-5 w-5 text-gray-600 cursor-pointer hover:text-green-700 transition" />
        <User className="h-5 w-5 text-gray-600 cursor-pointer hidden sm:block hover:text-green-700 transition" />
        <Menu className="h-5 w-5 text-gray-600 cursor-pointer md:hidden hover:text-green-700 transition" />
      </div>
    </div>
  </header>
);

// 2. Auto-Play Hero Slider Component (Omitted for brevity)
const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

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
        const intervalId = setInterval(nextSlide, 4500); 
        return () => clearInterval(intervalId); 
    }, []);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="h-64 w-full max-w-sm bg-gray-200 rounded-xl shadow-2xl overflow-hidden relative group">
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
                    </div>
                ))}
            </div>

            <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/30 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black/50"
                aria-label="Previous Slide"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/30 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black/50"
                aria-label="Next Slide"
            >
                <ChevronRight className="w-5 h-5" />
            </button>


            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            index === currentIndex ? 'bg-green-400 shadow-lg border border-white' : 'bg-gray-400 opacity-70 hover:opacity-100'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

// 3. Item Card Component (Omitted for brevity)
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
      <p className="text-xl font-bold text-green-700 mt-1">${item.price}</p>
      <button className="w-full mt-3 py-2 text-sm font-bold text-white bg-blue-600 rounded-full hover:bg-green-700 transition transform hover:shadow-xl hover:-translate-y-0.5">
        Add to Cart
      </button>
    </div>
  </div>
);

// 4. Featured Items Slider Component (Omitted for brevity)
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
          <h3 className="text-3xl font-bold text-gray-800 mb-6">📚 Featured Study Essentials</h3>
          <div ref={scrollRef} className="flex overflow-x-scroll gap-6 pb-6 pt-2 scrollbar-hide" style={{ scrollSnapType: 'x mandatory' }}>
            {featuredItems.map((item) => (
              <div key={item.id} style={{ scrollSnapAlign: 'start' }}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>
          <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -mt-10 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-xl z-20 hover:bg-gray-100 transition hidden lg:block" aria-label="Previous Item">
            <ChevronLeft className="w-6 h-6 text-green-700" />
          </button>
          <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -mt-10 transform translate-x-1/2 bg-white p-3 rounded-full shadow-xl z-20 hover:bg-gray-100 transition hidden lg:block" aria-label="Next Item">
            <ChevronRight className="w-6 h-6 text-green-700" />
          </button>
          <p className="text-center text-sm text-gray-500 mt-4 md:hidden font-medium">&lt; Swipe left/right to browse more items &gt;</p>
        </section>
      );
};

// 5. Category Grid Component (Omitted for brevity)
const CategoryGrid = () => (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {categoryGridItems.map((item) => (
          <a 
            key={item.name} 
            href={`/category/${item.name.toLowerCase().replace(/\s/g, '-')}`}
            className="bg-white p-4 md:p-6 rounded-xl shadow-lg border-b-4 border-transparent 
                       flex flex-col items-center justify-center text-center 
                       hover:shadow-xl hover:border-blue-600 transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-4xl md:text-5xl mb-3 text-blue-600">
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

// 6. Footer Component (Omitted for brevity)
const Footer = () => (
    <footer className="bg-gray-900 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-sm">
                <div className="space-y-2 mb-6 md:mb-0">
                    <p className="text-lg font-bold text-green-400">BookBazzar</p>
                    <p className="text-gray-400">Your campus resource exchange.</p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-end space-x-6">
                    <a href="#" className="hover:text-green-400 transition">About Us</a>
                    <a href="#" className="hover:text-green-400 transition">How It Works</a>
                    <a href="#" className="hover:text-green-400 transition">FAQ</a>
                    <a href="#" className="hover:text-green-400 transition">Contact</a>
                    <a href="#" className="hover:text-green-400 transition">Terms</a>
                    <a href="#" className="hover:text-green-400 transition">Privacy</a>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-6 pt-6 text-center">
                <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} BookBazzar. All rights reserved.</p>
            </div>
        </div>
    </footer>
)


// --- Main Page Component ---
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Breadcrumbs */}
        {/* <div className="text-sm text-gray-500 mb-6 flex items-center space-x-1">
          <a href="#" className="hover:text-green-700">BookBazzar</a>
          <span>&gt;</span>
          <span className="text-gray-700">Buy Books</span>
          <span>&gt;</span>
          <span className="text-gray-700 font-medium">Home</span>
        </div> */}

        {/* Hero Section */}
        <section className="mb-10 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-snug">
                    Buy & Sell Used <span className='text-blue-600'>Study Stuff</span> Easily
                </h2>
                <p className="text-lg text-gray-600 mt-3 mb-6">
                    A student-to-student marketplace for books, notes, calculators, lab gear & more.
                </p>
                {/* Search Bar */}
                <div className="flex shadow-lg rounded-lg overflow-hidden">
                    <input 
                        type="text" 
                        placeholder="Search for books, notes, calculators..." 
                        className="p-3 border-none w-full focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    />
                    <button className="px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                        Search
                    </button>
                </div>
            </div>
            {/* Hero Slider Component */}
            <div className="mt-8 md:mt-0 md:w-1/2 flex justify-end">
                <HeroSlider />
            </div>
        </section>

        {/* Category Grid */}
        <CategoryGrid />

        {/* Featured Items Slider */}
        {/* <FeaturedSlider /> */}

      </main>

      <Footer />
    </div>
  );
}