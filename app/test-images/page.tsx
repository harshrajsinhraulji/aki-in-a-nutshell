
"use client";

import React from 'react';

const IMAGES = [
    "/images/aki/img1.png",
    "/images/aki/img2.jpg",
    "/images/aki/img3.jpg",
    "/images/aki/img4.png",
    "/images/aki/img5.jpg",
    "/images/aki/img6.png",
    "/images/aki/img7.png",
    "/images/aki/img8.png",
    "/images/aki/img9.png"
];

export default function TestImagesPage() {
    return (
        <div style={{ padding: '20px', backgroundColor: '#fff', color: '#000' }}>
            <h1>Image Test Page</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {IMAGES.map((src, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', padding: '10px' }}>
                        <p>{src}</p>
                        <img
                            src={src}
                            alt={`Test ${index}`}
                            style={{ width: '100%', height: 'auto' }}
                            onError={(e) => {
                                console.error(`Failed to load ${src}`);
                                (e.target as HTMLImageElement).style.border = '5px solid red';
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
