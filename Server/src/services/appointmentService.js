import AppointmentModel from "../model/appointment.js";
import moment from 'moment';
import { isAfter } from 'date-fns';
import {deleteAppointmentController, updateStatusAppointmentController} from "../controller/appointmentController.js";

export const bookAppointmentService = (customerId, name, phone, email, date, time, area, city, state, country) => {
    return new Promise(async (resolve, reject) => {
        try{
            const newAppointment = await AppointmentModel.create({
                customerId,
                name,
                phone,
                email,
                date,
                time,
                area,
                city,
                state,
                country
            })
            resolve({
                status: 'OK',
                appointment: newAppointment
            })
        }catch (e) {
            return {
                message: e,
                status: 'err',
            };
        }
    })
}

export const getAppointmentService = (id) => {
    try {
        return new Promise(async (resolve, reject) => {
            try {
                const currentDate = new Date();
// Trừ đi 1 ngày (24 giờ) từ ngày hiện tại
                const oneDayAgo = new Date(currentDate);
                oneDayAgo.setDate(currentDate.getDate() - 1);
// Cập nhật trạng thái của các cuộc hẹn có ngày < ngày hiện tại - 1 ngày
                const updatedAppointments = await AppointmentModel.updateMany(
                    { customerId: id, date: { $lt: oneDayAgo } },
                    { $set: { status: 0 } }
                );
                const appointments = await AppointmentModel.find({ customerId: id }).populate('customerId').sort({ createdAt: -1 }).exec();
                if(appointments.length > 0){
                    resolve({
                        status: "Ok",
                        appointment: appointments
                    })
                } else {
                    resolve({
                        status: "Warning",
                        message: "You haven't booked any appointments yet"
                    })
                }
            }catch (e) {
                return {
                    message: e,
                    status: 'err',
                };
            }
        })
    }catch (e) {
        return {
            status: "Error",
            message: "Đã xảy ra lỗi trong quá trình xử lý cuộc hẹn",
            error: e.message
        };
    }
}

export const deleteAppointmentService = (id) => {
    try {
        return new Promise(async (resolve, reject) => {
            try {
                const deleteAppointment = await AppointmentModel.findByIdAndDelete(id)
                if (deleteAppointment) {
                    resolve({
                        status: 'OK',
                        appointment: deleteAppointment
                    })
                } else {
                    resolve({
                        status: 'err',
                        message: 'The appointment is not defined'
                    })
                }
            }catch (e) {
                console.log(e);
                reject({
                    message: e,
                    status: 'err'
                })
            }
        })
    }catch (e) {
        return {
            status: "Error",
            message: "Đã xảy ra lỗi trong quá trình xử lý cuộc hẹn",
            error: e.message
        };
    }
}

export const updateStatusAppointmentService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const appointment = await AppointmentModel.findById(id);

            if (!appointment) {
                reject({
                    status: 'err',
                    message: 'The appointment does not exist'
                });
                return;
            }

            const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
                id,
                { status: appointment.status === 0 ? 1 : 0 },
                { new: true }
            );

            resolve({
                status: 'OK',
                appointment: updatedAppointment
            });
        }catch (e) {
            reject({
                status: 'err',
                message: 'An error occurred while processing the appointment.',
                error: e.message
            });
        }
    })
}