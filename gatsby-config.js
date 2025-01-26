module.exports = {
    siteMetadata: {
        siteUrl: "https://www.annesophiefaustino.com",
        title: "Anne-Sophie Faustino - Développeuse web et mobile",
        description: "Mon portfolio de developpeuse web et mobile",
        author: "Anne-Sophie Faustino",
        siteLanguage: "fr",
        image: "src/data/images/about/profile-pic.png",
        titleTemplate: "mon_portfolio",
        twitterUsername: "@annesophie_fstn",
        getform_url: "https://getform.io/f/agdderlb",
        socials: [
            {
                id: 1,
                title: "github",
                path: "https://github.com/AnneSophieFstn",
                icon: "GitHub",
            },
            {
                id: 2,
                title: "mail",
                path: "mailto:annesophie.faustino@gmail.com",
                icon: "Mail",
            },
            {
                id: 3,
                title: "linkedin",
                path: "https://www.linkedin.com/in/annesophie-faustino/",
                icon: "Linkedin",
            },
        ],
        contact: {
            email: "annesophie.faustino@gmail.com",
        },
    },
    plugins: [
        {
            resolve: "gatsby-plugin-sass",
            options: {
                useResolveUrlLoader: {
                    options: {
                        sourceMap: true, //default is false
                    },
                },
            },
        },
        "gatsby-plugin-image",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        "gatsby-transformer-json",
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/assets/images`,
                ignore: [`**/\.*`],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `data`,
                path: `${__dirname}/src/data`,
                ignore: [`**/\.*`],
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1200,
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: "Portfolio",
                short_name: "portfolio",
                theme_color: "#ff014f",
                background_color: "#ffffff",
                display: "standalone",
                scope: "/",
                start_url: "/",
                icon: "src/assets/images/favicon.png",
            },
        },
    ],
};
