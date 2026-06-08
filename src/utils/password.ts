import bcrypt from 'bcrypt';

export let hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

export let comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
};