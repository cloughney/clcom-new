export type LinkMap = { [linkName: string]: { href: string } };

export default function href(linkName: string, links?: LinkMap): string {
    links = links || this;
    if (!links[linkName]) {
        throw new Error(`The 'href' helper cannot find link with name: '${linkName}'.`);
    }

    return links[linkName].href;
}