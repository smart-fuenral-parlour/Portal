/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { CreateClaimComponent } from './CreateClaim.component';
describe('CreateClaimComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CreateClaimComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(CreateClaimComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=CreateClaim.component.spec.js.map