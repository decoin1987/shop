import Category from '../../../models/category';
import { createError, defineEventHandler, H3Event, readBody } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event);
    const {
        title,
        show_menu,
        raw_tags,
        html_meta,
        html_keywords,
        html_title,
        description,
        sort,
        parent_id,
    } = body;

    try {
        if (!title || !title.trim() || title.trim().length < 1) {
            throw createError({
                statusCode: 400,
                message: 'Введите название категории',
            });
        } else {
            const category = await Category.create({
                title: title.trim(),
                show_menu: !!show_menu,
                raw_tags,
                html_meta,
                html_keywords,
                html_title,
                description,
                sort: Number(sort),
                slug: title,
            });

            if (parent_id) {
                await category.setParent(parent_id);
            }
        }
    } catch (error) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message,
        });
    }

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