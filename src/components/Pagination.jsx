import React from 'react';
import img from '../assets/filler-image.jpeg';
import { Loader } from './Loader';
import './Pagination.css';

const range = (start, end) => {
    return [...Array(end).keys()].map((el) => el + start);
};

const PaginationItem = ({ page, currentPage, onPageChange, setTextValue }) => {

    return (
        <li className='liStyles' style={{
            backgroundColor: page === currentPage ? '#406bc3' : 'transparent',
            color: page === currentPage ? 'white' : 'black',
        }} onClick={() => onPageChange(page)}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <span style={{ display: 'inline-block', fontWeight: '500' }}>{page}</span>
            </div>
        </li>
    );
};

const Pagination = ({ currentPage, total, limit, onPageChange, imageArray, isLoading, bubbleArray }) => {
    const pagesCount = Math.ceil(total / limit);
    const pages = range(1, pagesCount);

    return (
        <div className='containerStyles'>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.5rem' , fontWeight:'500', paddingBottom:'20px'}}>Comic Panel Display</span>
            </div>
            <div className='borderStyles'>
                {isLoading ? (
                    <div className='loaderContainerStyles'>
                        <Loader />
                    </div>
                ) : imageArray[currentPage - 1] ? (
                    <div style={{ position: 'relative' }}>
                        <img className='imgStyles' src={imageArray[currentPage - 1]} alt={`Fetched  `} style={{ border: '2px solid #D2DE32' }} />
                        {bubbleArray[currentPage - 1] ? (
                            <div className='bubble tp-rt'>{bubbleArray[currentPage - 1]}</div>
                        ) : null}
                    </div>
                ) :
                    (
                        <div style={{ position: 'relative' }}>
                            <img className='imgStyles' src={img} alt={`filler`} />
                            <p className='centeredText'>No Image</p>
                        </div>
                    )
                }
            </div>
            <div className='pages'>
                <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                    {pages.map((page) => (
                        <PaginationItem page={page} key={page} currentPage={currentPage} onPageChange={onPageChange} />
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default Pagination;
