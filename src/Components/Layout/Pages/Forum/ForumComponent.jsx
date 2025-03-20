import { useEffect, useRef, useState } from 'react';
import { CiBookmark, CiShare2 } from 'react-icons/ci';
import { FaFacebook, FaRegCommentAlt, FaTwitter } from 'react-icons/fa';
import {
  FiArrowRight,
  FiArrowUp,
  FiLink,
  FiMessageSquare,
  FiMoreHorizontal,
  FiSearch,
} from 'react-icons/fi';
import { GoLink } from 'react-icons/go';
import { IoMenu } from 'react-icons/io5';
import { MdBugReport } from 'react-icons/md';
import { RiPencilLine } from 'react-icons/ri';
import { TiArrowDownOutline, TiArrowUpOutline } from 'react-icons/ti';
import { toast } from 'sonner';

const AdvancedRedditForum = () => {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('redditPosts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState('new');
  const [activeSubreddit, setActiveSubreddit] = useState('All');
  const [currentUser] = useState({ username: 'demo_user' });
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreText, setShowMoreText] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    customFeeds: true,
    communities: true,
    resources: true,
  });

  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const handleShareClick = () => {
    setShowDropDown((prev) => !prev);
  };

  // Copy link function
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied!');
    setShowDropDown(false);
  };

  // Open Twitter share window
  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        window.location.href
      )}`,
      '_blank'
    );
    setShowDropDown(false);
  };

  // Open Facebook share window
  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`,
      '_blank'
    );
    setShowDropDown(false);
  };

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  // Function to handle clicks outside the dropdown
  // const handleClickOutside = useCallback((event) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     setShowDropDown(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [handleClickOutside]); // Ensure `handleClickOutside` updates properly
  // // Local storage persistence
  // useEffect(() => {
  //   localStorage.setItem('redditPosts', JSON.stringify(posts));
  // }, [posts]);

  // Post filtering and sorting
  useEffect(() => {
    let filtered = [...posts];

    if (activeSubreddit !== 'All') {
      filtered = filtered.filter((post) => post.subreddit === activeSubreddit);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          (post.text && post.text.toLowerCase().includes(query))
      );
    }

    setFilteredPosts(sortPosts(filtered, sortOption));
  }, [searchQuery, activeSubreddit, posts, sortOption]);

  const sortPosts = (postsToSort, option) => {
    const sorters = {
      new: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      top: (a, b) => b.upvotes - a.upvotes,
      controversial: (a, b) =>
        b.comments.length +
        b.controversialScore -
        a.comments.length -
        a.controversialScore,
      rising: (a, b) => b.upvoteRate - a.upvoteRate,
      hot: (a, b) =>
        b.upvotes + b.comments.length * 2 - a.upvotes - a.comments.length * 2,
    };
    return [...postsToSort].sort(sorters[option] || sorters.hot);
  };

  const handleVote = (postId, voteDirection) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const currentVote = post.userVote;
          let updatedUpvotes = post.upvotes;

          if (currentVote === 'up') updatedUpvotes--;
          if (currentVote === 'down') updatedUpvotes++;

          let newVote = null;
          if (currentVote !== voteDirection) {
            newVote = voteDirection;
            if (voteDirection === 'up') updatedUpvotes++;
            if (voteDirection === 'down') updatedUpvotes--;
          }

          return { ...post, upvotes: updatedUpvotes, userVote: newVote };
        }
        return post;
      })
    );
  };

  const handleCreatePost = (postData) => {
    const newPost = {
      id: Date.now(),
      title: postData.title,
      author: currentUser.username,
      subreddit: postData.subreddit,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      comments: [],
      type: postData.type,
      text: postData.text,
      image: postData.image,
      link: postData.link,
      poll: postData.pollOptions
        ? {
            options: postData.pollOptions,
            votes: postData.pollOptions.reduce(
              (acc, option) => ({ ...acc, [option]: 0 }),
              {}
            ),
          }
        : null,
      userVote: '',
    };

    setPosts([newPost, ...posts]);
    setShowCreatePostModal(false);
  };

  const popularSubreddits = [
    { name: 'All' },
    { name: 'programming' },
    { name: 'worldnews' },
    { name: 'science' },
    { name: 'gaming' },
    { name: 'forum' },
  ];

  // Create Post Modal Component
  const CreatePostModal = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedSubreddit, setSelectedSubreddit] = useState(
      activeSubreddit !== 'All' ? activeSubreddit : 'programming'
    );
    const [postType, setPostType] = useState('text');
    const [imagePreview, setImagePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [linkUrl, setLinkUrl] = useState('');
    const [pollOptions, setPollOptions] = useState(['', '']);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const isVideo = file.type.startsWith('video/');
      const previewUrl = URL.createObjectURL(file);

      // Clear previous previews
      setImagePreview(isVideo ? null : previewUrl);
      setVideoPreview(isVideo ? previewUrl : null);

      // Set post type and file
      setPostType(isVideo ? 'video' : 'image');
      setSelectedFile(file);
    };

    const addPollOption = () => {
      setPollOptions([...pollOptions, '']);
    };

    const handlePollOptionChange = (index, value) => {
      const newOptions = [...pollOptions];
      newOptions[index] = value;
      setPollOptions(newOptions);
    };

    const handleSubmit = () => {
      const postData = {
        title,
        subreddit: selectedSubreddit,
        type: postType,
        text: content,
        image: imagePreview,
        link: linkUrl,
        pollOptions:
          postType === 'poll' ? pollOptions.filter((opt) => opt.trim()) : null,
      };

      handleCreatePost(postData);
      setSelectedFile(null);
      setImagePreview(null);
      setVideoPreview(null);
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
        <div className="bg-[#1F2A30] p-6 rounded-lg shadow-xl w-full max-w-2xl">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Create a post</h2>
            <button
              onClick={() => setShowCreatePostModal(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Subreddit Selection */}
          <select
            value={selectedSubreddit}
            onChange={(e) => setSelectedSubreddit(e.target.value)}
            className="w-full p-2 mb-4 bg-[#0B1416] text-white rounded"
          >
            {popularSubreddits
              .filter((s) => s.name !== 'All')
              .map((sub) => (
                <option key={sub.name} value={sub.name}>
                  forum/{sub.name}
                </option>
              ))}
          </select>

          {/* Post Type Tabs */}
          <div className="flex mb-4 border-b border-gray-700">
            {['text', 'image', 'link', 'poll'].map((type) => (
              <button
                key={type}
                onClick={() => setPostType(type)}
                className={`px-4 py-2 capitalize ${
                  postType === type ? 'border-b-2 border-[#289297]' : ''
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Post Content */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 bg-[#0B1416] text-white rounded"
          />

          {postType === 'text' && (
            <textarea
              placeholder="Text (optional)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 h-32 bg-[#0B1416] text-white rounded"
            />
          )}

          {(postType === 'image' || postType === 'video') && (
            <div className="mb-4 border-2 border-dashed border-gray-700 rounded p-4 text-center">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleImageUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-96 mx-auto rounded"
                  />
                ) : videoPreview ? (
                  <video
                    src={videoPreview}
                    controls
                    className="max-h-96 mx-auto rounded"
                  />
                ) : (
                  <>
                    <div className="text-4xl mb-2">↑</div>
                    <p className="text-gray-400">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports images and videos
                    </p>
                  </>
                )}
              </label>
            </div>
          )}

          {postType === 'link' && (
            <input
              type="url"
              placeholder="Enter URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full p-2 mb-4 bg-[#0B1416] text-white rounded"
            />
          )}

          {postType === 'poll' && (
            <div className="mb-4">
              {pollOptions.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) =>
                      handlePollOptionChange(index, e.target.value)
                    }
                    className="w-full p-2 bg-[#0B1416] text-white rounded"
                  />
                </div>
              ))}
              <button
                onClick={addPollOption}
                className="text-[#289297] text-sm"
              >
                + Add Option
              </button>
            </div>
          )}

          {/* Submit Section */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              disabled={
                !title.trim() ||
                (postType === 'poll' &&
                  pollOptions.filter((opt) => opt.trim()).length < 2)
              }
              className={`px-6 py-2 rounded ${
                title.trim() ? 'bg-[#289297] hover:bg-[#1d6d72]' : 'bg-gray-600'
              } text-white`}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Post rendering logic
  const renderPostContent = (post) => {
    switch (post.type) {
      case 'link':
        return (
          post.link && (
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 p-4 bg-[#1a2b33] rounded-lg border border-[#1d2d35] hover:border-[#3a4a52] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#0f1a1f] p-2 rounded-lg">
                  <FiLink className="text-[#89c4f4] text-xl" />
                </div>
                <div>
                  <p className="text-white font-medium truncate">
                    {new URL(post.link).hostname}
                  </p>
                  <p className="text-[#6c7a80] text-sm mt-1">{post.link}</p>
                </div>
              </div>
            </a>
          )
        );
      case 'poll':
        return (
          post.poll && (
            <div className="mt-4 w-full space-y-3">
              {post.poll.options.map((option, index) => {
                const totalVotes = Object.values(post.poll.votes).reduce(
                  (a, b) => a + b,
                  0
                );
                const percentage =
                  totalVotes > 0
                    ? (post.poll.votes[option] / totalVotes) * 100
                    : 0;

                return (
                  <div key={index} className="relative">
                    <button
                      onClick={() => handlePollVote(post.id, option)}
                      className="w-full p-4 text-left bg-[#1a2b33] rounded-xl border border-[#1d2d35] hover:border-[#3a4a52] transition-all relative overflow-hidden group"
                    >
                      <div className="relative z-10 flex items-center justify-between">
                        <span>{option}</span>
                        <span className="text-sm text-[#89c4f4]">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-[#28929733] to-[#1a5a6c33]"
                        style={{ width: `${percentage}%` }}
                      />
                    </button>
                    <div className="text-xs text-[#6c7a80] mt-1 ml-2">
                      {post.poll.votes[option]} votes
                    </div>
                  </div>
                );
              })}
              <div className="text-xs text-[#6c7a80] mt-2">
                Total votes:{' '}
                {Object.values(post.poll.votes).reduce((a, b) => a + b, 0)}
              </div>
            </div>
          )
        );
      default:
        return null;
    }
  };

  const handlePollVote = (postId, option) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId && post.poll) {
          const newVotes = { ...post.poll.votes };
          newVotes[option] = (newVotes[option] || 0) + 1;
          return {
            ...post,
            poll: { ...post.poll, votes: newVotes },
          };
        }
        return post;
      })
    );
  };

  // rendomly skeletons will displaing when page loading or refrash the page
  const skeletons = [...Array(5)].map((_, i) => i);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle skeletons before rendering
  const randomizedSkeletons = shuffleArray([...skeletons]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  return (
    <>
      <div className={`min-h-screen`}>
        <div className="container mx-auto pt-20 flex">
          {/* sidebar */}
          <div className="relative z-[99999] h-screen">
            <div
              className={`h-full bg-[#1F2A30] transition-all duration-300 ease-in-out border-r border-[#24414F] fixed top-0 left-0 ${
                isExpanded ? 'w-64' : 'w-16'
              }`}
            >
              <div className="text-white">
                <div className="relative flex justify-end px-1 mt-[7rem] py-2">
                  <button
                    className={`absolute -top-7 -right-4 w-8 bg-[#1F2A30] h-8 border flex items-center justify-center rounded-full`}
                    onClick={toggleSidebar}
                  >
                    {isExpanded ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    ) : (
                      <IoMenu />
                    )}
                  </button>
                </div>

                <div className="space-y-4 mt-2">
                  <button
                    className={`flex items-center ${
                      isExpanded ? 'w-full px-4' : 'justify-center w-full'
                    } py-2 hover:bg-gray-800`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    {isExpanded && <span className="ml-3">Home</span>}
                  </button>

                  <button
                    className={`flex items-center ${
                      isExpanded ? 'w-full px-4' : 'justify-center w-full'
                    } py-2 hover:bg-gray-800`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    {isExpanded && <span className="ml-3">Popular</span>}
                  </button>

                  <button
                    className={`flex items-center ${
                      isExpanded ? 'w-full px-4' : 'justify-center w-full'
                    } py-2 hover:bg-gray-800`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <circle cx="9" cy="9" r="4" />
                      <path d="M15 5h0a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V5z" />
                      <path d="M9 13v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-3" />
                    </svg>
                    {isExpanded && <span className="ml-3">Explore</span>}
                  </button>

                  <button
                    className={`flex items-center ${
                      isExpanded ? 'w-full px-4' : 'justify-center w-full'
                    } py-2 hover:bg-gray-800`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                    {isExpanded && <span className="ml-3">All</span>}
                  </button>
                </div>

                <div className="border-t border-gray-700 mt-4"></div>

                {isExpanded && (
                  <>
                    <div className="py-2">
                      <button
                        className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-400"
                        onClick={() => toggleSection('customFeeds')}
                      >
                        <span>CUSTOM FEEDS</span>
                        <span
                          className="transform transition-transform duration-200"
                          style={{
                            transform: expandedSections.customFeeds
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)',
                          }}
                        >
                          ∧
                        </span>
                      </button>

                      {expandedSections.customFeeds && (
                        <button className="flex items-center w-full hover:bg-gray-800 px-4 py-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5 mr-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          <span>Create a custom feed</span>
                        </button>
                      )}
                    </div>

                    <div className="border-t border-gray-700"></div>

                    <div className="py-2">
                      <button
                        className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-400"
                        onClick={() => toggleSection('communities')}
                      >
                        <span>COMMUNITIES</span>
                        <span
                          className="transform transition-transform duration-200"
                          style={{
                            transform: expandedSections.communities
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)',
                          }}
                        >
                          ∧
                        </span>
                      </button>

                      {expandedSections.communities && (
                        <button className="flex items-center w-full hover:bg-gray-800 px-4 py-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5 mr-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          <span>Create a community</span>
                        </button>
                      )}
                    </div>

                    <div className="border-t border-gray-700"></div>

                    <div className="py-2">
                      <button
                        className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-400"
                        onClick={() => toggleSection('resources')}
                      >
                        <span>RESOURCES</span>
                        <span
                          className="transform transition-transform duration-200"
                          style={{
                            transform: expandedSections.resources
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)',
                          }}
                        >
                          ∧
                        </span>
                      </button>

                      {expandedSections.resources && (
                        <div className="space-y-1">
                          <button className="flex items-center w-full hover:bg-gray-800 px-4 py-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-5 h-5 mr-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>About Reddit</span>
                          </button>

                          <button className="flex items-center w-full hover:bg-gray-800 px-4 py-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-5 h-5 mr-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                              />
                            </svg>
                            <span>Advertise</span>
                          </button>

                          <button className="flex items-center w-full hover:bg-gray-800 px-4 py-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-5 h-5 mr-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>Help</span>
                          </button>

                          <button className="flex items-center w-full hover:bg-gray-800 px-4 py-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-5 h-5 mr-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                              />
                            </svg>
                            <span>Blog</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Post section */}
          <main className="bg-transparent min-h-screen p-4 flex-grow">
            <div className="mx-auto w-[48rem]">
              {/* Post header */}
              <div className="flex w-full items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {activeSubreddit === 'All'
                    ? 'Popular Posts'
                    : `${activeSubreddit}`}
                </h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowCreatePostModal(true)}
                    className="bg-[#2DA3AA] hover:bg-[#6ab0ae] text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2"
                  >
                    <RiPencilLine className="text-lg" />
                    Create Post
                  </button>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border rounded-full px-4 py-2 bg-[#1F2A30] border-[#0B1416] placeholder-[#818384] text-white w-64 focus:outline-none focus:border-[#2DA3AA] focus:ring-1 focus:ring-[#2DA3AA]"
                    />
                    <FiSearch className="text-[#818384] absolute right-3 top-3" />
                  </div>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border rounded-full px-2 py-2 bg-[#1F2A30] border-[#0B1416] text-white text-sm font-medium focus:outline-none focus:border-[#2DA3AA] cursor-pointer"
                  >
                    <option value="hot">Hot</option>
                    <option value="new">New</option>
                    <option value="top">Top</option>
                    <option value="rising">Rising</option>
                  </select>
                </div>
              </div>
              {/* Skeliton for Post */}
              {loading ? (
                <div className="space-y-4 w-full transition-all duration-500">
                  {/* randon skeletons for loading */}
                  {randomizedSkeletons.map((i) => (
                    <div
                      key={i}
                      className="bg-[#1F2A30] border border-[#0B1416] rounded-lg p-3 animate-pulse w-full"
                    >
                      {i === 0 && (
                        <div className="flex gap-3">
                          <div className="flex flex-col items-center mr-3 w-10">
                            <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
                            <div className="h-16 w-1 bg-[#0B1416] rounded-full my-1" />
                            <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="h-4 bg-[#0B1416] rounded-full w-16" />
                              <div className="h-3 bg-[#0B1416] rounded w-32" />
                            </div>

                            <div className="h-5 bg-[#0B1416] rounded w-3/4" />

                            <div className="space-y-2">
                              <div className="h-4 bg-[#0B1416] rounded w-full" />
                              <div className="h-4 bg-[#0B1416] rounded w-5/6" />
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="h-4 bg-[#0B1416] rounded w-24" />
                              <div className="h-4 bg-[#0B1416] rounded w-20" />
                              <div className="h-4 bg-[#0B1416] rounded w-20" />
                            </div>
                          </div>
                        </div>
                      )}

                      {i === 1 && (
                        <div className="flex gap-3">
                          {/* Voting Controls */}
                          <div className="flex flex-col items-center mr-3 w-10">
                            <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
                            <div className="h-16 w-1 bg-[#0B1416] rounded-full my-1" />
                            <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
                          </div>

                          {/* Post Content */}
                          <div className="flex-1 space-y-3">
                            {/* Header */}
                            <div className="flex items-center gap-2">
                              <div className="h-4 bg-[#0B1416] rounded-full w-16" />
                              <div className="h-3 bg-[#0B1416] rounded w-32" />
                            </div>

                            {/* Title */}
                            <div className="h-5 bg-[#0B1416] rounded w-3/4" />

                            {/* Text Body */}
                            <div className="space-y-2">
                              <div className="h-4 bg-[#0B1416] rounded w-full" />
                              <div className="h-4 bg-[#0B1416] rounded w-5/6" />
                              <div className="h-4 bg-[#0B1416] rounded w-2/3" />
                            </div>

                            {/* Image Placeholder */}
                            <div className="h-64 bg-[#0B1416] rounded-lg" />

                            {/* Footer */}
                            <div className="flex items-center gap-4">
                              <div className="h-4 bg-[#0B1416] rounded w-24" />
                              <div className="h-4 bg-[#0B1416] rounded w-20" />
                              <div className="h-4 bg-[#0B1416] rounded w-20" />
                            </div>
                          </div>
                        </div>
                      )}

                      {i === 2 && (
                        <div className="flex gap-3">
                          {/* Voting Controls */}
                          <div className="flex flex-col items-center mr-3 w-10">
                            <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
                            <div className="h-16 w-1 bg-[#0B1416] rounded-full my-1" />
                            <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
                          </div>

                          {/* Post Content */}
                          <div className="flex-1 space-y-3">
                            {/* Header */}
                            <div className="flex items-center gap-2">
                              <div className="h-4 bg-[#0B1416] rounded-full w-16" />
                              <div className="h-3 bg-[#0B1416] rounded w-32" />
                            </div>

                            {/* Title */}
                            <div className="h-5 bg-[#0B1416] rounded w-3/4" />

                            {/* Text Body */}
                            <div className="space-y-2">
                              <div className="h-4 bg-[#0B1416] rounded w-full" />
                              <div className="h-4 bg-[#0B1416] rounded w-5/6" />
                              <div className="h-4 bg-[#0B1416] rounded w-2/3" />
                            </div>

                            {/* Footer */}
                            <div className="flex items-center gap-4">
                              <div className="h-4 bg-[#0B1416] rounded w-24" />
                              <div className="h-4 bg-[#0B1416] rounded w-20" />
                              <div className="h-4 bg-[#0B1416] rounded w-20" />
                            </div>
                          </div>
                        </div>
                      )}

                      {i === 3 && (
                        <div className="flex gap-3">
                          {/* Voting Controls */}
                          <div className="flex flex-col items-center mr-3 w-10">
                            <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
                            <div className="h-16 w-1 bg-[#0B1416] rounded-full my-1" />
                            <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
                          </div>

                          {/* Post Content */}
                          <div className="flex-1 space-y-3">
                            {/* Header */}
                            <div className="flex items-center gap-2">
                              <div className="h-4 bg-[#0B1416] rounded-full w-16" />
                              <div className="h-3 bg-[#0B1416] rounded w-32" />
                            </div>

                            {/* Text Body */}
                            <div className="space-y-2">
                              <div className="h-4 bg-[#0B1416] rounded w-full" />
                              <div className="h-4 bg-[#0B1416] rounded w-full" />
                              <div className="h-4 bg-[#0B1416] rounded w-full" />
                              <div className="h-4 bg-[#0B1416] rounded w-full" />
                              <div className="h-4 bg-[#0B1416] rounded w-full" />
                            </div>

                            {/* Footer */}
                            <div className="flex items-center gap-4">
                              <div className="h-4 bg-[#0B1416] rounded w-24" />
                              <div className="h-4 bg-[#0B1416] rounded w-20" />
                              <div className="h-4 bg-[#0B1416] rounded w-20" />
                            </div>
                          </div>
                        </div>
                      )}
                      {i === 4 && (
                        <div className="flex gap-3">
                          {/* Voting Controls */}
                          <div className="flex flex-col items-center mr-3 w-10">
                            <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
                            <div className="h-16 w-1 bg-[#0B1416] rounded-full my-1" />
                            <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
                          </div>

                          {/* Post Content */}
                          <div className="flex-1 space-y-3">
                            {/* Header */}
                            <div className="flex items-center gap-2">
                              <div className="h-4 bg-[#0B1416] rounded-full w-16" />
                              <div className="h-3 bg-[#0B1416] rounded w-32" />
                            </div>

                            {/* Text Body */}
                            <div className="space-y-2">
                              <div className="h-4 bg-[#0B1416] rounded w-full" />
                              <div className="h-4 bg-[#0B1416] rounded w-full" />
                              <div className="h-4 bg-[#0B1416] rounded w-full" />
                              <div className="h-4 bg-[#0B1416] rounded w-full" />
                              <div className="h-4 bg-[#0B1416] rounded w-full" />
                            </div>

                            {/* Footer */}
                            <div className="flex items-center gap-4">
                              <div className="h-4 bg-[#0B1416] rounded w-24" />
                              <div className="h-4 bg-[#0B1416] rounded w-20" />
                              <div className="h-4 bg-[#0B1416] rounded w-20" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 w-full">
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="group bg-[#0f1a1f] border border-[#1d2d35] rounded-xl hover:border-[#3a4a52] transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl relative "
                    >
                      <div className="flex p-4">
                        {/* Voting Sidebar */}
                        <div className="flex flex-col items-center mr-4 w-12">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVote(post.id, 'up');
                            }}
                            className={`p-2 hover:bg-[#1a2b33] rounded-full ${
                              post.userVote === 'up'
                                ? 'text-[#ff4500] hover:bg-[#ff450022]'
                                : 'text-[#6c7a80] hover:text-[#ff4500]'
                            }`}
                          >
                            <TiArrowUpOutline className="text-2xl" />
                          </button>
                          <span className="text-sm font-bold my-1 text-white">
                            {post.upvotes}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVote(post.id, 'down');
                            }}
                            className={`p-2 hover:bg-[#1a2b33] rounded-full ${
                              post.userVote === 'down'
                                ? 'text-[#7193ff] hover:bg-[#7193ff22]'
                                : 'text-[#6c7a80] hover:text-[#7193ff]'
                            }`}
                          >
                            <TiArrowDownOutline className="text-2xl" />
                          </button>
                        </div>

                        {/* Post Content */}
                        <div className="flex-1">
                          {/* Post Header */}
                          <div className="flex items-center gap-3 text-sm mb-3">
                            <span className="bg-gradient-to-r from-[#289297] to-[#1a5a6c] text-white px-3 py-1 rounded-full text-xs font-medium">
                              forum/{post.subreddit}
                            </span>
                            <span className="text-[#6c7a80] flex items-center">
                              <span className="w-1 h-1 bg-[#6c7a80] rounded-full mr-2" />
                              Posted by u/{post.author} • {post.timePosted}
                            </span>
                          </div>

                          {/* Post Title */}
                          <h3 className="text-md font-semibold text-white mb-1">
                            {post.title}
                          </h3>

                          {/* Post Body */}
                          {post.text.length >= 300 ? (
                            <div className="relative">
                              <div
                                className={`relative text-justify ${
                                  showMoreText ? '' : 'overflow-hidden max-h-48'
                                }`}
                              >
                                {post.text}
                                {!showMoreText && (
                                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0f1a1f] to-transparent" />
                                )}
                              </div>
                              <button
                                onClick={() => setShowMoreText(!showMoreText)}
                                className="text-[#4fbcff]  font-medium hover:underline flex items-center cursor-pointer my-2 transform active:scale-95 duration-100"
                              >
                                {showMoreText ? 'Read Less' : 'Read More'}
                                <FiArrowRight className="ml-1" />
                              </button>
                            </div>
                          ) : (
                            post.text
                          )}

                          {/* Media Content */}
                          {post.image && (
                            <div className="mb-4 relative group">
                              {post.type === 'video' ? (
                                <video
                                  controls
                                  className=" max-h-[480px] w-full rounded-xl border border-[#1d2d35] hover:border-[#3a4a52] transition-all object-cover"
                                >
                                  <source src={post.image} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              ) : (
                                <img
                                  src={post.image}
                                  alt="Post content"
                                  className="max-h-[480px]  w-full rounded-xl border border-[#1d2d35] hover:border-[#3a4a52] transition-all object-cover"
                                />
                              )}
                            </div>
                          )}

                          {/* Special Content */}
                          {renderPostContent(post)}

                          {/* Post Footer */}
                          <div className="flex border-t items-center gap-4 text-[#6c7a80] text-sm mt-1">
                            <button
                              className="flex items-center gap-1 cursor-pointer hover:bg-[#1a2b33] px-4
                            mt-2 py-2 rounded-full transition-colors"
                            >
                              <FaRegCommentAlt className="text-[#6c7a80]" />
                              <span className="font-medium text-white">
                                {post.commentCount}
                              </span>
                              Comments
                            </button>

                            <div className="relative" ref={dropdownRef}>
                              <button
                                onClick={handleShareClick}
                                className="flex mt-2 items-center cursor-pointer gap-2 hover:bg-[#1a2b33] px-4 py-2 rounded-full transition-colors"
                              >
                                <CiShare2 />
                                <span className="font-medium">Share</span>
                              </button>

                              {showDropDown && (
                                <div className="absolute top-full left-0 mt-1 bg-[#1F2A30] text-white shadow-md rounded-lg p-1 w-auto z-[99999]">
                                  <button
                                    onClick={handleCopyLink}
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-left rounded-md"
                                  >
                                    <GoLink className="text-gray-300" />
                                    Copy link
                                  </button>
                                  <button
                                    onClick={handleTwitterShare}
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-left rounded-md"
                                  >
                                    <FaTwitter className="text-gray-300" />
                                    Twitter
                                  </button>
                                  <button
                                    onClick={handleFacebookShare}
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-left rounded-md"
                                  >
                                    <FaFacebook className="text-gray-300" />
                                    Facebook
                                  </button>
                                </div>
                              )}
                            </div>

                            <div className="relative inline-block">
                              <div className="flex mt-2 items-center gap-1 hover:bg-[#1a2b33] p-2 rounded-full">
                                <FiMoreHorizontal
                                  onClick={handleShowMore}
                                  className="w-5 h-5"
                                />
                              </div>
                              {showMore && (
                                <div className="absolute top-full left-0 mt-1 bg-[#1F2A30] text-white shadow-md rounded-lg p-1 w-auto z-[99999]">
                                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-left rounded-md">
                                    <CiBookmark className="text-gray-300" />
                                    Save
                                  </button>
                                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-left rounded-md">
                                    <MdBugReport className="text-gray-300" />
                                    Report
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity">
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#28929722] to-[#1a5a6c22] blur-xl" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>

          <div
            className="fixed top-0 -z-10 right-[31rem] h-screen w-7 border-[#24414F] border-x-[.1px] col-start-4 row-span-5 row-start-1
  bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
  bg-[size:10px_10px] bg-fixed
  [--pattern-fg:var(--color-gray-950)]/5
  max-lg:hidden
  dark:[--pattern-fg:var(--color-white)]/10"
          ></div>

          {/* User profile */}
          <aside>
            {loading ? (
              <div className="animate-pulse space-y-6 w-[26.3rem] p-6">
                {/* Profile Header */}
                <div className="bg-[#192327] p-5 rounded-xl">
                  <div className="flex items-center flex-col gap-4">
                    <div className="h-20 w-20  rounded-full bg-[#1F2A30]" />
                    <div className="h-6 w-40 rounded bg-[#1F2A30]" />
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-6">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="space-y-1 flex justify-center items-center flex-col"
                          >
                            <div className="h-4 w-8 rounded bg-[#1F2A30]" />
                            <div className="h-4 w-16 rounded bg-[#1F2A30]" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="space-y-2 rounded-lg bg-[#1F2A30] p-4"
                    >
                      <div className="h-4 w-16 rounded bg-[#0B1416]" />
                      <div className="h-6 w-8 rounded bg-[#0B1416]" />
                    </div>
                  ))}
                </div>

                {/* About Me */}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-[#1F2A30]" />
                    <div className="h-3 w-4/5 rounded bg-[#1F2A30]" />
                    <div className="h-3 w-3/4 rounded bg-[#1F2A30]" />
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-4">
                  <div className="h-5 w-32 rounded bg-[#1F2A30]" />
                  <div className="space-y-3 rounded-lg bg-[#1F2A30] p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-24 rounded bg-[#0B1416]" />
                      <div className="h-3 w-3 rounded-full bg-[#0B1416]" />
                      <div className="h-3 w-16 rounded bg-[#0B1416]" />
                    </div>
                    <div className="h-4 w-3/4 rounded bg-[#0B1416]" />
                    <div className="space-y-2">
                      <div className="h-3 w-full rounded bg-[#0B1416]" />
                      <div className="h-3 w-5/6 rounded bg-[#0B1416]" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-5 w-32 rounded bg-[#1F2A30]" />
                  <div className="space-y-3 rounded-lg bg-[#1F2A30] p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-24 rounded bg-[#0B1416]" />
                      <div className="h-3 w-3 rounded-full bg-[#0B1416]" />
                      <div className="h-3 w-16 rounded bg-[#0B1416]" />
                    </div>
                    <div className="h-4 w-3/4 rounded bg-[#0B1416]" />
                    <div className="space-y-2">
                      <div className="h-3 w-full rounded bg-[#0B1416]" />
                      <div className="h-3 w-5/6 rounded bg-[#0B1416]" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="sticky top-26 h-[90vh] pb-10 ml-5 rounded-xl  overflow-y-auto w-[25rem]">
                {/* Profile Header with Parallax Effect */}
                <div className="bg-gradient-to-br from-[#2DA3AA] to-[#1F2A30] p-6 shadow-2xl rounded-t-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-noise opacity-10"></div>

                  {/* Animated Avatar */}
                  <div className="flex flex-col items-center relative z-10">
                    <div
                      className="w-20 h-20 rounded-full border-2 border-[#2DA3AA] overflow-hidden shadow-2xl shadow-white/60
          hover:shadow-[#2DA3AA]/50 transition-all duration-300 hover:scale-105 hover:rotate-3 cursor-pointer
          float"
                    >
                      <img
                        src="https://styles.redditmedia.com/t5_2qhva/styles/communityIcon_ilf7iae3i9941.png"
                        alt="User Avatar"
                        className="w-full h-full object-cover transform group-hover/profile:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Name with Gradient Text */}
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-0% from-white/55 to-76% to-[#6ab0ae] bg-clip-text text-transparent mt-4">
                      Haris khan
                    </h1>

                    {/* Interactive Stats Ribbon */}
                    <div className="flex gap-6 mt-6">
                      <div className="text-center hover:scale-110 transition-transform">
                        <div className="text-2xl font-bold text-white">
                          1.2B
                        </div>
                        <div className="text-xs text-[#2DA3AA] font-medium">
                          Followers
                        </div>
                      </div>
                      <div className="text-center hover:scale-110 transition-transform">
                        <div className="text-2xl font-bold text-white">784</div>
                        <div className="text-xs text-[#2DA3AA] font-medium">
                          Following
                        </div>
                      </div>
                      <div className="text-center hover:scale-110 transition-transform">
                        <div className="text-2xl font-bold text-white">15</div>
                        <div className="text-xs text-[#2DA3AA] font-medium">
                          Awards
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glassmorphism Stats Cards */}
                <div className="grid grid-cols-3 gap-3 mt-6 px-4">
                  {[
                    {
                      label: 'Posts',
                      value: '47',
                      color: 'from-[#2DA3AA] to-[#1F2A30]',
                    },
                    {
                      label: 'Comments',
                      value: '312',
                      color: 'from-[#2D969D] to-[#1F2A30]',
                    },
                    {
                      label: 'Awards',
                      value: '8',
                      color: 'from-[#ffd700] to-[#1F2A30]',
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br ${stat.color} p-3 rounded-xl backdrop-blur-sm border border-white/10
                 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                      <p className="text-xs text-gray-300 mb-1">{stat.label}</p>
                      <p className="text-xl font-bold text-white">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Interactive Bio Section */}
                <div
                  className="bg-[#1F2A30]/90 backdrop-blur-sm rounded-xl p-4 mt-6 mx-4 border border-white/10
                hover:border-[#2DA3AA]/30 transition-all duration-300 group/bio"
                >
                  <h2 className="text-sm font-bold mb-2 flex items-center">
                    <span className="bg-[#2DA3AA] w-2 h-2 rounded-full mr-2 animate-pulse"></span>
                    About Me
                  </h2>
                  <p className="text-xs text-gray-400 group-hover/bio:text-gray-300 transition-colors duration-300">
                    Passionate about technology, web development, and
                    open-source projects.
                    <span className="block mt-2 opacity-0 group-hover/bio:opacity-100 transition-opacity duration-300">
                      🚀 Currently learning: Advanced React patterns & Web3
                      development
                    </span>
                  </p>
                </div>

                {/* Animated Activity Feed */}
                <div className="mt-6 px-4 space-y-4">
                  <h2 className="text-sm font-bold mb-2 flex items-center">
                    <span className="bg-[#2D969D] w-2 h-2 rounded-full mr-2 animate-pulse"></span>
                    Recent Activity
                  </h2>

                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="bg-[#1F2A30]/90 backdrop-blur-sm rounded-xl p-4 border border-white/10
                hover:border-[#2D969D]/30 transition-all duration-300 transform hover:scale-[1.01]
                cursor-pointer group/activity"
                    >
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <span>Posted in</span>
                        <span className="text-[#2D969D] font-medium">
                          forum/technology
                        </span>
                        <span>•</span>
                        <span className="group-hover/activity:text-white transition-colors">
                          2 hours ago
                        </span>
                      </div>
                      <h3 className="text-sm font-medium mt-2 text-white line-clamp-1">
                        Sample Post #10: This is a title that would typically be
                        about technology
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2 group-hover/activity:text-gray-300">
                        This is sample post content. In a real Reddit-like
                        application...
                      </p>
                      <div className="flex items-center space-x-3 mt-3 text-xs">
                        <div className="flex items-center space-x-1 text-[#2DA3AA]">
                          <FiArrowUp className="w-4 h-4" />
                          <span>9.7B</span>
                        </div>
                        <div className="flex items-center space-x-1 text-[#2D969D]">
                          <FiMessageSquare className="w-4 h-4" />
                          <span>47</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Animated Trending Topics */}
                <div className="mt-6 px-4">
                  <h2 className="text-sm font-bold mb-3 flex items-center">
                    <span className="bg-[#ffd700] w-2 h-2 rounded-full mr-2 animate-pulse"></span>
                    Trending Topics
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Web Development',
                      'ReactJS',
                      'TailwindCSS',
                      'Open Source',
                      'AI & ML',
                      'Tajweed',
                      'Fun',
                    ].map((topic, i) => (
                      <span
                        key={i}
                        className="bg-[#1F2A30]/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs
                   border border-white/10 hover:border-[#2DA3AA] hover:text-[#2DA3AA]
                   transition-all duration-200 cursor-pointer transform hover:scale-105"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>

        {showCreatePostModal && <CreatePostModal />}
      </div>
    </>
  );
};

export default AdvancedRedditForum;
