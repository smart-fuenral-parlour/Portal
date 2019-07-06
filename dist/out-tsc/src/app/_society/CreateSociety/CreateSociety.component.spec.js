/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { CreateSocietyComponent } from './CreateSociety.component';
describe('CreateSocietyComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CreateSocietyComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(CreateSocietyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=CreateSociety.component.spec.js.map