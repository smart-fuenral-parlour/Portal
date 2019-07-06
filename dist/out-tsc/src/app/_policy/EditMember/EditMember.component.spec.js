/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { EditMemberComponent } from './EditMember.component';
describe('EditMemberComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [EditMemberComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(EditMemberComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=EditMember.component.spec.js.map