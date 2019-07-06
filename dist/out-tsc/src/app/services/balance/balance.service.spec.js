import { TestBed } from '@angular/core/testing';
import { BalanceService } from './balance.service';
describe('BalanceService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(BalanceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=balance.service.spec.js.map