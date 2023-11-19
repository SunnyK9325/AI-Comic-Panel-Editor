import { useEffect, useState, useRef } from "react";
import ComicPanel from './components/ComicPanel'
import { query } from './api/FetchData';
import './App.css';
import './components/ComicPanel.css'
import './components/SpeechBubble.css'
import { GoCommandPalette } from "react-icons/go";
import { HiOutlineAnnotation } from "react-icons/hi";
import { CiGrid2H } from "react-icons/ci";
import { FaArrowCircleUp } from "react-icons/fa";

// Constants
const TOTAL_PAGES = 10;
const DEFAULT_PAGE = 1;
const SCROLL_THRESHOLD = 100;

function App() {
  // State variables
  const [inputText, setInputText] = useState('');
  const [imageArray, setImageArray] = useState(Array.from({ length: TOTAL_PAGES }));
  const [submitBtn, setSubmitBtn] = useState(false)
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
  const [textValue, setTextValue] = useState('');
  const [isLoading, setIsLoading] = useState([false, false,false,false,false,false,false,false,false,false]);
  const [bubbleArray, setBubbleArray] = useState(Array.from({ length: TOTAL_PAGES }));

  const [showScrollButton, setShowScrollButton] = useState(false);
  const ref = useRef(null);
  // Function to handle image generation query
  const handleQuery = async () => {
    setIsLoading(isLoading.map((x, ind)=>{
      if(ind === currentPage - 1){
        return true;
      }
      return x;
    })); // Set isLoading to true when the image is being fetched
    try {
      // If the input is empty, show an alert and return
      if (inputText === '') {
        alert('Please enter some Input')
        return;
      }

      // Remove the previous image for the current page
      setImageArray((prevImages) => {
        const newImages = [...prevImages];
        newImages[currentPage - 1] = undefined;
        return newImages;
      });

      const response = await query({ "inputs": inputText });
      const imageUrl = URL.createObjectURL(response);

      // Update the image array with the new image URL
      setImageArray((prevImages) => {
        const newImages = [...prevImages];
        newImages[currentPage - 1] = imageUrl;
        return newImages;
      });

      setInputText('');

    } catch (error) {
      console.log('Fetching image failed:', error);
    } finally {
      setIsLoading(isLoading.map((x, ind)=>{
        if(ind === currentPage - 1){
          return false;
        }
        return x;
      })); // Set isLoading to false when the image is loaded or in case of an error
    }
  };

  // Function to handle adding text to the speech bubble
  const handleText = () => {
    // Set the array value as per the text for the corresponding page
    setBubbleArray((prevText) => {
      const newText = [...prevText];
      newText[currentPage - 1] = textValue;
      return newText;
    });

    setTextValue('');
  }

  // Effect to handle scrolling and show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Show the scroll-to-top button when scrolling down, hide it when at the top
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setShowScrollButton(scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll to the top
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Function to scroll to the bottom
  const handleScroll = () => {
    setSubmitBtn(!submitBtn);
    if (!submitBtn) {
      // console.log("here");
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Filter out undefined images
  const filteredImages = imageArray.filter((image) => image !== undefined);

  return (
    <>
      <div className='dashboard m-0 p-0 flex justify-center items-center h-full w-full'>
        <div className=' py-6 w-full max-w-[1200px] flex flex-wrap md:flex-nowrap 
        items-start  justify-center ' style={{ backgroundColor: '#dfdfdf', borderRadius: '15px' }}>

          {/* Panel Editor */}
          <div className='panel m-0 md:mx-12'>
            <span style={{ color: 'black', fontSize: '35px', marginBottom: '15px' }}>
              Panel Editor
            </span>

            <hr style={{ marginBottom: '2rem', borderBottom: '2px solid #F11A7B', width: '75%' }} />

            {/* Prompt box */}
            <div className="promptBox">
              <span style={{ color: 'grey', fontSize: '20px', fontWeight: '500' }}>Prompt</span>
              <textarea
                required={true}
                value={inputText}
                placeholder='Enter prompt to generate an image'
                className='textarea'
                onChange={(e) => setInputText(e.target.value)}
              />

              {/* Prompt generate Button */}
              <div className='btngrp' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                
                <button className='panelButton' onClick={handleScroll}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  {!submitBtn && <CiGrid2H style={{ marginRight: '6px', fontWeight: 'bold', fontSize: '16px' }} />}
                  {
                    submitBtn ? 'Hide Preview' : 'Preview'
                  }
                </button>
                
                <button className='panelButton' onClick={handleQuery} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GoCommandPalette style={{ marginRight: '6px', fontWeight: 'bold', fontSize: '16px' }} /> Generate
                </button>
              </div>
            </div>

            {/* Space between prompt box and speech bubble box */}
            <div style={{ margin: '1rem 0' }}></div>

            {/* Speech bubble box */}
            <div className='textBox'>
              <div>
                <span style={{ color: 'grey', fontSize: '18px', fontWeight: '500' }}>Customise Speech Bubble</span>
              </div>

              <textarea
                value={textValue}
                placeholder='Enter text'
                onChange={(e) => setTextValue(e.target.value)}
                className='textarea'
              />

              {/* Speech Bubble Button */}
              <div className='bubblebtn' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className='panelButton' onClick={handleText} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HiOutlineAnnotation style={{ marginRight: '6px', fontWeight: 'bold', fontSize: '16px' }} />Add Text </button>
              </div>
            </div>
          </div>

          {/* For ComicPanel */}
          <div className='container m-0'>
            <ComicPanel
              currentPage={currentPage}
              total={TOTAL_PAGES}
              limit={DEFAULT_PAGE}
              onPageChange={(page) => setCurrentPage(page)}
              imageArray={imageArray}
              isLoading={isLoading}
              bubbleArray={bubbleArray}
            />
          </div>
        </div>
      </div>

      {/* Preview comic section */}
      <div className={`mx-auto flex justify-center items-center ${submitBtn ? 'my-40' : ''}`}>
        {
          submitBtn ?
            <>
              <div ref={ref} className="relative w-full "
                style={{ backgroundColor: '#F1EFEF', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flex: '0 0 50%', flexDirection: "row", borderRadius: '5px', flexWrap: 'wrap' }}
              >
                {filteredImages.map((imageSrc, index) => (
                  <div key={index} className='w-full  h-full p-4' style={{ position: 'relative', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexBasis: '50%' }}>
                    <img
                      style={{ display: 'flex', border: '1px solid black', margin: '25px' }}
                      src={imageSrc}
                      alt={`Fetched ${index + 1}`}
                      className='block border-[0.1rem] rounded my-2 max-h-[40rem] w-[300px] max-w-[40rem] md:w-[80%] md:h-[80%]'
                    />
                    {bubbleArray[index] && (
                      <div key={index} className="speech top-right">
                        {bubbleArray[index]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
            :
            null
        }
      </div>

      {/* Scroll to top button */}
      {showScrollButton && (
        <button className="scroll-to-top" onClick={handleScrollToTop}>
          <FaArrowCircleUp style={{ fontSize: '25px' }} />
        </button>
      )}
    </>
  );
}

export default App;
