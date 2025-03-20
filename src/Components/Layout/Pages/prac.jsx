// // const generateSamplePosts = () => {
// //   const subreddits = [
// //     'forum/programming',
// //     'forum/worldnews',
// //     'forum/science',
// //     'forum/gaming',
// //     'forum/movies',
// //     'forum/AskReddit',
// //     'forum/technology',
// //     'forum/sports',
// //   ];

// //   const authors = [
// //     'tech_wizard',
// //     'news_junkie',
// //     'code_ninja',
// //     'game_master',
// //     'film_buff',
// //     'curious_mind',
// //     'science_geek',
// //     'sports_fan',
// //   ];

// //   const samplePosts = [];
// //   const now = new Date();

// //   for (let i = 1; i <= 20; i++) {
// //     const createdAt = new Date(
// //       now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000
// //     );
// //     const hours = Math.floor((now - createdAt) / (60 * 60 * 1000));
// //     const upvotes = Math.floor(Math.random() * 10000);
// //     const commentCount = Math.floor(Math.random() * 500);
// //     const hasImage = Math.random() > 0.6;

// //     const comments = [];
// //     for (let j = 0; j < commentCount; j++) {
// //       comments.push({
// //         id: j,
// //         author: authors[Math.floor(Math.random() * authors.length)],
// //         text: 'This is a sample comment. In a real app, this would contain actual user-generated content.',
// //         upvotes: Math.floor(Math.random()),
// //         timePosted: `${Math.floor(Math.random() * 10)} hours ago`,
// //         replies: [],
// //       });
// //     }

// //     samplePosts.unshift({
// //       id: i,
// //       title: `Sample Post #${i}: This is a title that would typically be about ${
// //         i % 2 === 0 ? 'technology' : 'current events'
// //       }`,
// //       author: authors[Math.floor(Math.random() * authors.length)],
// //       subreddit: subreddits[Math.floor(Math.random() * subreddits.length)],
// //       createdAt: createdAt.toISOString(),
// //       timePosted:
// //         hours < 24
// //           ? `${hours} hours ago`
// //           : `${Math.floor(hours / 24)} days ago`,
// //       upvotes: upvotes,
// //       upvoteRate: upvotes / (hours + 1),
// //       controversialScore: Math.floor(Math.random() * 50),
// //       comments: comments,
// //       text:
// //         i % 3 !== 0
// //           ? 'This is sample post content. In a real Reddit-like application, this would contain user-generated text with potentially formatting, links, and other elements.'
// //           : null,
// //       image: hasImage
// //         ? 'https://www.pixelstalk.net/wp-content/uploads/2016/08/Best-Amazing-Images-For-Desktop.jpg'
// //         : null,
// //       userVote: null,
// //       userAvatar: '/default-avatar.png', // Default avatar
// //     });
// //   }

// //   return samplePosts;
// // };
// import { useEffect, useState } from 'react';
// import { FaRegCommentAlt } from 'react-icons/fa';
// import { FiSearch } from 'react-icons/fi';
// import { MdOutlineContentCopy } from 'react-icons/md';
// import { RiPencilLine } from 'react-icons/ri';
// import { TiArrowDownOutline, TiArrowUpOutline } from 'react-icons/ti';

// // Sample initial posts data
// const initialPosts = [
//   {
//     id: 1,
//     title: 'Welcome to our Reddit-style Forum!',
//     author: 'admin',
//     subreddit: 'forum',
//     createdAt: new Date().toISOString(),
//     timePosted: 'Just now',
//     upvotes: 42,
//     comments: [],
//     text: 'This is our community forum. Feel free to post and discuss!',
//     type: 'text',
//     userVote: '',
//     userAvatar: '/default-avatar.png',
//   },
// ];

// const AdvancedRedditForum = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [sortOption, setSortOption] = useState('hot');
//   const [activeSubreddit, setActiveSubreddit] = useState('All');
//   const [showCreatePostModal, setShowCreatePostModal] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [expandedSections] = useState({
//     customFeeds: true,
//     communities: true,
//     resources: true,
//   });
//   const [copiedPostId, setCopiedPostId] = useState(null);
//   const [pollOptions, setPollOptions] = useState(['', '']);
//   const [mediaPreview, setMediaPreview] = useState(null);

//   useEffect(() => {
//     const savedPosts = localStorage.getItem('redditPosts');
//     if (savedPosts) {
//       setPosts(JSON.parse(savedPosts));
//     } else {
//       setPosts(initialPosts);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('redditPosts', JSON.stringify(posts));
//   }, [posts]);

//   // ... (keep all the existing useEffect hooks and state management functions)

//   const CreatePostModal = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [url, setUrl] = useState('');
//     const [selectedSubreddit, setSelectedSubreddit] = useState(
//       activeSubreddit !== 'All' ? activeSubreddit : 'programming'
//     );
//     const [postType, setPostType] = useState('text');

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0B1416] bg-opacity-50">
//         <div className="bg-[#1F2A30] p-6 rounded-lg shadow-xl w-full max-w-2xl">
//           {/* Modal Header */}
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold text-white">Create a post</h2>
//             <button
//               onClick={() => setShowCreatePostModal(false)}
//               className="text-gray-400 hover:text-white"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Rest of the modal content remains the same */}
//           {/* ... */}
//         </div>
//       </div>
//     );
//   };

//   // ... (keep all the existing helper functions)

//   const renderPostContent = (post) => {
//     switch (post.type) {
//       case 'image':
//         return (
//           <div className="mb-3">
//             {post.media?.startsWith('data:video') ? (
//               <video
//                 controls
//                 src={post.media}
//                 className="max-h-96 w-full rounded-lg"
//               />
//             ) : (
//               <img
//                 src={post.media}
//                 alt="Post media"
//                 className="max-h-96 w-full rounded-lg"
//               />
//             )}
//           </div>
//         );
//       case 'link':
//         return (
//           <a
//             href={post.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-[#2DA3AA] hover:underline block my-2"
//           >
//             {post.url}
//           </a>
//         );
//       case 'poll':
//         return (
//           <div className="my-3">
//             {post.poll?.options?.map((option, index) => (
//               <div
//                 key={index}
//                 className="mb-2 p-2 bg-[#0B1416] rounded-lg hover:bg-[#122025] cursor-pointer"
//               >
//                 <div className="flex justify-between items-center">
//                   <span>{option}</span>
//                   <span className="text-sm text-gray-400">
//                     {(
//                       ((post.poll.votes?.[index]?.length || 0) /
//                         (Object.keys(post.poll.votes || {}).length || 1)) *
//                       100
//                     ).toFixed(0)}
//                     %
//                   </span>
//                 </div>
//                 <div className="h-1 bg-[#1F2A30] mt-1 rounded-full">
//                   <div
//                     className="h-full bg-[#2DA3AA] rounded-full"
//                     style={{
//                       width: `${(
//                         ((post.poll.votes?.[index]?.length || 0) /
//                           (Object.keys(post.poll.votes || {}).length || 1)) *
//                         100
//                       ).toFixed(0)}%`,
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         );
//       default:
//         return (
//           post.text && (
//             <div className="text-[#d7dadc] text-sm mb-3">
//               {post.text.length > 300 ? (
//                 <>
//                   {post.text.slice(0, 300)}...
//                   <button className="text-[#4fbcff] ml-1 hover:underline">
//                     Read More
//                   </button>
//                 </>
//               ) : (
//                 post.text
//               )}
//             </div>
//           )
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0B1416] text-white">
//       {/* Main content */}
//       <div className="container mx-auto pt-20 flex">
//         {/* Sidebar */}
//         <div className="relative h-screen">
//           <div
//             className={`h-full bg-[#1F2A30] border-r border-[#24414F] fixed top-0 left-0 ${
//               isExpanded ? 'w-64' : 'w-16'
//             }`}
//           >
//             {/* Sidebar content */}
//           </div>
//         </div>

//         {/* Main posts area */}
//         <main className="flex-grow p-4">
//           {/* Search and create post header */}
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-bold">
//               {activeSubreddit === 'All' ? 'Popular Posts' : activeSubreddit}
//             </h2>
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => setShowCreatePostModal(true)}
//                 className="bg-[#2DA3AA] hover:bg-[#6ab0ae] text-white px-4 py-2 rounded-full flex items-center gap-2"
//               >
//                 <RiPencilLine />
//                 Create Post
//               </button>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search posts..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="bg-[#1F2A30] border border-[#0B1416] rounded-full px-4 py-2 w-64 focus:outline-none focus:border-[#2DA3AA]"
//                 />
//                 <FiSearch className="absolute right-3 top-3 text-gray-400" />
//               </div>
//               <select
//                 value={sortOption}
//                 onChange={(e) => setSortOption(e.target.value)}
//                 className="bg-[#1F2A30] border border-[#0B1416] rounded-full px-3 py-2"
//               >
//                 <option value="hot">Hot</option>
//                 <option value="new">New</option>
//                 <option value="top">Top</option>
//                 <option value="rising">Rising</option>
//               </select>
//             </div>
//           </div>

//           {/* Posts list */}
//           <div className="space-y-4">
//             {filteredPosts.map((post) => (
//               <div
//                 key={post.id}
//                 className="bg-[#1F2A30] rounded-lg p-4 border border-[#0B1416] hover:border-[#2DA3AA] transition-colors"
//               >
//                 {/* Post content */}
//                 {renderPostContent(post)}

//                 {/* Post footer */}
//                 <div className="flex items-center gap-4 text-gray-400 mt-4">
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => handleVote(post.id, 'up')}
//                       className={`p-1 rounded ${
//                         post.userVote === 'up' ? 'text-[#ff4500]' : ''
//                       }`}
//                     >
//                       <TiArrowUpOutline className="text-2xl" />
//                     </button>
//                     <span className="font-bold text-white">{post.upvotes}</span>
//                     <button
//                       onClick={() => handleVote(post.id, 'down')}
//                       className={`p-1 rounded ${
//                         post.userVote === 'down' ? 'text-[#7193ff]' : ''
//                       }`}
//                     >
//                       <TiArrowDownOutline className="text-2xl" />
//                     </button>
//                   </div>
//                   <button className="flex items-center gap-1 hover:text-white">
//                     <FaRegCommentAlt />
//                     {post.comments.length} Comments
//                   </button>
//                   <button
//                     onClick={() => handleCopy(post.id, post.text)}
//                     className="hover:text-white flex items-center gap-1"
//                   >
//                     <MdOutlineContentCopy />
//                     {copiedPostId === post.id ? 'Copied!' : 'Copy'}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>

//         {/* Right sidebar */}
//         <aside className="w-80 bg-[#1F2A30] p-4 rounded-xl ml-4">
//           {/* User profile section */}
//           <div className="text-center">
//             <div className="w-20 h-20 rounded-full bg-[#0B1416] mx-auto mb-4" />
//             <h3 className="text-xl font-bold">Demo User</h3>
//             <p className="text-gray-400">@demo_user</p>
//           </div>
//         </aside>
//       </div>

//       {showCreatePostModal && <CreatePostModal />}
//     </div>
//   );
// };

// export default AdvancedRedditForum;

// wjeaj

// import { useEffect, useState } from 'react';
// import { FaRegCommentAlt } from 'react-icons/fa';
// import {
//   FiArrowUp,
//   FiMessageSquare,
//   FiMoreHorizontal,
//   FiSearch,
// } from 'react-icons/fi';
// import { IoMenu } from 'react-icons/io5';
// import { MdOutlineContentCopy } from 'react-icons/md';
// import { RiPencilLine } from 'react-icons/ri';
// import { TiArrowDownOutline, TiArrowUpOutline } from 'react-icons/ti';

// const AdvancedRedditForum = () => {
//   const [showMessage, setShowMessage] = useState(false);
//   const [posts, setPosts] = useState(() => {
//     const savedPosts = localStorage.getItem('redditPosts');
//     return savedPosts ? JSON.parse(savedPosts) : [];
//   });
//   const [loading, setLoading] = useState(false);
//   const [sortOption, setSortOption] = useState('hot');
//   const [activeSubreddit, setActiveSubreddit] = useState('All');
//   const [currentUser] = useState({ username: 'demo_user' });
//   const [showCreatePostModal, setShowCreatePostModal] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [expandedSections, setExpandedSections] = useState({
//     customFeeds: true,
//     communities: true,
//     resources: true,
//   });

//   // Local storage persistence
//   useEffect(() => {
//     localStorage.setItem('redditPosts', JSON.stringify(posts));
//   }, [posts]);

//   const handleCopy = async (text) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       setShowMessage(true);
//       setTimeout(() => setShowMessage(false), 2000);
//     } catch (error) {
//       console.error('Failed to copy:', error);
//     }
//   };

//   // Post filtering and sorting
//   useEffect(() => {
//     let filtered = [...posts];

//     if (activeSubreddit !== 'All') {
//       filtered = filtered.filter((post) => post.subreddit === activeSubreddit);
//     }

//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(
//         (post) =>
//           post.title.toLowerCase().includes(query) ||
//           (post.text && post.text.toLowerCase().includes(query))
//       );
//     }

//     setFilteredPosts(sortPosts(filtered, sortOption));
//   }, [searchQuery, activeSubreddit, posts, sortOption]);

//   const sortPosts = (postsToSort, option) => {
//     const sorters = {
//       new: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
//       top: (a, b) => b.upvotes - a.upvotes,
//       controversial: (a, b) =>
//         b.comments.length +
//         b.controversialScore -
//         a.comments.length -
//         a.controversialScore,
//       rising: (a, b) => b.upvoteRate - a.upvoteRate,
//       hot: (a, b) =>
//         b.upvotes + b.comments.length * 2 - a.upvotes - a.comments.length * 2,
//     };
//     return [...postsToSort].sort(sorters[option] || sorters.hot);
//   };

//   const handleVote = (postId, voteDirection) => {
//     setPosts(
//       posts.map((post) => {
//         if (post.id === postId) {
//           const currentVote = post.userVote;
//           let updatedUpvotes = post.upvotes;

//           if (currentVote === 'up') updatedUpvotes--;
//           if (currentVote === 'down') updatedUpvotes++;

//           let newVote = null;
//           if (currentVote !== voteDirection) {
//             newVote = voteDirection;
//             if (voteDirection === 'up') updatedUpvotes++;
//             if (voteDirection === 'down') updatedUpvotes--;
//           }

//           return { ...post, upvotes: updatedUpvotes, userVote: newVote };
//         }
//         return post;
//       })
//     );
//   };

//   const handleCreatePost = (postData) => {
//     const newPost = {
//       id: Date.now(),
//       title: postData.title,
//       author: currentUser.username,
//       subreddit: postData.subreddit,
//       createdAt: new Date().toISOString(),
//       upvotes: 0,
//       comments: [],
//       type: postData.type,
//       text: postData.text,
//       image: postData.image,
//       link: postData.link,
//       poll: postData.pollOptions
//         ? {
//             options: postData.pollOptions,
//             votes: postData.pollOptions.reduce(
//               (acc, option) => ({ ...acc, [option]: 0 }),
//               {}
//             ),
//           }
//         : null,
//       userVote: '',
//     };

//     setPosts([newPost, ...posts]);
//     setShowCreatePostModal(false);
//   };

//   const popularSubreddits = [
//     { name: 'All' },
//     { name: 'programming' },
//     { name: 'worldnews' },
//     { name: 'science' },
//     { name: 'gaming' },
//     { name: 'forum' },
//   ];

//   // Create Post Modal Component
//   const CreatePostModal = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [selectedSubreddit, setSelectedSubreddit] = useState(
//       activeSubreddit !== 'All' ? activeSubreddit : 'programming'
//     );
//     const [postType, setPostType] = useState('text');
//     const [imagePreview, setImagePreview] = useState(null);
//     const [videoPreview, setVideoPreview] = useState(null);
//     const [linkUrl, setLinkUrl] = useState('');
//     const [pollOptions, setPollOptions] = useState(['', '']);
//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleImageUpload = (e) => {
//       const file = e.target.files[0];
//       if (file) {
//         setSelectedFile(file);
//         if (file.type.startsWith('image/')) {
//           setImagePreview(URL.createObjectURL(file));
//           setVideoPreview(null);
//         } else if (file.type.startsWith('video/')) {
//           setVideoPreview(URL.createObjectURL(file));
//           setImagePreview(null);
//         }
//       }
//     };

//     const addPollOption = () => {
//       setPollOptions([...pollOptions, '']);
//     };

//     const handlePollOptionChange = (index, value) => {
//       const newOptions = [...pollOptions];
//       newOptions[index] = value;
//       setPollOptions(newOptions);
//     };

//     const handleSubmit = () => {
//       const postData = {
//         title,
//         subreddit: selectedSubreddit,
//         type: postType,
//         text: content,
//         image: imagePreview,
//         link: linkUrl,
//         pollOptions:
//           postType === 'poll' ? pollOptions.filter((opt) => opt.trim()) : null,
//       };

//       handleCreatePost(postData);
//       setSelectedFile(null);
//       setImagePreview(null);
//       setVideoPreview(null);
//     };

//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
//         <div className="bg-[#1F2A30] p-6 rounded-lg shadow-xl w-full max-w-2xl">
//           {/* Modal Header */}
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold text-white">Create a post</h2>
//             <button
//               onClick={() => setShowCreatePostModal(false)}
//               className="text-gray-400 hover:text-white"
//             >
//               ✕
//             </button>
//           </div>

//           {/* Subreddit Selection */}
//           <select
//             value={selectedSubreddit}
//             onChange={(e) => setSelectedSubreddit(e.target.value)}
//             className="w-full p-2 mb-4 bg-[#0B1416] text-white rounded"
//           >
//             {popularSubreddits
//               .filter((s) => s.name !== 'All')
//               .map((sub) => (
//                 <option key={sub.name} value={sub.name}>
//                   r/{sub.name}
//                 </option>
//               ))}
//           </select>

//           {/* Post Type Tabs */}
//           <div className="flex mb-4 border-b border-gray-700">
//             {['text', 'image', 'link', 'poll'].map((type) => (
//               <button
//                 key={type}
//                 onClick={() => setPostType(type)}
//                 className={`px-4 py-2 capitalize ${
//                   postType === type ? 'border-b-2 border-[#289297]' : ''
//                 }`}
//               >
//                 {type}
//               </button>
//             ))}
//           </div>

//           {/* Post Content */}
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 mb-4 bg-[#0B1416] text-white rounded"
//           />

//           {postType === 'text' && (
//             <textarea
//               placeholder="Text (optional)"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               className="w-full p-2 h-32 bg-[#0B1416] text-white rounded"
//             />
//           )}

//           {postType === 'image' && (
//             <div className="mb-4 border-2 border-dashed border-gray-700 rounded p-4 text-center">
//               <input
//                 type="file"
//                 accept="image/*,video/*"
//                 onChange={handleImageUpload}
//                 className="hidden"
//                 id="file-upload"
//               />
//               <label htmlFor="file-upload" className="cursor-pointer">
//                 {imagePreview ? (
//                   <img
//                     src={imagePreview}
//                     alt="Preview"
//                     className="max-h-96 mx-auto rounded"
//                   />
//                 ) : videoPreview ? (
//                   <video
//                     src={videoPreview}
//                     controls
//                     className="max-h-96 mx-auto rounded"
//                   />
//                 ) : (
//                   <>
//                     <div className="text-4xl mb-2">↑</div>
//                     <p className="text-gray-400">
//                       Drag and drop or click to upload
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Supports images and videos
//                     </p>
//                   </>
//                 )}
//               </label>
//             </div>
//           )}

//           {postType === 'link' && (
//             <input
//               type="url"
//               placeholder="Enter URL"
//               value={linkUrl}
//               onChange={(e) => setLinkUrl(e.target.value)}
//               className="w-full p-2 mb-4 bg-[#0B1416] text-white rounded"
//             />
//           )}

//           {postType === 'poll' && (
//             <div className="mb-4">
//               {pollOptions.map((option, index) => (
//                 <div key={index} className="flex items-center mb-2">
//                   <input
//                     type="text"
//                     placeholder={`Option ${index + 1}`}
//                     value={option}
//                     onChange={(e) =>
//                       handlePollOptionChange(index, e.target.value)
//                     }
//                     className="w-full p-2 bg-[#0B1416] text-white rounded"
//                   />
//                 </div>
//               ))}
//               <button
//                 onClick={addPollOption}
//                 className="text-[#289297] text-sm"
//               >
//                 + Add Option
//               </button>
//             </div>
//           )}

//           {/* Submit Section */}
//           <div className="flex justify-end mt-6">
//             <button
//               onClick={handleSubmit}
//               disabled={
//                 !title.trim() ||
//                 (postType === 'poll' &&
//                   pollOptions.filter((opt) => opt.trim()).length < 2)
//               }
//               className={`px-6 py-2 rounded ${
//                 title.trim() ? 'bg-[#289297] hover:bg-[#1d6d72]' : 'bg-gray-600'
//               } text-white`}
//             >
//               Post
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Post rendering logic
//   const renderPostContent = (post) => {
//     switch (post.type) {
//       case 'image':
//         return (
//           post.image && (
//             <img
//               src={post.image}
//               alt="Post content"
//               className="my-2 max-h-96 w-auto rounded"
//             />
//           )
//         );
//       case 'link':
//         return (
//           post.link && (
//             <a
//               href={post.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-[#289297] break-all"
//             >
//               {post.link}
//             </a>
//           )
//         );
//       case 'poll':
//         return (
//           post.poll && (
//             <div className="my-2 w-full">
//               {post.poll.options.map((option, index) => {
//                 const totalVotes = Object.values(post.poll.votes).reduce(
//                   (a, b) => a + b,
//                   0
//                 );
//                 const percentage =
//                   totalVotes > 0
//                     ? (post.poll.votes[option] / totalVotes) * 100
//                     : 0;

//                 return (
//                   <div key={index} className="mb-2">
//                     <button
//                       onClick={() => handlePollVote(post.id, option)}
//                       className="w-full p-2 text-left bg-[#0B1416] rounded hover:bg-[#122022] relative overflow-hidden"
//                     >
//                       <div className="z-10 relative">{option}</div>
//                       <div
//                         className="absolute inset-0 bg-[#289297]/20"
//                         style={{ width: `${percentage}%` }}
//                       />
//                       <div className="text-xs text-gray-400 mt-1">
//                         {percentage.toFixed(1)}% • {post.poll.votes[option]}{' '}
//                         votes
//                       </div>
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )
//         );
//       default:
//         return (
//           post.text && (
//             <div className="text-[#d7dadc]">
//               {post.text.length > 300 ? (
//                 <>
//                   {post.text.slice(0, 300)}...
//                   <button className="text-[#4fbcff] ml-1 hover:underline">
//                     Read More
//                   </button>
//                 </>
//               ) : (
//                 post.text
//               )}
//             </div>
//           )
//         );
//     }
//   };

//   const handlePollVote = (postId, option) => {
//     setPosts(
//       posts.map((post) => {
//         if (post.id === postId && post.poll) {
//           const newVotes = { ...post.poll.votes };
//           newVotes[option] = (newVotes[option] || 0) + 1;
//           return {
//             ...post,
//             poll: { ...post.poll, votes: newVotes },
//           };
//         }
//         return post;
//       })
//     );
//   };

//   // rendomly skeletons will displaing when page loading or refrash the page
//   const skeletons = [...Array(5)].map((_, i) => i);

//   const shuffleArray = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   };

//   // Shuffle skeletons before rendering
//   const randomizedSkeletons = shuffleArray([...skeletons]);

//   const toggleSidebar = () => {
//     setIsExpanded(!isExpanded);
//   };

//   const toggleSection = (section) => {
//     setExpandedSections({
//       ...expandedSections,
//       [section]: !expandedSections[section],
//     });
//   };

//   return (
//     <div className={`min-h-screen`}>
//       <div className="container mx-auto pt-20 flex">
//         {/* sidebar */}
//         <div className="relative h-screen">
//           <div
//             className={`h-full bg-[#1F2A30] transition-all duration-300 ease-in-out border-r border-[#24414F] fixed top-0 left-0 ${
//               isExpanded ? 'w-64' : 'w-16'
//             }`}
//           >
//             <div className="text-white">
//               <div className="relative flex justify-end px-1 mt-[7rem] py-2">
//                 <button
//                   className={`absolute -top-7 -right-4 w-8 bg-[#1F2A30] h-8 border flex items-center justify-center rounded-full`}
//                   onClick={toggleSidebar}
//                 >
//                   {isExpanded ? (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="w-5 h-5"
//                     >
//                       <path d="M15 18l-6-6 6-6" />
//                     </svg>
//                   ) : (
//                     <IoMenu />
//                   )}
//                 </button>
//               </div>

//               <div className="space-y-4 mt-2">
//                 <button
//                   className={`flex items-center ${
//                     isExpanded ? 'w-full px-4' : 'justify-center w-full'
//                   } py-2 hover:bg-gray-800`}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="w-6 h-6"
//                   >
//                     <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//                     <polyline points="9 22 9 12 15 12 15 22" />
//                   </svg>
//                   {isExpanded && <span className="ml-3">Home</span>}
//                 </button>

//                 <button
//                   className={`flex items-center ${
//                     isExpanded ? 'w-full px-4' : 'justify-center w-full'
//                   } py-2 hover:bg-gray-800`}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="w-6 h-6"
//                   >
//                     <circle cx="12" cy="12" r="10" />
//                     <line x1="12" y1="8" x2="12" y2="16" />
//                     <line x1="8" y1="12" x2="16" y2="12" />
//                   </svg>
//                   {isExpanded && <span className="ml-3">Popular</span>}
//                 </button>

//                 <button
//                   className={`flex items-center ${
//                     isExpanded ? 'w-full px-4' : 'justify-center w-full'
//                   } py-2 hover:bg-gray-800`}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="w-6 h-6"
//                   >
//                     <circle cx="9" cy="9" r="4" />
//                     <path d="M15 5h0a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V5z" />
//                     <path d="M9 13v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-3" />
//                   </svg>
//                   {isExpanded && <span className="ml-3">Explore</span>}
//                 </button>

//                 <button
//                   className={`flex items-center ${
//                     isExpanded ? 'w-full px-4' : 'justify-center w-full'
//                   } py-2 hover:bg-gray-800`}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="w-6 h-6"
//                   >
//                     <line x1="18" y1="20" x2="18" y2="10" />
//                     <line x1="12" y1="20" x2="12" y2="4" />
//                     <line x1="6" y1="20" x2="6" y2="14" />
//                   </svg>
//                   {isExpanded && <span className="ml-3">All</span>}
//                 </button>
//               </div>

//               <div className="border-t border-gray-700 mt-4"></div>

//               {isExpanded && (
//                 <>
//                   <div className="py-2">
//                     <button
//                       className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-400"
//                       onClick={() => toggleSection('customFeeds')}
//                     >
//                       <span>CUSTOM FEEDS</span>
//                       <span
//                         className="transform transition-transform duration-200"
//                         style={{
//                           transform: expandedSections.customFeeds
//                             ? 'rotate(180deg)'
//                             : 'rotate(0deg)',
//                         }}
//                       >
//                         ∧
//                       </span>
//                     </button>

//                     {expandedSections.customFeeds && (
//                       <button className="flex items-center w-full hover:bg-gray-800 px-4 py-2">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           className="w-5 h-5 mr-3"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                           />
//                         </svg>
//                         <span>Create a custom feed</span>
//                       </button>
//                     )}
//                   </div>

//                   <div className="border-t border-gray-700"></div>

//                   <div className="py-2">
//                     <button
//                       className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-400"
//                       onClick={() => toggleSection('communities')}
//                     >
//                       <span>COMMUNITIES</span>
//                       <span
//                         className="transform transition-transform duration-200"
//                         style={{
//                           transform: expandedSections.communities
//                             ? 'rotate(180deg)'
//                             : 'rotate(0deg)',
//                         }}
//                       >
//                         ∧
//                       </span>
//                     </button>

//                     {expandedSections.communities && (
//                       <button className="flex items-center w-full hover:bg-gray-800 px-4 py-2">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           className="w-5 h-5 mr-3"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                           />
//                         </svg>
//                         <span>Create a community</span>
//                       </button>
//                     )}
//                   </div>

//                   <div className="border-t border-gray-700"></div>

//                   <div className="py-2">
//                     <button
//                       className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-400"
//                       onClick={() => toggleSection('resources')}
//                     >
//                       <span>RESOURCES</span>
//                       <span
//                         className="transform transition-transform duration-200"
//                         style={{
//                           transform: expandedSections.resources
//                             ? 'rotate(180deg)'
//                             : 'rotate(0deg)',
//                         }}
//                       >
//                         ∧
//                       </span>
//                     </button>

//                     {expandedSections.resources && (
//                       <div className="space-y-1">
//                         <button className="flex items-center w-full hover:bg-gray-800 px-4 py-2">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             className="w-5 h-5 mr-3"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                             />
//                           </svg>
//                           <span>About Reddit</span>
//                         </button>

//                         <button className="flex items-center w-full hover:bg-gray-800 px-4 py-2">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             className="w-5 h-5 mr-3"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
//                             />
//                           </svg>
//                           <span>Advertise</span>
//                         </button>

//                         <button className="flex items-center w-full hover:bg-gray-800 px-4 py-2">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             className="w-5 h-5 mr-3"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                             />
//                           </svg>
//                           <span>Help</span>
//                         </button>

//                         <button className="flex items-center w-full hover:bg-gray-800 px-4 py-2">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             className="w-5 h-5 mr-3"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                             />
//                           </svg>
//                           <span>Blog</span>
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Post section */}
//         <main className="bg-transparent min-h-screen p-4 flex-grow">
//           <div className="mx-auto w-[48rem]">
//             <div className="flex w-full items-center justify-between mb-6">
//               <h2 className="text-xl font-bold text-white">
//                 {activeSubreddit === 'All'
//                   ? 'Popular Posts'
//                   : `${activeSubreddit}`}
//               </h2>
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={() => setShowCreatePostModal(true)}
//                   className="bg-[#2DA3AA] hover:bg-[#6ab0ae] text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2"
//                 >
//                   <RiPencilLine className="text-lg" />
//                   Create Post
//                 </button>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search posts..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="border rounded-full px-4 py-2 bg-[#1F2A30] border-[#0B1416] placeholder-[#818384] text-white w-64 focus:outline-none focus:border-[#2DA3AA] focus:ring-1 focus:ring-[#2DA3AA]"
//                   />
//                   <FiSearch className="text-[#818384] absolute right-3 top-3" />
//                 </div>
//                 <select
//                   value={sortOption}
//                   onChange={(e) => setSortOption(e.target.value)}
//                   className="border rounded-full px-2 py-2 bg-[#1F2A30] border-[#0B1416] text-white text-sm font-medium focus:outline-none focus:border-[#2DA3AA] cursor-pointer"
//                 >
//                   <option value="hot">Hot</option>
//                   <option value="new">New</option>
//                   <option value="top">Top</option>
//                   <option value="rising">Rising</option>
//                 </select>
//               </div>
//             </div>

//             {loading ? (
//               <div className="space-y-4 w-full transition-all duration-500">
//                 {/* randon skeletons for loading */}
//                 {randomizedSkeletons.map((i) => (
//                   <div
//                     key={i}
//                     className="bg-[#1F2A30] border border-[#0B1416] rounded-lg p-3 animate-pulse w-full"
//                   >
//                     {i === 0 && (
//                       <div className="flex gap-3">
//                         <div className="flex flex-col items-center mr-3 w-10">
//                           <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
//                           <div className="h-16 w-1 bg-[#0B1416] rounded-full my-1" />
//                           <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
//                         </div>

//                         <div className="flex-1 space-y-3">
//                           <div className="flex items-center gap-2">
//                             <div className="h-4 bg-[#0B1416] rounded-full w-16" />
//                             <div className="h-3 bg-[#0B1416] rounded w-32" />
//                           </div>

//                           <div className="h-5 bg-[#0B1416] rounded w-3/4" />

//                           <div className="space-y-2">
//                             <div className="h-4 bg-[#0B1416] rounded w-full" />
//                             <div className="h-4 bg-[#0B1416] rounded w-5/6" />
//                           </div>

//                           <div className="flex items-center gap-4">
//                             <div className="h-4 bg-[#0B1416] rounded w-24" />
//                             <div className="h-4 bg-[#0B1416] rounded w-20" />
//                             <div className="h-4 bg-[#0B1416] rounded w-20" />
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {i === 1 && (
//                       <div className="flex gap-3">
//                         {/* Voting Controls */}
//                         <div className="flex flex-col items-center mr-3 w-10">
//                           <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
//                           <div className="h-16 w-1 bg-[#0B1416] rounded-full my-1" />
//                           <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
//                         </div>

//                         {/* Post Content */}
//                         <div className="flex-1 space-y-3">
//                           {/* Header */}
//                           <div className="flex items-center gap-2">
//                             <div className="h-4 bg-[#0B1416] rounded-full w-16" />
//                             <div className="h-3 bg-[#0B1416] rounded w-32" />
//                           </div>

//                           {/* Title */}
//                           <div className="h-5 bg-[#0B1416] rounded w-3/4" />

//                           {/* Text Body */}
//                           <div className="space-y-2">
//                             <div className="h-4 bg-[#0B1416] rounded w-full" />
//                             <div className="h-4 bg-[#0B1416] rounded w-5/6" />
//                             <div className="h-4 bg-[#0B1416] rounded w-2/3" />
//                           </div>

//                           {/* Image Placeholder */}
//                           <div className="h-64 bg-[#0B1416] rounded-lg" />

//                           {/* Footer */}
//                           <div className="flex items-center gap-4">
//                             <div className="h-4 bg-[#0B1416] rounded w-24" />
//                             <div className="h-4 bg-[#0B1416] rounded w-20" />
//                             <div className="h-4 bg-[#0B1416] rounded w-20" />
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {i === 2 && (
//                       <div className="flex gap-3">
//                         {/* Voting Controls */}
//                         <div className="flex flex-col items-center mr-3 w-10">
//                           <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
//                           <div className="h-16 w-1 bg-[#0B1416] rounded-full my-1" />
//                           <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
//                         </div>

//                         {/* Post Content */}
//                         <div className="flex-1 space-y-3">
//                           {/* Header */}
//                           <div className="flex items-center gap-2">
//                             <div className="h-4 bg-[#0B1416] rounded-full w-16" />
//                             <div className="h-3 bg-[#0B1416] rounded w-32" />
//                           </div>

//                           {/* Title */}
//                           <div className="h-5 bg-[#0B1416] rounded w-3/4" />

//                           {/* Text Body */}
//                           <div className="space-y-2">
//                             <div className="h-4 bg-[#0B1416] rounded w-full" />
//                             <div className="h-4 bg-[#0B1416] rounded w-5/6" />
//                             <div className="h-4 bg-[#0B1416] rounded w-2/3" />
//                           </div>

//                           {/* Footer */}
//                           <div className="flex items-center gap-4">
//                             <div className="h-4 bg-[#0B1416] rounded w-24" />
//                             <div className="h-4 bg-[#0B1416] rounded w-20" />
//                             <div className="h-4 bg-[#0B1416] rounded w-20" />
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {i === 3 && (
//                       <div className="flex gap-3">
//                         {/* Voting Controls */}
//                         <div className="flex flex-col items-center mr-3 w-10">
//                           <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
//                           <div className="h-16 w-1 bg-[#0B1416] rounded-full my-1" />
//                           <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
//                         </div>

//                         {/* Post Content */}
//                         <div className="flex-1 space-y-3">
//                           {/* Header */}
//                           <div className="flex items-center gap-2">
//                             <div className="h-4 bg-[#0B1416] rounded-full w-16" />
//                             <div className="h-3 bg-[#0B1416] rounded w-32" />
//                           </div>

//                           {/* Text Body */}
//                           <div className="space-y-2">
//                             <div className="h-4 bg-[#0B1416] rounded w-full" />
//                             <div className="h-4 bg-[#0B1416] rounded w-full" />
//                             <div className="h-4 bg-[#0B1416] rounded w-full" />
//                             <div className="h-4 bg-[#0B1416] rounded w-full" />
//                             <div className="h-4 bg-[#0B1416] rounded w-full" />
//                           </div>

//                           {/* Footer */}
//                           <div className="flex items-center gap-4">
//                             <div className="h-4 bg-[#0B1416] rounded w-24" />
//                             <div className="h-4 bg-[#0B1416] rounded w-20" />
//                             <div className="h-4 bg-[#0B1416] rounded w-20" />
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                     {i === 4 && (
//                       <div className="flex gap-3">
//                         {/* Voting Controls */}
//                         <div className="flex flex-col items-center mr-3 w-10">
//                           <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
//                           <div className="h-16 w-1 bg-[#0B1416] rounded-full my-1" />
//                           <div className="h-6 w-6 rounded-full bg-[#0B1416]" />
//                         </div>

//                         {/* Post Content */}
//                         <div className="flex-1 space-y-3">
//                           {/* Header */}
//                           <div className="flex items-center gap-2">
//                             <div className="h-4 bg-[#0B1416] rounded-full w-16" />
//                             <div className="h-3 bg-[#0B1416] rounded w-32" />
//                           </div>

//                           {/* Text Body */}
//                           <div className="space-y-2">
//                             <div className="h-4 bg-[#0B1416] rounded w-full" />
//                             <div className="h-4 bg-[#0B1416] rounded w-full" />
//                             <div className="h-4 bg-[#0B1416] rounded w-full" />
//                             <div className="h-4 bg-[#0B1416] rounded w-full" />
//                             <div className="h-4 bg-[#0B1416] rounded w-full" />
//                           </div>

//                           {/* Footer */}
//                           <div className="flex items-center gap-4">
//                             <div className="h-4 bg-[#0B1416] rounded w-24" />
//                             <div className="h-4 bg-[#0B1416] rounded w-20" />
//                             <div className="h-4 bg-[#0B1416] rounded w-20" />
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="space-y-4 w-full">
//                 {filteredPosts.map((post) => (
//                   <div
//                     key={post.id}
//                     className="group bg-[#1F2A30] border border-[#0B1416] rounded-lg hover:border-[#454748] transition-all duration-300 cursor-pointer"
//                   >
//                     <div className="flex p-3">
//                       {/* Post Content */}
//                       <div className="flex-1">
//                         {/* Post Header */}
//                         <div className="flex items-center gap-2 text-xs mb-2">
//                           <span className="bg-[#0B1416] text-white px-2 py-1 rounded-full">
//                             {post.subreddit}
//                           </span>
//                           <span className="text-[#818384]">
//                             Posted by u/{post.author} • {post.timePosted}
//                           </span>
//                         </div>

//                         {/* Post Title */}
//                         <h3 className="text-lg font-medium text-white mb-2">
//                           {post.title}
//                         </h3>

//                         {/* Post Body */}
//                         {post.text && (
//                           <div className="text-[#d7dadc] text-sm mb-3">
//                             {post.text.length > 300 ? (
//                               <>
//                                 {post.text.slice(0, 300)}...
//                                 <button className="text-[#4fbcff] ml-1 hover:underline">
//                                   Read More
//                                 </button>
//                               </>
//                             ) : (
//                               post.text
//                             )}
//                           </div>
//                         )}

//                         {/* Media Content */}
//                         {post.image && (
//                           <div className="mb-3 ">
//                             <img
//                               src={post.image}
//                               alt="Post content"
//                               className="max-h-96 w-full rounded-lg border border-[#0B1416]"
//                             />
//                           </div>
//                         )}

//                         {/* Post Footer */}
//                         <div className="flex items-center gap-4 text-[#818384] text-sm">
//                           {/* Voting Controls */}
//                           <div className="flex items-center mr-16 w-10">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleVote(post.id, 'up');
//                               }}
//                               className={`p-1.5 hover:bg-[#2a2a2b] rounded ${
//                                 post.userVote === 'up'
//                                   ? 'text-[#ff4500]'
//                                   : 'text-[#818384]'
//                               }`}
//                             >
//                               <TiArrowUpOutline className={`text-2xl`} />
//                             </button>
//                             <span className="text-sm font-bold my-1 text-white">
//                               {post.upvotes}
//                             </span>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleVote(post.id, 'down');
//                               }}
//                               className={`p-1.5 hover:bg-[#2a2a2b] rounded ${
//                                 post.userVote === 'down'
//                                   ? 'text-[#7193ff]'
//                                   : 'text-[#818384]'
//                               }`}
//                             >
//                               <TiArrowDownOutline className="text-2xl" />
//                             </button>
//                           </div>
//                           <button className="flex cursor-pointer items-center gap-1 hover:bg-[#2a2a2b] px-3 py-1.5 rounded">
//                             <FaRegCommentAlt />
//                             {post.commentCount} Comments
//                           </button>
//                           {/* <button className="flex cursor-pointer items-center gap-1 hover:bg-[#2a2a2b] px-3 py-1.5 rounded">
//                             <FiShare2 />x
//                             Share
//                           </button> */}
//                           <button
//                             title="copy text"
//                             onClick={handleCopy}
//                             className="cursor-pointer flex items-center gap-1 hover:bg-[#2a2a2b] px-3 py-1.5 rounded"
//                           >
//                             <MdOutlineContentCopy />
//                             copy
//                           </button>

//                           {showMessage && (
//                             <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
//                               Copied
//                             </div>
//                           )}
//                           <div className="flex items-center gap-1">
//                             <FiMoreHorizontal className="hover:bg-[#2a2a2b] w-6 h-6 cursor-pointer" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     {/* {renderPostContent(post)} */}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </main>

//         <div
//           className="fixed top-0 -z-10 right-[31rem] h-screen w-7 border-[#24414F] border-x-[.1px] col-start-4 row-span-5 row-start-1
//   bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
//   bg-[size:10px_10px] bg-fixed
//   [--pattern-fg:var(--color-gray-950)]/5
//   max-lg:hidden
//   dark:[--pattern-fg:var(--color-white)]/10"
//         ></div>

//         {/* User profile */}
//         <aside>
//           {loading ? (
//             <div className="animate-pulse space-y-6 w-[26.3rem] p-6">
//               {/* Profile Header */}
//               <div className="bg-[#192327] p-5 rounded-xl">
//                 <div className="flex items-center flex-col gap-4">
//                   <div className="h-20 w-20  rounded-full bg-[#1F2A30]" />
//                   <div className="h-6 w-40 rounded bg-[#1F2A30]" />
//                   <div className="flex-1 space-y-2">
//                     <div className="flex gap-6">
//                       {[1, 2, 3].map((i) => (
//                         <div
//                           key={i}
//                           className="space-y-1 flex justify-center items-center flex-col"
//                         >
//                           <div className="h-4 w-8 rounded bg-[#1F2A30]" />
//                           <div className="h-4 w-16 rounded bg-[#1F2A30]" />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Stats Grid */}
//               <div className="grid grid-cols-3 gap-4">
//                 {[1, 2, 3].map((i) => (
//                   <div
//                     key={i}
//                     className="space-y-2 rounded-lg bg-[#1F2A30] p-4"
//                   >
//                     <div className="h-4 w-16 rounded bg-[#0B1416]" />
//                     <div className="h-6 w-8 rounded bg-[#0B1416]" />
//                   </div>
//                 ))}
//               </div>

//               {/* About Me */}
//               <div className="space-y-3">
//                 <div className="space-y-2">
//                   <div className="h-3 w-full rounded bg-[#1F2A30]" />
//                   <div className="h-3 w-4/5 rounded bg-[#1F2A30]" />
//                   <div className="h-3 w-3/4 rounded bg-[#1F2A30]" />
//                 </div>
//               </div>

//               {/* Recent Activity */}
//               <div className="space-y-4">
//                 <div className="h-5 w-32 rounded bg-[#1F2A30]" />
//                 <div className="space-y-3 rounded-lg bg-[#1F2A30] p-4">
//                   <div className="flex items-center gap-2">
//                     <div className="h-3 w-24 rounded bg-[#0B1416]" />
//                     <div className="h-3 w-3 rounded-full bg-[#0B1416]" />
//                     <div className="h-3 w-16 rounded bg-[#0B1416]" />
//                   </div>
//                   <div className="h-4 w-3/4 rounded bg-[#0B1416]" />
//                   <div className="space-y-2">
//                     <div className="h-3 w-full rounded bg-[#0B1416]" />
//                     <div className="h-3 w-5/6 rounded bg-[#0B1416]" />
//                   </div>
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 <div className="h-5 w-32 rounded bg-[#1F2A30]" />
//                 <div className="space-y-3 rounded-lg bg-[#1F2A30] p-4">
//                   <div className="flex items-center gap-2">
//                     <div className="h-3 w-24 rounded bg-[#0B1416]" />
//                     <div className="h-3 w-3 rounded-full bg-[#0B1416]" />
//                     <div className="h-3 w-16 rounded bg-[#0B1416]" />
//                   </div>
//                   <div className="h-4 w-3/4 rounded bg-[#0B1416]" />
//                   <div className="space-y-2">
//                     <div className="h-3 w-full rounded bg-[#0B1416]" />
//                     <div className="h-3 w-5/6 rounded bg-[#0B1416]" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="sticky top-26 h-[90vh] pb-10 ml-5 rounded-xl  overflow-y-auto w-[25rem]">
//               {/* Profile Header with Parallax Effect */}
//               <div className="bg-gradient-to-br from-[#2DA3AA] to-[#1F2A30] p-6 shadow-2xl rounded-t-xl relative overflow-hidden">
//                 <div className="absolute inset-0 bg-noise opacity-10"></div>

//                 {/* Animated Avatar */}
//                 <div className="flex flex-col items-center relative z-10">
//                   <div
//                     className="w-20 h-20 rounded-full border-2 border-[#2DA3AA] overflow-hidden shadow-2xl shadow-white/60
//           hover:shadow-[#2DA3AA]/50 transition-all duration-300 hover:scale-105 hover:rotate-3 cursor-pointer
//           float"
//                   >
//                     <img
//                       src="https://styles.redditmedia.com/t5_2qhva/styles/communityIcon_ilf7iae3i9941.png"
//                       alt="User Avatar"
//                       className="w-full h-full object-cover transform group-hover/profile:scale-110 transition-transform duration-300"
//                     />
//                   </div>

//                   {/* Name with Gradient Text */}
//                   <h1 className="text-2xl font-bold bg-gradient-to-r from-0% from-white/55 to-76% to-[#6ab0ae] bg-clip-text text-transparent mt-4">
//                     Haris khan
//                   </h1>

//                   {/* Interactive Stats Ribbon */}
//                   <div className="flex gap-6 mt-6">
//                     <div className="text-center hover:scale-110 transition-transform">
//                       <div className="text-2xl font-bold text-white">1.2B</div>
//                       <div className="text-xs text-[#2DA3AA] font-medium">
//                         Followers
//                       </div>
//                     </div>
//                     <div className="text-center hover:scale-110 transition-transform">
//                       <div className="text-2xl font-bold text-white">784</div>
//                       <div className="text-xs text-[#2DA3AA] font-medium">
//                         Following
//                       </div>
//                     </div>
//                     <div className="text-center hover:scale-110 transition-transform">
//                       <div className="text-2xl font-bold text-white">15</div>
//                       <div className="text-xs text-[#2DA3AA] font-medium">
//                         Awards
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Glassmorphism Stats Cards */}
//               <div className="grid grid-cols-3 gap-3 mt-6 px-4">
//                 {[
//                   {
//                     label: 'Posts',
//                     value: '47',
//                     color: 'from-[#2DA3AA] to-[#1F2A30]',
//                   },
//                   {
//                     label: 'Comments',
//                     value: '312',
//                     color: 'from-[#2D969D] to-[#1F2A30]',
//                   },
//                   {
//                     label: 'Awards',
//                     value: '8',
//                     color: 'from-[#ffd700] to-[#1F2A30]',
//                   },
//                 ].map((stat, index) => (
//                   <div
//                     key={index}
//                     className="bg-gradient-to-br ${stat.color} p-3 rounded-xl backdrop-blur-sm border border-white/10
//                  hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
//                   >
//                     <p className="text-xs text-gray-300 mb-1">{stat.label}</p>
//                     <p className="text-xl font-bold text-white">{stat.value}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Interactive Bio Section */}
//               <div
//                 className="bg-[#1F2A30]/90 backdrop-blur-sm rounded-xl p-4 mt-6 mx-4 border border-white/10
//                 hover:border-[#2DA3AA]/30 transition-all duration-300 group/bio"
//               >
//                 <h2 className="text-sm font-bold mb-2 flex items-center">
//                   <span className="bg-[#2DA3AA] w-2 h-2 rounded-full mr-2 animate-pulse"></span>
//                   About Me
//                 </h2>
//                 <p className="text-xs text-gray-400 group-hover/bio:text-gray-300 transition-colors duration-300">
//                   Passionate about technology, web development, and open-source
//                   projects.
//                   <span className="block mt-2 opacity-0 group-hover/bio:opacity-100 transition-opacity duration-300">
//                     🚀 Currently learning: Advanced React patterns & Web3
//                     development
//                   </span>
//                 </p>
//               </div>

//               {/* Animated Activity Feed */}
//               <div className="mt-6 px-4 space-y-4">
//                 <h2 className="text-sm font-bold mb-2 flex items-center">
//                   <span className="bg-[#2D969D] w-2 h-2 rounded-full mr-2 animate-pulse"></span>
//                   Recent Activity
//                 </h2>

//                 {[1, 2].map((item) => (
//                   <div
//                     key={item}
//                     className="bg-[#1F2A30]/90 backdrop-blur-sm rounded-xl p-4 border border-white/10
//                 hover:border-[#2D969D]/30 transition-all duration-300 transform hover:scale-[1.01]
//                 cursor-pointer group/activity"
//                   >
//                     <div className="flex items-center space-x-2 text-xs text-gray-400">
//                       <span>Posted in</span>
//                       <span className="text-[#2D969D] font-medium">
//                         forum/technology
//                       </span>
//                       <span>•</span>
//                       <span className="group-hover/activity:text-white transition-colors">
//                         2 hours ago
//                       </span>
//                     </div>
//                     <h3 className="text-sm font-medium mt-2 text-white line-clamp-1">
//                       Sample Post #10: This is a title that would typically be
//                       about technology
//                     </h3>
//                     <p className="text-xs text-gray-400 mt-1 line-clamp-2 group-hover/activity:text-gray-300">
//                       This is sample post content. In a real Reddit-like
//                       application...
//                     </p>
//                     <div className="flex items-center space-x-3 mt-3 text-xs">
//                       <div className="flex items-center space-x-1 text-[#2DA3AA]">
//                         <FiArrowUp className="w-4 h-4" />
//                         <span>9.7B</span>
//                       </div>
//                       <div className="flex items-center space-x-1 text-[#2D969D]">
//                         <FiMessageSquare className="w-4 h-4" />
//                         <span>47</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Animated Trending Topics */}
//               <div className="mt-6 px-4">
//                 <h2 className="text-sm font-bold mb-3 flex items-center">
//                   <span className="bg-[#ffd700] w-2 h-2 rounded-full mr-2 animate-pulse"></span>
//                   Trending Topics
//                 </h2>
//                 <div className="flex flex-wrap gap-2">
//                   {[
//                     'Web Development',
//                     'ReactJS',
//                     'TailwindCSS',
//                     'Open Source',
//                     'AI & ML',
//                     'Tajweed',
//                     'Fun',
//                   ].map((topic, i) => (
//                     <span
//                       key={i}
//                       className="bg-[#1F2A30]/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs
//                    border border-white/10 hover:border-[#2DA3AA] hover:text-[#2DA3AA]
//                    transition-all duration-200 cursor-pointer transform hover:scale-105"
//                     >
//                       #{topic}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </aside>
//       </div>

//       {showCreatePostModal && <CreatePostModal />}
//     </div>
//   );
// };

// export default AdvancedRedditForum;
