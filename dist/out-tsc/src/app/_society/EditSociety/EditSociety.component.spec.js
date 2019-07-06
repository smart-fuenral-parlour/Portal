/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { EditSocietyComponent } from './EditSociety.component';
describe('EditSocietyComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [EditSocietyComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(EditSocietyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=EditSociety.component.spec.js.map