const fs = require('fs')
const path = require('path');
const yaml = require('js-yaml');

const files = fs.readdirSync("content/blog");
files.forEach(function (d) {
    if (d != "renamed" & d != "_index.md") {
        const postArray = fs.readFileSync("content/blog/" + d, 'utf8').split('---')
        const top = postArray[1];
        const body = postArray[2];
        const header = yaml.safeLoad(top);
        const newFileName = header.permalink.slice(1);
        const teaserImageStripped = header.teaserImage.split("/")[3].split(".")[0];
        const newTeaserImage = `/images/thumbnails/${teaserImageStripped}.jpg`
        const newHeader = {
            title: header.title,
            date: header.date,
            author: header.author,
            draft: header.draft,
            teaserText: header.teaserText,
            teaserImage: newTeaserImage,
            keywords: header.keywords || ""
        }

        const newPage = "---\n" + yaml.safeDump(newHeader) + "---\n" + body;

        fs.writeFileSync("content/blog/renamed/" + newFileName + ".md", newPage);
    }
})
