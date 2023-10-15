import {
    appointmentDashboardService,
    customerDashboardService,
    dashboardService,
    pieChartStatusOrderService
} from "../services/dashboard.js";

export const dashboardController = async (req, res) => {
    try {
        const response = await dashboardService()
        return res.status(200).json(response)
    }catch (e) {
        return res.json({
            status: 'err',
            message: e
        })
    }
}

export const customerDashboardController = async (req, res) => {
    try{
        const response = await customerDashboardService()
        return res.status(200).json(response)
    }catch (e) {
        return res.json({
            status: 'err',
            message: e
        })
    }
}

export const appointmentDashboardController = async  (req, res) => {
    try{
        const response = await appointmentDashboardService()
        return res.status(200).json(response)
    }catch (e) {
        return res.json({
            status: 'err',
            message: e
        })
    }
}

export const pieChartStatusOrderController = async (req, res) => {
    try {
        const response = await pieChartStatusOrderService()
        return res.status(200).json(response)
    }catch (e) {
        return res.json({
            status: 'err',
            message: e
        })
    }
}