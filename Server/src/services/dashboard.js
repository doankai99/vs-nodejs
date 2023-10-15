import Order from "../model/order.js";
import Customer from "../model/customer.js";
import Appointment from "../model/appointment.js";

export const dashboardService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const orders = await Order.find();

            const ordersByMonth = {};

            for (const order of orders) {
                const isoCreatedAt = new Date(order.createdAt).toISOString();
                const orderDate = new Date(isoCreatedAt);
                const monthYearKey = `${orderDate.getMonth() + 1}`;

                if (!ordersByMonth[monthYearKey]) {
                    ordersByMonth[monthYearKey] = [];
                }

                ordersByMonth[monthYearKey].push(order);
            }

            const dashboardData = {}; // Đối tượng dữ liệu ban đầu

            // Khởi tạo dashboardData với tất cả tháng trong năm và totalOrders = 0
            for (let month = 1; month <= 12; month++) {
                const monthYearKey = `${month}`;
                dashboardData[monthYearKey] = {
                    totalOrders: 0
                };
            }

            // Cập nhật dashboardData với số đơn hàng thực tế
            for (const key in ordersByMonth) {
                const monthOrders = ordersByMonth[key];
                const totalOrders = monthOrders.length;
                dashboardData[key].totalOrders = totalOrders;
            }

            resolve({
                dashboard: dashboardData,
                total: orders.length
            });
        } catch (e) {
            reject(e);
        }
    });
}

export const customerDashboardService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const customers = await Customer.find();

            const customersByMonth = {};

            for (const customer of customers) {
                const isoCreatedAt = new Date(customer.createdAt).toISOString();
                const customerDate = new Date(isoCreatedAt);
                const monthYearKey = `${customerDate.getMonth() + 1}`;

                if (!customersByMonth[monthYearKey]) {
                    customersByMonth[monthYearKey] = [];
                }

                customersByMonth[monthYearKey].push(customer);
            }

            const customerDashboardData = {}; // Đối tượng dữ liệu ban đầu

            // Khởi tạo dashboardData với tất cả tháng trong năm và totalOrders = 0
            for (let month = 1; month <= 12; month++) {
                const monthYearKey = `${month}`;
                customerDashboardData[monthYearKey] = {
                    totalOrders: 0
                };
            }

            // Cập nhật dashboardData với số đơn hàng thực tế
            for (const key in customersByMonth) {
                const monthOrders = customersByMonth[key];
                const totalOrders = monthOrders.length;
                customerDashboardData[key].totalOrders = totalOrders;
            }

            resolve({
                dashboard: customerDashboardData,
                total: customers.length
            });
        } catch (e) {
            reject(e);
        }
    });
}

export const appointmentDashboardService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const appointments = await Appointment.find();

            const appointmentsByMonth = {};

            for (const appointment of appointments) {
                const isoCreatedAt = new Date(appointment.createdAt).toISOString();
                const appointmentDate = new Date(isoCreatedAt);
                const monthYearKey = `${appointmentDate.getMonth() + 1}`;

                if (!appointmentsByMonth[monthYearKey]) {
                    appointmentsByMonth[monthYearKey] = [];
                }

                appointmentsByMonth[monthYearKey].push(appointment);
            }

            const appointmentDashboardData = {}; // Đối tượng dữ liệu ban đầu

            // Khởi tạo dashboardData với tất cả tháng trong năm và totalOrders = 0
            for (let month = 1; month <= 12; month++) {
                const monthYearKey = `${month}`;
                appointmentDashboardData[monthYearKey] = {
                    totalOrders: 0
                };
            }

            // Cập nhật dashboardData với số đơn hàng thực tế
            for (const key in appointmentsByMonth) {
                const monthAppointments = appointmentsByMonth[key];
                const totalAppointments = monthAppointments.length;
                appointmentDashboardData[key].totalOrders = totalAppointments;
            }

            resolve({
                dashboard: appointmentDashboardData,
                total: appointments.length
            });
        } catch (e) {
            reject(e);
        }
    });
}
export const pieChartStatusOrderService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const orderClose = await Order.find({status: 0});
            const orderInactive = await Order.find({status: 1});
            const orderActive = await Order.find({status: 2});
            const orderDoing = await Order.find({status: 3});
            const orderDelivery = await Order.find({status: 4});
            const orderDone = await Order.find({status: 5});

            if (orderClose && orderInactive && orderActive && orderDoing && orderDelivery && orderDone) {
                resolve({
                    status: "OK",
                    orderClose: orderClose.length,
                    orderInactive: orderInactive.length,
                    orderActive: orderActive.length,
                    orderDoing: orderDoing.length,
                    orderDelivery: orderDelivery.length,
                    orderDone: orderDone.length
                })
            }
        }catch (e) {
            reject(e);
        }
    })
}