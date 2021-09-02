import { rest } from 'msw';
import { url } from '../config/config';

export const handlers = [
    rest.get(url+'/products', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                        id: 1,
                        name: "Product",
                        image: "https://via.placeholder.com/500x200",
                        brand: "BrandName",
                        inventory: 40,
                        price: 23.75,
                        description: "this is a placeholder item",
                },
                {
                        id: 2,
                        name: "Product2",
                        image: "https://via.placeholder.com/200x300",
                        brand: "BrandName2",
                        inventory: 4,
                        price: 400.89,
                        description: "this is a placeholder item with a longer string to describe it",
                },
                {
                        id: 3,
                        name: "Product3",
                        image: "https://via.placeholder.com/20x20",
                        brand: "BrandName3",
                        inventory: 0,
                        price: 0.99,
                        description: "this is a third and final placeholder item for testing the view cart page this is a third and final placeholder item for testing the view cart page this is a third and final placeholder item for testing the view cart page this is a third and final placeholder item for testing the view cart page this is a third and final placeholder item for testing the view cart page this is a third and final placeholder item for testing the view cart page",
                },
                {
                    id: 4,
                    name: "Product4",
                    image: "https://via.placeholder.com/70x50",
                    brand: "BrandName4",
                    inventory: 340,
                    price: 5.87,
                    description: "this is a fourth placeholder item",
            },
            ])
        )
    }),
]