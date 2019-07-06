/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { MemberDetailsComponent } from './MemberDetails.component';
describe('MemberDetailsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [MemberDetailsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(MemberDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=MemberDetails.component.spec.js.map