import userRouter from './user.js'
import productRouter from './product.js'
import customerRouter from './customer.js'
import priceRowRouter from './priceRow.js'
import bodyCustomerRoter from './bodyCustomer.js'
import fabricRouter from './Fabric.js'

const routes = (app) => {
    app.use('/user', userRouter)
    app.use('/product', productRouter)
    app.use('/customer', customerRouter)
    app.use('/price', priceRowRouter)
    app.use('/bodyCustomer', bodyCustomerRoter)
    app.use('/fabric', fabricRouter)
}

export default routes