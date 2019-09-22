"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const presence_controller_1 = require("./presence.controller");
describe('Presence Controller', () => {
    let module;
    beforeAll(async () => {
        module = await testing_1.Test.createTestingModule({
            controllers: [presence_controller_1.PresenceController],
        }).compile();
    });
    it('should be defined', () => {
        const controller = module.get(presence_controller_1.PresenceController);
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=presence.controller.spec.js.map