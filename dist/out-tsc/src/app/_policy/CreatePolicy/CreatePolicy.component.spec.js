/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { CreatePolicyComponent } from './CreatePolicy.component';
describe('CreatePolicyComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CreatePolicyComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(CreatePolicyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=CreatePolicy.component.spec.js.map