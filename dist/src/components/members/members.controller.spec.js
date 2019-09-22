"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const members_controller_1 = require("./members.controller");
describe('Members Controller', () => {
    let module;
    beforeAll(async () => {
        module = await testing_1.Test.createTestingModule({
            controllers: [members_controller_1.MembersController],
        }).compile();
    });
    it('should be defined', () => {
        const controller = module.get(members_controller_1.MembersController);
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=members.controller.spec.js.map