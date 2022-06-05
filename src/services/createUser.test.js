describe('Test Services : "createUser"', () => {
    let generate;
    let mongoCollections;
    let create;
    beforeEach(() => {
        const v = { virtual: true };
        create = jest.fn().mockResolvedValue('created-user');
        mongoCollections = jest.fn().mockResolvedValue({
            Users: {
                create
            }
        });
        generate = jest.fn().mockReturnValue('hashedPassword');
        jest.doMock('../mongo-collections', () => mongoCollections, v);
        jest.doMock('password-hash', () => ({
            generate
        }), v);
    });

    afterEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    it('should create user', async () => {
        const { default: createUser } = require('./createUser');
        const res = await createUser('name', 'email', 'password', 'user');
        expect(mongoCollections).toHaveBeenCalled();
        expect(generate).toHaveBeenCalledWith('password');
        expect(create).toHaveBeenCalledWith({
            fullName: 'name',
            email: 'email',
            password: 'hashedPassword',
            roles: ['user']
        });
        expect(res).toEqual('created-user');
    });

    it('should create user with default role', async () => {
        const { default: createUser } = require('./createUser');
        const res = await createUser('name', 'email', 'password');
        expect(mongoCollections).toHaveBeenCalled();
        expect(generate).toHaveBeenCalledWith('password');
        expect(create).toHaveBeenCalledWith({
            fullName: 'name',
            email: 'email',
            password: 'hashedPassword',
            roles: ['user']
        });
        expect(res).toEqual('created-user');
    });

    it('should throw error email is required', async () => {
        const { default: createUser } = require('./createUser');
        try {
            await createUser();
        } catch (error) {
            expect(error.message).toEqual('User email is required');
        }
    });

    it('should throw error password is required', async () => {
        const { default: createUser } = require('./createUser');
        try {
            await createUser('name', 'email');
        } catch (error) {
            expect(error.message).toEqual('User password is required');
        }
    });
});