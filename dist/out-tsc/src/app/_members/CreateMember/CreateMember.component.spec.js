/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { CreateMemberComponent } from './CreateMember.component';
describe('CreateMemberComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CreateMemberComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(CreateMemberComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=CreateMember.component.spec.js.map