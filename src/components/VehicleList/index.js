import React, { useState } from "react";
import useData from "./useData";
import "./style.scss";
import Vehicle from "./Vehicle";

export default function VehicleList() {
    // eslint-disable-next-line no-unused-vars
    const [loading, error, vehicles] = useData();

    if (loading) {
        return <div data-testid="loading">Loading</div>;
    }
    console.log(error);

    if (error) {
        return <div data-testid="error">{error}</div>;
    }

    return (
        <div data-testid="results" className="vehicles__wrapper">
            {vehicles.map((vehicle, i) => (
                <Vehicle vehicle={vehicle} i={i} />
                // <div
                //     className="vehicles__conatiner"
                //     key={vehicle.id}
                //     style={{ animation: animationStr(i) }}
                // >
                //     <div className="vechicles__container-image">
                //         <img
                //             src={vehicle.media[0].url}
                //             alt={`Vehicle ${vehicle.id}`}
                //         />
                //     </div>
                //     <div className="vechicles__container-content">
                //         <h2 className="vehicle__title">Vehicle {vehicle.id}</h2>
                //         <p className="vehicle__price">From {vehicle.price}</p>
                //         <p className="vehicle__description">
                //             {vehicle.description}{" "}
                //             <span
                //                 onClick={() => {
                //                     setShowMore(!showMore);
                //                 }}
                //             >
                //                 {showMore ? "Show Less" : "Show More"}
                //             </span>
                //         </p>
                //         {showMore && (
                //             <>
                //                 <p className="vehicle__info">
                //                     Model Year {vehicle.modelYear}
                //                 </p>
                //                 <p className="vehicle__info">
                //                     Passengers {vehicle.meta.passengers}
                //                 </p>
                //             </>
                //         )}
                //     </div>
                // </div>
            ))}
        </div>
    );
}
