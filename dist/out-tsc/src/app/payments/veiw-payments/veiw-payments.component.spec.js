import { async, TestBed } from '@angular/core/testing';
import { VeiwPaymentsComponent } from './veiw-payments.component';
describe('VeiwPaymentsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [VeiwPaymentsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(VeiwPaymentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=veiw-payments.component.spec.js.map