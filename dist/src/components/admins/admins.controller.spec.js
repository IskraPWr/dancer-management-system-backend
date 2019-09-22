"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const admins_controller_1 = require("./admins.controller");
describe('Admins Controller', () => {
    let module;
    beforeAll(async () => {
        module = await testing_1.Test.createTestingModule({
            controllers: [admins_controller_1.AdminsController],
        }).compile();
    });
    it('should be defined', () => {
        const controller = module.get(admins_controller_1.AdminsController);
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=admins.controller.spec.js.map