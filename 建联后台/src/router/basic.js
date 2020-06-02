import basic from '@/pages/index'
import payMent from '@/components/basic/payment'
import paymentAdd from '@/components/basic/paymentAdd'
const BasicRouter = [
    {
        path:'/basic',
        name:'basic',
        component:basic,
        children:[
            {
                path:'payMent',
                name:'payMent',
                component:payMent
            },
            {
                path:'paymentAdd',
                name:'paymentAdd',
                component:paymentAdd
            },
        ]
    }
]

export default BasicRouter