import React from 'react';
import img from '../assets/PlaceholderImage.jpeg';
import { LoadingIndicator } from './LoadingIndicator';
import './ComicPanel.css';

// Function to generate a range of numbers
const range = (start, end) => {
    return [...Array(end).keys()].map((el) => el + start);
};

// Component for each ComicPanel item
const PanelItem = ({ page, currentPage, onPageChange }) => (
    <li className='liStyles' style={{
        backgroundColor: page === currentPage ? '#406bc3' : 'transparent',
        color: page === currentPage ? 'white' : 'black',
    }} onClick={() => onPageChange(page)}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <span style={{ display: 'inline-block', fontWeight: '500' }}>{page}</span>
        </div>
    </li>
);

// ComicPanel component
const ComicPanel = ({ currentPage, total, limit, onPageChange, imageArray, isLoading, bubbleArray }) => {
    // Calculate the total number of pages
    const pagesCount = Math.ceil(total / limit);
    // Generate an array of page numbers
    const pages = range(1, pagesCount);

    return (
        <div className='containerStyles'>
            {/* Header for the ComicPanel section */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '500', paddingBottom: '20px' }}>Comic Panel Display</span>
            </div>

            {/* Container for the comic panel display */}
            <div className='borderStyles'>
                {isLoading ? (
                    // Show loader if data is still loading
                    <div className='loaderContainerStyles'>
                        <LoadingIndicator />
                    </div>
                ) : (
                    // Display comic panel or filler image if no data is available
                    <div style={{ position: 'relative' }}>
                        {imageArray[currentPage - 1] ? (
                            // Display the fetched image and speech bubble if available
                            <>
                                <img className='imgStyles' src={imageArray[currentPage - 1]} alt={`Fetched  `} />
                                {bubbleArray[currentPage - 1] && (
                                    <div className='bubble tp-rt'>{bubbleArray[currentPage - 1]}</div>
                                )}
                            </>
                        ) : (
                            // Display filler image and message if no image is available
                            <>
                                <img className='imgStyles' src={img} alt={`filler`} />
                                <p className='centeredText'>No Image</p>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* ComicPanel controls */}
            <div className='pages'>
                <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                    {pages.map((page) => (
                        // Render ComicPanel items
                        <PanelItem page={page} key={page} currentPage={currentPage} onPageChange={onPageChange} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ComicPanel;
