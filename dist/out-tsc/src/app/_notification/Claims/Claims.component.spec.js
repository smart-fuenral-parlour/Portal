/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { ClaimsComponent } from './Claims.component';
describe('ClaimsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ClaimsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ClaimsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=Claims.component.spec.js.map