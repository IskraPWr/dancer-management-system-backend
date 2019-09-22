"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const members_service_1 = require("./members.service");
describe('MembersService', () => {
    let service;
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [members_service_1.MembersService],
        }).compile();
        service = module.get(members_service_1.MembersService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=members.service.spec.js.map