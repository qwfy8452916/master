import branch from '@/pages/index'
import demandList from '@/components/branch/demand/list'
import demandCreat from '@/components/branch/demand/creat'
import Purorderlist from '@/components/branch/Purorderlist'
import Purorderdetailbra from '@/components/branch/Purorderdetail'
import delivlist from '@/components/branch/delivlist'
import settlelist from '@/components/branch/settlelist'
import paylist from '@/components/branch/payorder/paylist'
import infocenter from '@/components/branch/infocenter'
import branchstaging from '@/components/branch/branchstaging/branchstaging'
import delivestaging from '@/components/branch/branchstaging/delivestaging'
import demandstaging from '@/components/branch/branchstaging/demandstaging'
import paystaging from '@/components/branch/branchstaging/paystaging'
import settlestaging from '@/components/branch/branchstaging/settlestaging'
const BranchRouter = [
    {
        path:'/branch',
        name:'branch',
        component:branch,
        children:[
            {
                path:'demandList',
                name:'demandList',
                component:demandList
            },
            {
                path:'demandCreat',
                name:'demandCreat',
                component:demandCreat
            },
            {
                path:'demandDetail/:id/:isedit',
                name:'demandDetail',
                component:demandCreat
            },
            {
                path:'Purorderlist',
                name:'Purorderlist',
                component:Purorderlist
            },
            {
                path:'Purorderdetailbra/:id',
                name:'Purorderdetailbra',
                component:Purorderdetailbra
            },
            {
                path:'delivlist/:id/:status',
                name:'delivlist',
                component:delivlist
            },
            {
                path:'settlelist/:id',
                name:'settlelist',
                component:settlelist
            },
            {
                path:'paylist/:id',
                name:'paylist',
                component:paylist

            },
            {
                path:'infocenter',
                name:'infocenter',
                component:infocenter

            },
            {
                path:'delivestaging',
                name:'delivestaging',
                component:delivestaging

            },
            {
                path:'demandstaging',
                name:'demandstaging',
                component:demandstaging

            },
            {
                path:'paystaging',
                name:'paystaging',
                component:paystaging

            },
            {
                path:'settlestaging',
                name:'settlestaging',
                component:settlestaging

            },
            {
                path:'branchstaging',
                name:'branchstaging',
                component:branchstaging
            },



        ]
    }
]

export default BranchRouter