/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { DashBoardComponent } from './DashBoard.component';
describe('DashBoardComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [DashBoardComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(DashBoardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=DashBoard.component.spec.js.map