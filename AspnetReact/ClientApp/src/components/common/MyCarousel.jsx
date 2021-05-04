import React from 'react'
import { Carousel } from 'react-bootstrap'

export default function MyCarousel({ images }) {
    return (
        <Carousel style={{ backgroundColor: "#ddd" }}>
            {images && Array.from(images).map((image, i) => {
                return (
                    <Carousel.Item style={{ height: "400px" }} key={i}>
                        <img className="d-block w-100 h-100" src={URL.createObjectURL(image)} alt={i + " slide"} style={{ objectFit: "contain" }} />
                    </Carousel.Item>
                )
            })}
        </Carousel>
    )
}
