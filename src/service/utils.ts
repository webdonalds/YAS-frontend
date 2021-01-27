
function getYoutubeThumbnailUrl (id: string): string {
    return `https://img.youtube.com/vi/${id}/0.jpg`;
}

const defaultProfileImage = "https://i.stack.imgur.com/l60Hf.png";

export default {
    getYoutubeThumbnailUrl,
    defaultProfileImage
};