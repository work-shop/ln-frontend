"use strict";

var log = require('../logging/index.js')();

module.exports = function ( thought ) {

    try {

        return {

            title: {
                short: thought.title.rendered,
                long: thought.acf.longname
            },
            slug: thought.slug,
            link: thought.link,
            hero: determineHeroStructure( thought.acf ),
            color: thought.acf.color,
            summary: thought.acf.summary,
            metadata: thought.acf.metadata,
            overview: thought.acf.overview,
            sections: thought.acf.sections

        };

    } catch ( err ) {

        log.error( err, 'restructure-thought');

        return {};

    }

};


function determineHeroStructure( acf ) {
    if ( acf.hero_type === "image" ) {

        return {
            type: "image",
            image: acf.hero_image
        };

    } else if ( acf.hero_type === "gallery" ) {

        return {
            type: "gallery",
            image: acf.hero_images
        };

    } else if ( acf.hero_type === "video" ) {

        if ( acf.hero_video_type === "youtube" ) {

            return {
                type: "video",
                image: acf.hero_video_file
            };

        } else if ( acf.hero_video_type === "vimeo" ) {

            return {
                type: "vimeo",
                image: acf.hero_vimeo_video
            };

        } else if ( acf.hero_video_type === "file" ) {

            return {
                type: "youtube",
                image: acf.hero_youtube_video
            };

        } else {

            throw new Error('determineHeroStructure: Encountered an unrecognized hero video type: \'' + acf.hero_video_type + '\'');

        }

    } else {

        throw new Error('determineHeroStructure: Encountered an unrecognized hero type: \'' + acf.hero_type + '\'');

    }
}
