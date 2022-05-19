import sanityClient from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: "goq10psj", 
    dataset: "production",
    token: process.env.PUBLIC_SANITY_TOKEN,
    useCdn: true,
    apiVersion:'2022-05-19'
})
const builder = imageUrlBuilder(client);

export const urlFor = source => builder.image(source);
