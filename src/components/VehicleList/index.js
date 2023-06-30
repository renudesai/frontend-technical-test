import React from "react";
import useData from "./useData";
import "./style.scss";

export default function VehicleList() {
    // eslint-disable-next-line no-unused-vars
    const [loading, error, vehicles] = useData();

    if (loading) {
        return <div data-testid="loading">Loading</div>;
    }

    if (error) {
        return <div data-testid="error">{error}</div>;
    }

    return (
        <div data-testid="results" className="vehicles__wrapper">
            {vehicles.map((vehicle) => (
                <div className="vehicles__conatiner" key={vehicle.id}>
                    <div className="vechicles__container-image">
                        <img src={vehicle.media[1].url} alt="vehicle" />
                    </div>
                    <div className="vechicles__container-content">
                        <p className="vehicle__title">Vehicle {vehicle.id}</p>
                        <p className="vehicle__price">From {vehicle.price}</p>
                        <p className="vehicle__description">
                            {vehicle.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
