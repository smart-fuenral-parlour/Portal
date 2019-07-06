import { TestBed } from '@angular/core/testing';
import { BeneficiaryService } from './beneficiary.service';
describe('BeneficiaryService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(BeneficiaryService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=beneficiary.service.spec.js.map