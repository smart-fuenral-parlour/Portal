/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { ClaimInfoComponent } from './ClaimInfo.component';
describe('ClaimInfoComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ClaimInfoComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ClaimInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ClaimInfo.component.spec.js.map