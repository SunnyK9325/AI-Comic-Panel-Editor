import './App.css';
import './components/Pagination.css'
import './components/PaginationItem.css'
import { useEffect, useState} from "react";
import Pagination from './components/Pagination'
import { query } from './api/handle';
import { GoCommandPalette } from "react-icons/go";
import { HiOutlineAnnotation } from "react-icons/hi";
import { CiGrid2H } from "react-icons/ci";
import { FaArrowCircleUp } from "react-icons/fa";

function App() {

  const [inputText, setInputText] = useState('');
  const [imageArray, setImageArray] = useState(Array.from({ length: 10 }));
  const [submitBtn, setSubmitBtn] = useState(false)
  // for Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [isTextEnabled, setIsTextEnabled] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bubbleArray, setBubbleArray] = useState(Array.from({ length: 10 }));

  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleQuery = async () => {
    setIsLoading(true); // Set isLoading to true while fetching
    try {
      // Check if the textarea is empty 
      if (inputText === '') {
        alert('Please enter some input. ')
        return;
      }

      // First as soon as someone submits the prompt 
      // the previous image for that page should be removed. 
      setImageArray((prevImages) => {
        const newImages = [...prevImages];
        newImages[currentPage - 1] = undefined;
        return newImages;
      });

      const response = await query({ "inputs": inputText });
      const imageUrl = URL.createObjectURL(response);

      setImageArray((prevImages) => {
        const newImages = [...prevImages];
        newImages[currentPage - 1] = imageUrl;
        return newImages;
      });
      setInputText('');

    } catch (error) {
      console.log('Fetching image failed:', error);
      setIsLoading(false); // Set isLoading to false when the image is loaded or in case of an error
    } finally {
      setIsLoading(false); // Set isLoading to false when the image is loaded or in case of an error
    }
  };


  const handleText = () => {
    // This sets the array value as per the text for 
    // the corresponding page
    setBubbleArray((prevText) => {
      const newText = [...prevText];
      newText[currentPage - 1] = textValue;
      return newText;
    });

    setTextValue('');
  }

  useEffect(() => {
    const handleScroll = () => {
      // Show the scroll-to-top button when scrolling down, hide it when at the top
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setShowScrollButton(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
//////////////////////////  Scroll to top  //////////////////////////

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

//////////////////////////  Scroll to bottom  //////////////////////////
  const handleScroll = () => {
    setSubmitBtn(!submitBtn);
    window.scroll({
      top: document.body.offsetHeight,
      left: 0, 
      behavior: 'smooth',
    });
  }

  const filteredImages = imageArray.filter((image) => image !== undefined);

  return (
    <>
      <div className='dashboard m-0 p-0 flex justify-center items-center h-full w-full'>
        <div className=' py-6 w-full max-w-[1200px] flex flex-wrap md:flex-nowrap 
        items-start  justify-center ' style={{backgroundColor: '#dfdfdf', borderRadius: '15px' }}>

          {/* Input Panel  */}

          <div className='panel '>
            <span style={{ color: 'black', fontSize: '35px', marginBottom: '15px' }}>
              Panel Editor
            </span>

            <hr style={{ marginBottom: '2rem', borderBottom: '2px solid red', width: '75%' }} />

            {/* prompt box */}
            <div className="promptBox">
              <span style={{ color: 'grey', fontSize: '20px' }}>Prompt</span>
              <textarea
                required={true}
                value={inputText}
                placeholder='Enter prompt to generate an image'
                className='textarea'
                onChange={(e) => setInputText(e.target.value)}
              />

              {/* Prompt generate Button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap:'wrap' }}>
                
                <button onClick={handleQuery} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GoCommandPalette style={{ marginRight: '6px', fontWeight: 'bold', fontSize: '16px' }} /> Generate
                </button>
                
                {/* <button onClick={() => setSubmitBtn(!submitBtn)}  */}
                <button onClick={handleScroll} 
                style={{ display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' }}>
                  {!submitBtn && <CiGrid2H style={{ marginRight: '6px', fontWeight: 'bold', fontSize: '16px' }} />}
                  {
                    submitBtn ? 'Hide Preview' : 'Preview'
                  }
                </button>
              </div>
            </div>

            {/* Add space between prompt box and speech bubble box */}
            <div style={{ margin: '1rem 0' }}></div>

            {/* speech bubble box */}
            <div className='textBox'>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isTextEnabled}
                    onChange={() => setIsTextEnabled(!isTextEnabled)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span style={{ color: 'grey', fontSize: '18px' }}>Customise Speech Bubble</span>
                </label>
              </div>


              <textarea
                value={textValue}
                placeholder='Enter text'
                onChange={(e) => setTextValue(e.target.value)}
                style={!isTextEnabled ? { opacity: '0.5', cursor: 'not-allowed' } : {}}
                disabled={!isTextEnabled}
                className='textarea'
              />

              {/* Speech Bubble Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleText} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HiOutlineAnnotation style={{ marginRight: '6px', fontWeight: 'bold', fontSize: '16px' }} />Add Text </button>
              </div>

            </div>
          </div>

          {/* for Pagination */}
          <div className='container m-0'>
            <Pagination
              currentPage={currentPage}
              total={10}
              limit={1}
              onPageChange={(page) => setCurrentPage(page)}
              imageArray={imageArray}
              isLoading={isLoading}
              bubbleArray={bubbleArray}
            />
          </div>
        </div>
      </div>

      {/* preview comic section  */}
      <div className={`mx-auto flex flex-col justify-center items-center ${submitBtn ? 'my-40' : ''}`} 
      style={{flexDirection:'row', backgroundColor:'#87C4FF'}}>
        {
          submitBtn ?
            <>
              <span></span>
              <div className="relative">
                {filteredImages.map((imageSrc, index) => (
                  <div key={index} className="relative" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <img
                      style={{border:'10px solid white'}}
                      src={imageSrc}
                      alt={`Fetched ${index + 1}`}
                      className='block border-[0.1rem] rounded my-2 max-h-[50rem] max-w-[50rem] md:w-[80%] md:h-[80%]'
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

      {/* scroll to top button */}
      {showScrollButton && (
        <button className="scroll-to-top" onClick={handleScrollToTop}>
        <FaArrowCircleUp style={{fontSize:'25px'}}/>
        </button>
      )}
    </>

  );
}
export default App;