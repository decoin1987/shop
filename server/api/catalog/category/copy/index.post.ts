import Category from '../../../../models/category';
import { createError, defineEventHandler, H3Event, readBody } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
    const { id } = await readBody(event);
    console.log(id)
    let cData = await Category.findOne({
        where: { id },
        raw: true,
    });
    cData.title = cData.title + '(копия)'
    cData.slug = cData.title
    delete cData.id;
    await Category.create(cData);

    const categories = await Category.findAndCountAll({
        include: [
            {
                model: Category,
                as: 'parent',
            },
            {
                model: Category,
                as: 'child',
            },
        ],
        distinct: true,
        order: [['created_at', 'DESC']],
    });

    return categories;
});