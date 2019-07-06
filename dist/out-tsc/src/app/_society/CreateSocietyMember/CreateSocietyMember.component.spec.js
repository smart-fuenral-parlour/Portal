/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { CreateSocietyMemberComponent } from './CreateSocietyMember.component';
describe('CreateSocietyMemberComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CreateSocietyMemberComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(CreateSocietyMemberComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=CreateSocietyMember.component.spec.js.map