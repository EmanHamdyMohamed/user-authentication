describe('Test Services : "getUserByEmail"', () => {
    let mongoCollections;
    let findOne;
    beforeEach(() => {
        const v = { virtual: true };
        findOne = jest.fn().mockResolvedValue('user');
        mongoCollections = jest.fn().mockResolvedValue({
            Users: {
                findOne
            }
        });
        jest.doMock('../mongo-collections', () => mongoCollections, v);
    });

    afterEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    it('should fine user', async () => {
        const { default: getUserByEmail } = require('./getUserByEmail');
        const res = await getUserByEmail('email');
        expect(mongoCollections).toHaveBeenCalled();
        expect(findOne).toHaveBeenCalledWith({
            email: 'email',
        });
        expect(res).toEqual('user');
    });
});