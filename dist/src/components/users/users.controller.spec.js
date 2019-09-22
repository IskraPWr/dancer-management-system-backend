"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const users_controller_1 = require("./users.controller");
describe('Users Controller', () => {
    let module;
    beforeAll(async () => {
        module = await testing_1.Test.createTestingModule({
            controllers: [users_controller_1.UsersController],
        }).compile();
    });
    it('should be defined', () => {
        const controller = module.get(users_controller_1.UsersController);
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=users.controller.spec.js.map