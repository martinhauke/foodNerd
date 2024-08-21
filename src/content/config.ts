// 1. Import utilities from `astro:content`
import {z, defineCollection} from 'astro:content';

const ingredient = z.object({
    name: z.string(),
    note: z.string().optional(),
    amount: z.number().positive().optional(),
    unit: z.string().optional(),
})

const ingredientGroup = z.object({
    name: z.string(),
    ingredients: z.array(ingredient),
})

const image = z.object({
    src: z.string(),
    alt: z.string(),
    title: z.string().optional(),
})

const metaInformation = z.object({
    numberOfServings: z.number(),
    timeNeeded: z.string().regex(/(\d+\s)(min|h)/),
    kcalPerServing: z.number().optional(),
    difficulty: z.enum(["difficulty.easy", "difficulty.middle", "difficulty.hard"])
})

const language = z.enum(["de", "en"])

const recipe = z.object({
    id: z.string(),
    name: z.string(),
    pubDate: z.date(),
    editDate: z.date(),
    description: z.string().optional(),
    lang: language,
    ingredientGroups: z.array(ingredientGroup),
    image: image,
    steps: z.array(z.string()),
    isPublic: z.boolean().default(false),
    metaInformation: metaInformation,
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

export type Ingredient = z.infer<typeof ingredient>
export type IngredientGroup = z.infer<typeof ingredientGroup>
export type Image = z.infer<typeof image>
export type MetaInformation = z.infer<typeof metaInformation>

