import React, { useEffect, useState } from 'react';
import { fetchVideos,createChannel } from '../apiService.js';
import VideoCard from '../Components/VideoCard.jsx';
import youtube2 from "../assets/youtube2.svg";
import Loading from "../assets/Loading.gif";
import SignInPage from "./SignIn.jsx";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { RiLiveLine } from "react-icons/ri";
import { BsFire } from "react-icons/bs";
import { IoLibraryOutline } from "react-icons/io5";
import { IoGameControllerOutline } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";

function Home() {
    const [videos, setVideos] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [originalVideos, setOriginalVideos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState(['All']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [showProfileOptions, setShowProfileOptions] = useState(false);

    useEffect(() => {
        async function loadVideos() {
            setLoading(true);
            try {
                const res = await fetchVideos();
                setVideos(res.data);
                setOriginalVideos(res.data)
            } finally {
                setLoading(false);
            }
        }
        loadVideos();


    }, []);

    useEffect(() => {
        const uniqueCategories = ['All', ...new Set(videos.map(video => video.category))];
        setCategories(uniqueCategories);
    }, [videos])

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            setVideos(originalVideos);
            console.log("onh");
        } else {
            const filtered = videos.filter(video =>
                (video.title.toLowerCase().includes(searchQuery.toLowerCase()) || video.channelName.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (selectedCategory === 'All' || video.category === selectedCategory)
            );
            setVideos(filtered);
        }
    };

    // Update filtered videos when category changes
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        const filtered = videos.filter(video =>
            (category === 'All' || video.category === category) &&
            (video.title.toLowerCase().includes(searchQuery.toLowerCase()) || video.channelName.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setVideos(filtered);
    };

    // Function to open modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Handle successful login
    const handleLogin = (user) => {
        setLoggedInUser(user.data.user);
        setIsModalOpen(false); // Close the modal on successful login
    };

    // Toggle profile options dropdown
    const toggleProfileOptions = () => {
        setShowProfileOptions(!showProfileOptions);
    };

    // Logout function
    const handleLogout = () => {
        setLoggedInUser(null);
        setShowProfileOptions(false); // Close the dropdown on logout
    };
    

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
                <button className="text-xl" onClick={toggleSidebar}>☰</button>
                <img src={youtube2} alt="youtube-logo" className="h-16" />
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded-md">
                        <IoSearch />
                    </button>
                </div>
                {loggedInUser ? (
                    <div className="relative">
                        <img
                            src={loggedInUser.profileImage}
                            alt="User Profile"
                            className="w-8 h-8 rounded-full cursor-pointer"
                            onClick={toggleProfileOptions}
                        />
                        {showProfileOptions && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                                <button
                                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                   
                                >Create Channel</button>
                                <button
                                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={handleLogout}
                                >Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded-md"
                        onClick={openModal}
                    >
                        <FaRegUserCircle className="text-lg" />
                        <span>Sign In</span>
                    </button>
                )}
            </header>

            {isModalOpen && (
                <SignInPage isOpen={isModalOpen} onLogin={handleLogin} onClose={closeModal} />
            )}

            <div className="flex">
                <aside
                    className={`transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white w-60 shadow-md h-screen`}
                >
                    <nav className="p-4">
                        <a href="/" className="flex items-center py-2 space-x-2 text-gray-600 hover:bg-gray-100 rounded-md">
                            <AiOutlineHome className="text-xl" />
                            <span>Home</span>
                        </a>
                        <a className="flex items-center py-2 space-x-2 text-gray-600 hover:bg-gray-100 rounded-md">
                            <SiYoutubeshorts className="text-xl" />
                            <span>Shorts</span>
                        </a>
                        <a className="flex items-center py-2 space-x-2 text-gray-600 hover:bg-gray-100 rounded-md">
                            <MdOutlineSubscriptions className="text-xl" />
                            <span>Subscriptions</span>
                        </a>
                        <a className="flex items-center py-2 space-x-2 text-gray-600 hover:bg-gray-100 rounded-md">
                            <IoLibraryOutline className="text-xl" />
                            <span>Library</span>
                        </a>
                        <hr className="my-4" />
                        {!loggedInUser && (
                            <div className="px-4 text-sm text-gray-600">
                                <p>Sign in to like videos, comment, and subscribe.</p>
                                <button
                                    className="mt-2 flex items-center space-x-2 p-2 bg-blue-500 text-white rounded-md"
                                    onClick={openModal}
                                >
                                    <FaRegUserCircle className="text-lg" />
                                    <span>Sign In</span>
                                </button>
                            </div>
                        )}
                        <hr className="my-4" />
                        <div className="text-sm">
                            <h3 className="px-4 text-gray-700 font-semibold">Explore</h3>
                            <a className="flex items-center py-2 space-x-2 text-gray-600 hover:bg-gray-100 rounded-md">
                                <BsFire className="text-xl" />
                                <span>Trending</span>
                            </a>
                            <a className="flex items-center py-2 space-x-2 text-gray-600 hover:bg-gray-100 rounded-md">
                                <HiOutlineShoppingBag className="text-xl" />
                                <span>Shopping</span>
                            </a>
                            <a className="flex items-center py-2 space-x-2 text-gray-600 hover:bg-gray-100 rounded-md">
                                <IoMusicalNotesOutline className="text-xl" />
                                <span>Music</span>
                            </a>
                            <a className="flex items-center py-2 space-x-2 text-gray-600 hover:bg-gray-100 rounded-md">
                                <BiMoviePlay className="text-xl" />
                                <span>Movies</span>
                            </a>
                            <a className="flex items-center py-2 space-x-2 text-gray-600 hover:bg-gray-100 rounded-md">
                                <RiLiveLine className="text-xl" />
                                <span>Live</span>
                            </a>
                            <a className="flex items-center py-2 space-x-2 text-gray-600 hover:bg-gray-100 rounded-md">
                                <IoGameControllerOutline className="text-xl" />
                                <span>Gaming</span>
                            </a>
                        </div>
                    </nav>
                </aside>

                <main className="flex-1 p-4">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <img src={Loading} alt="Loading..." className="h-16" />
                        </div>
                    ) : (
                        <div>
                            <div className="flex space-x-2 mb-4">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        className={`px-4 py-2 text-sm rounded-md ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {videos.length > 0 ? (
                                    videos.map((video) => (
                                        <VideoCard
                                            loggedInUser={loggedInUser}
                                            key={video._id}
                                            video={video}
                                            className="p-2 bg-white rounded-md shadow-md"
                                        />
                                    ))
                                ) : (
                                    <div className="text-center text-gray-600">No results found. Try different keywords or remove search filters.</div>
                                )}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Home;