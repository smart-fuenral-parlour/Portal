/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { EditClaimComponent } from './EditClaim.component';
describe('EditClaimComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [EditClaimComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(EditClaimComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=EditClaim.component.spec.js.map