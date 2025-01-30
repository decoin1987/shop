
import bcrypt from 'bcrypt'
import {User} from "../models/user";
import Role from "../models/role";

const saltRounds = 10;

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
};

const seedSuperUser = async () => {
    const superUser = {
        username: process.env.SEED_USER_USERNAME || 'admin',
        email: process.env.SEED_USER_EMAIL || 'admin@example.com',
        change: true, create: true, read: true, role_id: '',
        password: ''
    };
    const existingUser = await User.findOne({ where: { email: superUser.email } });
    let existingRole = await Role.findOne({ where: { title: 'admin' } });
    try {
        if (existingUser) {
            // console.log('Суперюзер с таким e-mail уже существует.');
            return;
        }
        const hashedPassword = await hashPassword(process.env.SEED_USER_PASSWORD || 'admin');

        if (!existingRole) {
            existingRole = await Role.create({
                change: true,
                create: true,
                read: true,
                role: [true, true, true],
                title: 'admin'
            })

        }
        superUser.password = hashedPassword;
        superUser.role_id = existingRole.id;

        const newUser = await User.create(superUser);
        console.log('Суперюзер успешно создан.');
    } catch (err) {
        console.error(err.message);
    }
};

export default seedSuperUser
