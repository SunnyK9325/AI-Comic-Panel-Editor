export const Loader = () => {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="animate-spin"
          style={{
            width: '5rem',
            height: '5rem',
            color: '#FF8F8F',
            transform: 'rotate(45deg)',
            animation: 'spin 1.5s linear infinite',
            willChange: 'transform'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
            <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
            <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
            <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
            <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
            <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
          </svg>
        </div>
      </div>
    );
  };
  

// export const Loader = () => {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin">
//           <svg
//             className="w-20 h-20 text-pink-500 transform rotate-45" // Added transform and rotate-45 classes
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <circle cx="12" cy="12" r="10"></circle>
//             <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
//             <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
//             <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
//             <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
//             <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
//             <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
//           </svg>
//         </div>
//       </div>
//     );
//   };
  
