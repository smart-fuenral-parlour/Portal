/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { ViewAllClaimsComponent } from './ViewAllClaims.component';
describe('ViewAllClaimsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ViewAllClaimsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ViewAllClaimsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ViewAllClaims.component.spec.js.map