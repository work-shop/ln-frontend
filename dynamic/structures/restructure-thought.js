"use strict";

var util = require('util');
var log = require('../logging/index.js')({stacktrace:true});
var maybeFeaturedImage = require('../utilities/maybe-with-default.js')({'wp:featuredmedia':[]})

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
            format: thought.acf.format,
            sections: thought.acf.sections,
            featured_image: maybeFeaturedImage( thought._embedded )['wp:featuredmedia'][0]

        };

    } catch ( err ) {

        log.error( err, 'restructure-thought');

        return {
            title: {
                short: thought.title.rendered,
                long: thought.acf.longname
            },
            slug: thought.slug,
            link: thought.link,
            color: thought.acf.color,
            summary: thought.acf.summary,
            metadata: thought.acf.metadata,
            overview: thought.acf.overview,
            format: thought.acf.format,
            sections: thought.acf.sections
        };

    }

};


function determineHeroStructure( acf ) {
    if ( acf.hero_type === "image" ) {

        return {
            type: "image",
            image: acf.hero_image
        };

    } else if ( acf.hero_type === "images" ) {

        return {
            type: "images",
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

    } else if ( acf.hero_type === "none" ) {

        return {
            type: "none"
        };

    } else {

        throw new Error('determineHeroStructure: Encountered an unrecognized hero type: \'' + acf.hero_type + '\'');

    }
}
