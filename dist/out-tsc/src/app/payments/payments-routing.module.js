import { VeiwPaymentsComponent } from './veiw-payments/veiw-payments.component';
export var PaymentsRoutes = [
    {
        path: '',
        children: [{
                path: 'viewpayments',
                component: VeiwPaymentsComponent
            }]
    }
];
//# sourceMappingURL=payments-routing.module.js.map