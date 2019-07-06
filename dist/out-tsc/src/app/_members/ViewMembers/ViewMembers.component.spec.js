/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { ViewMembersComponent } from './ViewMembers.component';
describe('ViewMembersComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ViewMembersComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ViewMembersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ViewMembers.component.spec.js.map