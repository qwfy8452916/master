import group from '@/pages/index'
import demandList from '@/components/group/demand/list'
import demandDetail from '@/components/group/demand/detail'
import Purorderlist from '@/components/group/Purorderlist'
import Purorderdetail from '@/components/group/Purorderdetail'
import delivlist from '@/components/group/delivlist'
import settlelist from '@/components/group/settlelist'
import paylist from '@/components/group/payorder/paylist'
import infomanage from '@/components/group/infomanage'
import systeminfomodel from '@/components/group/systeminfomodel'
import appinfomodel from '@/components/group/appinfomodel'
import shortinfomodel from '@/components/group/shortinfomodel'
import groupstaging from '@/components/group/groupstaging/groupstaging'
import demandstaging from '@/components/group/groupstaging/demandstaging'
import paystaging from '@/components/group/groupstaging/paystaging'
import billdata from '@/components/group/datacenter/billdata'
import purchasedata from '@/components/group/datacenter/purchasedata'
import supplydata from '@/components/group/datacenter/supplydata'

const GroupRouter = [
    {
        path:'/group',
        name:'group',
        component:group,
        children:[
            {
                path:'demandList',
                name:'demandList',
                component:demandList
            },
            {
                path:'demandDetail/:id',
                name:'demandDetail',
                component:demandDetail
            },
            {
                path:'Purorderlist',
                name:'Purorderlist',
                component:Purorderlist
            },
            {
                path:'Purorderdetail/:id',
                name:'Purorderdetail',
                component:Purorderdetail
            },
            {
                path:'delivlist/:id',
                name:'delivlist',
                component:delivlist
            },
            {
                path:'paylist/:id',
                name:'paylist',
                component:paylist
            },
            {
                path:'settlelist/:id',
                name:'settlelist',
                component:settlelist
            },
            {
                path:'infomanage',
                name:'infomanage',
                component:infomanage
            },
            {
                path:'systeminfomodel/:id',
                name:'systeminfomodel',
                component:systeminfomodel
            },
            {
                path:'appinfomodel/:id',
                name:'appinfomodel',
                component:appinfomodel
            },
            {
                path:'shortinfomodel/:id',
                name:'shortinfomodel',
                component:shortinfomodel
            },
            {
                path:'demandstaging',
                name:'demandstaging',
                component:demandstaging
            },
            {
                path:'groupstaging',
                name:'groupstaging',
                component:groupstaging
            },
            {
                path:'paystaging',
                name:'paystaging',
                component:paystaging
            },
            {
                path:'datacenter',
                name:'billdata',
                component:billdata
            },
            {
                path:'purchasedata',
                name:'purchasedata',
                component:purchasedata
            },

            {
                path:'supplydata',
                name:'supplydata',
                component:supplydata
            },


        ]
    }
]

export default GroupRouter