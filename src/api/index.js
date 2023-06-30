// eslint-disable-next-line no-unused-vars
import { request } from "./helpers";
import axios from "axios";

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
// TODO: All API related logic should be made inside this function.
export default async function getData() {
    try {
        const response = await axios.get("/api/vehicles.json");
        const vehicleList = response.data;
        const detailedVehiclePromises = vehicleList.map(async (vehicle) => {
            try {
                const detailResponse = await axios.get(vehicle.apiUrl);
                const detailedVehicle = detailResponse.data;
                if (detailedVehicle.price) {
                    return {
                        ...vehicle,
                        ...detailedVehicle,
                    };
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log(
                        `API endpoint not found for vehicle ${vehicle.id}`
                    );
                } else {
                    console.error(
                        `Error fetching vehicle details for ${vehicle.id}:`,
                        error
                    );
                }
            }
            return null;
        });
        const detailedVehicles = await Promise.all(detailedVehiclePromises);
        return detailedVehicles.filter((vehicle) => vehicle !== null);
    } catch (error) {
        console.error("Error fetching vehicle list:", error);
    }
}
