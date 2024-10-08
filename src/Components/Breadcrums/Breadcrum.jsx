import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

export default function Breadcrum(props) {
    const { product } = props;

    // Conditional rendering to ensure product and its properties are defined
    if (!product || !product.category || !product.name) {
        return <div>Loading...</div>;  // Fallback UI in case product or its properties are undefined
    }

    return (
        <div className='breadcrum'>
            HOME <img src={arrow_icon} alt="arrow" /> SHOP <img src={arrow_icon} alt="arrow" /> {product.category} <img src={arrow_icon} alt="arrow" /> {product.name}
        </div>
    );
}
