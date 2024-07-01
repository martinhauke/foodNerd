// 1. Import utilities from `astro:content`
import {z, defineCollection} from 'astro:content';

const ingredient = z.object({
    name: z.string(),
    note: z.string().optional(),
    amount: z.number().positive(),
    unit: z.string().optional()
})

const ingredientGroup = z.object({
    name: z.string(),
    ingredients: z.array(ingredient)
})

const recipe = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    ingredientGroups: z.array(ingredientGroup),
    image: z.string(),
    steps: z.array(z.string())
})

// 2. Define a `type` and `schema` for each collection
const recipeCollection = defineCollection({
    type: 'content', // v2.5.0 and later
    schema: recipe,
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
    'recipes': recipeCollection,
};

export type IngredientGroup = z.infer<typeof ingredientGroup>
