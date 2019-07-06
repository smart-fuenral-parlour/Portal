/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { ViewAllSocietyComponent } from './ViewAllSociety.component';
describe('ViewAllSocietyComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ViewAllSocietyComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ViewAllSocietyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ViewAllSociety.component.spec.js.map