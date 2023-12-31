/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/pages/blogs/studio/[[...index]].jsx` route
 */

import { documentInternationalization } from "@sanity/document-internationalization";
import { visionTool } from "@sanity/vision";
import { theme } from "https://themer.sanity.build/api/hues?default=5f9ea1;darkest:001f24&primary=43b9b8;400&transparent=609da0&positive=43d675;300&caution=fbd024;200&lightest=fcfdfd&darkest=0d1516";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";

export default defineConfig({
    name: "default",
    title: "InnerSpace Blog",
    basePath: "/blogs/studio",
    projectId,
    dataset,
    // Add and edit the content schema in the './sanity/schema' folder
    schema,
    plugins: [
        deskTool(),
        // Vision is a tool that lets you query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        documentInternationalization({
            // Required configuration
            supportedLanguages: [
                { id: "en", title: "English" },
                { id: "ar", title: "Arabic" },
            ],
            schemaTypes: ["post"],
        }),
        visionTool({ defaultApiVersion: apiVersion }),
    ],
    theme,
});
