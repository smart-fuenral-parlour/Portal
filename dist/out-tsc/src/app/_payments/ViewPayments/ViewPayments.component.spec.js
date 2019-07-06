/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { ViewPaymentsComponent } from './ViewPayments.component';
describe('ViewPaymentsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ViewPaymentsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ViewPaymentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ViewPayments.component.spec.js.map