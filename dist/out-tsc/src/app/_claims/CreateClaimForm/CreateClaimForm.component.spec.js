/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { CreateClaimFormComponent } from './CreateClaimForm.component';
describe('CreateClaimFormComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CreateClaimFormComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(CreateClaimFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=CreateClaimForm.component.spec.js.map