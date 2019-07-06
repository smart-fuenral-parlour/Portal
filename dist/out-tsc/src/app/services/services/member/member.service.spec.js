import { TestBed } from '@angular/core/testing';
import { MemberService } from './member.service';
describe('MemberService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(MemberService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=member.service.spec.js.map