/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { PolicyComponent } from './Policy.component';
describe('PolicyComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [PolicyComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(PolicyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=Policy.component.spec.js.map