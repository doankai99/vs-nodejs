import express from "express";
import {
    appointmentDashboardController,
    customerDashboardController,
    dashboardController, pieChartStatusOrderController
} from "../controller/dashboard.js";

const router = express.Router()

    router.get('/orderDashboard', dashboardController)

    router.get('/customerDashboard', customerDashboardController)

    router.get('/appointmentDashboard', appointmentDashboardController)

    router.get('/pieChartStatusOrder', pieChartStatusOrderController)

export default router;