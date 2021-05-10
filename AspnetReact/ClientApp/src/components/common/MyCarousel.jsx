import React from 'react'
import { Carousel } from 'react-bootstrap'
import "./MyCarousel.css"

export default function MyCarousel({ images }) {
    if (!images?.length) return <div></div>
    return (
        <Carousel>
            {images && Array.from(images).map((image, i) => {
                return (
                    <Carousel.Item style={{ height: "400px" }} key={i}>
                        {!image.hasOwnProperty('url') && <img className="d-block w-100 h-100" src={URL.createObjectURL(image)} alt={i + " slide"} style={{ objectFit: "contain" }} />}
                        {image.hasOwnProperty('url') && <img className="d-block w-100 h-100" src={"/api/uploads/" + image.url} alt={i + " slide"} style={{ objectFit: "contain" }} />}
                    </Carousel.Item>
                )
            })}
        </Carousel>
    )
}
