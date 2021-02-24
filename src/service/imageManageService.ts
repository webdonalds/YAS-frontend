const convertimageFile2String = (file:File): Promise<string> => {
    const fileReader = new FileReader();
  
    return new Promise<string>((resolve, reject) => {
        fileReader.onerror = () => {
            fileReader.abort();
            reject(new DOMException("Problem while converting image to base64!!!"));
        };

        fileReader.onload = () => {
            resolve(fileReader.result as string);
        };
        fileReader.readAsDataURL(file);
    });
};

const resizeImageString = (base64Str: string, maxWidth = 400, maxHeight = 400): Promise<string> => {
    return new Promise<string>((resolve) => {
        const img = new Image()
        img.src = base64Str
        img.onload = () => {
            const canvas = document.createElement('canvas')
            const MAX_WIDTH = maxWidth
            const MAX_HEIGHT = maxHeight
            let width = img.width
            let height = img.height

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width
                    width = MAX_WIDTH
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height
                    height = MAX_HEIGHT
                }
            }
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            if(ctx){
                ctx.drawImage(img, 0, 0, width, height)
            }
            resolve(canvas.toDataURL())
        }
    });
}

export default {
    convertimageFile2String,
    resizeImageString
}