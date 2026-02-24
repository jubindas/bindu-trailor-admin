import axios from "axios";
import { ROOT_URL } from "@/lib/url";
import type { Stitching } from "@/table-types/stitching-order";

export interface WorkloadSummary {
    total_items: string;
    pending: string;
    in_production: string;
    completed: string;
    total_quantity: string;
    total_hours: string;
}

export interface WorkloadResponse {
    success: boolean;
    staff: string;
    summary: WorkloadSummary;
    workload_items: Stitching[];
}

export const fetchWorkload = async (): Promise<WorkloadResponse> => {
    const token = localStorage.getItem("staff_token");

    if (!token) {
        throw new Error("No authentication token found");
    }

    const response = await axios.get(`${ROOT_URL}/staff-auth/my-workload`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

export const updateWorkloadStatus = async (
    workflowItemId: number | string,
    status: string
): Promise<any> => {
    const token = localStorage.getItem("staff_token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.patch(
        `${ROOT_URL}/staff-auth/workload/${workflowItemId}/status`,
        { workload_status: status },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};
