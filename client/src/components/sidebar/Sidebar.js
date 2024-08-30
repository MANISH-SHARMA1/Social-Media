// import React, { useEffect, useState } from "react";
// import "./Sidebar.scss"
// import { AiOutlineClose } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getFeedData } from "../../redux/slices/feedSlice";
// import Follower from "../follower/Follower";

// function Sidebar({ onClose }) {
//   const [isClosing, setIsClosing] = useState(false);
//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   const feedData = useSelector((state) => state?.feedDataReducer?.feedData);

//   useEffect(() => {
//     dispatch(getFeedData());
//   }, [dispatch]);

//   const handleCloseClick = () => {
//     setIsClosing(true);
//     setTimeout(onClose, 400);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex justify-start">
//       <div
//         className={`fixed inset-0 bg-black transition-opacity duration-300 ${
//           isClosing ? "opacity-0" : "opacity-50"
//         }`}
//         onClick={handleCloseClick}
//       ></div>
//       <div
//         className={`relative h-screen w-60 sm:w-80 bg-white text-lg transition-transform duration-300 ${
//           isClosing ? "animate-sidebarSlideOut" : "animate-sidebarSlideIn"
//         }`}
//       >
//         <div className="h-14 flex items-center justify-between p-2 font-semibold">
//           <div className="cursor-pointer" onClick={handleCloseClick}>
//             <AiOutlineClose />
//           </div>
//           <div className="right-part">
//             <div className="following">
//               <h3 className="title">You Are Following</h3>
//               {feedData?.followings?.map((user) => (
//                 <Follower key={user?._id} user={user} />
//               ))}
//             </div>
//             <div className="suggestions">
//               <h3 className="title">Suggested For You</h3>
//               {feedData?.suggestions?.map((user) => (
//                 <Follower key={user?._id} user={user} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
