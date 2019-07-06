/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { SocietyInfoComponent } from './SocietyInfo.component';
describe('SocietyInfoComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SocietyInfoComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SocietyInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=SocietyInfo.component.spec.js.map