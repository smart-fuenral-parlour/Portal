/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { ViewPolicyTypeComponent } from './ViewPolicyType.component';
describe('ViewPolicyTypeComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ViewPolicyTypeComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ViewPolicyTypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ViewPolicyType.component.spec.js.map