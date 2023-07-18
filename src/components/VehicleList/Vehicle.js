import React, { useState } from "react";
import "./style.scss";

const Vehicle = ({ vehicle, i }) => {
    const [showMore, setShowMore] = useState(false);

    const duration = 1000; // ms
    const delay = 500; // ms
    const animationStr = (i) =>
        `fadeIn ${duration}ms ease-out ${delay * (i + 1)}ms forwards`;

    return (
        <div
            className="vehicles__conatiner"
            key={vehicle.id}
            style={{ animation: animationStr(i) }}
        >
            <div className="vehicles__image-container">
                <img
                    className="vehicles__image-container__image"
                    src={vehicle.media[0].url}
                    alt={`Vehicle ${vehicle.id}`}
                />
            </div>
            <div className="vechicles__container-content">
                <h2 className="vehicle__title">Vehicle {vehicle.id}</h2>
                <p className="vehicle__price">From {vehicle.price}</p>
                <p className="vehicle__description">
                    {vehicle.description}{" "}
                    <button
                        onClick={() => {
                            setShowMore(!showMore);
                        }}
                    >
                        {showMore ? "Show Less" : "Show More"}
                    </button>
                </p>
                {showMore && (
                    <>
                        <p className="vehicle__info">
                            Model Year {vehicle.modelYear}
                        </p>
                        <p className="vehicle__info">
                            Passengers {vehicle.meta.passengers}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Vehicle;
