import userRouter from './user.js'
import productRouter from './product.js'
import customerRouter from './customer.js'
import priceRowRouter from './priceRow.js'
import bodyCustomerRoter from './bodyCustomer.js'
import fabricRouter from './Fabric.js'
import companyFabric from "./companyFabric.js";
import bodyMeasurementChart from "./bodyMeasurementChart.js";
import order from "./order.js";
import appointment from "./appointment.js";

const routes = (app) => {
    app.use('/v1/user', userRouter)
    app.use('/v1/product', productRouter)
    app.use('/v1/customer', customerRouter)
    app.use('/v1/price', priceRowRouter)
    app.use('/v1/bodyCustomer', bodyCustomerRoter)
    app.use('/v1/fabric', fabricRouter)
    app.use('/v1/masterCompany', companyFabric)
    app.use('/v1/bodyMeasurementChart', bodyMeasurementChart)
    app.use('/v1/order', order)
    app.use('/v1/appointment', appointment)
}

export default routes