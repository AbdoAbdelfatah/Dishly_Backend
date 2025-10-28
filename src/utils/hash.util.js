import bcrypt from 'bcrypt';

export async function hashPassword(pass) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass,salt);
}

export async function comparePassword(pass,hashed) {
    return await bcrypt.compare(pass,hashed);
}