import imageUrlBuilder from '@sanity/image-url';
import { sanityConfig } from './sanity.client';

const builder = imageUrlBuilder({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
});

export function urlFor(source) {
  return builder.image(source);
}
