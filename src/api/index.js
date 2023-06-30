// eslint-disable-next-line no-unused-vars
import { request } from "./helpers";

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
// TODO: All API related logic should be made inside this function.
export default async function getData() {
    try {
        const response = await fetch("/api/vehicles.json");
        const vehicleData = await response.json();

        const promises = vehicleData.map(async (vehicle) => {
            try {
                const detailResponse = await fetch(vehicle.apiUrl);
                const detailData = await detailResponse.json();
                if (detailData.price) {
                    return { ...vehicle, ...detailData }; // Merge general and detail data
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log(
                        `API endpoint not found for vehicle ${vehicle.id}`
                    );
                } else {
                    console.error(
                        `Error fetching vehicle details for ${vehicle.id}`,
                        error
                    );
                }
            }
            return null;
        });

        const resolvedPromises = await Promise.all(promises);
        const filteredVehicles = resolvedPromises.filter(
            (vehicle) => vehicle !== null
        );

        return filteredVehicles;
    } catch (error) {
        console.error("Error fetching vehicle list:", error);
    }
}
